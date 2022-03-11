module.exports = function (code, map, extname) {
    if (!code) return '';
    if (!map.sources.length && !map.names.length) return code;

    const convert = require('convert-source-map');

    const options = extname === '.css' ? {multiline: true} : void 0;
    const inline = convert.fromObject(map).toComment(options);
    return code + '\n' + inline;
}
