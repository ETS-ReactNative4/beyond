/**
 * Process the exports of the bundle
 *
 * @param packager {object} The bundle packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @param kernel {boolean} Is it the @beyond-js/kernel/core or @beyond-js/ss/hydrator module?
 * @param sourcemap {object} The sourcemap of the processed script
 * @param transversal {boolean} Is it a transversal bundle or not
 */
module.exports = function (packager, hmr, kernel, sourcemap, transversal) {
    const {processors} = packager;

    // scripts.module:
    // Module export processing updates the module's standard interface (esm, amd, cjs).
    // scripts.managed:
    // The managed update takes care of updating the exports exposed by the beyond bundles objects, useful for HMR.
    let exp = {module: '', managed: ''};
    const tab = '    ';

    // Add the declaration of all exports (not used on HMR code)
    const declaration = hmr ? void 0 : new Set();

    const process = (processor) => {
        const {packager} = processor;
        if (!packager || !packager.js) return;

        const {ims} = packager.js
        ims?.forEach(im => {
            const {exports, id} = im;
            exports?.forEach(({name, from}) => {
                const require = `require('${id}').${from}`;

                // Managed exports are always processed
                exp.managed += `${tab}_exports.${name} = ${require};\n`;

                // Module exports are not used by transversals and HMR
                if (!hmr && !transversal) {
                    declaration.add(name);
                    exp.module += `${tab}${name} = ${require};\n`;
                }
            });
        });
    }
    processors.forEach(processor => process(processor));

    if (!kernel) {
        sourcemap.concat('// Exports managed by beyond bundle objects');
        sourcemap.concat('__pkg.exports.managed = function(require, _exports) {');
        sourcemap.concat(exp.managed);
        sourcemap.concat('};');
    }

    if (!hmr && !transversal) {
        declaration.size && sourcemap.concat(`export let ${[...declaration].join(', ')};\n`);
        sourcemap.concat('// Module exports');
        sourcemap.concat('__pkg.exports.process = function(require) {');
        sourcemap.concat(exp.module);
        sourcemap.concat('};');
    }

    !hmr && !transversal && require('./hmr')(packager, sourcemap);
}
