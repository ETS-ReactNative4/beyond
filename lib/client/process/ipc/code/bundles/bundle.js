module.exports = async function (is, bundle, distribution, resource) {
    // Check language
    const {multilanguage} = bundle;
    const check = resource.checkLanguage(multilanguage);
    if (check.error) return {errors: [check.error]};

    // Getting the packager
    const {language} = resource;
    const packager = bundle.packagers.get(distribution, language);

    await packager.dependencies.ready;

    const promises = [];
    packager.dependencies.forEach(dependency => promises.push(dependency.ready));
    await Promise.all(promises);

    const dependencies = [...packager.dependencies]
        .filter(([, {is}]) => is.has('import'))
        .map(([resource, {kind}]) => ({resource, kind}));

    const {js} = packager;
    await js.ready;

    const {valid, errors} = js;
    const hmr = resource.is === 'hmr';
    const code = valid ? js.code(hmr) : void 0;
    const map = valid ? js.map(hmr) : void 0;
    return valid ? {is, code, map, dependencies} : {errors};
}
