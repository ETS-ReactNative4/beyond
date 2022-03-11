const fs = require('fs').promises;

module.exports = async function (pkg, subpath, paths) {
    const from = subpath ? `${pkg}/${subpath}` : pkg;

    let source = '';
    // source += `import def from '${from}';\n`;
    source += `import * as exports from '${from}';\n`;
    // source += `export default def;\n`;
    source += `export {exports};`;

    await fs.mkdir(require('path').dirname(paths.source.fullpath), {recursive: true});
    await fs.writeFile(paths.source.fullpath, source, 'utf8');

    let bundle, warnings;
    try {
        const result = await require('esbuild').build({
            entryPoints: [paths.source.relative],
            absWorkingDir: paths.sources,
            treeShaking: false,
            sourcemap: 'external',
            bundle: true,
            format: 'esm',
            metafile: true,
            outfile: paths.cache,
            external: []
        });
        let errors;
        ({errors, warnings} = result);
        if (errors?.length) return {errors, warnings}

        console.log(result, paths.sources, paths.source.relative);

        bundle = await fs.readFile(paths.cache, 'utf8');
    }
    catch (exc) {
        return {errors: [exc.message]};
    }

    // Convert to amd format
    const amd = require('./amd')({code: bundle});
    return {content: amd.code, warnings};
}
