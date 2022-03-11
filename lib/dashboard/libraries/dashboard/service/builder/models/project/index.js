const Deployment = require('./deployment');
module.exports = class Project extends require('../file-manager') {
    _id;
    _version = 1;
    _port;
    _imprimir = true;
    /**
     * @deprecated
     * @type {string}
     * @private
     */
    _fileName = 'project.json';
    #basename = 'project.json';

    _templates = {
        node: './projects/node',
        backend: './projects/backend',
        library: './projects/library',
        web: './projects/web',
        react: './projects/react',
        board: './projects/board',
        express: './projects/express',
        'web-backend': './projects/web-backend',
        empty: './projects/empty'
    };

    skeleton = [
        'version',
        'scope', 'name', 'title', 'description',
        'layout', 'template', 'languages', 'params',
        {name: 'modules', type: 'object'},
        {name: 'backend', type: 'object'},
        {name: 'node', type: 'object'},
        {name: 'ssr', type: 'object'},
        {name: 'externals', type: 'object'},
        'deployment', 'static'
    ];

    #params;
    get params() {
        return this.#params.structure;
    }

    set params(value) {
        this.#params.set(value);
    }

    get id() {
        return this._id;
    }

    relativePath() {
        return `${this.id}/${this._fileName}`;
    }

    #modules;
    get modules() {
        return this.#modules.structure;
    }

    set modules(data) {
        this.#modules.set(data);
    }

    #languages;
    get languages() {
        return this.#languages.structure;
    }

    set languages(data) {
        this.#languages.set(data);
    }

    get modulesObject() {
        return this.#modules;
    }

    #deployment;
    get deployment() {
        return this.#deployment.structure;
    }

    set deployment(data) {
        this.#deployment.set(data);
    }

    /**
     * @returns {string|*}
     */
    get modulesPath() {
        return this.#modules.file.file;
    }

    get path() {
        return this.file?.file;
    }

    constructor(path, specs = undefined) {
        super(path, 'project.json');
        // this.#backend = new Service(path, this);

        this.#languages = new (require('./languages'))();
        this.#deployment = new Deployment(this.file.dirname);
        this.#params = new (require('./params'))();
        this.#modules = new (require('./modules'))(path, '');
        this._load();
        /**
         * support to validate if the project.json does not has a module entry property
         */
        if (!this.file.json?.module) {
            this.#modules.setDefault();
        }
        this._checkProperties(specs);
    }

    load = this._load;

    _setId(name) {
        return this._id = name.replace(/ /g, '-').toLowerCase();
    }

    async create(type, specs) {
        const fs = global.utils.fs;
        if (!type) {
            throw 'The type of project was not specified';
        }

        const folder = this._setId(specs.name)
        if (!folder) throw Error('The project instance requires a name');

        if (!this._templates.hasOwnProperty(type)) {
            /**
             * @TODO: @julio check with felix and box
             */
            throw `Does not exist a ${type} template`;
        }

        if (await fs.exists(this.file.dirname)) {
            throw `The application is already exists in ${this.path}`;
        }

        const tplPath = await this.templatesPath();
        const current = require('path').resolve(tplPath, this._templates[type]);

        await fs.copy(current, this.file.dirname);

        await this._load();

        this.#deployment.addPlatforms(specs.platforms);

        this.save(specs);
        await this.readFiles(specs);
        return this.install();
    }

    install() {
        return new Promise((resolve, reject) => {
            const {exec} = require('child_process');
            exec('npm install', {
                cwd: this.file.dirname
            }, (error, stdout, stderr) => {
                if (error) {
                    console.log("error", error);
                }
                if (stderr) {
                    console.log("stderr", stderr);
                }
                resolve();
            });
        })
    }

    save(values = {}) {
        const json = {deployment: this.#deployment.getProperties()};

        super.save({...values, ...json});
    }

    set(object) {

    }

    setDistribution = distribution => this.#deployment.setDistribution(distribution);

    async readFiles(specs, dirname) {
        const {readdir, save, promises} = global.utils.fs;

        dirname = dirname ?? this.file.dirname
        const files = await readdir(dirname);

        let items = [];
        let filenames = [];
        files.forEach(file => {
            if (file === 'project.json') return;

            const filename = `${dirname}\\${file}`;
            if (!filename.includes('.')) {
                //is directory
                this.readFiles(specs, filename)
                return;
            }
            filenames.push(filename);
            items.push(promises.readFile(filename, {encoding: 'utf-8'}));
        });

        items.size = 0;
        const contents = await Promise.all(items);
        contents.forEach((content, index) => {
            content = content.replace(/\$\[scope]/gm, specs.scope ? `@${specs.scope}/` : ``);
            content = content.replace(/\$\[name]/gm, specs.name);
            items.push(save(filenames[index], content, 'utf-8'))
        });

        await Promise.all(items);
    }
}
