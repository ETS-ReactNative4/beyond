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
const EXTENSIONS = {es6: 'mjs', cjs: 'cjs', amd: 'amd'};
module.exports = async function (extname, path, module, bundle, distribution, language, uglifier, builder, exports) {
    const packagers = new Map();
    const setPackager = (platform, mode) => {
        const key = `${platform}.${mode}`;
        const dist = Object.assign({}, distribution, {key: key, platform: platform, bundles: {mode: mode}});
        delete dist.npm;
        delete dist.platforms;

        packagers.set(key, bundle.packagers.get(dist, language));
    };
    for (const platform of Object.keys(distribution.platforms)) {
        if (platform === 'web') {
            setPackager(platform, 'amd')
            continue;
        }
        setPackager(platform, 'es6');
        setPackager(platform, 'cjs');
    }

    const promises = [];
    packagers.forEach(packager => packager.js && promises.push(packager.js.ready));
    await Promise.all(promises);

    const bundlePath = require('path').join(path, module.pathname, bundle.name);
    await fs.mkdir(bundlePath, {'recursive': true});
    const save = async (target, code) => {
        if (!distribution.compress) return fs.save(target, code.code());

        let errors;
        ({code, errors} = uglifier.uglify(target, code.code()));
        errors && builder.emit('error', `  . Error uglifying bundle "${bundle.pathname}"`);
        errors?.forEach(({message, line, col}) => builder.emit('error', `    -> [${line}, ${col}] ${message}`));
        !errors && await fs.save(target, code);
    };

    promises.size = 0;
    packagers.forEach((packager, key) => {
        if (!packager.js) return;

        const code = packager.js;
        if (!code.valid) {
            builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
            return;
        }
        if (!code.code() || !code.processorsCount) return;

        const bName = bundle.name + (language ? `.${language}` : '');
        const bExported = require('path').join(module.pathname, bName);
        exports.set(bExported.replace(/\\/g, '/'), bName);

        const type = key.split('.')[1];
        const extension = type === 'es6' ? 'mjs' : `${EXTENSIONS[type]}.js`;

        const bundlePath = require('path').join(path, module.pathname, bName);
        const target = require('path').join(bundlePath, `${bName}.${extension}`);
        promises.push(save(target, code));
    });
    await Promise.all(promises);

    await require('./declarations')(bundle, `${bundlePath}`);
}