class Panel extends ReactiveModel {

    /**
     * Represents the active tab
     * @private
     */
    #activeItem;
    get activeItem() {
        return this.#activeItem;
    }

    /**
     *
     * @private
     */
    #boards;
    get boards() {
        return this.#boards;
    }

    #editor;
    get editor() {
        return this.#editor;
    }

    #id;
    get id() {
        return this.#id;
    }

    set id(value) {
        if (this.id === value) return;
        this.#id = value;
    }

    _name;
    get name() {
        return this._name;
    }

    /**
     * The panels manager
     * @private
     */
    _parent;
    get parent() {
        return this._parent;
    }

    _source;
    #editorManager;
    #tabs = new Map();
    get tabs() {
        return this.#tabs;
    }

    _type;
    get type() {
        return this._type;
    }

    #store;

    get workspace() {
        return this._parent.workspace;
    }

    constructor(parent, id, boardsOpened = []) {
        super();
        this.#id = id;
        this._parent = parent;
        this.#boards = parent.boards;
        window.panel = this;
        this.#load();
        if (boardsOpened) {
            boardsOpened.forEach(board => this.openBoard(board));
        }
    }

    async #load() {
        await DSModel.initialise();
        this.#store = DSModel.db.store('panels');
    }

    /**
     *
     * @param type
     * @param application
     */
    createEditor(application, type) {
        const manager = getEditorManager(application);
        this.#editorManager = manager;
        this.#editor = manager.create({
            type,
            application, // the PLM object of application, not the manager
            id: `editor-panel-${this.id}`,
        });
        this.triggerEvent();
    }

    getData() {

        const tabs = Array.from(this.#tabs.values()).map(item => {
            let data = {...item};
            delete data.control;
            delete data.source;
            return data;
        });

        return {
            id: this.id,
            tabs,
            active: this.#activeItem
        }
    }

    async openBoard(board) {
        if (board?.type !== 'editor') {
            this.add(board.name, board.specs);
            return;
        }

        const application = await applicationsFactory.get(board.applicationId);
        const module = await application.moduleManager.load(board.moduleId);
        const source = await module.sources.get(board.sourceId);
        const {type, path, processor} = board;
        if (!source) {
            console.warn(`the source ${board.sourceId} was not found`);
            return;
        }

        await this.openFile({
            type,
            source,
            path,
            module,
            processor,
            applicationId: board.applicationId,
            application: application.application
        });
    }

    /**
     * Open a source in a new tab into a monaco editor instance
     *
     * @param specs.path
     * @param specs.source
     * @param specs.processor
     * @param specs.module
     * @param specs.application
     * @param specs.position
     * @param specs.type
     */
    async openFile(specs) {

        let {source, path, processor, applicationId, moduleId, module, type} = specs;

        this.#activeItem = path;
        if (!module && !moduleId) {
            throw new Error('The file requires the module or moduleId parameter');
        }
        const app = await applicationsFactory.get(applicationId);
        /**
         * TODO: @julio unify the way to get parameters in the function and simplify it.
         *
         * @type {*}
         */
        module = module ?? await app.moduleManager.load(moduleId);

        if (!this.editor) await this.createEditor(app.application, type);

        this.editor.addFile({type, processor, source, module, active: true});

        if (!source) {
            console.trace("no se obtiene el source", source);
        }
        const tabSpecs = {
            sourceType: type,
            label: source.filename,
            id: source.filename,
            sourceId: source.id,
            type: 'editor',
            processor,
            moduleId: module.id,
            applicationId: app.application.id,
            source,
            path
        }
        if (type === 'dependency') {
            tabSpecs.label = source.label;
            tabSpecs.id = path;
        }
        /**
         * Label is used to show the user, id is used to identify de tab selected
         */
        this.tabs.set(path, tabSpecs);
        this.triggerEvent('panel.updated');
        this.triggerEvent();

    }

    /**
     * Adds tabs that doesn't needs the editor instance
     *
     * The tab must exists in the boards object.
     * @param specs {object} bridge to pass parameters required by the board
     * @param name {string} Name of the board.
     * @param specs.label {string} Label to show on board tab.
     * @param specs?.name {string} name to identify the board.
     * @params specs?.moduleId {string} if the board to show is the board of a module, the moduleId is required
     *
     *
     */
    async add(name, specs = {}) {
        const control = this.boards.items.get(name);
        if (!control) {
            throw Error(`The board required does not exists: ${name}`);
        }

        let label = specs.label ? specs.label : control.label;
        const labelName = specs.label ? `${name}.${label.toLowerCase().replace(/ /g, '-')}` : undefined;

        const tabName = specs.name
            ? specs.name
            : (specs.moduleId ? specs.moduleId : (specs.label ? labelName : name));
        const id = specs.id || specs.name || tabName;

        if (name === 'application') {
            const application = await applicationsFactory.get(specs.id);
            label = application.name;
        }

        this.tabs.set(id, {
            id, label, name,
            type: 'content',
            path: name,
            control: control.control,
            specs
        });
        //the activeItem is used by the Panel View component to understand which board must be shown.
        this.#activeItem = id;
        this.triggerEvent('panel.updated');
        this.triggerEvent();
    }

    /**
     * Set the panel as active
     */
    setActive = () => this.parent.active = this;

    setTabName(id, name) {
        const data = this.tabs.get(id);
        if (!data) return;
        data.label = name;

        this.tabs.set(id, data);
        this.triggerEvent(`tab.change.${id}`);
        this.triggerEvent('panel.updated');
    }

    changeTab(tab) {
        if (!tab || !this.tabs.has(tab.id)) return;

        if (tab.type === 'editor') {
            this.editor.setSource(tab.sourceType ?? 'source', tab.source)
        }
        this._source = tab._source;
        this.#activeItem = tab.id;
        this.triggerEvent();
    }

    async closeTab(tab) {
        try {
            if (!this.tabs.has(tab.id)) return;
            if (tab.name === 'application') this.workspace.closeApp(tab.specs.id);
            const keys = [...this.tabs.keys()];
            if (keys.length === 1) {
                if (this.editor) {
                    this.editor.instance.dispose();
                    this.#editorManager.items.delete(this.#editor.id);
                }
                this.parent.closePanel(this.id);
                this.triggerEvent('panel.updated');
                return;
            }
            const pos = keys.indexOf(tab.id);
            // if the tab to be closed is the first tab, then the next tab
            // may be the active tab, if the tab to be closed is another tab, then
            // the active tab will be the previous tab.
            this.#activeItem = pos === 0 ? keys[pos + 1] : keys[pos - 1];
            this.tabs.delete(tab.id);
            this.triggerEvent('panel.updated');
            this.triggerEvent();
        }
        catch (e) {
            console.error(888, e);
        }

    }

}
