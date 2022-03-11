module.exports = function (pkg, subpath, application) {
    const {errors, path, json} = require('./find')(pkg, application);
    if (errors) return {errors};

    if (!path) return {resource: new global.Resource({'404': `Package "${pkg}" not found`})};
    const uimport = !!json.uimport;
    if (!subpath || !uimport) return {uimport, path, json};

    if (json.static?.hasOwnProperty(`./${subpath}`)) {
        const file = require('path').join(path, json.static[`./${subpath}`]);
        return {resource: new global.Resource({file})};
    }

    const {exports} = json;
    if (!exports?.hasOwnProperty(`./${subpath}`)) {
        return {errors: [`External does not exports subpath "./${subpath}"`]};
    }

    return {uimport, path, json: json.exports[`./${subpath}`]};
}
