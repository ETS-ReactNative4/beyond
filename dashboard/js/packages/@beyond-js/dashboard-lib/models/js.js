define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.ReactiveModel = _exports2.ModuleBundleBuilder = _exports2.ApplicationBuilder = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard-lib/models/js', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /***********************
  FILE: _reactive-model.js
  ***********************/


  class ReactiveModel {
    #ready;

    get ready() {
      return this.#ready;
    }

    #fetching;

    get fetching() {
      return this.#fetching;
    }

    set fetching(value) {
      if (value === this.#fetching) return;
      this._fetching = value;
      this.triggerEvent();
    }

    _fetched;

    get fetched() {
      return this._fetched;
    }

    #processing;

    get processing() {
      return this.#processing;
    }

    set processing(value) {
      if (value === this.#processing) return;
      this.#processing = value;
      this.triggerEvent();
    }

    #processed;

    get processed() {
      return this._processed;
    }

    set processed(value) {
      if (value === this.#processed) return;
      this.#processed = value;
      this.triggerEvent();
    }

    #loaded;

    get loaded() {
      return this.#loaded;
    }

    #error;

    get error() {
      return this.#error;
    }

    set error(value) {
      if (value === this.#error || typeof value !== 'string') return;
      this.#error = value;
      this.triggerEvent();
    }

    constructor() {
      this._events = new Events({
        bind: this
      });
      this.triggerEvent = this.triggerEvent.bind(this);
      this._set = this._set.bind(this);
    }

    triggerEvent = (event = 'change') => this._events.trigger(event);
    /**
     * set value in a private property
     * @param property
     * @param value
     */

    _set(property, value) {
      let props = {};
      if (property && value !== 'undefined') props[property] = value;else props = property;
      let updated = false;

      for (const prop in props) {
        const key = `_${prop}`;
        if (!this.hasOwnProperty(key)) continue; //same value on store

        if (this[key] === props[prop]) continue;
        this[key] = props[prop];
        updated = true;
      }

      if (updated) this.triggerEvent();
    }

    getProperties() {
      const props = {};
      Object.keys(this).forEach(property => props[property.replace('_', '')] = this[property]);
      return props;
    }

  }
  /***************************************
  FILE: builder\application\application.js
  ***************************************/


  _exports2.ReactiveModel = ReactiveModel;

  class ApplicationBuilder extends ReactiveModel {
    #id;
    #required = ['name', 'type'];
    #ports = {
      inspectPort: ['node', 'backend', 'express', 'web-backend'],
      navigate: ['web-backend', 'web']
    };
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
        description: this.description
      };
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
      const {
        platforms
      } = items.find(item => item.name === this.type);
      const data = platforms.map(item => {
        let platform = {
          platform: item
        };

        if (item === 'web') {
          platform.port = this.navigatePort;
          return platform;
        }

        if (this.useInspectPort) {
          platform.inspectPort = this.inspectPort;
          platform.port = this.#backendPort;
        }

        return platform;
      });
      const index = data.findIndex(item => item.platform === 'web');
      if (index >= 0) data[index].default = true;else data[0].default = true;
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
      return [{
        name: "react",
        platforms: ['web']
      }, {
        name: "board",
        platforms: ['web']
      }, {
        name: "express",
        platforms: ['backend']
      }, {
        name: "web-backend",
        platforms: ['web', 'backend']
      }];
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

    #TYPES = [{
      name: "node",
      platforms: ['backend']
    }, {
      name: "backend",
      platforms: ['backend']
    }, {
      name: "library",
      platforms: ['web']
    }, {
      name: "web",
      platforms: ['web']
    }];

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

      if (this.#ports.inspectPort.includes(value)) {
        this.checkPort('inspect');
      }

      if (this.#ports.navigate.includes(value)) {
        this.checkPort('inspect');
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
      let invalid = !!this.#required.find(field => !this[field]);
      if (invalid) return false;
      if (this.useInspectPort && !this.inspectPort) return false;
      if (this.useNavigatePort && !this.navigatePort) return false;
      return true;
    }

    constructor() {
      super();

      this.create = () => create(this);

      this.checkPort = port => checkPort(this, port);

      this.getInitialPorts();
    }

    clean() {
      this.getInitialPort();
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
      } catch (e) {}
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
  /**********************************
  FILE: builder\application\create.js
  **********************************/


  _exports2.ApplicationBuilder = ApplicationBuilder;

  async function create(parent) {
    if (!parent.name) throw new Error('Name is required');
    parent.processing = true;

    try {
      const response = await module.execute('builder/project/create', parent.getters);

      if (!response?.status) {
        parent.error = response.error;
        return;
      }

      parent.created = true;
      parent.id = response.data.id;
    } catch (exc) {
      console.error(exc);
      parent.created = false;
    } finally {
      parent.processed = true;
      parent.processing = false;
    }
  }
  /********************************
  FILE: builder\application\port.js
  ********************************/


  async function checkPort(base, port) {
    if (!port) throw new Error('port to check is required');
    base.processing = true;

    try {
      return module.execute('builder/project/checkPort', {
        port: port
      });
    } catch (error) {
      base.processing = false;
      base.processed = true;
    } finally {
      base.processing = false;
      base.processed = true;
    }
  }
  /************************************
  FILE: builder\bundle\module-bundle.js
  ************************************/

  /**
   * Manager to create bundles
   */


  class ModuleBundleBuilder extends ReactiveModel {
    #bundle;
    #applicationId;
    #PROCESSORS = ['scss', 'less'];
    #BUNDLES = ['page', 'widget', 'layout', 'code', 'bridge', 'typescript'];
    #TEMPLATES = Object.freeze({
      page: {
        'id': 'page',
        'bundle': 'page'
      },
      server_page: {
        'id': 'server_page',
        'bundle': 'page'
      },
      mobile_login: {
        'id': 'mobile_login',
        'bundle': 'page'
      }
    });

    get applicationId() {
      return this.#applicationId;
    }

    get PROCESSORS() {
      return this.#PROCESSORS;
    }

    get BUNDLES() {
      return this.#BUNDLES;
    }

    get type() {
      return this.#bundle.template ?? this.#bundle.type;
    }

    #origin;

    get origin() {
      return this.#origin;
    }

    set origin(value) {
      if (value === this.#origin) return;
      this.#origin = value;
      this.triggerEvent();
    }

    get bundle() {
      return this.#bundle;
    }

    constructor(applicationId) {
      super(applicationId);
      this.#applicationId = applicationId;
      this.#bundle = new ModuleBundle(this.#applicationId);
      this.#bundle.bind('change', this.triggerEvent);
    }

    setTemplate(name) {
      if (!this.#TEMPLATES.hasOwnProperty(name)) {
        console.warn('the template does not exists');
      }

      const template = this.#TEMPLATES[name];
      this.#bundle.type = template.bundle;
      this.#bundle.template = template.id;
    }

    getStructure(bundle) {
      return Structures[bundle];
    }

    setType(type) {
      this.#bundle.type = type;
    }

    cleanType() {
      this.#bundle.type = undefined;
      this.#bundle.template = undefined;
    }

  }
  /*****************************
  FILE: builder\bundle\module.js
  *****************************/

  /**
   * Represents a module that could be create and only has a bundle
   */


  _exports2.ModuleBundleBuilder = ModuleBundleBuilder;

  class ModuleBundle extends ReactiveModel {
    _id;

    get id() {
      return `${this.moduleId}//${this._type}`;
    }

    get moduleId() {
      return `project//${this._applicationId}//${this.name.replace(/ /g, '-')}`;
    }

    _type;

    get type() {
      return this._type;
    }

    _name;

    get name() {
      return this._name ?? '';
    }

    _error;

    get error() {
      return this._error;
    }

    _vdir;

    get vdir() {
      return this._vdir ?? 0;
    }

    _structure;

    get structure() {
      return this._structure;
    }

    _route = "/";

    get route() {
      return this._route;
    }

    _txt;
    _author;
    _developer;
    _title;
    _description;
    _styles;
    _fields;
    _layoutId;
    _element;
    _applicationId;
    _server = false;
    _multilanguage = false;
    _processors = new Map();
    /**
     * Define if the module to create is a predefined template.
     * @private
     */

    _template;

    get valid() {
      const structure = this._structure;
      if (!structure.required) return true;
      const keepEmpty = structure.required.filter(property => !this[`_${property}`]);
      return !keepEmpty.length;
    }

    constructor(applicationId) {
      super();
      this._applicationId = applicationId;
    }

    set type(type) {
      if (type === this._type) return;
      this._type = type;
      if (!this._type) return this.triggerEvent();
      this._structure = Structures[this._type];
      this._fields = Structures.module.fields.concat(this._structure.fields);
      this.triggerEvent();
    }

    get template() {
      return this._template;
    }

    set template(template) {
      if (template === this._template) return;
      this._template = template;
      this.triggerEvent();
    }

    set(property, value) {
      this._set(property, value);
    }

    setMultilanguage(value) {
      if (value === this._multilanguage) return;
      this._multilanguage = value;
      this.triggerEvent();
    }

    addProcessor(value) {
      if (this._processors.has(value)) return;

      this._processors.set(value, true);

      this.triggerEvent();
    }

    removeProcessor(value) {
      if (!this._processors.has(value)) return;

      this._processors.delete(value);

      this.triggerEvent();
    }

    async publish() {
      const params = {};

      this._fields.forEach(field => {
        const key = `_${field}`;
        if (this[key]) params[field] = this[key];
      });

      if (params.element) params.element = {
        name: params.element
      };
      if (this._type === 'layout') params.id = params.name;

      try {
        this._set({
          fetching: true,
          error: undefined
        });

        params.applicationId = this._applicationId;
        params.bundles = [this._type];
        params.processors = Array.from(this._processors.keys());
        const action = params.template ? '/builder/module/clone' : '/builder/module/create';
        const response = await module.execute(action, params);

        if (response.error) {
          this._set({
            error: response.error
          });

          return response;
        }

        this._set({
          fetching: false
        });

        return true;
      } catch (exc) {
        console.error(1, exc);
      }
    }

  }
  /********************************
  FILE: builder\bundle\processor.js
  ********************************/


  class BundleProcessor extends ReactiveModel {
    constructor(type) {
      super(type);
    }

  }
  /*********************************
  FILE: builder\bundle\structures.js
  *********************************/


  const Structures = {
    module: {
      fields: ['id', 'name', 'title', 'description', 'developer', 'author', 'template', 'styles', 'server', 'multilanguage']
    },
    page: {
      fields: ['vdir', 'route', 'layoutId', 'element'],
      required: ['route', 'name', 'element'],
      processors: ['ts', 'jsx'],
      dependencies: ['layout']
    },
    widget: {
      fields: ["element"],
      required: ['name', 'element'],
      processors: ['ts', 'scss']
    },
    layout: {
      fields: ["element"],
      required: ['name', 'element'],
      processors: ['ts', 'jsx']
    },
    code: {
      required: ['name'],
      processors: ['ts', 'jsx']
    },
    bridge: {
      required: ['name']
    },
    ts: {
      required: ['name']
    },
    js: {
      required: ['name']
    }
  };
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