const ts = require('typescript');

module.exports = function (compiler) {
    // Create typescript sources from the compiler declaration files
    const tsSources = new Map();
    compiler.files.forEach(compiled => {
        const module = compiled.relative.file.replace('.ts', '.d.ts');
        if (!compiled.declaration) {
            throw new Error(`Declaration of "${compiled.relative.file}" is undefined`);
        }

        const source = ts.createSourceFile(module, compiled.declaration);
        tsSources.set(module, source);
    });

    // Transform the imports
    const imports = new (require('./imports'))(tsSources, compiler.files);

    // Transform the declarations code of each module into their corresponding namespaces
    require('./namespaces')(tsSources);

    let output = '';

    imports.dependencies.forEach((name, module) => {
        output += ['react', 'react-dom'].includes(module) ?
            `import ${name} from '${module}';\n` :
            `import * as ${name} from '${module}';\n`;
    });
    imports.dependencies.size ? (output += '\n') : null;

    const printer = ts.createPrinter();
    tsSources.forEach((source, file) => {
        const code = printer.printFile(source);
        if (!code) return;

        output += `// FILE: ${file}\n`;
        output += code;
        output += '\n';
    });

    return output;
}