const p = require('path');

/**
 * Returns the package and subpath of an import built by esbuild
 *
 * @param input {string} The import. Ex: 'node_modules/svelte/internal/internal.js'
 * @param application {{path: string}} The application object
 * @return {{errors?: [string], resource?: string, subpath?: string, solved?: string, pkg?: string}}
 */
module.exports = function (input, application) {
    const [, bundle] = input.split('node_modules/');

    const split = bundle.split('/');
    const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
    const resource = split.join('/');

    const resolved = require('../../resolve')(pkg, null, application);
    if (resolved.errors || resolved.resource || !resolved.json?.exports) {
        return {errors: [`Package "${pkg}" not found`]};
    }

    // Construct a map with the subpaths and their resources
    const resources = new Map();
    Object.entries(resolved.json.exports).forEach(([subpath, config]) => {
        if (['.', './package.json'].includes(subpath)) return;

        config = (() => {
            config = config.browser ? config.browser : config;
            if (typeof config === 'string') return config;
            return config.require || config.default;
        })();

        if (typeof config !== 'string') return;

        const resource = p.join(`/`, config).slice(1);
        resources.set(resource, subpath.slice(2));
    });

    if (!resources.has(resource)) {
        return {errors: [`Resource "${resource}" not found`]};
    }

    const subpath = resources.get(resource);
    const solved = subpath ? `${pkg}/${subpath}` : pkg;

    return {pkg, resource, subpath, solved};
}
