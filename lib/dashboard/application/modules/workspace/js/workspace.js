export const Workspace = class extends ReactiveModel {
    #contextMenu;
    get contextMenu() {
        return this.#contextMenu;
    }

    get types() {
        return [
            {}
        ]
    }

    #panels;
    get panels() {
        return this.#panels;
    }

    #uploader;
    get uploader() {
        return this.#uploader;
    }

    #active;
    get active() {
        return this.#active;
    }

    set active(value) {
        if (value === this.active) return;
        this.#active = value;
        this.triggerEvent();
    }

    get application() {
        return this.#active;
    }

    #appsOpened = new Set();
    #applications;
    get applications() {
        return this.#applications;
    }

    #store;
    #firstTime = true;

    get ready() {
        if (this.#dsmodel?.ready
            && this.#firstTime && this.applications.tree.landed) this.#firstTime = false;
        const isReady = this.#user.validated && (!this.#firstTime || this.applications.tree.landed);
        return isReady && module.texts.ready;
    }

    get texts() {
        return module.texts?.value;
    }

    #state = {};
    get state() {
        return this.#state;
    }

    #dashboard;
    get dashboard() {
        return this.#dashboard;
    }

    #dsmodel;
    get dsmodel() {
        return this.#dsmodel;
    }

    #aside;
    get aside() {
        return this.#aside;
    }

    /**
     * @property {DSUser}
     */
    #user;
    get user() {
        return this.#user;
    }

    #wd;
    get wd() {
        return this.#wd;
    }

    constructor(specs = {}) {
        super();
        this.#applications = new Applications(TREE.APPS);
        this.#dashboard = Dashboard;
        this.#user = new DSUser(this.#dashboard);
        this.applications.bind('change', this.triggerEvent);
        this.applications.bind('change', this.#addNotifications);
        this.#user.bind('change', this.triggerEvent);

        module.texts.bind('change', this.triggerEvent);
        this.#applications.fetch();
        this.#dsmodel = DSModel;
        window.workspace = this;

        this.#load(specs);
    }

    #addNotifications = () => {
        if (!this.applications.tree.landed) return;
        DSNotifications.start(this.applications.items);

    }

    async #load() {

        this.#wd = await Dashboard.getWD();
        await this.#dsmodel.initialise(this.#wd);
        await DSModel.initialise();
        this.#store = DSModel.db.store('workspace');
        let data = await this.#store.get(this.#wd);

        const apps = Array.from(data.opened.values())
        if (!!apps.length) {
            const promises = apps.map(id => applicationsFactory.get(id));
            await Promise.all(promises);

        }

        if (data.activeApp) {
            this.#active = await applicationsFactory.get(data.activeApp);
            if (this.#active.application.found) this.#appsOpened.add(data.activeApp);
            else data = await DSModel.reset(this.#wd);
        }

        this.#contextMenu = new ContextMenu();
        this.#uploader = new UploaderController(this);
        this.#aside = new WorkspaceAside(this);
        this.#panels = new PanelsManager(DSBoards, this, data.panels);
        this.#panels.bind('panels.updated', this.#save);

        this.openBoard = this.openBoard.bind(this);

    }

    #save = () => {
        this.#store.save({
            wd: this.#wd,
            opened: this.#appsOpened,
            panels: this.#panels.getData(),
            activeApp: this.active?.application?.id
        });
    }

    setState = state => {
        this.#state = Object.assign(this.#state, state);
        this.triggerEvent();
    }

    /**
     * Opens a board into the active panel
     * @param name
     * @param specs
     */
    openBoard(name, specs) {
        this.#panels.active.add(name, specs);
    }

    openApp = async id => {
        this.active = await this.getApplication(id);
        this.#appsOpened.add(id);
        const specs = {id, name: `app.${id}`}
        this.openBoard('application', specs);
    }

    closeApp(id) {
        this.#appsOpened.delete(id);
        this.#save();
    }

    openNavigator(id, url, newTab = true) {
        const {panels, active} = this;
        const specs = {
            applicationId: id, url,
            id: `navigator.${performance.now()}`
        }
        if (panels.items.size === 1) {
            this.panels.add('navigator', specs);
            return;
        }
        const toActivateId = panels.active.id > 1 ? panels.active.id - 1 : 2;
        panels.active = panels.items.get(toActivateId);
        this.openBoard('navigator', specs);
    }

    getApplication(id, moduleId, element) {
        if ([undefined, NaN].includes(id)) return;
        return applicationsFactory.get(parseInt(id), moduleId, element);
    }

    /**
     *
     * @param specs
     */
    openFile = specs => {
        /**
         * Must be the PLM application object.
         */
        specs.application = this.application.application;
        this.panels.active.openFile(specs)
    }

    register = async (name, code) => {
        const response = await this.user.register(name, code);
        window.setTimeout(() => {

            this.triggerEvent()
        }, 1000);
        return response;

    }

}


