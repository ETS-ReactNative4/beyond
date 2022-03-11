module.exports = function (bundle, inputs, application) {
    const externals = new Map();
    const dependencies = new Map();
    const root = `node_modules/${bundle}/`;

    [...Object.keys(inputs)].forEach(input => {
        if (!input.includes('node_modules/') || input.includes(root)) return;
        const {errors, solved} = require('../dependencies/find')(input, application);

        // Who imports the input dependency
        const importers = (() => {
            const importers = new Set();
            Object.entries(inputs).forEach(([importer, {imports}]) => {
                imports = imports.map(({path}) => path);
                imports.includes(input) && importers.add(importer);
            });
            return importers;
        })();

        const exclude = !errors?.length ? `./node_modules/${solved}/*` : void 0;
        dependencies.set(input, {errors, solved, exclude, importers});
        !errors?.length && externals.set(solved, exclude);
    });

    // Solve the dependencies that were not found as external dependencies
    // In this case they are internal modules of a bundle
    dependencies.forEach((data, dependency) => {
        if (!data.errors) return;

        const recursivelyLookForRoot = (input, data) => {
            if (!data.errors) return {input, data};

            // To access the root, any of the importers can be taken
            const parent = [...data.importers][0];
            if (!dependencies.has(parent)) {
                return {errors: [`Parent importer of "${input}" not found on dependency "${dependency}"`]};
            }
            return recursivelyLookForRoot(parent, dependencies.get(parent));
        }

        dependencies.get(dependency).root = recursivelyLookForRoot(dependency, data);
    });

    // Look for errors in dependencies
    const errors = [];
    dependencies.forEach((data, dependency) => {
        if (data.errors?.length && (!data.root || data.root.errors?.length)) {
            errors.push(`Dependency "${dependency}" cannot be solved`);
        }
    });

    return errors.length ? {errors} : {externals, dependencies};
}
