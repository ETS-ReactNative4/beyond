/**
 * Returns the package and subpath of an import built by esbuild
 *
 * @param input {string} The import. Ex: 'node_modules/svelte/internal/internal.js'
 * @param application {{path: string}} The application object
 * @return {{errors: string[]}|{resource, subpath: string, pkg: string, solved: string}}
 */
module.exports = function (input, application) {
    const [, bundle] = input.split('node_modules/');

    const split = bundle.split('/');
    const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
    const resource = split.join('/');

    const resolved = require('./resolve')(pkg, null, application);
    if (resolved.errors || resolved.resource || !resolved.json) {
        return {errors: [`Package "${pkg}" not found`]};
    }

    // Construct a map with the subpaths and their resources
    const resources = new Map();

    const {json} = resolved;
    if (!json.exports) {
        if (typeof json.module !== 'string') {
            return {errors: [`Resource "${resource}" does not specify the module entry in the package.json`]};
        }

        const module = json.module.startsWith('./') ? json.module.slice(2) : json.module;
        resources.set(module, '.');
    }

    json.exports && Object.entries(json.exports).forEach(([subpath, config]) => {
        if (['./package.json'].includes(subpath)) return;

        config = (() => {
            config = config.browser ? config.browser : config;
            if (typeof config === 'string') return config;

            config = config.import ? config.import : config;
            if (typeof config === 'string') return config;

            return config.browser || config.default;
        })();

        if (typeof config !== 'string' || !config.startsWith('./')) return;

        const resource = config.slice(2);
        resources.set(resource, subpath === '.' ? subpath : subpath.slice(2));
    });

    if (!resources.has(resource)) {
        return {errors: [`Resource "${resource}" not found`]};
    }

    const subpath = resources.get(resource);
    const solved = subpath === '.' ? pkg : `${pkg}/${subpath}`;

    return {pkg, resource, subpath, solved};
}
