const esbuild = require('esbuild');
const fs = require('fs').promises;

module.exports = async function (bundle, pkg, subpath, paths, application) {
    await fs.mkdir(paths.source.dirname, {recursive: true});
    await fs.writeFile(
        paths.source.fullpath,
        `module.exports = require('${bundle}');`, 'utf8'
    );

    const {metafile} = esbuild.buildSync({
        entryPoints: [paths.source.fullpath],
        bundle: true,
        metafile: true,
        format: 'cjs',
        write: false,
        treeShaking: false
    });

    const {inputs} = metafile;
    let errors, externals;
    ({externals, errors} = require('./externals')(bundle, inputs, application));
    if (errors) return {errors};

    const {outputFiles} = esbuild.buildSync({
        entryPoints: [paths.input],
        outfile: paths.output,
        bundle: true,
        metafile: true,
        format: 'cjs',
        write: false,
        external: [...externals.values()],
        treeShaking: false
    });

    const packaged = outputFiles[0].text;

    // Transform the dependencies
    // Ex: node_modules/svelte/internal/internal.js => svelte/internal
    let code;
    ({code, errors} = require('./dependencies/transform')(packaged, application));
    if (errors?.length) return {errors};

    // Expose as an AMD module
    code = require('./amd')(code, externals);

    return {code};
}
