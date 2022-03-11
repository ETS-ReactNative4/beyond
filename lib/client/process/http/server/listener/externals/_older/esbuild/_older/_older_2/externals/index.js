module.exports = function (bundle, inputs, application) {
    const externals = new Map();
    const root = `node_modules/${bundle}/`;
    const errors = [];

    [...Object.keys(inputs)].forEach(input => {
        if (!input.includes('node_modules/') || input.includes(root)) return;
        const {errors: e, solved} = require('../dependencies/find')(input, application);
        e?.forEach(error => errors.push(error));
        if (e) return;

        externals.set(solved, `./node_modules/${solved}/*`);
    });

    return errors.length ? {errors} : {externals};
}
