const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

/**
 * Transforms the esbuild imports to global imports
 * Ex: node_modules/svelte/internal/internal.js => svelte/internal
 */
module.exports = function (code, dependencies) {
    let ast;
    try {
        ast = parse(code);
    }
    catch (exc) {
        return {errors: [exc.message]};
    }

    const errors = [];
    traverse(ast, {
        CallExpression({node}) {
            if (node.callee.name !== 'require') return;
            const required = node.arguments[0];

            const input = `node_modules/${required.value.split('node_modules/')[1]}`;
            if (!dependencies.has(input)) {
                errors.push(`Dependency "${input}" cannot be solved`);
                return;
            }

            const dependency = dependencies.get(input);
            required.value = dependency.solved ? dependency.solved : dependency.root.data.solved;
        }
    });

    try {
        code = generate(ast, code).code;
    }
    catch (exc) {
        return {errors: [exc.message]};
    }

    return errors.length ? {errors} : {code};
}
