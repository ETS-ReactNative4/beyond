/**
 * Package initialisation
 *
 * @param packager {object} The packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @return {string|undefined} The initialisation code
 */
module.exports = function (packager, hmr) {
    const {bundle} = packager;
    const transversal = !!global.bundles.get(bundle.name).Transversal;

    // When the bundle is a transversal, the package initialization is made by the transversal in
    // the bundle creator function
    return transversal ? 'return modules;' : `__pkg.${hmr ? 'update' : 'initialise'}(modules);`;
}
