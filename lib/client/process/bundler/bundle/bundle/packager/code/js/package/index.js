/**
 * Process the bundle code
 *
 * @param packager {object} The packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @param transversal {boolean} Is it a transversal package?
 * @param specs {{module?: {dirname: string}}, {txt?: {multilanguage: boolean}}}
 */
module.exports = function (packager, hmr, transversal, specs) {
    'use strict';

    const {distribution} = packager;
    const {mode} = distribution.bundles;

    const hydrator = packager.bundle.resource === '@beyond-js/ssr/hydrator/ts';

    const sourcemap = require('./process')(packager, hmr, transversal, mode, specs);
    if (hydrator || transversal || !['amd', 'cjs'].includes(mode)) return {sourcemap};

    const {code, map, errors} = require(`./mode/${mode}`)(packager, sourcemap);
    if (errors) return {errors};

    return require('./outside')(packager, code, map);
}
