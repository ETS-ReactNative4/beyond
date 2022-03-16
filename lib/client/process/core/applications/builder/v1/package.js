const {fs} = global.utils;
module.exports = async function (modules, builder, paths, staticEntries, npm) {
    const exported = {'./actions.specs.json': './actions.specs.json'};

    const promises = [];
    modules.exported.forEach((bundle, exp) => {
        if (!npm) {
            exported[`./${exp}`] = `./${exp}.js`
            return;
        }

        exported[`./${exp}`] = {
            types: `./${exp}/${bundle}.d.ts`, amd: `./${exp}/${bundle}.amd.js`,
            import: `./${exp}/${bundle}.mjs`, module: `./${exp}/${bundle}.mjs`,
            require: `./${exp}/${bundle}.cjs.js`
        };
        const entry = {
            types: `./${bundle}.d.ts`, amd: `./${bundle}.amd.js`,
            import: `./${bundle}.mjs`, module: `./${bundle}.mjs`, require: `./${bundle}.cjs.js`
        };

        const path = require('path').join(paths.www, exp, 'package.json');
        promises.push(fs.save(path, JSON.stringify(entry, null, 2)));
    });
    await Promise.all(promises);

    const items = {};
    const cleanEntry = entry => {
        const i = entry.split('.');
        return i.slice(0, i.length - 1).join('.');
    };
    for (const entry of Object.values(staticEntries)) {
        entry.forEach(i => items[cleanEntry(i)] = i);
    }

    const dependencies = {"socket.io-client": "^4.4.1"};
    const {application: {name, scope, description, version, author, license}} = builder;
    const pJson = {
        name: `@${scope}/${name}`, author: author,
        version: version, description: description, license: license,
        keywords: [], uimport: true, static: items,
        exports: exported, dependencies: dependencies
    };

    const target = require('path').join(paths.www, 'package.json');
    await fs.save(target, JSON.stringify(pJson, null, 2));
}