const {PathnameParser} = global;
const qs = require('querystring');

module.exports = async function (url, application, distribution) {
    'use strict';

    if (url.pathname.includes('/static/')) return;

    const parsed = new PathnameParser(application, url.pathname);
    await parsed.process();

    if (parsed.error) return new global.Resource({'404': parsed.error});
    if (!['.d.ts', '.js', '.css'].includes(parsed.extname) || !parsed.is) return;

    const {error, transversal, bundle} = await parsed.find(distribution);
    if (error) return new global.Resource({'404': error});

    const info = qs.parse(url.query).info !== undefined;

    switch (parsed.is) {
        case 'transversal':
            return await require('./transversals')(application, distribution, transversal, parsed, info);
        case 'hmr':
        case 'bundle':
            return await require('./bundle')(application, distribution, bundle, parsed, info);
    }
}
