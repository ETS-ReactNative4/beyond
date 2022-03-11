const p = require('path');
const fs = require('fs').promises;

/**
 * Builds the bundle of an external package with esbuild
 *
 * @param pkg {string} The package being requested
 * @param subpath {string} The subpath of the package.json (entry exports)
 * @param application {object} The application object
 * @param json {object} The content of the package.json of the package being requested
 * @param distribution {object} The distribution specification
 * @return {Promise<{resource?: object, errors?: string[]}>}
 */
module.exports = async function (pkg, subpath, application, json, distribution) {
    const {version} = json;
    const sp = subpath ? `/${subpath}.js` : '.js';
    const bundle = subpath ? `${pkg}/${subpath}` : pkg;

    const paths = {
        sources: p.join(application.path, '.beyond/packages'),
        source: {relative: `${pkg}${sp}`},
        cache: p.join(process.cwd(), '.beyond/packages', `${pkg}.${version}${sp}`)
    }
    paths.source.fullpath = p.join(paths.sources, paths.source.relative);
    paths.source.dirname = p.dirname(paths.source.fullpath);

    const exists = await new Promise(r => fs.access(paths.cache)
        .then(() => r(true))
        .catch(() => r(false))
    );
    if (exists) return {resource: new global.Resource({file: paths.cache})};

    const {code, errors} = await require('./build')(bundle, pkg, subpath, paths, application);
    if (errors?.length) return {errors};

    return new global.Resoruce({content: code, extname: '.js'});
}
