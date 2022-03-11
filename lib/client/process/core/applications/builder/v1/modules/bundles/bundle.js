const {fs} = global.utils;

/**
 * Build a bundle of a module
 *
 * @param extname {string} Can be '.js' or '.css'
 * @param path {string} The build target path
 * @param module {object} The module
 * @param bundle {object} The bundle being exported
 * @param distribution {object} The distribution specification
 * @param language {string} The language
 * @param uglifier {object}
 * @param builder {object} The builder object
 * @param exports {Set<string>} The resources being exported
 * @return {Promise<void>}
 */
module.exports = async function (extname, path, module, bundle, distribution, language, uglifier, builder, exports) {
    const packager = await bundle.packagers.get(distribution, language);

    let code = packager[extname === '.js' ? 'js' : 'css'];
    if (!code) return;

    await code.ready;
    if (!code.valid) {
        builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
        return;
    }
    if (!code.processorsCount) return;
    if (!code.code()) return;

    const exported = require('path').join(module.pathname, bundle.name + (language ? `.${language}` : ''));
    const entry = exported.replace(/\\/g, '/');
    exports.set(entry, entry);
    const target = require('path').join(path, `${exported}.js`);

    if (!distribution.compress) return fs.save(target, code.code());

    let errors;
    ({code, errors} = uglifier.uglify(target, code.code()));
    errors && builder.emit('error', `  . Error uglifying bundle "${bundle.pathname}"`);
    errors?.forEach(({message, line, col}) => builder.emit('error', `    -> [${line}, ${col}] ${message}`));
    !errors && await fs.save(target, code);
}
