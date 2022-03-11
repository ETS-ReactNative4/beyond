define(["exports", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard/ds-editor/code", "@beyond-js/dashboard/workspace-tree/code", "@beyond-js/dashboard/unnamed/workspace/components/favorites/code", "@beyond-js/dashboard/ds-notifications/code", "@beyond-js/plm/plm-indexed-db/code"], function (_exports2, _js, _ts, _code, _code2, _code3, _code4, _code5) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BundleManager = void 0;
  _exports2.DSDatabase = DSDatabase;
  _exports2.hmr = _exports2.applicationsFactory = _exports2.ModuleModel = _exports2.ModuleManager = _exports2.DSUser = _exports2.DSModel = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/models/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /*******************
  FILE: application.js
  *******************/


  class ApplicationModel extends _js.ReactiveModel {
    #bundles = ['layout', 'page', 'code', 'all', 'widget'];

    get bundles() {
      return this.#bundles;
    }
    /**
     * Returns the compound id of the application
     *
     * This id is used to destructure the module id
     * @returns {string}
     */


    get id() {
      return `application//${this.application.id}//`;
    }

    get name() {
      return this.application.name;
    }

    get containers() {
      const items = ['all', 'application'];
      this.application.libraries?.items?.forEach(item => items.push(item.library.name));
      return items;
    }

    #filterContainer = 'application';

    get filterContainer() {
      return this.#filterContainer;
    }

    set filterContainer(value) {
      if (value === this.#filterContainer) return;
      this.#filterContainer = value;
      this.triggerEvent();
    }

    _filterBundle = 'all';

    get filterBundle() {
      return this._filterBundle;
    }

    set filterBundle(value) {
      if (value === this._filterBundle) return;
      this._filterBundle = value;
      this.triggerEvent();
    }

    _filterText = '';

    get filterText() {
      return this._filterText;
    }

    set filterText(value) {
      if (value === this._filterText) return;
      this._filterText = value;
      this.triggerEvent();
    }
    /**
     * Return the items of the application checking if it's necessary apply a filter.
     * @returns {*}
     */


    get items() {
      if (this.filterBundle || this.filterText || this.filterContainer) {
        return this._filterItems();
      }

      return this.modules.elements;
    }

    get modules() {
      return this.application.am;
    }

    get am() {
      return this.application.am;
    }

    get deployment() {
      return this.application.deployment;
    }

    _backend = {};

    get backend() {
      return this._backend;
    }

    _libraries = [];

    get libraries() {
      if (!this.application?.libraries?.fetched) return this._libraries;
      return this.application.libraries.items;
    }

    get static() {
      return this._static;
    }

    #template = {};

    get template() {
      return this.#template;
    }

    get errors() {
      return this.application.errors;
    }

    get warnings() {
      return this.application.warnings;
    }

    #modulesTree;

    get modulesTree() {
      return this.#modulesTree;
    }

    #moduleManager;

    get moduleManager() {
      return this.#moduleManager;
    }

    #favorites;

    get favorites() {
      return this.#favorites;
    }
    /**
     *
     * @private
     */


    #element;

    get element() {
      return this.#element;
    }

    get found() {
      return this.application.found;
    }

    #ready = undefined;

    get ready() {
      if (!this.application.found && !this.application.fetching) {
        console.warn(`The application ${this.application.id} was not found`);
        return true;
      }

      return this.application.landed;
    }
    /**
     *
     * @param {String} id Id of the application
     * @param {String} moduleId Id of the module to open into workspace.
     * @param {string} element Represents the element of the application to wait to be ready
     * could by one of the next values
     *  - template
     *  - module
     *  - favorites
     *  - statics
     *  - config
     */


    constructor(id, moduleId, element) {
      super();
      this.#element = element;
      this.application = new _ts.Application({
        identifier: {
          id: parseInt(id)
        },
        tree: SPECS.tree
      });
      this.application.bind('change', this.checkLoaded);
      this.application.bind('change', this.validateErrors);
      this.application.bind('change', this.triggerEvent);
      this.application.fetch();
      this.#moduleManager = new ModuleManager(this, moduleId);
      this.#favorites = _code3.FavoritesFactory.get(this.application.id, this);
      this.#favorites.bind('change', this.triggerEvent);
    }

    checkLoaded = () => {
      if (!this.application.tree.landed) return;
      this.#processModules();
      this.#processStatic();
      this.#processTemplate();
      this.triggerEvent();
      this.application.unbind('change', this.checkLoaded);
    };

    #processModules() {
      const items = this.itemsByContainer('application').map(module => module);
      this.#modulesTree = _code2.TreeFactory.get('application', [this, this.application, items]);
    }

    #processStatic() {
      this._static = _code2.TreeFactory.get('static', [this.application, this.application.static, this.application.static.items]);
    }

    #processTemplate() {
      //TODO: @julio TREE
      const {
        template: {
          application,
          processors,
          global
        }
      } = this.application;
      this.#template.application = _code2.TreeFactory.get('template', [this.application, application, application.sources.items]);
      this.#template.global = _code2.TreeFactory.get('template', [this.application, global, global.sources.items]);
      this.#template.processors = new Map();
      processors.forEach(processor => {
        if (!processor.path) return;

        const tree = _code2.TreeFactory.get('template', [this.application, processor, processor.sources.items, this.#template, this.#template]);

        this.#template.processors.set(processor.processor, tree);
      });
    }

    clean() {
      this.application?.am.clean();
    }

    _filterItems() {
      const specs = {};
      if (!this.am) return [];
      specs.container = this.filterContainer ? this.#getContainerId(this.filterContainer) : 'application';
      if (this.filterText) specs.text = this.filterText;
      if (this.filterBundle) specs.bundle = this.filterBundle;
      return this.am.getItems(specs);
    }

    itemsByContainer(container) {
      return this.application.am.getItems({
        container: this.#getContainerId(container)
      });
    }

    #getContainerId(container) {
      if (['application', 'all'].includes(container)) return container;
      const library = this.application.libraries.items.find(library => library.library?.name === container);
      if (!library) return container;
      return `${library.id}/`;
    }

    getItems(filter) {
      this.#filterContainer = filter;
      return this._filterItems();
    }

    validateErrors = () => {
      if (!this.application.errors) return;
      const specs = {
        id: this.application.id,
        application: this.application
      }; // DSNotifications.register(this.application.errors, specs);
    };
  }
  /***********************
  FILE: database\config.js
  ***********************/


  function getConfig() {
    const CONFIG = Object.freeze({
      DB: 'beyond.dashboard',
      VERSION: 6
    }); //TODO validar uso de tablas list, records, storages y unpublished

    const tables = {
      favorites: {
        name: 'favorites',
        config: {
          keyPath: 'id',
          autoIncrement: true
        },
        indexes: [['id', 'id', {
          unique: true
        }], ['name', 'name', {
          unique: true
        }], ['items', 'items', {
          unique: false
        }]]
      },
      workspaces: {
        name: 'workspaces',
        config: {
          keyPath: 'wd'
        },
        indexes: [['wd', 'wd', {
          unique: true
        }], ['lastAccess', 'lastAccess']]
      },
      user: {
        name: 'user',
        config: {
          keyPath: 'id',
          autoIncrement: true
        },
        indexes: [['id', 'id', {
          unique: true
        }], ['email', 'email', {
          unique: true
        }], ['cover', 'cover']]
      },
      workspace: {
        name: 'workspace',
        config: {
          keyPath: 'wd',
          autoIncrement: true
        },
        indexes: [['id', 'id', {
          unique: true
        }], ['panels', 'panels'], ['config', 'config'], ['wd', 'wd', {
          unique: true
        }]]
      }
    };
    const stores = [];

    for (const store in tables) {
      stores.push(tables[store]);
    }

    return {
      name: CONFIG.DB,
      version: CONFIG.VERSION,
      stores: stores
    };
  }
  /************************
  FILE: database\indexed.js
  ************************/


  function DSDatabase() {
    'use strict';

    let db, initialised;
    const config = getConfig();
    Object.defineProperty(this, 'initialised', {
      get: () => initialised
    });
    Object.defineProperty(this, 'db', {
      get: () => db
    });
    let promise;

    this.initialise = async () => {
      if (initialised || promise) return promise;
      promise = new PendingPromise();
      const {
        BeyondDB
      } = await beyond.import('@beyond-js/dashboard/indexeddb/code');
      db = await BeyondDB.create(config);
      initialised = true;
      promise.resolve(db);
      promise = undefined;
    };

    this.store = name => db.stores.has(name) ? db.stores.get(name) : false;
  }
  /****************
  FILE: ds-model.js
  ****************/


  class DSModelObject extends _js.ReactiveModel {
    _db;

    get db() {
      return this._db;
    }

    ready() {
      return this.db.initialised;
    }

    #initialising;
    #wd;

    get wd() {
      return this.#wd;
    }

    #lastAccess;

    get lastAccess() {
      return this.#lastAccess;
    }

    constructor() {
      super();
      const database = new DSDatabase();
      database.initialise();
      this._db = database;
    }

    async initialise(wd) {
      if (this.#initialising) return this.#initialising;
      this.#initialising = this.db.initialise();
      await this.#initialising;
      this.#lastAccess = performance.now();
      const data = await DSModel.db.store('workspace').get(wd);
      if (!data) return this.reset(wd);
      return this.db.store('workspaces').save({
        wd,
        lastAccess: this.#lastAccess
      });
    }

    async reset(wd) {
      const specs = {
        wd,
        lastAccess: performance.now(),
        panels: {
          items: new Map()
        },
        opened: new Set()
      };
      await this.db.store('workspace').save(specs);
      return specs;
    }

    store = name => this.db.store(name);
  }

  const DSModel = new DSModelObject();
  /***************
  FILE: factory.js
  ***************/

  _exports2.DSModel = DSModel;

  class ApplicationsFactory {
    _applications = new Map();

    get applications() {
      return this._applications;
    }

    constructor() {}

    get(id, moduleId, element) {
      if (this.applications.has(id)) return this.applications.get(id);
      const application = new ApplicationModel(id, moduleId, element);
      this.applications.set(id, application);
      return application;
    }

  }

  const applicationsFactory = new ApplicationsFactory();
  /**************************************
  FILE: module\bundles\bundles-manager.js
  **************************************/

  _exports2.applicationsFactory = applicationsFactory;

  class BundlesManager extends _js.ReactiveModel {
    #applicationManager;

    get applicationManager() {
      return this.#applicationManager;
    }

    #bundlesTree;

    get bundlesTree() {
      return this.#bundlesTree;
    }

    #bundles;

    get bundles() {
      return this.#bundles;
    }

    get fetching() {
      let fetching = false;
      this.items.forEach(bundle => {
        if (bundle.fetching) fetching = true;
      });
      return fetching;
    }

    #items = new Map();

    get items() {
      return this.#items;
    }

    get consumers() {
      let consumers = [];
      const set = new Set();
      this.items.forEach(bundle => {
        const {
          items
        } = bundle.consumers;
        items.forEach(item => {
          if (set.has(item.id)) return;
          consumers.push(item);
          set.add(item.id);
        });
      });
      return consumers;
    }

    get dependencies() {
      let dependencies = [];
      const set = new Set();
      this.items.forEach(bundle => {
        const {
          items
        } = bundle.dependencies;
        items.forEach(item => {
          if (set.has(item.id)) return;
          set.add(item.id);
          dependencies.push(item);
        });
      });
      return dependencies;
    }

    #txt;
    #module;

    get module() {
      return this.#module;
    }

    get id() {
      return `${this.#module.id}////bundles-manager`;
    }

    #itemsProcessed = new Set();
    #processed = false;

    get processed() {
      return this.#processed;
    }

    constructor(module, bundlesTree, bundles, txt) {
      super();
      this.#module = module;
      this.#applicationManager = module.applicationManager;
      this.#bundlesTree = bundlesTree;
      this.#bundles = bundles;
      this.#txt = txt;
      this.#process();
    }

    check() {
      this.items.forEach(bundle => bundle.dependencies.check());
    }

    #process() {
      this.#bundles.forEach(bundle => {
        if (bundle.name === 'txt') return;
        const bundleManager = new BundleManager(this.#applicationManager, this.#bundlesTree, bundle, this.#txt);

        const onProcess = () => {
          this.#itemsProcessed.add(bundleManager.id);

          if (!bundleManager.processed) {
            return;
          }

          if (this.items.size === this.#itemsProcessed.size) {
            this.triggerEvent('bundles.processed');
            this.triggerEvent('change');
            bundleManager.unbind('change', onProcess);
          }
        };

        bundleManager.bind('change', onProcess);
        bundleManager.bind('change', this.triggerEvent);
        this.items.set(bundle.name, bundleManager);
        if (bundleManager.processed) onProcess();
      });
    }
    /**
     * loads a consumer or dependency module
     *
     * @param type
     * @param moduleId
     * @param bundleId
     * @returns {Promise<void>}
     */


    async load(type, moduleId, bundleId) {
      const module = await this.#applicationManager.moduleManager.load(moduleId);
      if (!['consumers', 'dependencies'].includes(type)) throw new Error(`the property ${type} required to load does not exists`);
      this.items.forEach(item => {
        const object = item[type];
        if (!object.entries.has(bundleId)) return;
        object.setItem(bundleId, module);
        this.triggerEvent(`${module.am.id}.change`);
        this.triggerEvent();
      });
    }

  }
  /********************************
  FILE: module\bundles\consumers.js
  ********************************/


  class ConsumersManager extends _js.ReactiveModel {
    #ready;

    get ready() {
      return this.#ready;
    }

    #model;

    get model() {
      return this.#model;
    }

    #entries = new Map();

    get entries() {
      return this.#entries;
    }

    #items = [];

    get items() {
      return Array.from(this.#entries.values());
    }

    #applicationManager;
    #modules = new Map();

    get modules() {
      return this.#modules;
    }

    #bundle;

    get bundle() {
      return this.#bundle;
    }

    constructor(bundle, application, tree, specs = {
      load: true
    }) {
      super();
      this.#applicationManager = application;
      this.#bundle = bundle;
      if (specs.load) this.load();
    }

    load() {
      const specs = {
        tree: {
          properties: {
            bundle: true
          }
        },
        filter: [{
          field: 'bundle',
          operand: 0,
          value: this.bundle.id
        }]
      };
      this.#model = new _ts.Consumers(specs);
      this.#model.bind('change', this.#check);
      this.#model.fetch();
      window.c = this.#model;
    }

    #check = () => {
      if (!this.#model.tree.landed) return;
      this.triggerEvent(); // const branch = this.tree.items.get(this.bundle.name);
      // branch.addConsumers(this.#model);

      const {
        moduleManager
      } = this.#applicationManager;
      this.#model.items.forEach(item => {
        const module = moduleManager.getItem(item.moduleId);

        if (!module) {
          /**
           * TODO: @julio check iterations
           */
          return;
        }

        this.#entries.set(item.bundle.id, {
          id: item.bundle.id,
          bundle: item.bundle,
          name: `${module.name}/${item.bundle?.name}`,
          consumer: item,
          module: module
        });
      });
      this.#ready = true;
      this.#model.unbind('change', this.#check); //TODO: @julio check events

      this.triggerEvent('consumers.loaded');
      this.triggerEvent();
    };

    setItem(bundleId, module) {
      const item = this.#entries.get(bundleId);
      item.module = module;
      item.loaded = true;
      this.#entries.set(bundleId, item);
      this.triggerEvent();
    }

  }
  /***********************************
  FILE: module\bundles\dependencies.js
  ***********************************/


  class DependenciesManager extends _js.ReactiveModel {
    #ready = false;

    get ready() {
      return this.#ready;
    }

    #model;

    get model() {
      return this.#model;
    }

    #entries = new Map();

    get entries() {
      return this.#entries;
    }

    get items() {
      return Array.from(this.#entries.values());
    }

    #bundle;

    get bundle() {
      return this.#bundle;
    }

    #tree;
    #applicationManager;

    constructor(bundle, application, tree, specs = {
      load: true
    }) {
      super();
      this.#bundle = bundle;
      this.#applicationManager = application;
      this.#tree = tree;
      if (bundle.processors.has('ts')) this.load(bundle.processors.get('ts').id);
    }

    load(processorId) {
      const specs = {
        tree: {
          properties: {
            bundle: true,
            declaration: true
          }
        },
        filter: [{
          field: 'processor',
          operand: 0,
          value: processorId
        }]
      };
      this.#model = new _ts.ProcessorDependencies(specs);
      this.#model.bind('change', this.#check);
      this.#model.fetch();
      window.d = this.#model;
    }

    #check = () => {
      if (!this.model.tree.landed) return;
      this.#model.items.forEach(item => {
        const module = moduleManager.getItem(item.moduleId);

        if (item.external) {
          this.#entries.set(item.id, {
            id: item.id,
            name: item.resource,
            dependency: item
          });
          return;
        }

        if (!module && !item.external) return false;
        this.#entries.set(item.bundle.id, {
          id: item.bundle.id,
          bundle: item.bundle,
          name: `${module.name}/${item.bundle.name}`,
          dependency: item,
          module
        });
      });
      this.#ready = true;
      this.#model.unbind('change', this.#check); //TODO: @julio check events

      this.triggerEvent('dependencies.ready');
      this.triggerEvent();
    };
    check = () => this.#check();

    setItem(bundleId, module) {
      const item = this.#entries.get(bundleId);
      item.module = module;
      item.loaded = true;
      this.#entries.set(bundleId, item);
      this.triggerEvent();
    }

  }
  /******************************
  FILE: module\bundles\manager.js
  ******************************/


  class BundleManager extends _js.ReactiveModel {
    #tree = new Map();

    get tree() {
      return this.#tree;
    }

    #bundle;

    get bundle() {
      return this.#bundle;
    }

    get id() {
      return this.#bundle.id;
    }

    get name() {
      return this.#bundle.name;
    }

    get fetching() {
      return this.#dependencies?.fetching || this.#consumers?.fetching || this.#compiler?.fetching;
    }

    HAS_DEPENDENCIES = ['ts'];
    #dependencies;

    get dependencies() {
      return this.#dependencies;
    }

    #consumers;

    get consumers() {
      return this.#consumers;
    }

    #compiler;

    get compiler() {
      return this.#compiler;
    }
    /**
     * Represents the model of the current application
     * @private
     */


    #application;

    get application() {
      return this.#application;
    }

    #processors;

    get processors() {
      return this.#processors;
    }

    get diagnostics() {
      return this.#compiler?.diagnostics ?? {};
    }

    get processed() {
      if (!this.bundle.processors.has('ts')) return true;
      return !!this.#compiler && this.#consumers.ready && this.#dependencies.ready;
    }

    get totalFiles() {
      let total = 0;
      if (!this.#bundle.tree.landed) return total;
      this.#bundle.processors.forEach(processor => {
        total += processor.sources.items.length;
      });
      return total;
    }
    /**
     *
     * @param {ApplicationModel} application
     * @param tree {TreeFactory} Tree of module's bundles.
     * @param bundle
     * @param txt
     */


    constructor(application, tree, bundle, txt) {
      super();
      this.#bundle = bundle;
      this.#tree = tree;
      this.#application = application;
      this.#dependencies = new DependenciesManager(bundle, application, tree);
      this.#consumers = new ConsumersManager(bundle, application, tree);
      this.consumers.bind('change', this.triggerEvent);
      this.dependencies.bind('change', this.triggerEvent); // if (txt) processors.set('txt', txt.processors.get('txt'));

      this._process();
    }

    async _process() {
      this.bundle.processors.forEach(processor => {
        if (!this.HAS_DEPENDENCIES.includes(processor.name)) return;
        this.loadCompiler(processor.id);
      });
    }

    getFile(file, processorName) {
      file = file.replace(/\//g, '\\');

      if (!this.bundle.processors.has(processorName)) {
        return;
      }

      const processor = this.bundle.processors.get(processorName);
      return processor.sources.items.find(i => i.file === file);
    }

    async loadCompiler() {
      if (!this.bundle.processors.has('ts')) return;
      const processor = this.bundle.processors.get('ts');
      const compiler = new _ts.ProcessorCompiler({
        identifier: {
          id: processor.id
        }
      });
      this.#compiler = compiler;

      const onload = () => this.triggerEvent();

      compiler.bind('change', onload);
      compiler.fetch();
    }

  }
  /*****************************
  FILE: module\module-manager.js
  *****************************/

  /**
   * Manages the modules instances and interfaces between them and editors instances
   */


  _exports2.BundleManager = BundleManager;

  class ModuleManager extends _js.ReactiveModel {
    #application;

    get application() {
      return this.#application;
    }

    #editorManager;
    /**
     * Return the active module
     * @private
     */

    #active;

    get active() {
      return this.#active;
    }
    /**
     * Returns the total of modules
     */


    get total() {
      return this.#application.am.items.length;
    }

    #processed = new Set();

    get processed() {
      return this.#processed.size;
    }

    #models = new Map();

    get models() {
      return this.#models;
    }

    #promises = new Map();

    get promises() {
      return this.#promises;
    }

    setProcessed(id) {
      this.#processed.add(id);
      this.triggerEvent();
    }

    get ready() {}
    /**
     *
     * @param application {ApplicationModel}
     * @param application.application {Application} PLM Item of application.
     * * @param moduleId if is passed then the Module manager will load it.
     */


    constructor(application, moduleId) {
      super();
      this.#application = application;
      window.moduleManager = this;
      this.#editorManager = (0, _code.getEditorManager)(application.application);
      const saved = localStorage.getItem('dashboard.module.active');
      if (!moduleId && saved) moduleId = saved;

      if (![undefined].includes(moduleId)) {
        this.setActive(moduleId);
      }
    }
    /**
     * Obtains the module required and set as active in the workspace
     * @param id
     * @returns {Promise<{ModuleModel}>} Return the model of the module loaded.
     */


    async setActive(id) {
      try {
        this.#active = await this.load(id);
        window.module = this.#active;
        localStorage.setItem('dashboard.module.active', id);
      } catch (e) {
        console.error(e);
      }
    }
    /**
     * Loads the module required and returns its instance
     *
     * @param moduleId
     * @returns {Promise<ModuleManager>}
     */


    async load(moduleId) {
      try {
        if (!moduleId) {
          // console.trace(moduleId)
          return;
        }

        return this.getInstance(moduleId);
      } catch (e) {
        console.error(104.6, "error", e);
      }
    }
    /**
     * Instances the ModelModule object
     *
     * Waits to validate if the module is fully loaded, then returns it.
     * @param id
     * @returns {V|*}
     * @private
     */


    getInstance(id) {
      if (!id) return;
      if (this.promises.has(id)) return this.promises.get(id);
      const promise = new PendingPromise();
      this.#promises.set(id, promise);

      if (this.models.has(id)) {
        this.promises.delete(id);
        promise.resolve(this.models.get(id));
        return promise;
      }

      const model = new ModuleModel(id, this.application, this);
      if (model.ready) return promise.resolve(model);

      const response = () => {
        model.unbind('model.loaded', response);
        this.models.set(model.id, model);
        promise.resolve(model);
        this.triggerEvent('model.loaded');
        this.promises.delete(id);
      };

      model.bind('model.loaded', response);
      return promise;
    }
    /**
     * Loads the ModuleModel's Model
     *
     * This method sets the module passed as active. If is only required
     * to load the tree, then use loadModuleTree instead
     * @param id
     * @deprecated
     * @returns {{}}
     */


    async loadModule(id) {
      return this.setActive(id);
    }

    loadAll = async () => {
      const promises = [];
      this.#application.am.items.forEach(item => promises.push(this.getInstance(item.id)));

      try {
        const items = await Promise.all(promises); // DSNotifications.addModules(items);
      } catch (exc) {
        console.error(exc);
      }
    };
    /**
     * Is used only to get a moduleItem without load it as a module-model object.
     * @param itemId
     * @returns {*}
     */

    getItem(itemId) {
      return this.#application.am?.items.find(item => {
        return item.id === itemId;
      });
    }

  }
  /***************************
  FILE: module\module-model.js
  ***************************/

  /**
   /**
   * Represents the model-ui of the module
   */


  _exports2.ModuleManager = ModuleManager;

  class ModuleModel extends _js.ReactiveModel {
    #tree = {
      properties: {
        module: {
          properties: {
            static: true
          }
        },
        bundles: {
          properties: {
            processors: {
              properties: {
                dependencies: true,
                sources: true,
                overwrites: true
              }
            }
          }
        }
      }
    };
    #applicationManager;

    get applicationManager() {
      return this.#applicationManager;
    }

    get application() {
      return this.#applicationManager.application;
    }

    get applicationId() {
      return this.am?.container?.id;
    }

    #sources = new Map();

    get sources() {
      return this.#sources;
    }

    get processed() {
      let processed = true;
      this.bundles.forEach(item => {
        if (!item.processed) processed = false;
      });
      return processed;
    }

    get bundles() {
      return this.#bundlesManager;
    }
    /**
     * @property {BundlesManager} bundlesManager
     */


    #bundlesManager;

    get bundlesManager() {
      return this.#bundlesManager;
    }

    get id() {
      return this.am?.id;
    }
    /**
     * Returns the module's name.
     *
     * If the module does not have name returns the identifier without
     * the application id section.
     * @returns {string}
     */


    get name() {
      let name = this.am?.id?.replace(`application//${this.application.id}//`, '');
      return this.am?.name ?? name;
    }

    #bundlesTree;

    get bundlesTree() {
      return this.#bundlesTree;
    }
    /**
     * @private {ApplicationModule}
     */


    #am;

    get am() {
      return this.#am;
    }
    /**
     * @deprecated use am property instead
     * @returns {*}
     */


    get module() {
      return this.#am;
    }

    #ready;

    get ready() {
      return this.am.tree.landed && this.#ready;
    }

    #updating;

    get updating() {
      return this.#updating;
    }

    #_static;

    get static() {
      return this.#_static;
    }

    #errors = [];

    get errors() {
      return this.#am.module?.errors ?? [];
    }

    #warnings = [];

    get warnings() {
      return this.#am.module?.warnings ?? [];
    }

    #found;

    get found() {
      return this.#am?.found;
    }

    get alerts() {
      const total = this.errors.length + this.warnings.length;
      return {
        total: total
      };
    }

    get totalFiles() {
      let total = 0;
      this.bundles.items.forEach(bundle => total += bundle.totalFiles);
      return total;
    }

    #moduleManager;

    constructor(moduleId, application, moduleManager) {
      super();
      this.#moduleManager = moduleManager;
      this.#applicationManager = application;
      this.checkLoaded = this.checkLoaded.bind(this);
      this.load(moduleId);
    }
    /**
     * Loads a Module
     *
     * @param moduleId
     * @param concat if is true the moduleId will be concatenated with the application string id.
     */


    load(moduleId, concat = false) {
      if (this.#am) {
        this.#am.off('change', this.triggerEvent);
        this.#am = undefined;
      }

      moduleId = concat ? `${this.#applicationManager.id}//${moduleId}` : moduleId;
      this.#am = new _ts.ApplicationModule({
        identifier: {
          id: moduleId
        },
        tree: this.#tree
      });
      this.#am.on('change', this.checkLoaded);
      this.fetch();
    }
    /**
     * Validates if the module is fully load
     *
     * Processes all the properties of the module to leave prepared the structure could be consumed.
     */


    checkLoaded() {
      if (!this.am.found) {
        this.#ready = true;
        this.#found = false;
        this.triggerEvent('model.loaded');
      }

      if (!this.am.tree.landed) return;
      this.am.off('change', this.checkLoaded); // load bundles by name;

      this.checkModule();
      this.triggerEvent();

      if (this.am.module?.static) {
        const specs = [this.application, this.am, this.am.module.static.items];
        this.#_static = _code2.TreeFactory.get('static', specs);
      }

      this.am.bundles.forEach(bundle => {
        bundle.processors.forEach(item => {
          item.sources.items.forEach(source => this.#sources.set(source.id, source));
        });
      });
      this.am.on('change', this.triggerEvent);
      this.#ready = true;
      this.triggerEvent('model.loaded');
    }
    /**
     * Validates the module and generates de bundleManager instances
     *
     * Also check if the module has a text bundle and adds its txt processor
     * as a processor of the each bundle.
     */


    checkModule() {
      const txt = this.am.getBundle('txt');
      const {
        application,
        am,
        am: {
          bundles
        }
      } = this;
      this.#bundlesTree = _code2.TreeFactory.get('module', [application, am, [...bundles.values()]]);
      this.#bundlesManager = new BundlesManager(this, this.#bundlesTree, bundles, txt);
      this.#bundlesManager.bind('change', this.triggerEvent);

      const onProcessed = () => {
        this.#moduleManager.setProcessed(this.id); // this.#bundlesManager.unbind('bundles.processed', onProcessed);
      };

      if (this.#bundlesManager.processed) onProcessed();
      this.#bundlesManager.bind('bundles.processed', onProcessed);
    }

    getFile(bundleName, processorContainer, fileName) {
      bundleName = processorContainer === 'txt' ? 'txt' : bundleName;
      const bundle = this.am.getBundle(bundleName);
      const processor = bundle.processors.get(processorContainer);
      let file;
      processor.files.items.forEach(item => {
        const name = item.relative.file.replace(/\\/g, '/').split(['/']).pop();
        if (name === fileName) file = item;
      });

      if (!file) {
        console.warn(`the file ${file} was not found`);
      }

      return file;
    }
    /**
     * TODO: @julio
     */


    async deleteFile(params) {
      const bundle = this.#am.getBundle(this._bundleId);
      await file.delete({
        target: params.name
      });
    }

    async fetch() {
      const promise = new PendingPromise();
      const {
        module
      } = this;
      module.fetch({
        container: true,
        bundles: {
          processors: true
        }
      });
      return promise;
    }
    /**
     * TODO: @julio
     * @param params
     * @returns {Promise<void>}
     */


    async createFile(params) {
      await this.#am.createFile(params);
    }

  }
  /********************************
  FILE: module\processor-manager.js
  ********************************/


  _exports2.ModuleModel = ModuleModel;

  class ProcessorManager extends _js.ReactiveModel {
    constructor() {
      super();
    }

  }
  /*************
  FILE: specs.js
  *************/


  const SPECS = {
    tree: {
      properties: {
        static: true,
        bee: true,
        deployment: {
          properties: {
            distributions: true
          }
        },
        template: {
          properties: {
            application: {
              properties: {
                sources: true
              }
            },
            processors: {
              properties: {
                sources: true
              }
            },
            global: {
              properties: {
                sources: true
              }
            }
          }
        },
        libraries: {
          properties: {
            library: true,
            application: true
          }
        },
        am: {
          properties: {
            module: true,
            bundles: {
              properties: {
                processors: true
              }
            }
          }
        }
      }
    }
  };
  /************
  FILE: user.js
  ************/

  /**
   * Represent the current dashboard user
   */

  class DSUser extends _js.ReactiveModel {
    #name;

    get name() {
      return this.#name;
    }

    set name(value) {
      if (!value || value === this.#name) return;
      if (typeof value !== 'string') throw new Error('the name must be a string');
      this.#name = value;
      localStorage.setItem('ds.user.name', value);
    }

    #hasAccess;

    get hasAccess() {
      return this.#hasAccess;
    }

    #code;

    get code() {
      return this.#code;
    }

    #email;

    get email() {
      return this.#email;
    }

    set email(value) {
      if (!value || value === this.#email) return;
      if (typeof value !== 'string') throw new Error('the email must be a string');
      this.#email = value;
      localStorage.setItem('ds.user.name', value);
    }

    #dashboard;
    #validated;

    get validated() {
      return this.#validated;
    }

    constructor(dashboard) {
      super();
      this.#dashboard = dashboard;
      this.#check();
    }

    #check() {
      this.#name = localStorage.getItem('ds.user.name');
      this.#code = localStorage.getItem('ds.user.code');
      this.#email = localStorage.getItem('ds.user.email');
      this.#validated = true;
      this.#hasAccess = !!this.#name && !!this.#email;
    }

    async register(name, email) {
      this.#name = name;
      localStorage.setItem('ds.user.name', name);
      localStorage.setItem('ds.user.email', email);
      this.#hasAccess = true;
      return true;
    }

    async validate(code) {
      const response = await this.#dashboard.validate(code);
      this.#validated = true;
      this.#hasAccess = response;
      this.triggerEvent();
      return response;
    }

  }

  _exports2.DSUser = DSUser;
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});