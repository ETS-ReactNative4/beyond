const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.template.global.processor';
    }

    #distribution;
    #language;

    #instance;
    get instance() {
        return this.#instance;
    }

    #valid;
    get valid() {
        return this.#valid;
    }

    constructor(config, distribution, language) {
        super();
        this.#distribution = distribution;
        this.#language = language;
        super.setup(new Map([
            ['config', {child: config}],
            ['global.processors', {child: global.processors}]
        ]));
    }

    _process() {
        const config = this.children.get('config').child;
        this.#valid = config.valid;
        if (!config.valid) {
            this.#instance?.destroy();
            this.#instance = undefined;
            return;
        }

        const {path, value} = config;
        if (value?.processor === this.#instance?.name) {
            this.#instance?.configure(value);
            return;
        }

        this.#instance?.destroy();
        if (!value?.processor) {
            this.#instance = undefined;
            return;
        }

        const Processor = global.processors.get(value.processor).Packager;
        this.#instance = new Processor({
            watcher: config.application.watcher,
            bundle: {
                path: path,
                id: 'template//application',
                name: 'template/styles',
                container: {is: 'application'}
            },
            distribution: this.#distribution,
            language: this.#language,
            application: config.application
        });
        this.#instance.configure(value);
    }
}