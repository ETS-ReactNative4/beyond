const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.packager.code';
    }

    get id() {
        return this.#packager.id;
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #extname;
    get extname() {
        return this.#extname;
    }

    #hash;
    #cache;

    #errors;
    get errors() {
        this.__update();
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    #processorsCount;
    get processorsCount() {
        this.__update();
        return this.#processorsCount;
    }

    #sourcemaps = {};

    code(hmr) {
        this.__update(hmr);
        return this.#sourcemaps[hmr ? 'hmr' : 'code']?.code;
    }

    map(hmr) {
        this.__update(hmr);
        return this.#sourcemaps[hmr ? 'hmr' : 'code']?.map;
    }

    constructor(extname, packager) {
        if (!['.js', '.css'].includes(extname)) throw new Error('Invalid parameters');

        super();
        this.#extname = extname;
        this.#packager = packager;
        this.#cache = new (require('./cache'))(this);
        super.setup(new Map([['hash', {child: packager.hash}]]));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        cached && this.hydrate(cached);

        await this.#packager.initialise();
        await super.initialise();
        this.#initialising = false;
    }

    get updated() {
        const hash = this.children.get('hash').child;
        return hash.value === this.#hash;
    }

    _prepared(check) {
        if (this.updated) return true;

        const ext = this.#extname === '.js' ? 'js' : 'css';

        // When the code was returned from cache, and the processors and imports were not registered as a child
        if (!this.children.has('processors')) {
            const packager = this.#packager;
            const children = new Map();

            const events = [`${ext}.initialised`, `${ext}.change`];
            children.set('processors', {child: packager.processors, events});
            this.children.register(children, false);
        }

        const processors = this.children.get('processors').child;
        if (!check(processors)) return false;

        let prepared = true;
        processors.forEach(({packager}) => {
            if (!packager?.[ext]) return;
            prepared = prepared && check(packager[ext]);
        });
        return prepared;
    }

    _process() {
        if (this.updated && !this.#sourcemaps.code && !this.#sourcemaps.hmr && !this.#errors?.length) {
            throw new Error('Sourcemap or errors should be defined');
        }

        if (this.updated) return false;
        this.#hash = this.#errors = undefined;
        this.#sourcemaps = {};
    }

    // This method is overwritten by the js and css code processors
    _update(hmr) {
        void (hmr);
        throw new Error('This method must be overridden');
    }

    __update(hmr) {
        let sourcemap = hmr ? this.#sourcemaps.hmr : this.#sourcemaps.code;
        if (sourcemap || this.#errors?.length) return; // Already processed
        if (!this.processed) {
            throw new Error('Processor is not ready. Wait for the .ready property before accessing its state.');
        }

        const done = ({sourcemap, errors}) => {
            this.#hash = this.children.get('hash').child.value;
            this.#sourcemaps[hmr ? 'hmr' : 'code'] = sourcemap;
            this.#errors = errors ? errors : [];

            // Save the code into cache
            !hmr && this.#cache.save();
        }

        if (hmr && !this.children.has('processors')) {
            const message = 'HMR code or map cannot be requested if the processor is up-to-date ' +
                'and it has been previously obtained from cache';
            const sourcemap = new global.SourceMap();
            sourcemap.concat(`// ${message}`);
            return done({sourcemap});
        }

        let processors = this.children.get('processors').child;

        // Filter the processors that implement the corresponding code extension (.js or .css)
        const ext = this.#extname === '.js' ? 'js' : 'css';

        // Check if any of the processors is not in a valid state
        let errors = [];
        let count = this.#processorsCount = 0;
        for (const [name, {packager}] of processors) {
            if (!packager) continue;
            if (!packager[ext]) continue; // Packager does not support the extname of the bundle being processed

            // Legacy processors "scss" and "less" injects the css code in the .js bundle, not .css bundle is supported
            if (['scss', 'less'].includes(name) && this.#extname === '.css') continue;

            count++;
            !packager[ext].valid && errors.push(`Processor "${name}" has been compiled with errors.`);
        }

        this.#processorsCount = count;
        if (errors.length) return done({errors});

        // Update the code
        ({sourcemap, errors} = this._update(hmr));
        if (sourcemap && errors?.length) throw new Error('Only sourcemap or errors should be returned from processor code');
        if (!sourcemap && !errors?.length) throw new Error('Processor code packager should return a sourcemap or errors');

        done({sourcemap, errors});
    }

    hydrate(cached) {
        const {hash, sourcemap, processorsCount, errors} = cached;
        this.#hash = hash;
        this.#sourcemaps.code = sourcemap;
        this.#processorsCount = processorsCount;
        this.#errors = errors;
    }

    toJSON() {
        const hash = this.#hash;
        const sourcemap = (() => {
            if (!this.#sourcemaps.code) return;
            const {code, map} = this.#sourcemaps.code;
            return {code, map};
        })();

        const errors = this.#errors;
        const processorsCount = this.#processorsCount;
        return {hash, sourcemap, processorsCount, errors}
    }
}
