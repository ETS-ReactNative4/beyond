const {PathnameParser} = global;

module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async get(applicationId, resources, distribution) {
        if (!distribution.local) throw new Error('Distribution is invalid, .local property should be true');

        resources = typeof resources === 'string' ? [resources] : resources;
        if (!(resources instanceof Array)) throw new Error('Invalid parameters');

        const application = await require('../application')(this.#model.core, applicationId);
        await application.transversals.ready;

        const promises = new Map();
        const process = async resource => {
            const pathname = (() => {
                // Check if resource is a transversal,
                // in which case, the pathname is just the name of the traversal
                if (application.transversals.has(resource)) return `/${resource}.js`;

                // Check if it is an application package,
                // where the pathname does not include the /packages folder
                const pkg = application.package;
                const appPackage = resource === pkg || resource.startsWith(`${pkg}/`);
                if (appPackage) return `${resource.substr(pkg.length)}.js`;

                // Any other bundle must be in the /packages folder
                return `/packages/${resource}.js`;
            })();

            const parsed = new PathnameParser(application, pathname);
            await parsed.process();
            if (parsed.error) return {error: parsed.error};

            const {error, transversal, bundle} = await parsed.find(distribution);
            if (error) return {error};

            switch (parsed.is) {
                case 'bundle':
                case 'hmr':
                    return await require('./bundle')('bundle', bundle, distribution, parsed);
                case 'transversal':
                    return await require('./bundle')('transversal', transversal, distribution, parsed);
            }
        }
        resources.forEach(resource => promises.set(resource, process(resource)));

        try {
            await Promise.all([...promises.values()]);
        }
        catch (exc) {
            console.error(exc.stack);
            return [];
        }

        const output = new Map();
        for (const [id, bundle] of promises) {
            output.set(id, await bundle);
        }

        return [...output];
    }
}
