module.exports = async function (application, distribution, transversal, resource, info) {
    'use strict';

    if (resource.extname !== '.js') {
        return new global.Resource({'404': `Resource extension "${resource.extname}" is invalid`});
    }

    await transversal.ready;

    const check = resource.checkLanguage(transversal.multilanguage);
    if (check.error) return new global.Resource({'404': check.error});

    const tp = transversal.packagers.get(distribution, resource.language);
    await tp.ready;

    const {js} = tp;
    await js.ready;

    if (info) {
        return js.valid ?
            new global.Resource({content: 'Bundle is not reporting any errors or warnings', extname: '.html'}) :
            new global.Resource({'500': await require('./info')(tp), extname: '.html'});
    }
    else {
        return js.valid ?
            new global.Resource({
                content: js.code ? require('../sourcemap')(js.code(), js.map(), resource.extname) : '',
                extname: resource.extname
            }) :
            new global.Resource({'500': 'Bundle compiled with errors'});
    }
}
