define(["exports", "@beyond-js/kernel/core/ts", "@beyond-js/plm/core/ts"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.TemplateProcessorsSources = _exports2.TemplateProcessorsSource = _exports2.TemplateProcessor = _exports2.TemplateOverwrites = _exports2.TemplateOverwrite = _exports2.TemplateGlobals = _exports2.TemplateGlobalSources = _exports2.TemplateGlobalSource = _exports2.TemplateGlobal = _exports2.TemplateApplicationsSources = _exports2.TemplateApplicationsSource = _exports2.TemplateApplication = _exports2.Template = _exports2.RunTimeManager = _exports2.RunTimeError = _exports2.ReactiveModel = _exports2.ProcessorSources = _exports2.ProcessorSource = _exports2.ProcessorOverwrites = _exports2.ProcessorOverwrite = _exports2.ProcessorDependency = _exports2.ProcessorDependencies = _exports2.ProcessorCompilers = _exports2.ProcessorCompiler = _exports2.Processor = _exports2.Modules = _exports2.ModuleTexts = _exports2.ModuleStatics = _exports2.ModuleStatic = _exports2.ModuleDeclarations = _exports2.Module = _exports2.LibraryModules = _exports2.LibraryModule = _exports2.Library = _exports2.LibrariesStatics = _exports2.LibrariesStatic = _exports2.Libraries = _exports2.GlobalBundles = _exports2.GlobalBundle = _exports2.Declarations = _exports2.Declaration = _exports2.Dashboard = _exports2.Consumers = _exports2.Consumer = _exports2.Bundle = _exports2.Bee = _exports2.Applications = _exports2.ApplicationStatics = _exports2.ApplicationStatic = _exports2.ApplicationModules = _exports2.ApplicationModule = _exports2.ApplicationLibrary = _exports2.ApplicationLibraries = _exports2.ApplicationDistributions = _exports2.ApplicationDistribution = _exports2.ApplicationDeployments = _exports2.ApplicationDeployment = _exports2.ApplicationDeclarations = _exports2.Application = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/plm/core/ts', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard-lib/models/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /**********************************************
  INTERNAL MODULE: ./applications/builder/builder
  **********************************************/

  modules.set('./applications/builder/builder', {
    hash: 1453316079,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationBuilder = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _beyond_context = require("beyond_context");

      var _builds = require("./builds");

      class ApplicationBuilder extends _ts.Events {
        #application;
        #builds;

        get builds() {
          return this.#builds;
        }

        #messages = [];

        get messages() {
          return this.#messages;
        }

        #processing;

        get processing() {
          return this.#processing;
        }

        #completed;

        get completed() {
          return this.#completed;
        }
        /**
         * @param application {object} The application
         */


        constructor(application) {
          super();
          this.#application = application;
          this.#builds = new _builds.ApplicationBuilds(application);
        }

        onMessage = message => {
          if (message.type !== 'build/application/message') return;
          this.#processing = false;
          this.#messages.push(message);
          this.trigger('change');
          return;
        };
        #prepared = false;

        async prepare() {
          if (this.#prepared) return;
          this.#prepared = true;

          try {
            const socket = await _beyond_context.module.socket;
            socket.on(`builder:${this.#application.id}`, this.onMessage);
          } catch (exc) {
            console.error(exc.stack);
          }
        }

        async build(distribution) {
          if (typeof distribution !== 'object') throw new Error('Invalid distribution parameter');
          if (!['development', 'production'].includes(distribution.environment)) throw new Error('Parameter "environment" is invalid');
          await this.prepare();
          const specs = {
            name: distribution.name ?? 'unnamed',
            platform: distribution.platform,
            ssr: distribution.ssr,
            environment: distribution.environment,
            compress: !!distribution.compress,
            icons: distribution.icons
          };

          if (distribution.name === 'npm') {
            specs.npm = true;
            specs.platforms = {
              node: true,
              web: true
            };
          }

          await _beyond_context.module.execute('/build', {
            application: this.#application.path,
            distribution: specs
          });
          this.#completed = true;
          this.#processing = false;
        }

        clean() {
          this.#completed = false;
          this.#messages = [];
          this.trigger('change');
        }

      }

      exports.ApplicationBuilder = ApplicationBuilder;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./applications/builder/builds
  *********************************************/

  modules.set('./applications/builder/builds', {
    hash: 158024195,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationBuilds = void 0;

      class ApplicationBuilds {
        #application;

        get value() {
          const builds = this.#application.fields.get('builds');
          return !builds.assigned ? {} : { ...builds.value
          };
        }

        constructor(application) {
          this.#application = application;
        }

      }

      exports.ApplicationBuilds = ApplicationBuilds;
    }
  });
  /*****************************************
  INTERNAL MODULE: ./applications/collection
  *****************************************/

  modules.set('./applications/collection', {
    hash: 2012231745,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Applications = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class Applications extends _ts.Collection {
        constructor(specs) {
          super('applications', _item.Application, specs);
        }

      }

      exports.Applications = Applications;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./applications/declarations
  *******************************************/

  modules.set('./applications/declarations', {
    hash: 889764594,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDeclarations = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _beyond_context = require("beyond_context");

      var _reactiveModel = require("../reactive-model");
      /*bundle*/


      class ApplicationDeclarations extends _reactiveModel.ReactiveModel {
        #application;
        #error;

        get error() {
          return this.#error;
        }

        #total = 0;

        get total() {
          return this.#total;
        }

        #itemsProcessed = 0;

        get itemsProcessed() {
          return this.#itemsProcessed;
        }

        #onProcess;

        get onProcess() {
          return this.#onProcess;
        }

        #success = new Set();

        get success() {
          return this.#success;
        }

        #errors = new Set();

        get errors() {
          return this.#errors;
        }

        clean() {
          this.#total = 0;
          this.#error = '';
          this.#onProcess = '';
          this.#itemsProcessed = 0;
          this.#errors.clear();
          this.#success.clear();
          this.processed = false;
          this.processing = false;
          this.triggerEvent();
        }

        onDeclarationSave(message) {
          void this;
          const {
            item,
            total
          } = message;
          this.#total = total;

          if (!item) {
            this.triggerEvent();
            return;
          }

          this.#onProcess = item.id;
          item.valid ? this.#success.add(item.id) : this.#errors.add(item.id);
          this.#itemsProcessed = this.#success.size + this.#errors.size;
          this.processed = this.#itemsProcessed === this.#total;
          this.processing = this.#itemsProcessed !== this.#total; //when the process finished the declaration in process is cleaned

          this.processed && (this.#onProcess = '');
          this.triggerEvent();
        }

        async initialise() {
          const socket = await _ts.beyond.libraries.get('@beyond-js/dashboard-lib').getSocket();
          socket.on(`declaration-save:${this.#application.id}`, this.onDeclarationSave);
        }

        constructor(application) {
          super();
          this.#application = application;
          this.initialise().catch(exc => console.error(exc.stack));
          this.clean = this.clean.bind(this);
          this.onDeclarationSave = this.onDeclarationSave.bind(this);
        }

        async update(id = false) {
          try {
            if (!this.#application.id) {
              console.warn('the application id is not defined');
              return;
            }

            this.clean();
            this.processing = true;
            const action = id ? '/applications/declarations/update' : '/applications/declarations/updateAll';
            const specs = {
              id: id,
              applicationId: this.#application.id
            };
            const response = await _beyond_context.module.execute(action, specs);

            if (response?.error) {
              this.#error = response.error;
              console.error(response.error);
            }
          } catch (exc) {
            this.#error = exc;
          } finally {
            this.triggerEvent();
          }
        }

      }

      exports.ApplicationDeclarations = ApplicationDeclarations;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./applications/deployments/collection
  *****************************************************/

  modules.set('./applications/deployments/collection', {
    hash: 3131748020,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDeployments = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ApplicationDeployments extends _ts.Collection {
        constructor(specs) {
          super('applications-deployments', _item.ApplicationDeployment, specs);
        }

      }

      exports.ApplicationDeployments = ApplicationDeployments;
    }
  });
  /*******************************************************************
  INTERNAL MODULE: ./applications/deployments/distributions/collection
  *******************************************************************/

  modules.set('./applications/deployments/distributions/collection', {
    hash: 1364804100,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDistributions = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ApplicationDistributions extends _ts.Collection {
        constructor(specs) {
          super('applications-distributions', _item.ApplicationDistribution, specs);
        }

      }

      exports.ApplicationDistributions = ApplicationDistributions;
    }
  });
  /*************************************************************
  INTERNAL MODULE: ./applications/deployments/distributions/item
  *************************************************************/

  modules.set('./applications/deployments/distributions/item', {
    hash: 1900963609,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDistribution = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class ApplicationDistribution extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get local() {
          return this.fields.get('local').value;
        }

        get ssr() {
          return this.fields.get('ssr').value;
        }

        get port() {
          return this.fields.get('port').value;
        }

        get amd() {
          return this.fields.get('amd').value;
        }

        get ts() {
          return this.fields.get('ts').value;
        }

        get platform() {
          return this.fields.get('platform').value;
        }

        get compress() {
          return this.fields.get('compress').value;
        }

        get environment() {
          return this.fields.get('environment').value;
        }

        get default() {
          return this.fields.get('default').value;
        }

        constructor(specs) {
          super('applications-distributions', specs);
        }

      }

      exports.ApplicationDistribution = ApplicationDistribution;
    }
  });
  /*****************************************************************
  INTERNAL MODULE: ./applications/deployments/distributions/register
  *****************************************************************/

  modules.set('./applications/deployments/distributions/register', {
    hash: 906694623,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'local', 'ssr', 'port', 'ts', 'amd', 'platform', 'environment', 'compress', 'default'];
      specs.batch = {
        actions: {
          list: 'applications/deployments/distributions/list',
          data: 'applications/deployments/distributions/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('applications-distributions', specs);
    }
  });
  /***********************************************
  INTERNAL MODULE: ./applications/deployments/item
  ***********************************************/

  modules.set('./applications/deployments/item', {
    hash: 2098909840,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDeployment = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");
      /*bundle*/


      class ApplicationDeployment extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get valid() {
          return this.fields.get('valid').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get distributions() {
          return this.properties.get('distributions');
        }

        constructor(specs) {
          super('applications-deployments', specs);
        }

        async addDistribution(params) {
          const specs = {
            applicationId: this.id,
            distribution: { ...params
            }
          };

          try {
            return _beyond_context.module.execute('builder/project/setDistribution', specs);
          } catch (e) {
            console.error(e);
          }
        }

      }

      exports.ApplicationDeployment = ApplicationDeployment;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./applications/deployments/register
  ***************************************************/

  modules.set('./applications/deployments/register', {
    hash: 2542186834,
    creator: function (require, exports) {
      "use strict";

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./distributions/item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'valid', 'errors', 'distributions'];
      specs.properties = {
        distributions: {
          Items: _item.ApplicationDistribution,
          table: 'applications-distributions',
          identifier: {
            field: 'id',
            source: 'distributions'
          }
        }
      };
      specs.batch = {
        actions: {
          list: 'applications/deployments/list',
          data: 'applications/deployments/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('applications-deployments', specs);
    }
  });
  /***********************************
  INTERNAL MODULE: ./applications/item
  ***********************************/

  modules.set('./applications/item', {
    hash: 1878293943,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Application = void 0;

      var _beyond_context = require("beyond_context");

      var _file = require("../file/file");

      var _builder = require("./builder/builder");

      var _declarations = require("./declarations");
      /*bundle*/


      class Application extends _file.File {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get title() {
          return this.fields.get('title').value;
        }

        get description() {
          return this.fields.get('description').value;
        }

        get developer() {
          return this.fields.get('developer').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get connect() {
          return this.fields.get('connect').value;
        }

        get hosts() {
          return this.fields.get('hosts').value;
        }

        get port() {
          return this.fields.get('port').value;
        }

        get modulesPath() {
          return this.fields.get('modulesPath').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get am() {
          const am = this.properties.get('am');
          return am && am.value;
        }

        get libraries() {
          const libraries = this.properties.get('libraries');
          return libraries && libraries.value;
        }

        get bee() {
          const bee = this.properties.get('bee');
          return bee && bee.value;
        }

        get template() {
          const template = this.properties.get('template');
          return template && template.value;
        }

        get deployment() {
          const deployment = this.properties.get('deployment');
          return deployment && deployment.value;
        }

        get static() {
          const statics = this.properties.get('static');
          return statics && statics.value;
        }

        #builder;

        get builder() {
          return this.#builder;
        }

        get servers() {
          const servers = this.fields.get('servers');
          return !servers.assigned ? [] : [...servers.value];
        }

        get defaultServer() {
          return this.servers.find(server => !!server.default);
        }

        #declarations;

        get declarations() {
          return this.#declarations;
        }

        get url() {
          return this.port ? `http://localhost:${this.port}` : undefined;
        }

        triggerEvent = (event = 'change') => this.node.trigger(event);

        constructor(specs) {
          super('applications', specs);
          this.#builder = new _builder.ApplicationBuilder(this);
          this.#builder.bind('change', this.triggerEvent);
          this.#declarations = new _declarations.ApplicationDeclarations(this);
          this.#declarations.bind('change', this.triggerEvent);
        }

        async checkStatic() {
          try {
            const specs = {
              applicationId: this.id,
              static: {
                "path": "./static"
              }
            };
            await _beyond_context.module.execute('/builder/project/checkStatic', specs);
            this.triggerEvent();
          } catch (e) {
            console.error('Error:', e);
          }
        }

        createBackend() {
          return _beyond_context.module.execute('/builder/project/backend', {
            applicationId: this.id
          });
        }

        async edit(specs) {
          try {
            specs = { ...specs,
              applicationId: this.id
            };
            await _beyond_context.module.execute('/builder/project/edit', specs);
            this.triggerEvent();
          } catch (e) {
            console.error('Error:', e);
          }
        }

        routes() {
          const routes = [];
          this.am && this.am.items.forEach(am => {
            am.bundles.forEach(bundle => bundle.additional?.is === 'page' && routes.push(bundle.additional.route));
          });
          return routes;
        }

      }

      exports.Application = Application;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./applications/libraries/collection
  ***************************************************/

  modules.set('./applications/libraries/collection', {
    hash: 161087978,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationLibraries = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ApplicationLibraries extends _ts.Collection {
        constructor(specs) {
          super('applications-libraries', _item.ApplicationLibrary, specs);
          this.counters.register('all');
        }

      }

      exports.ApplicationLibraries = ApplicationLibraries;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./applications/libraries/item
  *********************************************/

  modules.set('./applications/libraries/item', {
    hash: 296527257,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationLibrary = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _builder = require("../../libraries/builder");
      /*bundle*/


      class ApplicationLibrary extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get application() {
          const application = this.properties.get('application');
          return application && application.value;
        }

        get library() {
          const library = this.properties.get('library');
          return library && library.value;
        }

        #builder;

        get builder() {
          return this.#builder;
        }

        constructor(specs) {
          super('applications-libraries', specs);
          this.onChange = this.onChange.bind(this);
          this.on('change', this.onChange);
        }

        onChange() {
          if (!this.landed || !this.library) return;
          const library = this.library;
          this.#builder = new _builder.LibraryBuilder(library.name);
          this.off('change', this.onChange);
        }

      }

      exports.ApplicationLibrary = ApplicationLibrary;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./applications/libraries/register
  *************************************************/

  modules.set('./applications/libraries/register', {
    hash: 867729569,
    creator: function (require, exports) {
      "use strict";

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("../item");

      var _item2 = require("../../libraries/item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'application', 'library'];
      specs.properties = {
        application: {
          Item: _item.Application,
          table: 'applications',
          identifier: [{
            field: 'id',
            source: 'application'
          }]
        },
        library: {
          Item: _item2.Library,
          table: 'libraries',
          identifier: [{
            field: 'id',
            source: 'library'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: 'applications/libraries/list',
          data: 'applications/libraries/data',
          count: 'applications/libraries/count'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        applications: {
          fields: ['application'],
          batches: {
            application: ['list', 'count']
          }
        }
      };

      _ts.tables.register('applications-libraries', specs);
    }
  });
  /*********************************************
  INTERNAL MODULE: ./applications/modules/bundle
  *********************************************/

  modules.set('./applications/modules/bundle', {
    hash: 1126817507,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationModuleBundle = void 0;

      class ApplicationModuleBundle {
        #module;
        #bundle;
        /**
         * TODO: @julio check, the bundles are not being treat as a modules now.
         */

        get id() {
          return `${this.#module.id}`;
        }

        get type() {
          return this.#bundle.name;
        }

        get moduleId() {
          return this.#module.id;
        }

        get module() {
          return this.#module;
        }

        get hasTxt() {
          return this.#module.bundles.has(`${this.#module.id}//txt`);
        }

        get name() {
          return this.#module.name;
        }

        get description() {
          return this.#module.description;
        }

        constructor(module, bundle) {
          this.#module = module;
          this.#bundle = bundle;
        }

      }

      exports.ApplicationModuleBundle = ApplicationModuleBundle;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./applications/modules/collection
  *************************************************/

  modules.set('./applications/modules/collection', {
    hash: 1516841024,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationModules = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ApplicationModules extends _ts.Collection {
        constructor(specs) {
          super('applications-modules', _item.ApplicationModule, specs);
          this.counters.register('all');
        }

        get elements() {
          if (!this.tree.landed) return [];
          const output = [];
          this.items.forEach(item => {
            output.push(item);
          });
          return output;
        }
        /*
         * Filter the elements by container and bundle defined.
         *
         * @param filter
         * @param bundle
         * @param text
         * @returns {[]|void}
         */


        getItems({
          container = 'application',
          bundle = undefined,
          text = ''
        }) {
          //(container: string = 'application', bundle: undefined | string = undefined, text: string = '') {
          // this function is used if a bundle container is active
          if (container === 'all' && !text) return this.elements; // first we check if is required all containers

          return this.elements.filter(item => {
            const isApp = ['application', 'all'].includes(container) && !item.id.includes('library');
            const isLibrary = ['library', 'all'].includes(container);
            const textSearch = item.id.includes(text) || item?.module?.name?.includes(text);

            if (![undefined, 'all'].includes(bundle) && (isApp || isLibrary)) {
              if (item?.type.includes('widget')) {
                const widget = item.getBundle('widget');
                return widget.type === bundle && textSearch;
              }

              return item.type?.includes(bundle) && textSearch;
            }

            return textSearch && (isApp || isLibrary);
          });
        }

      }

      exports.ApplicationModules = ApplicationModules;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./applications/modules/item
  *******************************************/

  modules.set('./applications/modules/item', {
    hash: 1124796050,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationModule = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");
      /*bundle*/

      /**
       * TODO: The application property is actually undefined.
       * - Load the application property
       * - Set the name of the module checking if the module has one
       *  and if it does not have, return the module.id without the
       *  application id section
       */


      class ApplicationModule extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get application() {
          const application = this.properties.get('application');
          return application && application.value;
        }

        get module() {
          const module = this.properties.get('module');
          return module && module.value;
        }

        get bundles() {
          return this.properties.get('bundles');
        }
        /*
         * Module shortcuts
         */


        get name() {
          const {
            module
          } = this;
          return module?.name;
        }

        set name(value) {
          this.module && (this.module.name = value);
        }

        get description() {
          const {
            module
          } = this;
          return module?.description;
        }

        set description(value) {
          this.module && (this.module.description = value);
        }

        get route() {
          const bundles = this.properties.get('bundles');
          const widget = bundles.get(`${this.id}//widget`);
          return widget?.route;
        }
        /**
         * Metodos migrados desde modulo
         */


        get type() {
          return this.bundles ? [...this.bundles.values()].map(bundle => bundle.name) : undefined;
        }

        get __CLASS__() {
          return 'applications-modules'.toLowerCase();
        }

        get processorsNames() {
          const processors = [];
          this.bundles.forEach(bundle => {
            bundle.processors.forEach(processor => {
              if (!processors.includes(processor.name)) processors.push(processor.name);
            });
          });
          return [...processors];
        }

        constructor(specs) {
          super('applications-modules', specs);
        }
        /**
         * Validate that the bundles have the requested processor
         * @param processor
         * @deprecated
         */


        haveProcessor(processor = 'ts') {
          let find = false;
          this.bundles.forEach(bundle => bundle.hasProcessor(processor) ? find = true : null);
          return find;
        }

        getBundle(name) {
          let bundle = undefined;
          this.bundles.forEach(item => {
            if (item.name === name) bundle = item;
          });
          return bundle;
        }

        saveField(field, value) {
          const specs = {
            moduleId: this.id,
            dirname: this.module.path
          };
          if (field === 'hmr') specs.bundles = {
            hmr: value
          };else if (field === 'transpile') {
            if (!this.haveProcessor()) return;
            specs.bundles = {
              ts: {
                transpile: value
              }
            };
          } else field === 'title' ? specs.title = value : specs.description = value;
          console.log('/builder/module/edit', specs);
          return _beyond_context.module.execute('/builder/module/edit', specs);
        }

        clone(name) {
          return _beyond_context.module.execute('/builder/module/clone', {
            name: name,
            moduleId: this.id
          });
        }

        delete() {
          if (!this.module.path) {
            console.error('The module not have dirname associate it');
            return;
          }

          return _beyond_context.module.execute('/builder/module/delete', {
            target: this.module.path
          });
        }

        createFile(specs) {
          let id = specs.type === 'backend' ? `${this.id}` : `${this.id}//${specs.bundle}//${specs.processor}`;

          if (specs.type && specs.type === 'overwrite') {
            const split = this.id.split('//');
            id = `${split[1]}//${split[2]}//${specs.bundle}`;
          }

          return _beyond_context.module.execute('/sources/create', {
            id: id,
            type: specs.type ?? 'processor',
            filename: specs.filename
          });
        }

        addBundle(params) {
          const specs = {
            moduleId: this.id,
            ...params
          };
          return _beyond_context.module.execute('/builder/module/addBundle', specs);
        }

      }

      exports.ApplicationModule = ApplicationModule;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./applications/modules/register
  ***********************************************/

  modules.set('./applications/modules/register', {
    hash: 2966258795,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../item");

      var _item2 = require("../../modules/item");

      var _item3 = require("../../bundles/item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'application', 'module', 'bundles'];
      specs.properties = {
        application: {
          Item: _item.Application,
          table: 'application',
          identifier: [{
            field: 'id',
            source: 'application'
          }]
        },
        module: {
          Item: _item2.Module,
          table: 'modules',
          identifier: [{
            field: 'id',
            source: 'module'
          }]
        },
        bundles: {
          Items: _item3.Bundle,
          table: 'bundles',
          identifier: {
            field: 'id',
            source: 'bundles'
          }
        }
      };
      specs.batch = {
        actions: {
          list: 'applications/modules/list',
          data: 'applications/modules/data',
          count: 'applications/modules/count'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        applications: {
          fields: ['application'],
          batches: {
            application: ['list', 'count']
          }
        }
      };

      _ts.tables.register('applications-modules', specs);
    }
  });
  /***************************************
  INTERNAL MODULE: ./applications/register
  ***************************************/

  modules.set('./applications/register', {
    hash: 1467085930,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../bees/item");

      var _item2 = require("../templates/item");

      var _collection = require("./static/collection");

      var _collection2 = require("./modules/collection");

      var _item3 = require("./deployments/item");

      var _collection3 = require("./libraries/collection");

      const specs = {};
      specs.cache = false;
      specs.module = _beyond_context.module; //TODO check fields @box 'servers', 'builds','declarations'

      specs.fields = ['id', 'path', 'name', 'title', 'description', 'developer', 'version', 'connect', 'hosts', 'port', 'static', 'modulesPath', 'bee', 'errors', 'warnings', 'servers', 'builds', 'declarations'];
      specs.properties = {
        am: {
          Collection: _collection2.ApplicationModules,
          table: 'applications-modules',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        },
        libraries: {
          Collection: _collection3.ApplicationLibraries,
          table: 'applications-libraries',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        },
        bee: {
          Item: _item.Bee,
          table: 'bees',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'bee'
          }]
        },
        template: {
          Item: _item2.Template,
          table: 'templates',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        },
        static: {
          Collection: _collection.ApplicationStatics,
          table: 'applications-static',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        },
        deployment: {
          Item: _item3.ApplicationDeployment,
          table: 'applications-deployments',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: 'applications/list',
          data: 'applications/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        name: {
          fields: ['name'],
          unique: true
        }
      };

      _ts.tables.register('applications', specs);
    }
  });
  /************************************************
  INTERNAL MODULE: ./applications/static/collection
  ************************************************/

  modules.set('./applications/static/collection', {
    hash: 1775327297,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationStatics = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ApplicationStatics extends _ts.Collection {
        constructor(specs) {
          super('applications-static', _item.ApplicationStatic, specs);
        }

      }

      exports.ApplicationStatics = ApplicationStatics;
    }
  });
  /******************************************
  INTERNAL MODULE: ./applications/static/item
  ******************************************/

  modules.set('./applications/static/item', {
    hash: 851612974,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationStatic = void 0;

      var _source = require("../../sources/source");
      /*bundle*/


      class ApplicationStatic extends _source.Source {
        get id() {
          return this.fields.get('id').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get pathname() {
          return this.fields.get('pathname').value;
        }

        constructor(specs) {
          super('applications-static', specs);
        }

      }

      exports.ApplicationStatic = ApplicationStatic;
    }
  });
  /**********************************************
  INTERNAL MODULE: ./applications/static/register
  **********************************************/

  modules.set('./applications/static/register', {
    hash: 1982790997,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative', 'pathname'];
      specs.batch = {
        actions: {
          list: 'applications/static/list',
          data: 'applications/static/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        applications: {
          fields: ['application']
        }
      };

      _ts.tables.register('applications-static', specs);
    }
  });
  /**************************************
  INTERNAL MODULE: ./bees/builder/builder
  **************************************/

  modules.set('./bees/builder/builder', {
    hash: 1869070163,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ServiceBuilder = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _beyond_context = require("beyond_context");

      var _builds = require("./builds");

      class ServiceBuilder extends _ts.Events {
        #bee;
        #builds;

        get builds() {
          return this.#builds;
        }

        #messages = [];

        get messages() {
          return this.#messages;
        }

        constructor(bee) {
          super();
          this.#bee = bee;
          this.#builds = new _builds.ServiceBuilds(bee);
        }

        onMessage(message) {
          this.#messages.push(message);
          this.trigger('change');
        }

        id() {
          return this.#bee.fields.get('id').value;
        }

        async prepare() {
          try {
            //TODO validar con @box la para importar beyond
            // await beyond.rpc.prepare();
            const socket = await _beyond_context.module.socket;
            const event = `server:build-service-${this.id()}`;
            socket.on(event, this.onMessage);
          } catch (exc) {
            console.error(exc.stack);
          }
        }

        async build(distribution) {
          if (typeof distribution !== 'object') {
            throw new Error('Invalid distribution parameter');
          }

          if (!['development', 'production'].includes(distribution.environment)) {
            throw new Error('Parameter "environment" is invalid');
          }

          try {
            await this.prepare();
          } catch (exc) {
            console.error(exc.stack);
          }

          const specs = {
            name: distribution.environment,
            service: this.id(),
            environment: distribution.environment
          };
          return await _beyond_context.module.execute('/build/service', specs);
        }

      }

      exports.ServiceBuilder = ServiceBuilder;
    }
  });
  /*************************************
  INTERNAL MODULE: ./bees/builder/builds
  *************************************/

  modules.set('./bees/builder/builds', {
    hash: 491302476,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ServiceBuilds = void 0;

      class ServiceBuilds {
        #bee;

        get value() {
          const builds = this.#bee.fields.get('builds');
          return !builds.assigned ? {} : { ...builds.value
          };
        }

        constructor(bee) {
          this.#bee = bee;
        }

      }

      exports.ServiceBuilds = ServiceBuilds;
    }
  });
  /***************************
  INTERNAL MODULE: ./bees/item
  ***************************/

  modules.set('./bees/item', {
    hash: 2261579261,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bee = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _builder = require("./builder/builder");
      /*bundle*/


      class Bee extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get enabled() {
          return this.fields.get('enabled').value;
        }

        get status() {
          return this.fields.get('status').value;
        }

        get builds() {
          return this.fields.get('builds').value;
        }

        get exception() {
          return this.fields.get('exception').value;
        }

        get port() {
          return this.fields.get('port').value;
        }

        get pid() {
          return this.fields.get('pid').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        #builder;

        get builder() {
          return this.#builder;
        }

        constructor(specs) {
          super('bees', specs);
          this.#builder = new _builder.ServiceBuilder(this);
        }

        start() {
          return _beyond_context.module.execute('bees/start', {
            id: this.id
          });
        }

        stop() {
          return _beyond_context.module.execute('bees/stop', {
            id: this.id
          });
        }

        restart() {
          return _beyond_context.module.execute('bees/restart', {
            id: this.id
          });
        }

        createFile(specs) {
          const params = {
            id: this.id,
            type: 'bees',
            identifier: specs.type ?? 'core',
            filename: specs.filename
          };
          return _beyond_context.module.execute('/sources/create', params);
        }

      }

      exports.Bee = Bee;
    }
  });
  /*******************************
  INTERNAL MODULE: ./bees/register
  *******************************/

  modules.set('./bees/register', {
    hash: 1826232712,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false; //TODO @ftovar agregar field is

      specs.fields = ['id', 'path', 'version', 'name', 'enabled', 'status', 'builds', 'exception', 'port', 'pid', 'errors'];
      specs.batch = {
        actions: {
          list: '',
          data: 'bees/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('bees', specs);
    }
  });
  /**********************************************
  INTERNAL MODULE: ./bundles/consumers/collection
  **********************************************/

  modules.set('./bundles/consumers/collection', {
    hash: 2259325720,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Consumers = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class Consumers extends _ts.Collection {
        constructor(specs) {
          super('bundles-consumers', _item.Consumer, specs);
        }

      }

      exports.Consumers = Consumers;
    }
  });
  /****************************************
  INTERNAL MODULE: ./bundles/consumers/item
  ****************************************/

  modules.set('./bundles/consumers/item', {
    hash: 2941718289,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Consumer = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class Consumer extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get bundle() {
          const bundle = this.properties.get('bundle');
          return bundle && bundle.value;
        }

        get moduleId() {
          return this.fields.get('module_id').value;
        }

        get bundleId() {
          return this.fields.get('bundle').value;
        }

        constructor(specs) {
          super('bundles-consumers', specs);
        }

      }

      exports.Consumer = Consumer;
    }
  });
  /********************************************
  INTERNAL MODULE: ./bundles/consumers/register
  ********************************************/

  modules.set('./bundles/consumers/register', {
    hash: 3532777880,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'bundle', 'module_id'];
      specs.properties = {
        bundle: {
          Item: _item.Bundle,
          table: 'bundles',
          identifier: [{
            field: 'id',
            source: 'bundle'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: 'applications/modules/bundles/consumers/list',
          data: 'applications/modules/bundles/consumers/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        bundles: {
          fields: ['bundle'],
          batches: {
            bundle: ['list']
          }
        }
      };

      _ts.tables.register('bundles-consumers', specs);
    }
  });
  /********************************************
  INTERNAL MODULE: ./bundles/globals/collection
  ********************************************/

  modules.set('./bundles/globals/collection', {
    hash: 409546233,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GlobalBundles = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class GlobalBundles extends _ts.Collection {
        constructor(specs) {
          super('global-bundles', _item.GlobalBundle, specs);
        }

      }

      exports.GlobalBundles = GlobalBundles;
    }
  });
  /**************************************
  INTERNAL MODULE: ./bundles/globals/item
  **************************************/

  modules.set('./bundles/globals/item', {
    hash: 1304775341,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GlobalBundle = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class GlobalBundle extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get processors() {
          return this.fields.get('processors').value;
        }

        get multilanguage() {
          return !!this.fields.get('multilanguage').value;
        }

        constructor(specs) {
          super('global-bundles', specs);
        }

      }

      exports.GlobalBundle = GlobalBundle;
    }
  });
  /******************************************
  INTERNAL MODULE: ./bundles/globals/register
  ******************************************/

  modules.set('./bundles/globals/register', {
    hash: 3706387622,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'processors', 'multilanguage'];
      specs.batch = {
        actions: {
          list: 'bundles/list',
          data: 'bundles/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('global-bundles', specs);
    }
  });
  /******************************
  INTERNAL MODULE: ./bundles/item
  ******************************/

  modules.set('./bundles/item', {
    hash: 3634067425,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bundle = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");
      /*bundle*/


      class Bundle extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get pathname() {
          return this.fields.get('pathname').value;
        }

        get route() {
          return this.fields.get('route').value;
        }

        get layout() {
          return this.fields.get('layout').value;
        }

        get type() {
          return this.fields.get('is').value ?? this.name;
        }

        get updated() {
          return this.fields.get('updated').value;
        }

        get destroyed() {
          return this.fields.get('destroyed').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get element() {
          return this.fields.get('element').value;
        }

        get processors() {
          const output = new Map();
          const processors = this.properties.get('processors');
          processors && processors.forEach(processor => {
            if (!processor.landed) return;
            const name = processor.fields.get('name').value;
            output.set(name, processor);
          });
          return output;
        }

        get consumers() {
          const consumers = this.properties.get('consumers');
          return consumers && consumers.value;
        }

        get container() {
          const container = this.properties.get('container');
          return container && container.value;
        }

        get compilerProcessorActivate() {
          return this.fields.get('compilerProcessorActivate').value;
        }

        constructor(specs) {
          super('bundles', specs);
        }

        hasProcessor(name) {
          let find = false;
          const processors = this.properties.get('processors');
          processors.forEach(processor => {
            if (!processor.landed) return;
            const processorName = processor.fields.get('name').value;
            if (name === processorName) find = true;
          });
          return find;
        }

        async createFile(specs) {
          return _beyond_context.module.execute('/sources/create', specs);
        }

        async delete(specs) {
          return _beyond_context.module.execute('/sources/delete', specs);
        }

      }

      exports.Bundle = Bundle;
    }
  });
  /**********************************
  INTERNAL MODULE: ./bundles/register
  **********************************/

  modules.set('./bundles/register', {
    hash: 4079369894,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../processors/item");

      var _collection = require("./consumers/collection");

      var _item2 = require("../applications/modules/item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'errors', 'warnings', 'processors', 'updated', 'destroyed', 'extname', 'pathname', 'is', 'route', 'layout', 'element', 'compiler_processor_activate'];
      specs.properties = {
        processors: {
          Items: _item.Processor,
          table: 'processors',
          identifier: {
            field: 'id',
            source: 'processors'
          }
        },
        consumers: {
          Collection: _collection.Consumers,
          table: 'bundles-consumers',
          filter: [{
            field: 'bundle',
            source: 'id'
          }]
        },
        container: {
          tables: ['applications-modules'],
          selector: item => {
            const id = item.fields.get('id');

            if (typeof id !== 'object') {
              console.warn('Invalid id value', id);
              return;
            }

            if (!id.assigned) return;
            let amId = id.value.split('//');
            amId = amId.slice(0, amId.length - 1).join('//');
            return {
              Item: _item2.ApplicationModule,
              table: 'applications-modules',
              identifier: {
                id: amId
              }
            };
          }
        }
      };
      specs.batch = {
        actions: {
          list: '',
          data: 'applications/modules/bundles/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('bundles', specs);
    }
  });
  /*********************************
  INTERNAL MODULE: ./dashboard/model
  *********************************/

  modules.set('./dashboard/model', {
    hash: 494242649,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Dashboard = void 0;

      var _beyond_context = require("beyond_context");

      var _reactiveModel = require("../reactive-model");
      /*bundle*/


      const Dashboard = new class extends _reactiveModel.ReactiveModel {
        get ready() {
          return !!this.#wd;
        }

        #wd;

        get wd() {
          return this.#wd;
        }

        #validPort;

        get validPort() {
          return this.#validPort;
        }

        constructor() {
          super();
          this.getWD();
        }

        validate(hash) {
          return _beyond_context.module.execute('/dashboard/validate', {
            hash: hash
          });
        }

        cleanCache = () => _beyond_context.module.execute('/dashboard/cleanCache');

        async checkPort(port) {
          if (!port) throw new Error('port to check is required');
          this.processing = true;

          try {
            const path = 'builder/project/checkPort';
            const response = await _beyond_context.module.execute(path, {
              port: port
            });
            this.processing = false;
            return response.valid;
          } catch (error) {
            this.processing = false;
            this.#validPort = false;
            this.processed = true;
          }
        }

        async availablePort(intents = 5) {
          let cont = 0;
          let port = 8080;

          while (cont < intents) {
            const available = await this.checkPort(port);
            if (available) break;
            port = port - 100;
          }

          return port;
        }

        async getWD() {
          this.processing = true;

          try {
            const response = await _beyond_context.module.execute('/dashboard/getWD');
            this.processing = false;
            this.#wd = response.data.wd;
            return this.#wd;
          } catch (error) {
            this.processing = false;
            this.#validPort = false;
            this.processed = true;
          }
        }

      }();
      exports.Dashboard = Dashboard;
    }
  });
  /*****************************************
  INTERNAL MODULE: ./declarations/collection
  *****************************************/

  modules.set('./declarations/collection', {
    hash: 581029645,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Declarations = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class Declarations extends _ts.Collection {
        constructor(specs) {
          super('declarations', _item.Declaration, specs);
        }

      }

      exports.Declarations = Declarations;
    }
  });
  /***********************************
  INTERNAL MODULE: ./declarations/item
  ***********************************/

  modules.set('./declarations/item', {
    hash: 281899466,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Declaration = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class Declaration extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get code() {
          return this.fields.get('code').value;
        }

        get processed() {
          return this.fields.get('processed').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        constructor(specs) {
          super('declarations', specs);
        }

      }

      exports.Declaration = Declaration;
    }
  });
  /***************************************
  INTERNAL MODULE: ./declarations/register
  ***************************************/

  modules.set('./declarations/register', {
    hash: 3629953601,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'code', 'processed', 'errors', 'warnings'];
      specs.batch = {
        actions: {
          list: '',
          data: 'declarations/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('declarations', specs);
    }
  });
  /***************************
  INTERNAL MODULE: ./file/file
  ***************************/

  modules.set('./file/file', {
    hash: 2203955401,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.File = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      class File extends _ts.Item {
        constructor(table, specs) {
          super(table, specs);
        }

        deleteFolder(folder) {
          if (!this.path) {
            console.error('The module not have dirname associate it');
            return;
          }

          return _beyond_context.module.execute('/sources/delete', {
            target: `${this.path}\\${folder}`
          });
        }

      }

      exports.File = File;
    }
  });
  /***********************************
  INTERNAL MODULE: ./libraries/builder
  ***********************************/

  modules.set('./libraries/builder', {
    hash: 4091023898,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibraryBuilder = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");

      class LibraryBuilder extends _ts.Events {
        #library;
        #messages = [];

        get messages() {
          return this.#messages;
        }
        /**
         * @param library {string} The library name
         * @constructor
         */


        constructor(library) {
          super();
          this.#library = library;
        }

        onMessage(message) {
          this.#messages.push(message);
          this.trigger('change');
        }

        prepare = async () => {
          try {
            //TODO validar con @box la para importar beyond
            // await beyond.rpc.prepare();
            const socket = await _beyond_context.module.socket;
            const event = `server:build-library-${this.#library}-server`;
            socket.on(event, this.onMessage);
          } catch (exc) {
            console.error(exc.stack);
          }
        };

        async build(specs) {
          specs = specs ? specs : {};

          if (typeof specs !== 'object') {
            throw new Error('Invalid parameters');
          }

          await this.prepare();
          return await _beyond_context.module.execute('/build/library', {
            name: this.#library
          });
        }

      }

      exports.LibraryBuilder = LibraryBuilder;
    }
  });
  /**************************************
  INTERNAL MODULE: ./libraries/collection
  **************************************/

  modules.set('./libraries/collection', {
    hash: 4079938874,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Libraries = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class Libraries extends _ts.Collection {
        constructor(specs) {
          super('libraries', _item.Library, specs);
        }

      }

      exports.Libraries = Libraries;
    }
  });
  /********************************
  INTERNAL MODULE: ./libraries/item
  ********************************/

  modules.set('./libraries/item', {
    hash: 2648880293,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Library = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _builder = require("./builder");
      /*bundle*/


      class Library extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get title() {
          return this.fields.get('title').value;
        }

        get description() {
          return this.fields.get('description').value;
        }

        get developer() {
          return this.fields.get('developer').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get connect() {
          return this.fields.get('connect').value;
        }

        get hosts() {
          return this.fields.get('hosts').value;
        }

        get static() {
          return this.fields.get('static').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get bee() {
          const bee = this.properties.get('bee');
          return bee && bee.value;
        }

        get modules() {
          const modules = this.properties.get('modules');
          return modules && modules.value;
        }

        get statics() {
          return this.properties.get('static');
        }

        #builder;

        get builder() {
          return this.#builder;
        }

        constructor(specs) {
          super('libraries', specs);
          this.onReady = this.onReady.bind(this);
          this.bind('change', this.onReady);
        }

        onChange = () => this.node.trigger('change');

        onReady() {
          if (!this.landed || !!this.#builder) return;
          this.#builder = new _builder.LibraryBuilder(this.name);
          this.#builder.on('change', this.onChange);
          this.off('change', this.onReady);
        }

      }

      exports.Library = Library;
    }
  });
  /**********************************************
  INTERNAL MODULE: ./libraries/modules/collection
  **********************************************/

  modules.set('./libraries/modules/collection', {
    hash: 1012036264,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibraryModules = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class LibraryModules extends _ts.Collection {
        constructor(specs) {
          super('libraries-modules', _item.LibraryModule, specs);
          this.counters.register('all');
        }

      }

      exports.LibraryModules = LibraryModules;
    }
  });
  /****************************************
  INTERNAL MODULE: ./libraries/modules/item
  ****************************************/

  modules.set('./libraries/modules/item', {
    hash: 2039537654,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibraryModule = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class LibraryModule extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get library() {
          const library = this.properties.get('library');
          return library && library.value;
        }

        get module() {
          const module = this.properties.get('module');
          return module && module.value;
        }

        constructor(specs) {
          super('libraries-modules', specs);
        }

      }

      exports.LibraryModule = LibraryModule;
    }
  });
  /********************************************
  INTERNAL MODULE: ./libraries/modules/register
  ********************************************/

  modules.set('./libraries/modules/register', {
    hash: 4126334953,
    creator: function (require, exports) {
      "use strict";

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("../item");

      var _item2 = require("../../modules/item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'library'];
      specs.properties = {
        library: {
          Item: _item.Library,
          table: 'libraries',
          identifier: [{
            field: 'id',
            source: 'library'
          }]
        },
        module: {
          Item: _item2.Module,
          table: 'modules',
          identifier: [{
            field: 'id',
            source: 'module'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: 'libraries/modules/list',
          data: 'libraries/modules/data',
          count: 'libraries/modules/count'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        library: {
          fields: ['library'],
          batches: {
            library: ['list', 'count']
          }
        }
      };

      _ts.tables.register('libraries-modules', specs);
    }
  });
  /************************************
  INTERNAL MODULE: ./libraries/register
  ************************************/

  modules.set('./libraries/register', {
    hash: 897350189,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../bees/item");

      var _item2 = require("./static/item");

      var _collection = require("./modules/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'path', 'name', 'title', 'description', 'developer', 'version', 'connect', 'hosts', 'port', 'static', 'bee', 'errors', 'warnings'];
      specs.properties = {
        modules: {
          Collection: _collection.LibraryModules,
          table: 'libraries-modules',
          filter: [{
            field: 'library',
            source: 'id'
          }]
        },
        bee: {
          Item: _item.Bee,
          table: 'bees',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'bee'
          }]
        },
        static: {
          Items: _item2.LibrariesStatic,
          table: 'libraries-static',
          identifier: {
            field: 'id',
            source: 'id'
          }
        }
      };
      specs.batch = {
        actions: {
          list: 'libraries/list',
          data: 'libraries/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        name: {
          fields: ['name'],
          unique: true
        }
      };

      _ts.tables.register('libraries', specs);
    }
  });
  /*********************************************
  INTERNAL MODULE: ./libraries/static/collection
  *********************************************/

  modules.set('./libraries/static/collection', {
    hash: 1432429389,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibrariesStatics = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class LibrariesStatics extends _ts.Collection {
        constructor(specs) {
          super('libraries-static', _item.LibrariesStatic, specs);
        }

      }

      exports.LibrariesStatics = LibrariesStatics;
    }
  });
  /***************************************
  INTERNAL MODULE: ./libraries/static/item
  ***************************************/

  modules.set('./libraries/static/item', {
    hash: 1875209156,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibrariesStatic = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class LibrariesStatic extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get pathname() {
          return this.fields.get('pathname').value;
        }

        constructor(specs) {
          super('libraries-static', specs);
        }

      }

      exports.LibrariesStatic = LibrariesStatic;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./libraries/static/register
  *******************************************/

  modules.set('./libraries/static/register', {
    hash: 3468431867,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative', 'pathname'];
      specs.batch = {
        actions: {
          list: 'libraries/static/list',
          data: 'libraries/static/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('libraries-static', specs);
    }
  });
  /************************************
  INTERNAL MODULE: ./modules/collection
  ************************************/

  modules.set('./modules/collection', {
    hash: 2089886534,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Modules = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class Modules extends _ts.Collection {
        constructor(specs) {
          super('modules', _item.Module, specs);
        }

      }

      exports.Modules = Modules;
    }
  });
  /**************************************
  INTERNAL MODULE: ./modules/declarations
  **************************************/

  modules.set('./modules/declarations', {
    hash: 1279662994,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleDeclarations = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle*/


      class ModuleDeclarations extends _ts.Events {
        #parent;
        #errors;

        get errors() {
          return this.#errors;
        }

        #fetching;

        get fetching() {
          return this.#fetching;
        }

        constructor(parent) {
          super();
          this.#parent = parent;
        }

        has(type) {
          let find = false;
          const bundles = this.#parent.properties.get('bundles');
          bundles.forEach(bundle => {
            if (type === bundle.fields.get('name').value) {
              find = true;
            }
          });
          return find;
        }

        async update() {
          if (!this.has('ts')) {
            console.warn('the module does not use declarations');
            return;
          }

          try {
            const action = '/modules/declarations/update';
            const id = {
              id: this.#parent.fields.get('id').value
            };
            const response = await _beyond_context.module.execute(action, id);

            if (response?.error) {
              this.#errors = response.error;
              console.error('Error Creating module: ', response.error);
              return;
            }
          } catch (error) {
            this.#errors = error;
          } finally {
            this.#fetching = false;
            this.trigger('change');
          }
        }

      }

      exports.ModuleDeclarations = ModuleDeclarations;
    }
  });
  /******************************
  INTERNAL MODULE: ./modules/item
  ******************************/

  modules.set('./modules/item', {
    hash: 277539939,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Module = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _texts = require("./texts");

      var _declarations = require("./declarations");
      /*bundle*/


      class Module extends _ts.Item {
        #declarations;

        get declarations() {
          return this.#declarations;
        }

        get id() {
          return this.fields.get('id').value;
        }

        #name;

        get name() {
          return this.#name ?? this.fields.get('name').value;
        }

        set name(value) {
          if (this.#name === value) return;
          this.#name = value;
        }

        get tu() {
          return this.fields.get('tu').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get pathname() {
          return this.fields.get('pathname').value;
        }

        #title;

        get title() {
          return this.#title ?? this.fields.get('title').value;
        }

        set title(value) {
          this.#title = value;
        }

        #description;

        get description() {
          return this.#description ?? this.fields.get('description').value;
        }

        set description(value) {
          if (this.#description === value) return;
          this.#description = value;
        }

        get hmr() {
          return this.fields.get('hmr').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get bundles() {
          return this.properties.get('bundles');
        }

        get static() {
          const statics = this.properties.get('static');
          return statics && statics.value;
        }

        get container() {
          const container = this.properties.get('container');
          return container && container.value;
        }

        #texts;

        get texts() {
          return this.#texts;
        }

        constructor(specs) {
          super('modules', specs);
          this.#texts = new _texts.ModuleTexts(this);
          this.#declarations = new _declarations.ModuleDeclarations(this);
          this.#declarations.on('change', () => this.node.trigger('change'));
        }
        /**
         *  Checks if the folder where files going to be located exist.
         */


        checkStatic() {
          const specs = {
            moduleId: this.id,
            static: {
              "path": "./static"
            }
          };
          return _beyond_context.module.execute('/builder/module/edit', specs);
        }

      }

      exports.Module = Module;
    }
  });
  /**********************************
  INTERNAL MODULE: ./modules/register
  **********************************/

  modules.set('./modules/register', {
    hash: 2836517847,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../bundles/item");

      var _item2 = require("../libraries/item");

      var _item3 = require("../applications/item");

      var _collection = require("./static/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'tu', 'path', 'pathname', 'title', 'description', 'hmr', 'bundles', 'container', 'errors', 'warnings'];
      specs.properties = {
        bundles: {
          Items: _item.Bundle,
          table: 'bundles',
          identifier: {
            field: 'id',
            source: 'bundles'
          }
        },
        static: {
          Collection: _collection.ModuleStatics,
          table: 'modules-static',
          filter: [{
            field: 'module',
            source: 'id'
          }]
        },
        container: {
          tables: ['applications', 'libraries'],
          selector: item => {
            const container = item.fields.get('container');
            if (!container.assigned) return;

            if (typeof container !== 'object') {
              console.warn('Invalid container value', container);
              return;
            }

            const {
              is,
              name
            } = container.value;

            if (!['application', 'library'].includes(is)) {
              console.warn(`Invalid container type "${is}"`);
              return;
            }

            return {
              Item: is === 'application' ? _item3.Application : _item2.Library,
              table: is === 'application' ? 'application' : 'library',
              identifier: {
                name: name
              }
            };
          }
        }
      };
      specs.batch = {
        actions: {
          list: 'modules/list',
          data: 'modules/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('modules', specs);
    }
  });
  /*******************************************
  INTERNAL MODULE: ./modules/static/collection
  *******************************************/

  modules.set('./modules/static/collection', {
    hash: 614819323,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleStatics = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ModuleStatics extends _ts.Collection {
        constructor(specs) {
          super('modules-static', _item.ModuleStatic, specs);
        }

      }

      exports.ModuleStatics = ModuleStatics;
    }
  });
  /*************************************
  INTERNAL MODULE: ./modules/static/item
  *************************************/

  modules.set('./modules/static/item', {
    hash: 531806800,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleStatic = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");
      /*bundle*/


      class ModuleStatic extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        get pathname() {
          return this.fields.get('pathname').value;
        }

        get overwrite() {
          return this.fields.get('overwrite').value;
        }

        constructor(specs) {
          super('modules-static', specs);
        }

        upload(specs) {
          const [, applicationId, moduleName] = this.id.split('//');
          const overwrites = [];
          const overwrite = {
            module: moduleName,
            bundle: 'static',
            static: {}
          };
          overwrite.static[specs.origin] = specs.overwrite;
          overwrites.push(overwrite);
          return _beyond_context.module.execute('builder/template/update', {
            applicationId: parseInt(applicationId),
            overwrites: overwrites
          });
        }

        async delete(overwrite) {
          if (!overwrite) {
            await _beyond_context.module.execute('sources/delete', {
              target: this.file
            });
          }

          if (!this.overwrite) return;
          const [, applicationId, moduleName] = this.id.split('//');
          const params = {
            applicationId: parseInt(applicationId),
            overwrites: [{
              module: moduleName,
              bundle: 'static'
            }]
          };
          await _beyond_context.module.execute('builder/template/delete', params);
          await _beyond_context.module.execute('sources/delete', {
            target: this.overwrite.file
          });
        }

      }

      exports.ModuleStatic = ModuleStatic;
    }
  });
  /*****************************************
  INTERNAL MODULE: ./modules/static/register
  *****************************************/

  modules.set('./modules/static/register', {
    hash: 381746544,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative', 'pathname', 'overwrite'];
      specs.batch = {
        actions: {
          list: 'modules/static/list',
          data: 'modules/static/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        modules: {
          fields: ['module']
        }
      };

      _ts.tables.register('modules-static', specs);
    }
  });
  /*******************************
  INTERNAL MODULE: ./modules/texts
  *******************************/

  modules.set('./modules/texts', {
    hash: 2654663686,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleTexts = void 0;
      /*bundle*/

      class ModuleTexts {
        #parent;

        get has() {
          return !!this.#parent.getBundle('txt');
        }

        get value() {
          return this.#parent.getBundle('txt');
        }

        constructor(parent) {
          this.#parent = parent;
        }

        get(property, language = 'spa') {
          let texts;
          let bundle;
          this.#parent.bundles.forEach(b => b.name === 'txt' ? bundle = b : null);
          if (!bundle) return;
          const processor = bundle.processors.get('txt');
          processor.sources.items.forEach(source => {
            texts = source && JSON.parse(source.code);
          });
          return texts && texts[language][property];
        }

      }

      exports.ModuleTexts = ModuleTexts;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./processors/compilers/collection
  *************************************************/

  modules.set('./processors/compilers/collection', {
    hash: 356220319,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorCompilers = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ProcessorCompilers extends _ts.Collection {
        constructor(specs) {
          super('processors-compilers', _item.ProcessorCompiler, specs);
        }

      }

      exports.ProcessorCompilers = ProcessorCompilers;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./processors/compilers/item
  *******************************************/

  modules.set('./processors/compilers/item', {
    hash: 2150884602,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorCompiler = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class ProcessorCompiler extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get diagnostics() {
          const diagnostics = this.fields.get('diagnostics').value;
          return {
            general: diagnostics?.general ?? [],
            files: new Map(diagnostics?.files),
            overwrites: new Map(diagnostics?.overwrites),
            dependencies: new Map(diagnostics?.dependencies)
          };
        }

        constructor(specs) {
          super('processors-compilers', specs);
        }

      }

      exports.ProcessorCompiler = ProcessorCompiler;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./processors/compilers/register
  ***********************************************/

  modules.set('./processors/compilers/register', {
    hash: 2956075404,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'diagnostics'];
      specs.batch = {
        actions: {
          list: '',
          data: 'applications/modules/bundles/processors/compilers/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('processors-compilers', specs);
    }
  });
  /****************************************************
  INTERNAL MODULE: ./processors/dependencies/collection
  ****************************************************/

  modules.set('./processors/dependencies/collection', {
    hash: 1572278508,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorDependencies = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ProcessorDependencies extends _ts.Collection {
        constructor(specs) {
          super('processors-dependencies', _item.ProcessorDependency, specs);
        }

      }

      exports.ProcessorDependencies = ProcessorDependencies;
    }
  });
  /**********************************************
  INTERNAL MODULE: ./processors/dependencies/item
  **********************************************/

  modules.set('./processors/dependencies/item', {
    hash: 3480908019,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorDependency = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class ProcessorDependency extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get is() {
          return this.fields.get('is').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get external() {
          return this.fields.get('external').value;
        }

        get resource() {
          return this.fields.get('resource').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get bundle() {
          const bundle = this.properties.get('bundle');
          return bundle && bundle.value;
        }

        get declaration() {
          const declaration = this.properties.get('declaration');
          return declaration && declaration.value;
        }

        get moduleId() {
          return this.fields.get('module_id').value;
        }

        get bundleId() {
          return this.fields.get('bundle_id').value;
        }

        constructor(specs) {
          super('processors-dependencies', specs);
        }

      }

      exports.ProcessorDependency = ProcessorDependency;
    }
  });
  /**************************************************
  INTERNAL MODULE: ./processors/dependencies/register
  **************************************************/

  modules.set('./processors/dependencies/register', {
    hash: 978116073,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("../../bundles/item");

      var _item2 = require("../../declarations/item");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'is', 'version', 'external', 'resource', 'errors', 'warnings', 'declaration', 'sources', 'module_id', 'bundle_id'];
      specs.properties = {
        bundle: {
          Item: _item.Bundle,
          table: 'bundles',
          identifier: [{
            field: 'id',
            source: 'bundle_id'
          }]
        },
        declaration: {
          Item: _item2.Declaration,
          table: 'declarations',
          identifier: [{
            field: 'id',
            source: 'declaration'
          }]
        } //TODO agregar propiedad con acceso al file sources:{}

      }; //TODO @ftovar crear propiedad de tipo Items a la tabla processor-sources con el campo is como relacion

      specs.batch = {
        actions: {
          list: 'applications/modules/bundles/processors/dependencies/list',
          data: 'applications/modules/bundles/processors/dependencies/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        dependencies: {
          fields: ['processor']
        }
      };

      _ts.tables.register('processors-dependencies', specs);
    }
  });
  /*********************************
  INTERNAL MODULE: ./processors/item
  *********************************/

  modules.set('./processors/item', {
    hash: 2271235667,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Processor = void 0;

      var _beyond_context = require("beyond_context");

      var _file = require("../file/file");
      /*bundle*/


      class Processor extends _file.File {
        get id() {
          return this.fields.get('id').value;
        }

        get name() {
          return this.fields.get('name').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get updated() {
          return this.fields.get('updated').value;
        }

        get destroyed() {
          return this.fields.get('destroyed').value;
        }

        get multilanguage() {
          return this.fields.get('multilanguage').value;
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get sources() {
          const sources = this.properties.get('sources');
          return sources && sources.value;
        }

        get overwrites() {
          const overwrites = this.properties.get('overwrites');
          return overwrites && overwrites.value;
        }

        get compiler() {
          const compiler = this.properties.get('compiler');
          return compiler && compiler.value;
        }

        get dependencies() {
          const dependencies = this.properties.get('dependencies');
          return dependencies && dependencies.value;
        }

        #alerts = new Map();

        get alerts() {
          return this.#alerts;
        }

        constructor(specs) {
          super('processors', specs);
        }

        async createFile(specs) {
          //TODO: @julio @felix, check overwrites logic
          const params = {
            id: this.id,
            type: 'processor',
            filename: specs.filename
          };
          return _beyond_context.module.execute('/sources/create', params);
        }

      }

      exports.Processor = Processor;
    }
  });
  /**************************************************
  INTERNAL MODULE: ./processors/overwrites/collection
  **************************************************/

  modules.set('./processors/overwrites/collection', {
    hash: 3793641523,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorOverwrites = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ProcessorOverwrites extends _ts.Collection {
        constructor(specs) {
          super('processors-overwrites', _item.ProcessorOverwrite, specs);
        }

      }

      exports.ProcessorOverwrites = ProcessorOverwrites;
    }
  });
  /********************************************
  INTERNAL MODULE: ./processors/overwrites/item
  ********************************************/

  modules.set('./processors/overwrites/item', {
    hash: 2279906987,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorOverwrite = void 0;

      var _source = require("../../sources/source");
      /*bundle*/


      class ProcessorOverwrite extends _source.Source {
        get id() {
          return this.fields.get('id').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get code() {
          return this.fields.get('code').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        constructor(specs) {
          super('processors-overwrites', specs);
        }

      }

      exports.ProcessorOverwrite = ProcessorOverwrite;
    }
  });
  /************************************************
  INTERNAL MODULE: ./processors/overwrites/register
  ************************************************/

  modules.set('./processors/overwrites/register', {
    hash: 146353019,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'version', 'code', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative'];
      specs.batch = {
        actions: {
          list: 'applications/modules/bundles/processors/overwrites/list',
          data: 'applications/modules/bundles/processors/overwrites/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        overwrites: {
          fields: ['processor']
        }
      };

      _ts.tables.register('processors-overwrites', specs);
    }
  });
  /*************************************
  INTERNAL MODULE: ./processors/register
  *************************************/

  modules.set('./processors/register', {
    hash: 3702589436,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("./compilers/item");

      var _collection = require("./sources/collection");

      var _collection2 = require("./overwrites/collection");

      var _collection3 = require("./dependencies/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'path', 'updated', 'destroyed', 'multilanguage', 'warnings'];
      specs.properties = {
        sources: {
          Collection: _collection.ProcessorSources,
          table: 'processors-sources',
          filter: [{
            field: 'processor',
            source: 'id'
          }]
        },
        overwrites: {
          Collection: _collection2.ProcessorOverwrites,
          table: 'processors-overwrites',
          filter: [{
            field: 'processor',
            source: 'id'
          }]
        },
        dependencies: {
          Collection: _collection3.ProcessorDependencies,
          table: 'processors-dependencies',
          filter: [{
            field: 'processor',
            source: 'id'
          }]
        },
        compiler: {
          Item: _item.ProcessorCompiler,
          table: 'processors-compilers',
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: '',
          data: 'applications/modules/bundles/processors/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('processors', specs);
    }
  });
  /***********************************************
  INTERNAL MODULE: ./processors/sources/collection
  ***********************************************/

  modules.set('./processors/sources/collection', {
    hash: 2393305574,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorSources = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class ProcessorSources extends _ts.Collection {
        constructor(specs) {
          super('processors-sources', _item.ProcessorSource, specs);
        }

      }

      exports.ProcessorSources = ProcessorSources;
    }
  });
  /*****************************************
  INTERNAL MODULE: ./processors/sources/item
  *****************************************/

  modules.set('./processors/sources/item', {
    hash: 1809354523,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorSource = void 0;

      var _source = require("../../sources/source");
      /*bundle*/


      class ProcessorSource extends _source.Source {
        get id() {
          return this.fields.get('id').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get code() {
          return this.fields.get('code').value;
        }

        get hash() {
          return this.fields.get('hash').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        constructor(specs) {
          super('processors-sources', specs);
        }

      }

      exports.ProcessorSource = ProcessorSource;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./processors/sources/register
  *********************************************/

  modules.set('./processors/sources/register', {
    hash: 930421227,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'version', 'code', 'hash', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative'];
      specs.batch = {
        actions: {
          list: 'applications/modules/bundles/processors/sources/list',
          data: 'applications/modules/bundles/processors/sources/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        sources: {
          fields: ['processor']
        }
      };

      _ts.tables.register('processors-sources', specs);
    }
  });
  /********************************
  INTERNAL MODULE: ./reactive-model
  ********************************/

  modules.set('./reactive-model', {
    hash: 1181350949,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ReactiveModel = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle*/


      class ReactiveModel extends _ts.Events {
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
          return this.#processed;
        }

        set processed(value) {
          if (value === this.#processed) return;
          this.#processed = value;
          this.triggerEvent();
        }

        #fetching;

        get fetching() {
          return this.#fetching;
        }

        set fetching(value) {
          if (value === this.#fetching) return;
          this.#fetching = value;
          this.triggerEvent();
        }

        #fetched;

        get fetched() {
          return this.#fetched;
        }

        set fetched(value) {
          if (value === this.#fetched) return;
          this.#fetched = value;
          this.triggerEvent();
        }

        triggerEvent = (event = 'change') => this.trigger(event);
      }

      exports.ReactiveModel = ReactiveModel;
    }
  });
  /***********************************
  INTERNAL MODULE: ./realtime/realtime
  ***********************************/

  modules.set('./realtime/realtime', {
    hash: 197407449,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/kernel/core/ts");

      var _ts2 = require("@beyond-js/plm/core/ts");

      const {
        reports
      } = _ts2.realtime;
      (async () => {
        const library = _ts.beyond.libraries.get('@beyond-js/dashboard-lib');

        const socket = await library.socket;
        socket.on('client:plm/list/update', message => reports.list.update(message.table, message.filter));
        socket.on('server:plm/list/update', message => reports.list.update(message.table, message.filter));
        socket.on('client:plm/record/insert', message => reports.record.insert(message.table, message.id));
        socket.on('server:plm/record/insert', message => reports.record.insert(message.table, message.id));
        socket.on('client:plm/record/delete', message => reports.record.delete(message.table, message.id));
        socket.on('server:plm/record/delete', message => reports.record.delete(message.table, message.id));
        socket.on('client:plm/record/update', message => reports.record.update(message.table, message.id));
        socket.on('server:plm/record/update', message => reports.record.update(message.table, message.id));
        socket.on('client:plm/record/field/update', message => reports.record.update(message.table, message.id, message.field, message.value));
        socket.on('server:plm/record/field/update', message => reports.record.update(message.table, message.id, message.field, message.value));
      })().catch(exc => console.error(exc.stack));
    }
  });
  /*******************************
  INTERNAL MODULE: ./run-time/item
  *******************************/

  modules.set('./run-time/item', {
    hash: 251167295,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RunTimeError = void 0;

      var _reactiveModel = require("../reactive-model");
      /*bundle*/


      class RunTimeError extends _reactiveModel.ReactiveModel {
        #application;

        get application() {
          return this.#application;
        }

        #type;

        get type() {
          return this.#type;
        }

        #error;

        get error() {
          return this.#error;
        }

        #trace = [];

        get trace() {
          return this.#trace;
        }

        process(message) {
          this.#application = message.application;
          this.#type = message.message.type;
          if (!message.message.exc) return;
          const trace = message.message.exc.split(`\n`);
          this.#error = trace.shift();

          const process = item => {
            let trace;
            trace = item.replace(/\s*at /, '');
            trace = trace.split(/[\s]/);
            let method;
            let detail = trace[1];

            if (trace.length === 3) {
              method = trace[1];
              detail = trace[2];
            }

            const type = trace[0].replace(/\[|]/g, '');
            detail = detail.replace(/\(|\)/g, '');
            const split = detail.split(':');
            let [bundle, line, column] = split;
            this.#trace.push({
              type: type,
              method: method,
              bundle: bundle,
              line: line,
              column: column
            });
          };

          trace.forEach(process);
        }

        constructor(message) {
          super();
          this.process = this.process.bind(this);
          this.process(message);
        }

      }

      exports.RunTimeError = RunTimeError;
    }
  });
  /**********************************
  INTERNAL MODULE: ./run-time/manager
  **********************************/

  modules.set('./run-time/manager', {
    hash: 2366243968,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RunTimeManager = void 0;

      var _beyond_context = require("beyond_context");

      var _reactiveModel = require("../reactive-model");

      var _item = require("./item");
      /*bundle*/


      class RunTimeManager extends _reactiveModel.ReactiveModel {
        #LIMIT = 20;
        #items = [];

        get items() {
          return this.#items;
        }

        clean(all = false) {
          if (all) {
            this.#items.length = 0;
            return;
          }

          this.#items.shift();
        }

        process(message) {
          if (this.#items.length === this.#LIMIT) this.#items.shift();
          this.#items.push(new _item.RunTimeError(message));
        }

        async initialise() {
          const socket = await _beyond_context.bundle.container.socket;
          socket.on('bees.log', this.process);
        }

        constructor() {
          super();
          this.process = this.process.bind(this);
          this.initialise().catch(exc => console.error(exc.stack));
        }

      }

      exports.RunTimeManager = RunTimeManager;
    }
  });
  /*******************************
  INTERNAL MODULE: ./server/config
  *******************************/

  modules.set('./server/config', {
    hash: 742659936,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ServerConfig = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");

      class ServerConfig {
        #events = new _ts.Events();
        #value;

        get value() {
          return this.#value;
        }

        async _fetch() {
          this.#value = _beyond_context.module.execute('server/config');
          this.#events.trigger('change');
          return this.value;
        }

        #promise;

        async fetch() {
          if (this.#promise) return this.#promise;
          this.#promise = await this._fetch();
        }

      }

      exports.ServerConfig = ServerConfig;
    }
  });
  /*******************************
  INTERNAL MODULE: ./server/server
  *******************************/

  modules.set('./server/server', {
    hash: 2530801849,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondServer = void 0;

      var _config = require("./config");

      class Server {
        #config = new _config.ServerConfig();

        get config() {
          return this.#config;
        }

      }

      const BeyondServer = new Server();
      exports.BeyondServer = BeyondServer;
    }
  });
  /********************************
  INTERNAL MODULE: ./sources/source
  ********************************/

  modules.set('./sources/source', {
    hash: 243603947,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Source = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/plm/core/ts");

      class Source extends _ts.Item {
        #isFavorite;

        get isFavorite() {
          return this.#isFavorite;
        }

        set isFavorite(value) {
          if (value === this.#isFavorite) return;
          this.#isFavorite = value;
          this.node.trigger('favorite.changed');
        }

        constructor(table, specs) {
          super(table, specs);
        }

        async save(specs) {
          return _beyond_context.module.execute('/sources/save', specs);
        }

        async rename(specs) {
          return _beyond_context.module.execute('/sources/rename', specs);
        }

        async delete() {
          return _beyond_context.module.execute('/sources/delete', {
            target: this.file
          });
        }

      }

      exports.Source = Source;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./templates/applications/item
  *********************************************/

  modules.set('./templates/applications/item', {
    hash: 3663225759,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateApplication = void 0;

      var _beyond_context = require("beyond_context");

      var _file = require("../../file/file");
      /*bundle*/


      class TemplateApplication extends _file.File {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get files() {
          return this.fields.get('files').value ?? [];
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get sources() {
          const sources = this.properties.get('sources');
          return sources && sources.value;
        }

        constructor(specs) {
          super('template-application', specs);
        }

        async createFile(specs) {
          const params = {
            id: this.id,
            type: 'template-application',
            filename: specs.filename
          };
          return _beyond_context.module.execute('/sources/create', params);
        }

      }

      exports.TemplateApplication = TemplateApplication;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./templates/applications/register
  *************************************************/

  modules.set('./templates/applications/register', {
    hash: 4181221135,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _collection = require("./sources/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'processor', 'path', 'files', 'errors', 'warnings'];
      specs.properties = {
        sources: {
          Collection: _collection.TemplateApplicationsSources,
          table: 'template-application-sources',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: '',
          data: 'templates/applications/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('template-application', specs);
    }
  });
  /***********************************************************
  INTERNAL MODULE: ./templates/applications/sources/collection
  ***********************************************************/

  modules.set('./templates/applications/sources/collection', {
    hash: 4205541512,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateApplicationsSources = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class TemplateApplicationsSources extends _ts.Collection {
        constructor(specs) {
          super('template-application-sources', _item.TemplateApplicationsSource, specs);
        }

      }

      exports.TemplateApplicationsSources = TemplateApplicationsSources;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./templates/applications/sources/item
  *****************************************************/

  modules.set('./templates/applications/sources/item', {
    hash: 1493905177,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateApplicationsSource = void 0;

      var _source = require("../../../sources/source");
      /*bundle*/


      class TemplateApplicationsSource extends _source.Source {
        get id() {
          return this.fields.get('id').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get code() {
          return this.fields.get('code').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        get type() {
          return 'template';
        }

        constructor(specs) {
          super('template-application-sources', specs);
        }

      }

      exports.TemplateApplicationsSource = TemplateApplicationsSource;
    }
  });
  /*********************************************************
  INTERNAL MODULE: ./templates/applications/sources/register
  *********************************************************/

  modules.set('./templates/applications/sources/register', {
    hash: 3823324052,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'version', 'processor', 'code', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative'];
      specs.batch = {
        actions: {
          list: 'templates/applications/sources/list',
          data: 'templates/applications/sources/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        sources: {
          fields: ['application']
        }
      };

      _ts.tables.register('template-application-sources', specs);
    }
  });
  /*********************************************
  INTERNAL MODULE: ./templates/global/collection
  *********************************************/

  modules.set('./templates/global/collection', {
    hash: 1642872420,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobals = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class TemplateGlobals extends _ts.Collection {
        constructor(specs) {
          super('template-global', _item.TemplateGlobal, specs);
        }

      }

      exports.TemplateGlobals = TemplateGlobals;
    }
  });
  /***************************************
  INTERNAL MODULE: ./templates/global/item
  ***************************************/

  modules.set('./templates/global/item', {
    hash: 3769045535,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobal = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class TemplateGlobal extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get files() {
          return this.fields.get('files').value ?? [];
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get sources() {
          const sources = this.properties.get('sources');
          return sources && sources.value;
        }

        constructor(specs) {
          super('template-global', specs);
        }

      }

      exports.TemplateGlobal = TemplateGlobal;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./templates/global/register
  *******************************************/

  modules.set('./templates/global/register', {
    hash: 1899777398,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _collection = require("./sources/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'processor', 'path', 'files', 'errors', 'warnings'];
      specs.properties = {
        sources: {
          Collection: _collection.TemplateGlobalSources,
          table: 'template-global-sources',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: '',
          data: 'templates/global/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('template-global', specs);
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./templates/global/sources/collection
  *****************************************************/

  modules.set('./templates/global/sources/collection', {
    hash: 2345468065,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobalSources = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class TemplateGlobalSources extends _ts.Collection {
        constructor(specs) {
          super('template-global-sources', _item.TemplateGlobalSource, specs);
        }

      }

      exports.TemplateGlobalSources = TemplateGlobalSources;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./templates/global/sources/item
  ***********************************************/

  modules.set('./templates/global/sources/item', {
    hash: 1681286304,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobalSource = void 0;

      var _source = require("../../../sources/source");
      /*bundle*/


      class TemplateGlobalSource extends _source.Source {
        get id() {
          return this.fields.get('id').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get code() {
          return this.fields.get('code').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        get type() {
          return 'template';
        }

        constructor(specs) {
          super('template-global-sources', specs);
        }

      }

      exports.TemplateGlobalSource = TemplateGlobalSource;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./templates/global/sources/register
  ***************************************************/

  modules.set('./templates/global/sources/register', {
    hash: 1192373719,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'version', 'processor', 'code', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative'];
      specs.batch = {
        actions: {
          list: 'templates/global/sources/list',
          data: 'templates/global/sources/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        sources: {
          fields: ['application']
        }
      };

      _ts.tables.register('template-global-sources', specs);
    }
  });
  /********************************
  INTERNAL MODULE: ./templates/item
  ********************************/

  modules.set('./templates/item', {
    hash: 789131316,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Template = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class Template extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get application() {
          const application = this.properties.get('application');
          return application && application.value;
        }

        get global() {
          const global = this.properties.get('global');
          return global && global.value;
        }

        get processors() {
          return this.properties.get('processors');
        }

        get overwrites() {
          const overwrites = this.properties.get('overwrites');
          return overwrites && overwrites.value;
        }

        constructor(specs) {
          super('templates', specs);
        }

      }

      exports.Template = Template;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./templates/overwrites/collection
  *************************************************/

  modules.set('./templates/overwrites/collection', {
    hash: 2688068975,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateOverwrites = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class TemplateOverwrites extends _ts.Collection {
        constructor(specs) {
          super('template-overwrites', _item.TemplateOverwrite, specs);
        }

      }

      exports.TemplateOverwrites = TemplateOverwrites;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./templates/overwrites/item
  *******************************************/

  modules.set('./templates/overwrites/item', {
    hash: 2552662024,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateOverwrite = void 0;

      var _ts = require("@beyond-js/plm/core/ts");
      /*bundle*/


      class TemplateOverwrite extends _ts.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get module() {
          return this.fields.get('module').value;
        }

        get bundle() {
          return this.fields.get('bundle').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        constructor(specs) {
          super('template-overwrites', specs);
        }

      }

      exports.TemplateOverwrite = TemplateOverwrite;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./templates/overwrites/register
  ***********************************************/

  modules.set('./templates/overwrites/register', {
    hash: 2319517019,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'path', 'application', 'module', 'bundle', 'processor', 'errors', 'warnings'];
      specs.batch = {
        actions: {
          list: 'templates/overwrites/list',
          data: 'templates/overwrites/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        byApplication: {
          fields: ['application']
        }
      };

      _ts.tables.register('template-overwrites', specs);
    }
  });
  /*******************************************
  INTERNAL MODULE: ./templates/processors/item
  *******************************************/

  modules.set('./templates/processors/item', {
    hash: 3511013553,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateProcessor = void 0;

      var _beyond_context = require("beyond_context");

      var _file = require("../../file/file");
      /*bundle*/


      class TemplateProcessor extends _file.File {
        get id() {
          return this.fields.get('id').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get path() {
          return this.fields.get('path').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get sources() {
          const sources = this.properties.get('sources');
          return sources && sources.value;
        }

        constructor(specs) {
          super('template-processors', specs);
        }

        async createFile(specs) {
          const params = {
            id: this.id,
            type: 'template-processors',
            filename: specs.filename
          };
          return _beyond_context.module.execute('/sources/create', params);
        }

      }

      exports.TemplateProcessor = TemplateProcessor;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./templates/processors/register
  ***********************************************/

  modules.set('./templates/processors/register', {
    hash: 1816533686,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _collection = require("./sources/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'processor', 'path', 'errors', 'warnings'];
      specs.properties = {
        sources: {
          Collection: _collection.TemplateProcessorsSources,
          table: 'template-processors-sources',
          filter: [{
            field: 'id',
            source: 'id'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: '',
          data: 'templates/processors/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('template-processors', specs);
    }
  });
  /*********************************************************
  INTERNAL MODULE: ./templates/processors/sources/collection
  *********************************************************/

  modules.set('./templates/processors/sources/collection', {
    hash: 1917979699,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateProcessorsSources = void 0;

      var _ts = require("@beyond-js/plm/core/ts");

      var _item = require("./item");
      /*bundle*/


      class TemplateProcessorsSources extends _ts.Collection {
        constructor(specs) {
          super('template-processors-sources', _item.TemplateProcessorsSource, specs);
        }

      }

      exports.TemplateProcessorsSources = TemplateProcessorsSources;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./templates/processors/sources/item
  ***************************************************/

  modules.set('./templates/processors/sources/item', {
    hash: 2732755072,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateProcessorsSource = void 0;

      var _source = require("../../../sources/source");
      /*bundle*/


      class TemplateProcessorsSource extends _source.Source {
        get id() {
          return this.fields.get('id').value;
        }

        get version() {
          return this.fields.get('version').value;
        }

        get processor() {
          return this.fields.get('processor').value;
        }

        get code() {
          return this.fields.get('code').value;
        }

        get file() {
          return this.fields.get('file').value;
        }

        get filename() {
          return this.fields.get('filename').value;
        }

        get dirname() {
          return this.fields.get('dirname').value;
        }

        get basename() {
          return this.fields.get('basename').value;
        }

        get extname() {
          return this.fields.get('extname').value;
        }

        get relative() {
          return this.fields.get('relative').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get type() {
          return 'processor';
        }

        constructor(specs) {
          super('template-processors-sources', specs);
        }

      }

      exports.TemplateProcessorsSource = TemplateProcessorsSource;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./templates/processors/sources/register
  *******************************************************/

  modules.set('./templates/processors/sources/register', {
    hash: 4206445310,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'version', 'processor', 'code', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative', 'errors', 'warnings'];
      specs.batch = {
        actions: {
          list: 'templates/processors/sources/list',
          data: 'templates/processors/sources/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        },
        sources: {
          fields: ['id']
        }
      };

      _ts.tables.register('template-processors-sources', specs);
    }
  });
  /************************************
  INTERNAL MODULE: ./templates/register
  ************************************/

  modules.set('./templates/register', {
    hash: 1138966643,
    creator: function (require, exports) {
      "use strict";

      var _ts = require("@beyond-js/plm/core/ts");

      var _beyond_context = require("beyond_context");

      var _item = require("./global/item");

      var _item2 = require("./processors/item");

      var _item3 = require("./applications/item");

      var _collection = require("./overwrites/collection");

      const specs = {};
      specs.module = _beyond_context.module;
      specs.cache = false;
      specs.fields = ['id', 'application', 'processors', 'path', 'errors', 'warnings'];
      specs.properties = {
        application: {
          Item: _item3.TemplateApplication,
          table: 'template-application',
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        },
        global: {
          Item: _item.TemplateGlobal,
          table: 'template-global',
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        },
        processors: {
          Items: _item2.TemplateProcessor,
          table: 'template-processors',
          identifier: {
            field: 'id',
            source: 'processors'
          }
        },
        overwrites: {
          Collection: _collection.TemplateOverwrites,
          table: 'template-overwrites',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        }
      };
      specs.batch = {
        actions: {
          list: '',
          data: 'templates/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };

      _ts.tables.register('templates', specs);
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.Applications = require('./applications/collection').Applications;
    _exports.ApplicationDeclarations = require('./applications/declarations').ApplicationDeclarations;
    _exports.ApplicationDeployments = require('./applications/deployments/collection').ApplicationDeployments;
    _exports.ApplicationDistributions = require('./applications/deployments/distributions/collection').ApplicationDistributions;
    _exports.ApplicationDistribution = require('./applications/deployments/distributions/item').ApplicationDistribution;
    _exports.ApplicationDeployment = require('./applications/deployments/item').ApplicationDeployment;
    _exports.Application = require('./applications/item').Application;
    _exports.ApplicationLibraries = require('./applications/libraries/collection').ApplicationLibraries;
    _exports.ApplicationLibrary = require('./applications/libraries/item').ApplicationLibrary;
    _exports.ApplicationModules = require('./applications/modules/collection').ApplicationModules;
    _exports.ApplicationModule = require('./applications/modules/item').ApplicationModule;
    _exports.ApplicationStatics = require('./applications/static/collection').ApplicationStatics;
    _exports.ApplicationStatic = require('./applications/static/item').ApplicationStatic;
    _exports.Bee = require('./bees/item').Bee;
    _exports.Consumers = require('./bundles/consumers/collection').Consumers;
    _exports.Consumer = require('./bundles/consumers/item').Consumer;
    _exports.GlobalBundles = require('./bundles/globals/collection').GlobalBundles;
    _exports.GlobalBundle = require('./bundles/globals/item').GlobalBundle;
    _exports.Bundle = require('./bundles/item').Bundle;
    _exports.Dashboard = require('./dashboard/model').Dashboard;
    _exports.Declarations = require('./declarations/collection').Declarations;
    _exports.Declaration = require('./declarations/item').Declaration;
    _exports.Libraries = require('./libraries/collection').Libraries;
    _exports.Library = require('./libraries/item').Library;
    _exports.LibraryModules = require('./libraries/modules/collection').LibraryModules;
    _exports.LibraryModule = require('./libraries/modules/item').LibraryModule;
    _exports.LibrariesStatics = require('./libraries/static/collection').LibrariesStatics;
    _exports.LibrariesStatic = require('./libraries/static/item').LibrariesStatic;
    _exports.Modules = require('./modules/collection').Modules;
    _exports.ModuleDeclarations = require('./modules/declarations').ModuleDeclarations;
    _exports.Module = require('./modules/item').Module;
    _exports.ModuleStatics = require('./modules/static/collection').ModuleStatics;
    _exports.ModuleStatic = require('./modules/static/item').ModuleStatic;
    _exports.ModuleTexts = require('./modules/texts').ModuleTexts;
    _exports.ProcessorCompilers = require('./processors/compilers/collection').ProcessorCompilers;
    _exports.ProcessorCompiler = require('./processors/compilers/item').ProcessorCompiler;
    _exports.ProcessorDependencies = require('./processors/dependencies/collection').ProcessorDependencies;
    _exports.ProcessorDependency = require('./processors/dependencies/item').ProcessorDependency;
    _exports.Processor = require('./processors/item').Processor;
    _exports.ProcessorOverwrites = require('./processors/overwrites/collection').ProcessorOverwrites;
    _exports.ProcessorOverwrite = require('./processors/overwrites/item').ProcessorOverwrite;
    _exports.ProcessorSources = require('./processors/sources/collection').ProcessorSources;
    _exports.ProcessorSource = require('./processors/sources/item').ProcessorSource;
    _exports.ReactiveModel = require('./reactive-model').ReactiveModel;
    _exports.RunTimeError = require('./run-time/item').RunTimeError;
    _exports.RunTimeManager = require('./run-time/manager').RunTimeManager;
    _exports.TemplateApplication = require('./templates/applications/item').TemplateApplication;
    _exports.TemplateApplicationsSources = require('./templates/applications/sources/collection').TemplateApplicationsSources;
    _exports.TemplateApplicationsSource = require('./templates/applications/sources/item').TemplateApplicationsSource;
    _exports.TemplateGlobals = require('./templates/global/collection').TemplateGlobals;
    _exports.TemplateGlobal = require('./templates/global/item').TemplateGlobal;
    _exports.TemplateGlobalSources = require('./templates/global/sources/collection').TemplateGlobalSources;
    _exports.TemplateGlobalSource = require('./templates/global/sources/item').TemplateGlobalSource;
    _exports.Template = require('./templates/item').Template;
    _exports.TemplateOverwrites = require('./templates/overwrites/collection').TemplateOverwrites;
    _exports.TemplateOverwrite = require('./templates/overwrites/item').TemplateOverwrite;
    _exports.TemplateProcessor = require('./templates/processors/item').TemplateProcessor;
    _exports.TemplateProcessorsSources = require('./templates/processors/sources/collection').TemplateProcessorsSources;
    _exports.TemplateProcessorsSource = require('./templates/processors/sources/item').TemplateProcessorsSource;
  };

  let Applications, ApplicationDeclarations, ApplicationDeployments, ApplicationDistributions, ApplicationDistribution, ApplicationDeployment, Application, ApplicationLibraries, ApplicationLibrary, ApplicationModules, ApplicationModule, ApplicationStatics, ApplicationStatic, Bee, Consumers, Consumer, GlobalBundles, GlobalBundle, Bundle, Dashboard, Declarations, Declaration, Libraries, Library, LibraryModules, LibraryModule, LibrariesStatics, LibrariesStatic, Modules, ModuleDeclarations, Module, ModuleStatics, ModuleStatic, ModuleTexts, ProcessorCompilers, ProcessorCompiler, ProcessorDependencies, ProcessorDependency, Processor, ProcessorOverwrites, ProcessorOverwrite, ProcessorSources, ProcessorSource, ReactiveModel, RunTimeError, RunTimeManager, TemplateApplication, TemplateApplicationsSources, TemplateApplicationsSource, TemplateGlobals, TemplateGlobal, TemplateGlobalSources, TemplateGlobalSource, Template, TemplateOverwrites, TemplateOverwrite, TemplateProcessor, TemplateProcessorsSources, TemplateProcessorsSource; // Module exports

  _exports2.TemplateProcessorsSource = TemplateProcessorsSource;
  _exports2.TemplateProcessorsSources = TemplateProcessorsSources;
  _exports2.TemplateProcessor = TemplateProcessor;
  _exports2.TemplateOverwrite = TemplateOverwrite;
  _exports2.TemplateOverwrites = TemplateOverwrites;
  _exports2.Template = Template;
  _exports2.TemplateGlobalSource = TemplateGlobalSource;
  _exports2.TemplateGlobalSources = TemplateGlobalSources;
  _exports2.TemplateGlobal = TemplateGlobal;
  _exports2.TemplateGlobals = TemplateGlobals;
  _exports2.TemplateApplicationsSource = TemplateApplicationsSource;
  _exports2.TemplateApplicationsSources = TemplateApplicationsSources;
  _exports2.TemplateApplication = TemplateApplication;
  _exports2.RunTimeManager = RunTimeManager;
  _exports2.RunTimeError = RunTimeError;
  _exports2.ReactiveModel = ReactiveModel;
  _exports2.ProcessorSource = ProcessorSource;
  _exports2.ProcessorSources = ProcessorSources;
  _exports2.ProcessorOverwrite = ProcessorOverwrite;
  _exports2.ProcessorOverwrites = ProcessorOverwrites;
  _exports2.Processor = Processor;
  _exports2.ProcessorDependency = ProcessorDependency;
  _exports2.ProcessorDependencies = ProcessorDependencies;
  _exports2.ProcessorCompiler = ProcessorCompiler;
  _exports2.ProcessorCompilers = ProcessorCompilers;
  _exports2.ModuleTexts = ModuleTexts;
  _exports2.ModuleStatic = ModuleStatic;
  _exports2.ModuleStatics = ModuleStatics;
  _exports2.Module = Module;
  _exports2.ModuleDeclarations = ModuleDeclarations;
  _exports2.Modules = Modules;
  _exports2.LibrariesStatic = LibrariesStatic;
  _exports2.LibrariesStatics = LibrariesStatics;
  _exports2.LibraryModule = LibraryModule;
  _exports2.LibraryModules = LibraryModules;
  _exports2.Library = Library;
  _exports2.Libraries = Libraries;
  _exports2.Declaration = Declaration;
  _exports2.Declarations = Declarations;
  _exports2.Dashboard = Dashboard;
  _exports2.Bundle = Bundle;
  _exports2.GlobalBundle = GlobalBundle;
  _exports2.GlobalBundles = GlobalBundles;
  _exports2.Consumer = Consumer;
  _exports2.Consumers = Consumers;
  _exports2.Bee = Bee;
  _exports2.ApplicationStatic = ApplicationStatic;
  _exports2.ApplicationStatics = ApplicationStatics;
  _exports2.ApplicationModule = ApplicationModule;
  _exports2.ApplicationModules = ApplicationModules;
  _exports2.ApplicationLibrary = ApplicationLibrary;
  _exports2.ApplicationLibraries = ApplicationLibraries;
  _exports2.Application = Application;
  _exports2.ApplicationDeployment = ApplicationDeployment;
  _exports2.ApplicationDistribution = ApplicationDistribution;
  _exports2.ApplicationDistributions = ApplicationDistributions;
  _exports2.ApplicationDeployments = ApplicationDeployments;
  _exports2.ApplicationDeclarations = ApplicationDeclarations;
  _exports2.Applications = Applications;

  __pkg.exports.process = function (require) {
    _exports2.Applications = Applications = require('./applications/collection').Applications;
    _exports2.ApplicationDeclarations = ApplicationDeclarations = require('./applications/declarations').ApplicationDeclarations;
    _exports2.ApplicationDeployments = ApplicationDeployments = require('./applications/deployments/collection').ApplicationDeployments;
    _exports2.ApplicationDistributions = ApplicationDistributions = require('./applications/deployments/distributions/collection').ApplicationDistributions;
    _exports2.ApplicationDistribution = ApplicationDistribution = require('./applications/deployments/distributions/item').ApplicationDistribution;
    _exports2.ApplicationDeployment = ApplicationDeployment = require('./applications/deployments/item').ApplicationDeployment;
    _exports2.Application = Application = require('./applications/item').Application;
    _exports2.ApplicationLibraries = ApplicationLibraries = require('./applications/libraries/collection').ApplicationLibraries;
    _exports2.ApplicationLibrary = ApplicationLibrary = require('./applications/libraries/item').ApplicationLibrary;
    _exports2.ApplicationModules = ApplicationModules = require('./applications/modules/collection').ApplicationModules;
    _exports2.ApplicationModule = ApplicationModule = require('./applications/modules/item').ApplicationModule;
    _exports2.ApplicationStatics = ApplicationStatics = require('./applications/static/collection').ApplicationStatics;
    _exports2.ApplicationStatic = ApplicationStatic = require('./applications/static/item').ApplicationStatic;
    _exports2.Bee = Bee = require('./bees/item').Bee;
    _exports2.Consumers = Consumers = require('./bundles/consumers/collection').Consumers;
    _exports2.Consumer = Consumer = require('./bundles/consumers/item').Consumer;
    _exports2.GlobalBundles = GlobalBundles = require('./bundles/globals/collection').GlobalBundles;
    _exports2.GlobalBundle = GlobalBundle = require('./bundles/globals/item').GlobalBundle;
    _exports2.Bundle = Bundle = require('./bundles/item').Bundle;
    _exports2.Dashboard = Dashboard = require('./dashboard/model').Dashboard;
    _exports2.Declarations = Declarations = require('./declarations/collection').Declarations;
    _exports2.Declaration = Declaration = require('./declarations/item').Declaration;
    _exports2.Libraries = Libraries = require('./libraries/collection').Libraries;
    _exports2.Library = Library = require('./libraries/item').Library;
    _exports2.LibraryModules = LibraryModules = require('./libraries/modules/collection').LibraryModules;
    _exports2.LibraryModule = LibraryModule = require('./libraries/modules/item').LibraryModule;
    _exports2.LibrariesStatics = LibrariesStatics = require('./libraries/static/collection').LibrariesStatics;
    _exports2.LibrariesStatic = LibrariesStatic = require('./libraries/static/item').LibrariesStatic;
    _exports2.Modules = Modules = require('./modules/collection').Modules;
    _exports2.ModuleDeclarations = ModuleDeclarations = require('./modules/declarations').ModuleDeclarations;
    _exports2.Module = Module = require('./modules/item').Module;
    _exports2.ModuleStatics = ModuleStatics = require('./modules/static/collection').ModuleStatics;
    _exports2.ModuleStatic = ModuleStatic = require('./modules/static/item').ModuleStatic;
    _exports2.ModuleTexts = ModuleTexts = require('./modules/texts').ModuleTexts;
    _exports2.ProcessorCompilers = ProcessorCompilers = require('./processors/compilers/collection').ProcessorCompilers;
    _exports2.ProcessorCompiler = ProcessorCompiler = require('./processors/compilers/item').ProcessorCompiler;
    _exports2.ProcessorDependencies = ProcessorDependencies = require('./processors/dependencies/collection').ProcessorDependencies;
    _exports2.ProcessorDependency = ProcessorDependency = require('./processors/dependencies/item').ProcessorDependency;
    _exports2.Processor = Processor = require('./processors/item').Processor;
    _exports2.ProcessorOverwrites = ProcessorOverwrites = require('./processors/overwrites/collection').ProcessorOverwrites;
    _exports2.ProcessorOverwrite = ProcessorOverwrite = require('./processors/overwrites/item').ProcessorOverwrite;
    _exports2.ProcessorSources = ProcessorSources = require('./processors/sources/collection').ProcessorSources;
    _exports2.ProcessorSource = ProcessorSource = require('./processors/sources/item').ProcessorSource;
    _exports2.ReactiveModel = ReactiveModel = require('./reactive-model').ReactiveModel;
    _exports2.RunTimeError = RunTimeError = require('./run-time/item').RunTimeError;
    _exports2.RunTimeManager = RunTimeManager = require('./run-time/manager').RunTimeManager;
    _exports2.TemplateApplication = TemplateApplication = require('./templates/applications/item').TemplateApplication;
    _exports2.TemplateApplicationsSources = TemplateApplicationsSources = require('./templates/applications/sources/collection').TemplateApplicationsSources;
    _exports2.TemplateApplicationsSource = TemplateApplicationsSource = require('./templates/applications/sources/item').TemplateApplicationsSource;
    _exports2.TemplateGlobals = TemplateGlobals = require('./templates/global/collection').TemplateGlobals;
    _exports2.TemplateGlobal = TemplateGlobal = require('./templates/global/item').TemplateGlobal;
    _exports2.TemplateGlobalSources = TemplateGlobalSources = require('./templates/global/sources/collection').TemplateGlobalSources;
    _exports2.TemplateGlobalSource = TemplateGlobalSource = require('./templates/global/sources/item').TemplateGlobalSource;
    _exports2.Template = Template = require('./templates/item').Template;
    _exports2.TemplateOverwrites = TemplateOverwrites = require('./templates/overwrites/collection').TemplateOverwrites;
    _exports2.TemplateOverwrite = TemplateOverwrite = require('./templates/overwrites/item').TemplateOverwrite;
    _exports2.TemplateProcessor = TemplateProcessor = require('./templates/processors/item').TemplateProcessor;
    _exports2.TemplateProcessorsSources = TemplateProcessorsSources = require('./templates/processors/sources/collection').TemplateProcessorsSources;
    _exports2.TemplateProcessorsSource = TemplateProcessorsSource = require('./templates/processors/sources/item').TemplateProcessorsSource;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});