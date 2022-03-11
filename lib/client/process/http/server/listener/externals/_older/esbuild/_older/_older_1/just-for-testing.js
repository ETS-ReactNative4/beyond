const p = require('path');

module.exports = async function (pkg, subpath, application, json, distribution) {
    const {version} = json;
    const sp = subpath ? `/${subpath}.js` : '.js';
    const paths = {
        sources: p.join(application.path, '.beyond/packages'),
        source: {relative: `${pkg}${sp}`},
        cache: p.join(process.cwd(), '.beyond/packages', `${pkg}.${version}${sp}`)
    }
    paths.source.fullpath = p.join(paths.sources, paths.source.relative);

    const files = [
        'vue-test.mjs',
        'svelte-test.mjs',
        'react-test.mjs',
        'firebase-test.mjs',
        'swiper-test.mjs',
    ];

    const selected = files[0];

    const path = require('path');
    const source = path.join('source', selected);
    const target = path.join('.dist', selected);

    const build = () => {
        return require('esbuild').buildSync({
            entryPoints: ['source/vue-test.mjs'],
            absWorkingDir: paths.sources,
            treeShaking: false,
            bundle: true,
            metafile: true,
            format: 'esm',
            outfile: paths.cache,
            external: ['svelte/internal']
        });
    }

    const result = build();
    console.log('metafile', result.metafile);

// console.log('metafile', result.metafile.inputs['source/vue-test.js'].imports);
// console.log('metafile', result.metafile.inputs['node_modules/vue/dist/vue.runtime.esm-bundler.js'].imports);
}