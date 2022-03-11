/**
 * Process the bundle code
 *
 * @param packager {object} The packager
 * @param hmr {boolean} Is it an hmr bundle?
 * @param transversal {boolean} Is it a transversal package?
 * @param mode {string} Can be 'amd', 'es6', 'cjs'
 * @param specs {{module?: {dirname: string}}, {txt?: {multilanguage: boolean}}}
 * @return {object}
 */
module.exports = function (packager, hmr, transversal, mode, specs) {
    'use strict';

    const {application, bundle, distribution, language, processors, dependencies} = packager;
    const {standalone} = bundle.config;
    const sourcemap = new global.SourceMap();

    // Process the processors imports and the bundle imports
    // Just for backward compatibility
    !transversal && require('./imports')(dependencies, processors, packager.imports, sourcemap);

    // Only required for transversals
    const filtered = (() => {
        if (!dependencies.size || !transversal) return [];

        return [...dependencies.values()]
            .filter(({resource, is}) => !resource.startsWith('@beyond-js/kernel') && is.has('import'))
            .map(({resource}) => resource);
    })();

    // Add the code of the dependencies
    if (dependencies.size) {
        if (transversal && filtered.length) {
            sourcemap.concat('const td = transversal.dependencies;');
            sourcemap.concat(`const dp = new Set(${JSON.stringify(filtered)});`);
            sourcemap.concat('const dependencies = new Map(Array.from(td).filter(([key]) => dp.has(key)));');
        }
        else if (!transversal) {
            sourcemap.concat(dependencies.code.code);
        }
    }

    if (!processors.size) {
        sourcemap.concat('// No processors found');
        return sourcemap;
    }

    const core = bundle.resource === '@beyond-js/kernel/core/ts';
    const hydrator = bundle.resource === '@beyond-js/ssr/hydrator/ts';
    const kernel = core || hydrator;

    if (kernel) {
        const {mode} = distribution.bundles;
        !hydrator && mode === 'amd' && sourcemap.concat('const amd_require = require;');

        // Used by the beyond.import function
        // In production environments, the brequire function is declared in the index.js file
        // to allow application packages to be reached
        mode === 'cjs' && sourcemap.concat(
            `const cjs_require = typeof globalThis.brequire !== 'undefined' ? brequire : require;`);

        mode === 'es6' && sourcemap.concat('const es6_import = module => import(module);');
    }

    // Create the bundle object
    if (!kernel && !standalone) {
        if (transversal && filtered.length) {
            sourcemap.concat('bundle.dependencies.update(dependencies);');
        }
        else if (!transversal) {
            const params = `'${bundle.resource}', ${bundle.multilanguage}, ${JSON.stringify(specs)}` +
                (dependencies.size ? ', dependencies' : '');

            sourcemap.concat(`const {beyond} = globalThis;`);
            sourcemap.concat(`const bundle = beyond.bundles.obtain(${params});`);

            if (application.engine === 'legacy') {
                sourcemap.concat('const {container} = bundle;');
                sourcemap.concat(`const module = container.is === 'module' ? container : void 0;`);
            }

            sourcemap.concat(`const __pkg = bundle.package(${bundle.multilanguage ? `'${language}'` : ''});`);
        }
    }
    else if (kernel) {
        sourcemap.concat('let __pkg = {exports: {}};');
    }

    // Only required for .jsx legacy processor support
    if (processors.has('jsx')) {
        sourcemap.concat(`const React = dependencies.get('react');`);
        sourcemap.concat(`const ReactDOM = dependencies.get('react-dom');`);
    }

    // Process the scripts code of each processor
    processors.forEach(processor => require('./script')(processor, sourcemap, transversal, mode));

    sourcemap.concat('const modules = new Map();\n');

    // Process the ims code of each processor
    processors.forEach(processor => require('./ims')(processor, sourcemap));

    // Process the exports
    require('./exports')(packager, hmr, kernel, sourcemap, transversal);

    if (kernel) {
        sourcemap.concat('const __bp = {};');
        sourcemap.concat(`modules.get('./base/package').creator(() => 0, __bp);`);
        sourcemap.concat('__pkg = new __bp.BeyondPackage(__pkg.exports);');
    }

    // Initialise package
    const initialisation = require('./initialisation')(packager, hmr);
    initialisation && sourcemap.concat(initialisation);

    return sourcemap;
}
