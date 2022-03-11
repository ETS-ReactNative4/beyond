const toHtml = new (require('ansi-to-html'));

/**
 * Convert from ES6 module to an AMD module
 *
 * @param sourcemap
 * @return {{errors: string[]}|{code: string, map: object}}
 */
module.exports = function (sourcemap) {
    'use strict';

    let output;
    try {
        output = require('@babel/core').transform(sourcemap.code, {
            cwd: __dirname,
            sourceMaps: true,
            inputSourceMap: sourcemap.map,
            compact: false,
            plugins: [['@babel/plugin-transform-modules-amd', {importInterop: 'none'}]]
        });
    }
    catch (exc) {
        let message = toHtml.toHtml(exc.message);
        message = message.replace(/\n/g, '<br/>');
        message = `<div style="background: #333; color: white;">${message}</div>`;
        message = `Error transforming to AMD module: <br/><br/>${message}`;
        return {errors: [message]};
    }

    return {code: output.code, map: output.map};
}
