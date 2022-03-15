export class ApplicationBuilder extends ReactiveModel {
    #id;
    #required = ['name', 'type']
    #ports = {
        inspectPort: ['node', 'backend', 'express', 'web-backend', 'library'],
        navigate: ['web-backend', 'web', 'library', 'react', 'vue', 'svelte'],
    }
    #created;
    #backendPort;

    get created() {
        return this.#created;
    }

    set created(value) {

        if (value === this.#created || typeof value !== 'boolean') return;
        this.#created = value;
        this.triggerEvent();
    }

    #description;
    get description() {
        return this.#description;
    }

    set description(value) {
        if (value === this.#description || typeof value !== 'string') return;
        this.#description = value;
        this.triggerEvent();
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (value === this.#id || typeof value !== 'string') return;
        this.triggerEvent();
    }

    #is;
    get is() {
        return this.#is;
    }

    set is(value) {
        if (value === this.#is || !['template', 'type'].includes(value)) return;
        this.#is = value;
        this.triggerEvent();
    }

    #identifier;
    get identifier() {
        return this.#identifier;
    }

    set identifier(value) {
        if (value === this.#identifier || typeof value !== 'string') return;
        this.#identifier = value;
        this.triggerEvent();
    }

    #inspectPort = 4070;
    get inspectPort() {
        return this.#inspectPort;
    }

    set inspectPort(value) {
        if (value === this.#inspectPort || value !== '' && isNaN(parseInt(value))) return;
        this.#inspectPort = value === '' ? value : parseInt(value);
        this.triggerEvent();
    }

    get getters() {
        return {
            id: this.id,
            navigatePort: this.navigatePort,
            inspectPort: this.inspectPort,
            type: this.type,
            name: this.name,
            scope: this.scope,
            title: this.title,
            version: this.version,
            created: this.created,
            platforms: this.platforms,
            processed: this.processed,
            processing: this.processing,
            description: this.description,
        }
    }

    #name;
    get name() {
        return this.#name;
    }

    set name(value) {
        if (this.#name === value) return;
        this.#name = value;
        this.triggerEvent();
    }

    get platforms() {
        if (!this.is) return;
        const items = this.is === 'template' ? this.templates : this.TYPES;
        const {platforms} = items.find(item => item.name === this.type);

        const data = platforms.map(item => {
            let platform = {platform: item};
            if (item === 'web') {
                platform.port = this.navigatePort;

                return platform;
            }

            if (this.useInspectPort) {
                platform.inspectPort = this.inspectPort
                platform.port = this.#backendPort
            }
            return platform;
        });
        const index = data.findIndex(item => item.platform === 'web');
        if (index >= 0) data[index].default = true;
        else data[0].default = true;

        return data;
    }

    #navigatePort = 4080;
    get navigatePort() {
        return this.#navigatePort;
    }

    set navigatePort(value) {
        if (value === this.#navigatePort || value !== '' && isNaN(parseInt(value))) return;
        this.#navigatePort = value === '' ? value : parseInt(value);
        this.triggerEvent();
    }

    #ready;
    get ready() {
        return this.#ready;
    }

    #scope;
    get scope() {
        return this.#scope;
    }

    set scope(value) {
        if (value === this.#scope || typeof value !== 'string') return;
        this.#scope = value;
        this.triggerEvent();
    }

    get templates() {
        return [
            {name: "react", platforms: ['web']},
            {name: "vue", platforms: ['web']},
            {name: "svelte", platforms: ['web']},
            // {name: "board", platforms: ['web']},
            {name: "express", platforms: ['backend']},
            {name: "web-backend", platforms: ['web', 'backend']}
        ];
    }

    #title;
    get title() {
        return this.#title;
    }

    set title(value) {
        if (value === this.#title || typeof value !== 'string') return;
        this.#title = value;
        this.triggerEvent();
    }

    #TYPES = [
        {name: "web", platforms: ['web']},
        {name: "node", platforms: ['backend']},
        {name: "backend", platforms: ['backend']},
        {name: "library", platforms: ['web']},
    ];
    get TYPES() {
        return this.#TYPES;
    }

    #type;
    get type() {
        return this.#type;
    }

    set type(value) {
        if (value === this.#type || typeof value !== 'string') return;
        this.#type = value;
        if (this.#ports.navigate.includes(value)) {
            this.checkPort('inspect').catch(exc => console.error(exc.stack));
        }
        if (this.#ports.inspectPort.includes(value)) {
            this.checkPort('inspect').catch(exc => console.error(exc.stack));
        }
        this.triggerEvent();
    }

    get useInspectPort() {
        return this.#ports.inspectPort.includes(this.type);
    }

    get useNavigatePort() {
        return this.#ports.navigate.includes(this.type);
    }

    get version() {
        return 1;
    }

    /**
     * indicates if the object data is valid
     * @returns {boolean}
     */
    get valid() {
        let invalid = !!this.#required.find(field => !this[field])
        if (invalid) return false;
        if (this.useInspectPort && !this.inspectPort) return false;
        return !(this.useNavigatePort && !this.navigatePort);
    }

    constructor() {
        super();
        this.create = () => create(this);
        this.checkPort = port => checkPort(this, port)
        this.getInitialPorts().catch(exc => console.error(exc.stack));
    }

    clean() {
        this.getInitialPort().catch(exc => console.error(exc.stack));
        this.created = false;
        this.title = undefined;
        this.description = undefined;
        this.identifier = undefined;
        this.error = undefined;
    }

    async getInitialPorts() {
        try {
            this.inspectPort = await this.getInitialPort();
            this.#backendPort = await this.getInitialPort();
            this.navigatePort = await this.getInitialPort();
            this.#ready = true;
        }
        catch (exc) {
            console.error(exc.stack);
        }
    }

    #startPort = 8080;

    async getInitialPort(inspect = false) {
        let cont = 0;
        let port = this.#startPort;
        const field = inspect ? this.#inspectPort : this.#navigatePort;
        while (cont < 5 || field) {
            if (await this.checkPort(port)) {
                inspect ? this.#inspectPort = port : this.#navigatePort = port;
                break;
            }
            port = port - 100;
            cont++;
        }
        this.#startPort = port - 100;
        return port;
    }

}

