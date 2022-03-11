module.exports = class extends require('../base') {
    get dp() {
        return 'bundler.bundle.packager.code.css';
    }

    constructor(packager) {
        super('.css', packager);
    }

    // Actually, the code of the css bundle and its hmr is the same, so avoid to duplicate
    // the processing of the bundle when it is hmr required
    #sourcemap;

    _update() {
        const sourcemap = new global.SourceMap();
        const {processors} = this.packager;

        // Process the code of each processor
        processors.forEach(processor => {
            const {packager} = processor;
            if (!packager || !packager.css) return;

            let {code} = packager.css;
            if (!code) return;

            code = typeof code === 'string' ? {code} : code;
            if (!code.code) return;

            sourcemap.concat(code.code, void 0, code.map);
            sourcemap.concat('\n');
        });

        this.#sourcemap = sourcemap;
        return {sourcemap};
    }

    _process() {
        !super.updated && (this.#sourcemap = void 0);
        super._process();
    }
}
