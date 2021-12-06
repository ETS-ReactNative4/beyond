define(["exports", "@beyond-js/kernel/core/ts", "@beyond-js/plm/core/ts"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.TemplateProcessorsSources = _exports2.TemplateProcessorsSource = _exports2.TemplateProcessor = _exports2.TemplateOverwrites = _exports2.TemplateOverwrite = _exports2.TemplateGlobals = _exports2.TemplateGlobalSources = _exports2.TemplateGlobalSource = _exports2.TemplateGlobal = _exports2.TemplateApplicationsSources = _exports2.TemplateApplicationsSource = _exports2.TemplateApplication = _exports2.Template = _exports2.ProcessorSources = _exports2.ProcessorSource = _exports2.ProcessorOverwrites = _exports2.ProcessorOverwrite = _exports2.ProcessorDependency = _exports2.ProcessorDependencies = _exports2.ProcessorCompilers = _exports2.ProcessorCompiler = _exports2.Processor = _exports2.Modules = _exports2.ModuleTexts = _exports2.ModuleStatics = _exports2.ModuleStatic = _exports2.ModuleDeclarations = _exports2.Module = _exports2.LibraryModules = _exports2.LibraryModule = _exports2.Library = _exports2.LibrariesStatics = _exports2.LibrariesStatic = _exports2.Libraries = _exports2.GlobalBundles = _exports2.GlobalBundle = _exports2.Declarations = _exports2.Declaration = _exports2.Dashboard = _exports2.Consumers = _exports2.Consumer = _exports2.Bundle = _exports2.Bee = _exports2.Applications = _exports2.ApplicationStatics = _exports2.ApplicationStatic = _exports2.ApplicationModules = _exports2.ApplicationModule = _exports2.ApplicationLibrary = _exports2.ApplicationLibraries = _exports2.ApplicationDistributions = _exports2.ApplicationDistribution = _exports2.ApplicationDeployments = _exports2.ApplicationDeployment = _exports2.ApplicationDeclarations = _exports2.Application = void 0;
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

  const modules = new Map(); // FILE: applications\builder\builder.ts

  modules.set('./applications/builder/builder', {
    hash: 699427414,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationBuilder = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const beyond_context_1 = require("beyond_context");

      const builds_1 = require("./builds");

      class ApplicationBuilder extends ts_1.Events {
        #application;
        #builds;

        get builds() {
          return this.#builds;
        }

        #messages = [];

        get messages() {
          return this.#messages;
        }

        #error;

        get error() {
          return this.#error;
        }

        #processing;

        get processing() {
          return this.#processing;
        }

        #finished;

        get finished() {
          return this.#finished;
        }
        /**
         * @param application {object} The application
         */


        constructor(application) {
          super();
          this.#application = application;
          this.#builds = new builds_1.ApplicationBuilds(application);
        }

        onMessage = message => {
          if (message.type === 'build/application/error') {
            this.#error = message.text;
            this.#processing = false;
            this.trigger('change');
            return;
          }

          if (message.type === 'build/application/finished') {
            this.#finished = true;
            this.#processing = false;
          }

          this.#messages.push(message);
          this.trigger('change');
        };

        async prepare() {
          try {
            //TODO validar con @box la para importar beyond
            // await beyond.rpc.prepare();
            const socket = await beyond_context_1.module.socket;
            const appId = this.#application.id;
            const event = `client:build-application-${appId}-client`;
            socket.on(event, this.onMessage);
          } catch (exc) {
            console.error(exc.stack);
          }
        }

        async build(distribution) {
          if (typeof distribution !== 'object') throw new Error('Invalid distribution parameter');
          if (!['web', 'android', 'ios'].includes(distribution.platform)) throw new Error(`Invalid parameters, platform "${distribution.platform}" is invalid`);
          if (!['development', 'production'].includes(distribution.environment)) throw new Error('Parameter "environment" is invalid');

          try {
            await this.prepare();
          } catch (exc) {
            console.error(exc.stack);
          }

          const specs = {
            name: `${distribution.platform}-${distribution.environment}`,
            platform: distribution.platform,
            ssr: distribution.ssr,
            environment: distribution.environment,
            compress: !!distribution.compress,
            icons: distribution.icons
          };
          await beyond_context_1.module.execute('/build/application', {
            path: this.#application.path,
            distribution: specs
          });
        }

        async delete(params) {
          if (!params.platform) throw new Error('Parameter "platform" is not defined');
          if (!params.environment) throw new Error('Parameter "environment" is not defined');
          const specs = { ...params,
            applicationId: this.#application.id
          };
          await beyond_context_1.module.execute('/build/deleteApplication', specs);
        }

        clean() {
          this.#error = undefined;
          this.#messages = [];
          this.trigger('change');
        }

        cleanError = () => {
          this.#error = undefined;
          this.trigger('change');
        };
      }

      exports.ApplicationBuilder = ApplicationBuilder;
    }
  }); // FILE: applications\builder\builds.ts

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
  }); // FILE: applications\collection.ts

  modules.set('./applications/collection', {
    hash: 3586274438,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Applications = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class Applications extends ts_1.Collection {
        constructor(specs) {
          super('applications', item_1.Application, specs);
        }

      }

      exports.Applications = Applications;
    }
  }); // FILE: applications\declarations.ts

  modules.set('./applications/declarations', {
    hash: 868949629,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDeclarations = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class ApplicationDeclarations extends ts_1.Events {
        #parent;
        #error;

        get error() {
          return this.#error;
        }

        get value() {
          return this.#parent.fields.get('declarations')?.value;
        }

        get updating() {
          return this.#parent.fields.get('declarations')?.value?.updating;
        }

        constructor(parent) {
          super();
          this.#parent = parent;
        }

        async update() {
          try {
            if (!this.#parent.id) {
              console.warn('the application id is not defined');
              return;
            }

            const action = '/applications/declarations/update';
            const response = await beyond_context_1.module.execute(action, {
              applicationId: this.#parent.id
            });

            if (response?.error) {
              this.#error = response.error;
              console.error('Error Creating module: ', response.error);
              return;
            }
          } catch (error) {
            this.#error = error;
          } finally {
            this.trigger('change');
          }
        }

      }

      exports.ApplicationDeclarations = ApplicationDeclarations;
    }
  }); // FILE: applications\deployments\collection.ts

  modules.set('./applications/deployments/collection', {
    hash: 3131748020,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDeployments = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ApplicationDeployments extends ts_1.Collection {
        constructor(specs) {
          super('applications-deployments', item_1.ApplicationDeployment, specs);
        }

      }

      exports.ApplicationDeployments = ApplicationDeployments;
    }
  }); // FILE: applications\deployments\distributions\collection.ts

  modules.set('./applications/deployments/distributions/collection', {
    hash: 1364804100,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDistributions = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ApplicationDistributions extends ts_1.Collection {
        constructor(specs) {
          super('applications-distributions', item_1.ApplicationDistribution, specs);
        }

      }

      exports.ApplicationDistributions = ApplicationDistributions;
    }
  }); // FILE: applications\deployments\distributions\item.ts

  modules.set('./applications/deployments/distributions/item', {
    hash: 1900963609,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDistribution = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class ApplicationDistribution extends ts_1.Item {
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
  }); // FILE: applications\deployments\distributions\register.ts

  modules.set('./applications/deployments/distributions/register', {
    hash: 2193455078,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('applications-distributions', specs);
    }
  }); // FILE: applications\deployments\item.ts

  modules.set('./applications/deployments/item', {
    hash: 3289117182,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationDeployment = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      class ApplicationDeployment extends ts_1.Item {
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
            deployment: {
              distributions: [params]
            }
          };
          return await beyond_context_1.module.execute('builder/application/edit', specs);
        }

      }

      exports.ApplicationDeployment = ApplicationDeployment;
    }
  }); // FILE: applications\deployments\register.ts

  modules.set('./applications/deployments/register', {
    hash: 2542186834,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./distributions/item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'valid', 'errors', 'distributions'];
      specs.properties = {
        distributions: {
          Items: item_1.ApplicationDistribution,
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
      ts_1.tables.register('applications-deployments', specs);
    }
  }); // FILE: applications\item.ts

  modules.set('./applications/item', {
    hash: 1655146479,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Application = void 0;

      const beyond_context_1 = require("beyond_context");

      const file_1 = require("../file/file");

      const builder_1 = require("./builder/builder");

      const declarations_1 = require("./declarations");

      class Application extends file_1.File {
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
          const backend = this.properties.get('bee');
          return backend && backend.value;
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
          this.#builder = new builder_1.ApplicationBuilder(this);
          this.#builder.bind('change', this.triggerEvent);
          this.#declarations = new declarations_1.ApplicationDeclarations(this);
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
            await beyond_context_1.module.execute('/builder/application/checkStatic', specs);
            this.triggerEvent();
          } catch (e) {
            console.error('Error:', e);
          }
        }

        createBackend() {
          return beyond_context_1.module.execute('/builder/application/backend', {
            applicationId: this.id
          });
        }

        async edit(specs) {
          try {
            specs = { ...specs,
              applicationId: this.id
            };
            await beyond_context_1.module.execute('/builder/application/edit', specs);
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
  }); // FILE: applications\libraries\collection.ts

  modules.set('./applications/libraries/collection', {
    hash: 161087978,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationLibraries = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ApplicationLibraries extends ts_1.Collection {
        constructor(specs) {
          super('applications-libraries', item_1.ApplicationLibrary, specs);
          this.counters.register('all');
        }

      }

      exports.ApplicationLibraries = ApplicationLibraries;
    }
  }); // FILE: applications\libraries\item.ts

  modules.set('./applications/libraries/item', {
    hash: 296527257,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationLibrary = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const builder_1 = require("../../libraries/builder");

      class ApplicationLibrary extends ts_1.Item {
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
          this.#builder = new builder_1.LibraryBuilder(library.name);
          this.off('change', this.onChange);
        }

      }

      exports.ApplicationLibrary = ApplicationLibrary;
    }
  }); // FILE: applications\libraries\register.ts

  modules.set('./applications/libraries/register', {
    hash: 867729569,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("../item");

      const item_2 = require("../../libraries/item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'application', 'library'];
      specs.properties = {
        application: {
          Item: item_1.Application,
          table: 'applications',
          identifier: [{
            field: 'id',
            source: 'application'
          }]
        },
        library: {
          Item: item_2.Library,
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
      ts_1.tables.register('applications-libraries', specs);
    }
  }); // FILE: applications\modules\bundle.ts

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
  }); // FILE: applications\modules\collection.ts

  modules.set('./applications/modules/collection', {
    hash: 3352965689,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationModules = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ApplicationModules extends ts_1.Collection {
        constructor(specs) {
          super('applications-modules', item_1.ApplicationModule, specs);
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
        //TODO @ftovar revisar funcion


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
              // @ts-ignore
              if (['page', 'layout'].includes(bundle) && item?.type.includes('widget')) {
                const widget = item.getBundle('widget');
                return widget?.additional?.is === bundle && textSearch;
              }

              return item.type?.includes(bundle) && textSearch;
            }

            return textSearch && (isApp || isLibrary);
          });
        }

      }

      exports.ApplicationModules = ApplicationModules;
    }
  }); // FILE: applications\modules\item.ts

  modules.set('./applications/modules/item', {
    hash: 1534245629,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationModule = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");
      /**
       * TODO: The application property is actually undefined.
       * - Load the application property
       * - Set the name of the module checking if the module has one
       *  and if it does not have, return the module.id without the
       *  application id section
       */


      class ApplicationModule extends ts_1.Item {
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


        get developer() {
          const module = this.module;
          return module?.developer ?? undefined;
        }

        get name() {
          const module = this.module;
          return module?.name ?? undefined;
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
          return beyond_context_1.module.execute('/builder/module/edit', specs);
        }

        clone(name) {
          return beyond_context_1.module.execute('/sources/clone', {
            name: name,
            moduleId: this.id
          });
        }

        delete() {
          if (!this.module.path) {
            console.error('The module not have dirname associate it');
            return;
          }

          return beyond_context_1.module.execute('/sources/delete', {
            target: this.module.path
          });
        }

        createFile(specs) {
          let id = specs.type === 'backend' ? `${this.id}` : `${this.id}//${specs.bundle}//${specs.processor}`;

          if (specs.type && specs.type === 'overwrite') {
            const split = this.id.split('//');
            id = `${split[1]}//${split[2]}//${specs.bundle}`;
          }

          return beyond_context_1.module.execute('/sources/create', {
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
          return beyond_context_1.module.execute('/builder/module/addBundle', specs);
        }

      }

      exports.ApplicationModule = ApplicationModule;
    }
  }); // FILE: applications\modules\register.ts

  modules.set('./applications/modules/register', {
    hash: 54966619,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../item");

      const item_2 = require("../../modules/item");

      const item_3 = require("../../bundles/item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'application', 'module', 'bundles'];
      specs.properties = {
        application: {
          Item: item_1.Application,
          table: 'application',
          identifier: [{
            field: 'id',
            source: 'application'
          }]
        },
        module: {
          Item: item_2.Module,
          table: 'modules',
          identifier: [{
            field: 'id',
            source: 'module'
          }]
        },
        bundles: {
          Items: item_3.Bundle,
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
      ts_1.tables.register('applications-modules', specs);
    }
  }); // FILE: applications\register.ts

  modules.set('./applications/register', {
    hash: 1774975206,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../bees/item");

      const item_2 = require("../templates/item");

      const collection_1 = require("./static/collection");

      const collection_2 = require("./modules/collection");

      const item_3 = require("./deployments/item");

      const collection_3 = require("./libraries/collection");

      const specs = {};
      specs.cache = false;
      specs.module = beyond_context_1.module; //TODO check fields @box 'servers', 'builds','declarations'

      specs.fields = ['id', 'path', 'name', 'title', 'description', 'developer', 'version', 'connect', 'hosts', 'port', 'static', 'modulesPath', 'backend', 'errors', 'warnings', 'servers', 'builds', 'declarations'];
      specs.properties = {
        am: {
          Collection: collection_2.ApplicationModules,
          table: 'applications-modules',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        },
        libraries: {
          Collection: collection_3.ApplicationLibraries,
          table: 'applications-libraries',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        },
        bee: {
          Item: item_1.Bee,
          table: 'bees',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'backend'
          }]
        },
        template: {
          Item: item_2.Template,
          table: 'templates',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        },
        static: {
          Collection: collection_1.ApplicationStatics,
          table: 'applications-static',
          filter: [{
            field: 'application',
            source: 'id'
          }]
        },
        deployment: {
          Item: item_3.ApplicationDeployment,
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
      ts_1.tables.register('applications', specs);
    }
  }); // FILE: applications\static\collection.ts

  modules.set('./applications/static/collection', {
    hash: 1775327297,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationStatics = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ApplicationStatics extends ts_1.Collection {
        constructor(specs) {
          super('applications-static', item_1.ApplicationStatic, specs);
        }

      }

      exports.ApplicationStatics = ApplicationStatics;
    }
  }); // FILE: applications\static\item.ts

  modules.set('./applications/static/item', {
    hash: 851612974,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApplicationStatic = void 0;

      const source_1 = require("../../sources/source");

      class ApplicationStatic extends source_1.Source {
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
  }); // FILE: applications\static\register.ts

  modules.set('./applications/static/register', {
    hash: 1982790997,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('applications-static', specs);
    }
  }); // FILE: bees\builder\builder.ts

  modules.set('./bees/builder/builder', {
    hash: 1869070163,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ServiceBuilder = void 0;

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const beyond_context_1 = require("beyond_context");

      const builds_1 = require("./builds");

      class ServiceBuilder extends ts_1.Events {
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
          this.#builds = new builds_1.ServiceBuilds(bee);
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
            const socket = await beyond_context_1.module.socket;
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
          return await beyond_context_1.module.execute('/build/service', specs);
        }

      }

      exports.ServiceBuilder = ServiceBuilder;
    }
  }); // FILE: bees\builder\builds.ts

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
  }); // FILE: bees\item.ts

  modules.set('./bees/item', {
    hash: 2261579261,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bee = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const builder_1 = require("./builder/builder");

      class Bee extends ts_1.Item {
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
          this.#builder = new builder_1.ServiceBuilder(this);
        }

        start() {
          return beyond_context_1.module.execute('bees/start', {
            id: this.id
          });
        }

        stop() {
          return beyond_context_1.module.execute('bees/stop', {
            id: this.id
          });
        }

        restart() {
          return beyond_context_1.module.execute('bees/restart', {
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
          return beyond_context_1.module.execute('/sources/create', params);
        }

      }

      exports.Bee = Bee;
    }
  }); // FILE: bees\register.ts

  modules.set('./bees/register', {
    hash: 1826232712,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('bees', specs);
    }
  }); // FILE: bundles\consumers\collection.ts

  modules.set('./bundles/consumers/collection', {
    hash: 2259325720,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Consumers = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class Consumers extends ts_1.Collection {
        constructor(specs) {
          super('bundles-consumers', item_1.Consumer, specs);
        }

      }

      exports.Consumers = Consumers;
    }
  }); // FILE: bundles\consumers\item.ts

  modules.set('./bundles/consumers/item', {
    hash: 2578644329,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Consumer = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class Consumer extends ts_1.Item {
        get id() {
          return this.fields.get('id').value;
        }

        get bundle() {
          const bundle = this.properties.get('bundle');
          return bundle && bundle.value;
        }

        constructor(specs) {
          super('bundles-consumers', specs);
        }

      }

      exports.Consumer = Consumer;
    }
  }); // FILE: bundles\consumers\register.ts

  modules.set('./bundles/consumers/register', {
    hash: 347977980,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'bundle'];
      specs.properties = {
        bundle: {
          Item: item_1.Bundle,
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
      ts_1.tables.register('bundles-consumers', specs);
    }
  }); // FILE: bundles\globals\collection.ts

  modules.set('./bundles/globals/collection', {
    hash: 409546233,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GlobalBundles = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class GlobalBundles extends ts_1.Collection {
        constructor(specs) {
          super('global-bundles', item_1.GlobalBundle, specs);
        }

      }

      exports.GlobalBundles = GlobalBundles;
    }
  }); // FILE: bundles\globals\item.ts

  modules.set('./bundles/globals/item', {
    hash: 858039601,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GlobalBundle = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class GlobalBundle extends ts_1.Item {
        get id() {
          return this.fields.get('id').value;
        }

        constructor(specs) {
          super('global-bundles', specs);
        }

      }

      exports.GlobalBundle = GlobalBundle;
    }
  }); // FILE: bundles\globals\register.ts

  modules.set('./bundles/globals/register', {
    hash: 4183665742,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id'];
      specs.batch = {
        actions: {
          list: '/list',
          data: '/data'
        }
      };
      specs.indices = {
        id: {
          fields: ['id'],
          primary: true
        }
      };
      ts_1.tables.register('global-bundles', specs);
    }
  }); // FILE: bundles\item.ts

  modules.set('./bundles/item', {
    hash: 768066218,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Bundle = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      class Bundle extends ts_1.Item {
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

        get additional() {
          return this.fields.get('additional').value;
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
          return beyond_context_1.module.execute('/sources/create', specs);
        }

        async delete(specs) {
          return beyond_context_1.module.execute('/sources/delete', specs);
        }

      }

      exports.Bundle = Bundle;
    }
  }); // FILE: bundles\register.ts

  modules.set('./bundles/register', {
    hash: 2222037934,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../processors/item");

      const collection_1 = require("./consumers/collection");

      const item_2 = require("../applications/modules/item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'errors', 'warnings', 'processors', 'updated', 'destroyed', 'extname', 'pathname', 'additional'];
      specs.properties = {
        processors: {
          Items: item_1.Processor,
          table: 'processors',
          identifier: {
            field: 'id',
            source: 'processors'
          }
        },
        consumers: {
          Collection: collection_1.Consumers,
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
              Item: item_2.ApplicationModule,
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
      ts_1.tables.register('bundles', specs);
    }
  }); // FILE: dashboard\model.ts

  modules.set('./dashboard/model', {
    hash: 3185390277,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Dashboard = void 0;

      const beyond_context_1 = require("beyond_context");

      class Dashboard {
        validate(hash) {
          return beyond_context_1.module.execute('/dashboard/validate', {
            hash: hash
          });
        }

      }

      exports.Dashboard = Dashboard;
    }
  }); // FILE: declarations\collection.ts

  modules.set('./declarations/collection', {
    hash: 581029645,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Declarations = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class Declarations extends ts_1.Collection {
        constructor(specs) {
          super('declarations', item_1.Declaration, specs);
        }

      }

      exports.Declarations = Declarations;
    }
  }); // FILE: declarations\item.ts

  modules.set('./declarations/item', {
    hash: 281899466,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Declaration = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class Declaration extends ts_1.Item {
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
  }); // FILE: declarations\register.ts

  modules.set('./declarations/register', {
    hash: 3629953601,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('declarations', specs);
    }
  }); // FILE: file\file.ts

  modules.set('./file/file', {
    hash: 2203955401,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.File = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      class File extends ts_1.Item {
        constructor(table, specs) {
          super(table, specs);
        }

        deleteFolder(folder) {
          if (!this.path) {
            console.error('The module not have dirname associate it');
            return;
          }

          return beyond_context_1.module.execute('/sources/delete', {
            target: `${this.path}\\${folder}`
          });
        }

      }

      exports.File = File;
    }
  }); // FILE: libraries\builder.ts

  modules.set('./libraries/builder', {
    hash: 4091023898,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibraryBuilder = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class LibraryBuilder extends ts_1.Events {
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
            const socket = await beyond_context_1.module.socket;
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
          return await beyond_context_1.module.execute('/build/library', {
            name: this.#library
          });
        }

      }

      exports.LibraryBuilder = LibraryBuilder;
    }
  }); // FILE: libraries\collection.ts

  modules.set('./libraries/collection', {
    hash: 4079938874,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Libraries = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class Libraries extends ts_1.Collection {
        constructor(specs) {
          super('libraries', item_1.Library, specs);
        }

      }

      exports.Libraries = Libraries;
    }
  }); // FILE: libraries\item.ts

  modules.set('./libraries/item', {
    hash: 4245417514,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Library = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const builder_1 = require("./builder");

      class Library extends ts_1.Item {
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

        get graph() {
          return this.fields.get('graph').value;
        }

        get errors() {
          return this.fields.get('errors').value ?? [];
        }

        get warnings() {
          return this.fields.get('warnings').value ?? [];
        }

        get backend() {
          const backend = this.properties.get('backend');
          return backend && backend.value;
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
          this.#builder = new builder_1.LibraryBuilder(this.name);
          this.#builder.on('change', this.onChange);
          this.off('change', this.onReady);
        }

      }

      exports.Library = Library;
    }
  }); // FILE: libraries\modules\collection.ts

  modules.set('./libraries/modules/collection', {
    hash: 1012036264,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibraryModules = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class LibraryModules extends ts_1.Collection {
        constructor(specs) {
          super('libraries-modules', item_1.LibraryModule, specs);
          this.counters.register('all');
        }

      }

      exports.LibraryModules = LibraryModules;
    }
  }); // FILE: libraries\modules\item.ts

  modules.set('./libraries/modules/item', {
    hash: 2039537654,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibraryModule = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class LibraryModule extends ts_1.Item {
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
  }); // FILE: libraries\modules\register.ts

  modules.set('./libraries/modules/register', {
    hash: 4126334953,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("../item");

      const item_2 = require("../../modules/item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'library'];
      specs.properties = {
        library: {
          Item: item_1.Library,
          table: 'libraries',
          identifier: [{
            field: 'id',
            source: 'library'
          }]
        },
        module: {
          Item: item_2.Module,
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
      ts_1.tables.register('libraries-modules', specs);
    }
  }); // FILE: libraries\register.ts

  modules.set('./libraries/register', {
    hash: 2985248473,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../bees/item");

      const item_2 = require("./static/item");

      const collection_1 = require("./modules/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'path', 'name', 'title', 'description', 'developer', 'version', 'connect', 'hosts', 'port', 'static', 'backend', 'graph', 'errors', 'warnings'];
      specs.properties = {
        modules: {
          Collection: collection_1.LibraryModules,
          table: 'libraries-modules',
          filter: [{
            field: 'library',
            source: 'id'
          }]
        },
        backend: {
          Item: item_1.Bee,
          table: 'bees',
          immutable: true,
          identifier: [{
            field: 'id',
            source: 'backend'
          }]
        },
        static: {
          Items: item_2.LibrariesStatic,
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
      ts_1.tables.register('libraries', specs);
    }
  }); // FILE: libraries\static\collection.ts

  modules.set('./libraries/static/collection', {
    hash: 1432429389,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibrariesStatics = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class LibrariesStatics extends ts_1.Collection {
        constructor(specs) {
          super('libraries-static', item_1.LibrariesStatic, specs);
        }

      }

      exports.LibrariesStatics = LibrariesStatics;
    }
  }); // FILE: libraries\static\item.ts

  modules.set('./libraries/static/item', {
    hash: 1875209156,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LibrariesStatic = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class LibrariesStatic extends ts_1.Item {
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
  }); // FILE: libraries\static\register.ts

  modules.set('./libraries/static/register', {
    hash: 3468431867,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('libraries-static', specs);
    }
  }); // FILE: modules\collection.ts

  modules.set('./modules/collection', {
    hash: 2089886534,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Modules = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class Modules extends ts_1.Collection {
        constructor(specs) {
          super('modules', item_1.Module, specs);
        }

      }

      exports.Modules = Modules;
    }
  }); // FILE: modules\declarations.ts

  modules.set('./modules/declarations', {
    hash: 1279662994,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleDeclarations = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class ModuleDeclarations extends ts_1.Events {
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
            const response = await beyond_context_1.module.execute(action, id);

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
  }); // FILE: modules\item.ts

  modules.set('./modules/item', {
    hash: 1475539806,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Module = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const texts_1 = require("./texts");

      const declarations_1 = require("./declarations");

      class Module extends ts_1.Item {
        #declarations;

        get declarations() {
          return this.#declarations;
        }

        get developer() {
          return this.fields.get('developer').value;
        }

        get id() {
          return this.fields.get('id').value;
        }

        get name() {
          return this.fields.get('name').value;
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
          this.#description = value;
        }

        get route() {
          return this.fields.get('route').value;
        }

        get vdir() {
          return this.fields.get('vdir').value;
        }

        get hmr() {
          return this.fields.get('hmr').value;
        }

        get layoutId() {
          return this.fields.get('layoutId').value;
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
          this.#texts = new texts_1.ModuleTexts(this);
          this.#declarations = new declarations_1.ModuleDeclarations(this);
          this.#declarations.on('change', () => this.node.trigger('change'));
        }

        checkStatic() {
          const specs = {
            moduleId: this.id,
            static: {
              "path": "./static"
            }
          };
          return beyond_context_1.module.execute('/builder/module/edit', specs);
        }

      }

      exports.Module = Module;
    }
  }); // FILE: modules\register.ts

  modules.set('./modules/register', {
    hash: 4081033071,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../bundles/item");

      const item_2 = require("../libraries/item");

      const item_3 = require("../applications/item");

      const collection_1 = require("./static/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'tu', 'path', 'pathname', 'developer', 'title', 'description', 'route', 'hmr', 'vdir', 'layoutId', 'bundles', 'container', 'errors', 'warnings'];
      specs.properties = {
        bundles: {
          Items: item_1.Bundle,
          table: 'bundles',
          identifier: {
            field: 'id',
            source: 'bundles'
          }
        },
        static: {
          Collection: collection_1.ModuleStatics,
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
              Item: is === 'application' ? item_3.Application : item_2.Library,
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
      ts_1.tables.register('modules', specs);
    }
  }); // FILE: modules\static\collection.ts

  modules.set('./modules/static/collection', {
    hash: 614819323,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleStatics = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ModuleStatics extends ts_1.Collection {
        constructor(specs) {
          super('modules-static', item_1.ModuleStatic, specs);
        }

      }

      exports.ModuleStatics = ModuleStatics;
    }
  }); // FILE: modules\static\item.ts

  modules.set('./modules/static/item', {
    hash: 531806800,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleStatic = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      class ModuleStatic extends ts_1.Item {
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
          return beyond_context_1.module.execute('builder/template/update', {
            applicationId: parseInt(applicationId),
            overwrites: overwrites
          });
        }

        async delete(overwrite) {
          if (!overwrite) {
            await beyond_context_1.module.execute('sources/delete', {
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
          await beyond_context_1.module.execute('builder/template/delete', params);
          await beyond_context_1.module.execute('sources/delete', {
            target: this.overwrite.file
          });
        }

      }

      exports.ModuleStatic = ModuleStatic;
    }
  }); // FILE: modules\static\register.ts

  modules.set('./modules/static/register', {
    hash: 381746544,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('modules-static', specs);
    }
  }); // FILE: modules\texts.ts

  modules.set('./modules/texts', {
    hash: 2654663686,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ModuleTexts = void 0;

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
  }); // FILE: processors\compilers\collection.ts

  modules.set('./processors/compilers/collection', {
    hash: 356220319,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorCompilers = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ProcessorCompilers extends ts_1.Collection {
        constructor(specs) {
          super('processors-compilers', item_1.ProcessorCompiler, specs);
        }

      }

      exports.ProcessorCompilers = ProcessorCompilers;
    }
  }); // FILE: processors\compilers\item.ts

  modules.set('./processors/compilers/item', {
    hash: 1570122441,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorCompiler = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class ProcessorCompiler extends ts_1.Item {
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
  }); // FILE: processors\compilers\register.ts

  modules.set('./processors/compilers/register', {
    hash: 2956075404,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('processors-compilers', specs);
    }
  }); // FILE: processors\dependencies\collection.ts

  modules.set('./processors/dependencies/collection', {
    hash: 1572278508,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorDependencies = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ProcessorDependencies extends ts_1.Collection {
        constructor(specs) {
          super('processors-dependencies', item_1.ProcessorDependency, specs);
        }

      }

      exports.ProcessorDependencies = ProcessorDependencies;
    }
  }); // FILE: processors\dependencies\item.ts

  modules.set('./processors/dependencies/item', {
    hash: 589301285,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorDependency = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class ProcessorDependency extends ts_1.Item {
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

        constructor(specs) {
          super('processors-dependencies', specs);
        }

      }

      exports.ProcessorDependency = ProcessorDependency;
    }
  }); // FILE: processors\dependencies\register.ts

  modules.set('./processors/dependencies/register', {
    hash: 2630222483,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("../../bundles/item");

      const item_2 = require("../../declarations/item");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'is', 'version', 'external', 'resource', 'errors', 'warnings', 'bundle_id', 'declaration'];
      specs.properties = {
        bundle: {
          Item: item_1.Bundle,
          table: 'bundles',
          identifier: [{
            field: 'id',
            source: 'bundle_id'
          }]
        },
        declaration: {
          Item: item_2.Declaration,
          table: 'declarations',
          identifier: [{
            field: 'id',
            source: 'declaration'
          }]
        }
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
      ts_1.tables.register('processors-dependencies', specs);
    }
  }); // FILE: processors\item.ts

  modules.set('./processors/item', {
    hash: 2271235667,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Processor = void 0;

      const beyond_context_1 = require("beyond_context");

      const file_1 = require("../file/file");

      class Processor extends file_1.File {
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
          return beyond_context_1.module.execute('/sources/create', params);
        }

      }

      exports.Processor = Processor;
    }
  }); // FILE: processors\overwrites\collection.ts

  modules.set('./processors/overwrites/collection', {
    hash: 3793641523,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorOverwrites = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ProcessorOverwrites extends ts_1.Collection {
        constructor(specs) {
          super('processors-overwrites', item_1.ProcessorOverwrite, specs);
        }

      }

      exports.ProcessorOverwrites = ProcessorOverwrites;
    }
  }); // FILE: processors\overwrites\item.ts

  modules.set('./processors/overwrites/item', {
    hash: 2279906987,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorOverwrite = void 0;

      const source_1 = require("../../sources/source");

      class ProcessorOverwrite extends source_1.Source {
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
  }); // FILE: processors\overwrites\register.ts

  modules.set('./processors/overwrites/register', {
    hash: 146353019,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('processors-overwrites', specs);
    }
  }); // FILE: processors\register.ts

  modules.set('./processors/register', {
    hash: 3702589436,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("./compilers/item");

      const collection_1 = require("./sources/collection");

      const collection_2 = require("./overwrites/collection");

      const collection_3 = require("./dependencies/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'name', 'path', 'updated', 'destroyed', 'multilanguage', 'warnings'];
      specs.properties = {
        sources: {
          Collection: collection_1.ProcessorSources,
          table: 'processors-sources',
          filter: [{
            field: 'processor',
            source: 'id'
          }]
        },
        overwrites: {
          Collection: collection_2.ProcessorOverwrites,
          table: 'processors-overwrites',
          filter: [{
            field: 'processor',
            source: 'id'
          }]
        },
        dependencies: {
          Collection: collection_3.ProcessorDependencies,
          table: 'processors-dependencies',
          filter: [{
            field: 'processor',
            source: 'id'
          }]
        },
        compiler: {
          Item: item_1.ProcessorCompiler,
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
      ts_1.tables.register('processors', specs);
    }
  }); // FILE: processors\sources\collection.ts

  modules.set('./processors/sources/collection', {
    hash: 2393305574,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorSources = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class ProcessorSources extends ts_1.Collection {
        constructor(specs) {
          super('processors-sources', item_1.ProcessorSource, specs);
        }

      }

      exports.ProcessorSources = ProcessorSources;
    }
  }); // FILE: processors\sources\item.ts

  modules.set('./processors/sources/item', {
    hash: 1809354523,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ProcessorSource = void 0;

      const source_1 = require("../../sources/source");

      class ProcessorSource extends source_1.Source {
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
  }); // FILE: processors\sources\register.ts

  modules.set('./processors/sources/register', {
    hash: 930421227,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('processors-sources', specs);
    }
  }); // FILE: realtime\realtime.ts

  modules.set('./realtime/realtime', {
    hash: 2964134587,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/kernel/core/ts");

      const ts_2 = require("@beyond-js/plm/core/ts");

      const {
        reports
      } = ts_2.realtime;
      (async () => {
        const library = ts_1.beyond.libraries.get('@beyond-js/dashboard-lib');
        const socket = await library.socket;
        socket.on('client:plm/list/update', message => reports.list.update(message.table, message.filter));
        socket.on('server:plm/list/update', message => reports.list.update(message.table, message.filter));
        socket.on('client:plm/record/insert', message => reports.record.insert(message.table, message.id));
        socket.on('server:plm/record/insert', message => reports.record.insert(message.table, message.id));
        socket.on('client:plm/record/delete', message => reports.record.delete(message.table, message.id));
        socket.on('server:plm/record/delete', message => reports.record.delete(message.table, message.id));
        socket.on('client:plm/record/update', message => reports.record.update(message.table, message.id));
        socket.on('server:plm/record/update', message => reports.record.update(message.table, message.id));
      })().catch(exc => console.error(exc.stack));
    }
  }); // FILE: server\config.ts

  modules.set('./server/config', {
    hash: 742659936,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ServerConfig = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/kernel/core/ts");

      class ServerConfig {
        #events = new ts_1.Events();
        #value;

        get value() {
          return this.#value;
        }

        async _fetch() {
          this.#value = beyond_context_1.module.execute('server/config');
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
  }); // FILE: server\server.ts

  modules.set('./server/server', {
    hash: 2530801849,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BeyondServer = void 0;

      const config_1 = require("./config");

      class Server {
        #config = new config_1.ServerConfig();

        get config() {
          return this.#config;
        }

      }

      exports.BeyondServer = new Server();
    }
  }); // FILE: sources\source.ts

  modules.set('./sources/source', {
    hash: 243603947,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Source = void 0;

      const beyond_context_1 = require("beyond_context");

      const ts_1 = require("@beyond-js/plm/core/ts");

      class Source extends ts_1.Item {
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
          return beyond_context_1.module.execute('/sources/save', specs);
        }

        async rename(specs) {
          return beyond_context_1.module.execute('/sources/rename', specs);
        }

        async delete() {
          return beyond_context_1.module.execute('/sources/delete', {
            target: this.file
          });
        }

      }

      exports.Source = Source;
    }
  }); // FILE: templates\applications\item.ts

  modules.set('./templates/applications/item', {
    hash: 3663225759,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateApplication = void 0;

      const beyond_context_1 = require("beyond_context");

      const file_1 = require("../../file/file");

      class TemplateApplication extends file_1.File {
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
          return beyond_context_1.module.execute('/sources/create', params);
        }

      }

      exports.TemplateApplication = TemplateApplication;
    }
  }); // FILE: templates\applications\register.ts

  modules.set('./templates/applications/register', {
    hash: 4181221135,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const collection_1 = require("./sources/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'processor', 'path', 'files', 'errors', 'warnings'];
      specs.properties = {
        sources: {
          Collection: collection_1.TemplateApplicationsSources,
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
      ts_1.tables.register('template-application', specs);
    }
  }); // FILE: templates\applications\sources\collection.ts

  modules.set('./templates/applications/sources/collection', {
    hash: 4205541512,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateApplicationsSources = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class TemplateApplicationsSources extends ts_1.Collection {
        constructor(specs) {
          super('template-application-sources', item_1.TemplateApplicationsSource, specs);
        }

      }

      exports.TemplateApplicationsSources = TemplateApplicationsSources;
    }
  }); // FILE: templates\applications\sources\item.ts

  modules.set('./templates/applications/sources/item', {
    hash: 1493905177,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateApplicationsSource = void 0;

      const source_1 = require("../../../sources/source");

      class TemplateApplicationsSource extends source_1.Source {
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
  }); // FILE: templates\applications\sources\register.ts

  modules.set('./templates/applications/sources/register', {
    hash: 3766595913,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('template-application-sources', specs);
    }
  }); // FILE: templates\global\collection.ts

  modules.set('./templates/global/collection', {
    hash: 1642872420,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobals = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class TemplateGlobals extends ts_1.Collection {
        constructor(specs) {
          super('template-global', item_1.TemplateGlobal, specs);
        }

      }

      exports.TemplateGlobals = TemplateGlobals;
    }
  }); // FILE: templates\global\item.ts

  modules.set('./templates/global/item', {
    hash: 3769045535,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobal = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class TemplateGlobal extends ts_1.Item {
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
  }); // FILE: templates\global\register.ts

  modules.set('./templates/global/register', {
    hash: 1899777398,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const collection_1 = require("./sources/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'processor', 'path', 'files', 'errors', 'warnings'];
      specs.properties = {
        sources: {
          Collection: collection_1.TemplateGlobalSources,
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
      ts_1.tables.register('template-global', specs);
    }
  }); // FILE: templates\global\sources\collection.ts

  modules.set('./templates/global/sources/collection', {
    hash: 2345468065,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobalSources = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class TemplateGlobalSources extends ts_1.Collection {
        constructor(specs) {
          super('template-global-sources', item_1.TemplateGlobalSource, specs);
        }

      }

      exports.TemplateGlobalSources = TemplateGlobalSources;
    }
  }); // FILE: templates\global\sources\item.ts

  modules.set('./templates/global/sources/item', {
    hash: 1681286304,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateGlobalSource = void 0;

      const source_1 = require("../../../sources/source");

      class TemplateGlobalSource extends source_1.Source {
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
  }); // FILE: templates\global\sources\register.ts

  modules.set('./templates/global/sources/register', {
    hash: 1192373719,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('template-global-sources', specs);
    }
  }); // FILE: templates\item.ts

  modules.set('./templates/item', {
    hash: 789131316,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Template = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class Template extends ts_1.Item {
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
  }); // FILE: templates\overwrites\collection.ts

  modules.set('./templates/overwrites/collection', {
    hash: 2688068975,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateOverwrites = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class TemplateOverwrites extends ts_1.Collection {
        constructor(specs) {
          super('template-overwrites', item_1.TemplateOverwrite, specs);
        }

      }

      exports.TemplateOverwrites = TemplateOverwrites;
    }
  }); // FILE: templates\overwrites\item.ts

  modules.set('./templates/overwrites/item', {
    hash: 2552662024,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateOverwrite = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      class TemplateOverwrite extends ts_1.Item {
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
  }); // FILE: templates\overwrites\register.ts

  modules.set('./templates/overwrites/register', {
    hash: 2319517019,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('template-overwrites', specs);
    }
  }); // FILE: templates\processors\item.ts

  modules.set('./templates/processors/item', {
    hash: 3511013553,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateProcessor = void 0;

      const beyond_context_1 = require("beyond_context");

      const file_1 = require("../../file/file");

      class TemplateProcessor extends file_1.File {
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
          return beyond_context_1.module.execute('/sources/create', params);
        }

      }

      exports.TemplateProcessor = TemplateProcessor;
    }
  }); // FILE: templates\processors\register.ts

  modules.set('./templates/processors/register', {
    hash: 1816533686,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const collection_1 = require("./sources/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'processor', 'path', 'errors', 'warnings'];
      specs.properties = {
        sources: {
          Collection: collection_1.TemplateProcessorsSources,
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
      ts_1.tables.register('template-processors', specs);
    }
  }); // FILE: templates\processors\sources\collection.ts

  modules.set('./templates/processors/sources/collection', {
    hash: 1917979699,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateProcessorsSources = void 0;

      const ts_1 = require("@beyond-js/plm/core/ts");

      const item_1 = require("./item");

      class TemplateProcessorsSources extends ts_1.Collection {
        constructor(specs) {
          super('template-processors-sources', item_1.TemplateProcessorsSource, specs);
        }

      }

      exports.TemplateProcessorsSources = TemplateProcessorsSources;
    }
  }); // FILE: templates\processors\sources\item.ts

  modules.set('./templates/processors/sources/item', {
    hash: 2732755072,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TemplateProcessorsSource = void 0;

      const source_1 = require("../../../sources/source");

      class TemplateProcessorsSource extends source_1.Source {
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
  }); // FILE: templates\processors\sources\register.ts

  modules.set('./templates/processors/sources/register', {
    hash: 4206445310,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const specs = {};
      specs.module = beyond_context_1.module;
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
      ts_1.tables.register('template-processors-sources', specs);
    }
  }); // FILE: templates\register.ts

  modules.set('./templates/register', {
    hash: 1138966643,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      const ts_1 = require("@beyond-js/plm/core/ts");

      const beyond_context_1 = require("beyond_context");

      const item_1 = require("./global/item");

      const item_2 = require("./processors/item");

      const item_3 = require("./applications/item");

      const collection_1 = require("./overwrites/collection");

      const specs = {};
      specs.module = beyond_context_1.module;
      specs.cache = false;
      specs.fields = ['id', 'application', 'processors', 'path', 'errors', 'warnings'];
      specs.properties = {
        application: {
          Item: item_3.TemplateApplication,
          table: 'template-application',
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        },
        global: {
          Item: item_1.TemplateGlobal,
          table: 'template-global',
          identifier: [{
            field: 'id',
            source: 'id'
          }]
        },
        processors: {
          Items: item_2.TemplateProcessor,
          table: 'template-processors',
          identifier: {
            field: 'id',
            source: 'processors'
          }
        },
        overwrites: {
          Collection: collection_1.TemplateOverwrites,
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
      ts_1.tables.register('templates', specs);
    }
  });
  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;
  let Applications, ApplicationDeclarations, ApplicationDeployments, ApplicationDistributions, ApplicationDistribution, ApplicationDeployment, Application, ApplicationLibraries, ApplicationLibrary, ApplicationModules, ApplicationModule, ApplicationStatics, ApplicationStatic, Bee, Consumers, Consumer, GlobalBundles, GlobalBundle, Bundle, Dashboard, Declarations, Declaration, Libraries, Library, LibraryModules, LibraryModule, LibrariesStatics, LibrariesStatic, Modules, ModuleDeclarations, Module, ModuleStatics, ModuleStatic, ModuleTexts, ProcessorCompilers, ProcessorCompiler, ProcessorDependencies, ProcessorDependency, Processor, ProcessorOverwrites, ProcessorOverwrite, ProcessorSources, ProcessorSource, TemplateApplication, TemplateApplicationsSources, TemplateApplicationsSource, TemplateGlobals, TemplateGlobal, TemplateGlobalSources, TemplateGlobalSource, Template, TemplateOverwrites, TemplateOverwrite, TemplateProcessor, TemplateProcessorsSources, TemplateProcessorsSource;
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

  __pkg.exports.process = function (require, _exports) {
    _exports2.Applications = Applications = _exports.Applications = require('./applications/collection').Applications;
    _exports2.ApplicationDeclarations = ApplicationDeclarations = _exports.ApplicationDeclarations = require('./applications/declarations').ApplicationDeclarations;
    _exports2.ApplicationDeployments = ApplicationDeployments = _exports.ApplicationDeployments = require('./applications/deployments/collection').ApplicationDeployments;
    _exports2.ApplicationDistributions = ApplicationDistributions = _exports.ApplicationDistributions = require('./applications/deployments/distributions/collection').ApplicationDistributions;
    _exports2.ApplicationDistribution = ApplicationDistribution = _exports.ApplicationDistribution = require('./applications/deployments/distributions/item').ApplicationDistribution;
    _exports2.ApplicationDeployment = ApplicationDeployment = _exports.ApplicationDeployment = require('./applications/deployments/item').ApplicationDeployment;
    _exports2.Application = Application = _exports.Application = require('./applications/item').Application;
    _exports2.ApplicationLibraries = ApplicationLibraries = _exports.ApplicationLibraries = require('./applications/libraries/collection').ApplicationLibraries;
    _exports2.ApplicationLibrary = ApplicationLibrary = _exports.ApplicationLibrary = require('./applications/libraries/item').ApplicationLibrary;
    _exports2.ApplicationModules = ApplicationModules = _exports.ApplicationModules = require('./applications/modules/collection').ApplicationModules;
    _exports2.ApplicationModule = ApplicationModule = _exports.ApplicationModule = require('./applications/modules/item').ApplicationModule;
    _exports2.ApplicationStatics = ApplicationStatics = _exports.ApplicationStatics = require('./applications/static/collection').ApplicationStatics;
    _exports2.ApplicationStatic = ApplicationStatic = _exports.ApplicationStatic = require('./applications/static/item').ApplicationStatic;
    _exports2.Bee = Bee = _exports.Bee = require('./bees/item').Bee;
    _exports2.Consumers = Consumers = _exports.Consumers = require('./bundles/consumers/collection').Consumers;
    _exports2.Consumer = Consumer = _exports.Consumer = require('./bundles/consumers/item').Consumer;
    _exports2.GlobalBundles = GlobalBundles = _exports.GlobalBundles = require('./bundles/globals/collection').GlobalBundles;
    _exports2.GlobalBundle = GlobalBundle = _exports.GlobalBundle = require('./bundles/globals/item').GlobalBundle;
    _exports2.Bundle = Bundle = _exports.Bundle = require('./bundles/item').Bundle;
    _exports2.Dashboard = Dashboard = _exports.Dashboard = require('./dashboard/model').Dashboard;
    _exports2.Declarations = Declarations = _exports.Declarations = require('./declarations/collection').Declarations;
    _exports2.Declaration = Declaration = _exports.Declaration = require('./declarations/item').Declaration;
    _exports2.Libraries = Libraries = _exports.Libraries = require('./libraries/collection').Libraries;
    _exports2.Library = Library = _exports.Library = require('./libraries/item').Library;
    _exports2.LibraryModules = LibraryModules = _exports.LibraryModules = require('./libraries/modules/collection').LibraryModules;
    _exports2.LibraryModule = LibraryModule = _exports.LibraryModule = require('./libraries/modules/item').LibraryModule;
    _exports2.LibrariesStatics = LibrariesStatics = _exports.LibrariesStatics = require('./libraries/static/collection').LibrariesStatics;
    _exports2.LibrariesStatic = LibrariesStatic = _exports.LibrariesStatic = require('./libraries/static/item').LibrariesStatic;
    _exports2.Modules = Modules = _exports.Modules = require('./modules/collection').Modules;
    _exports2.ModuleDeclarations = ModuleDeclarations = _exports.ModuleDeclarations = require('./modules/declarations').ModuleDeclarations;
    _exports2.Module = Module = _exports.Module = require('./modules/item').Module;
    _exports2.ModuleStatics = ModuleStatics = _exports.ModuleStatics = require('./modules/static/collection').ModuleStatics;
    _exports2.ModuleStatic = ModuleStatic = _exports.ModuleStatic = require('./modules/static/item').ModuleStatic;
    _exports2.ModuleTexts = ModuleTexts = _exports.ModuleTexts = require('./modules/texts').ModuleTexts;
    _exports2.ProcessorCompilers = ProcessorCompilers = _exports.ProcessorCompilers = require('./processors/compilers/collection').ProcessorCompilers;
    _exports2.ProcessorCompiler = ProcessorCompiler = _exports.ProcessorCompiler = require('./processors/compilers/item').ProcessorCompiler;
    _exports2.ProcessorDependencies = ProcessorDependencies = _exports.ProcessorDependencies = require('./processors/dependencies/collection').ProcessorDependencies;
    _exports2.ProcessorDependency = ProcessorDependency = _exports.ProcessorDependency = require('./processors/dependencies/item').ProcessorDependency;
    _exports2.Processor = Processor = _exports.Processor = require('./processors/item').Processor;
    _exports2.ProcessorOverwrites = ProcessorOverwrites = _exports.ProcessorOverwrites = require('./processors/overwrites/collection').ProcessorOverwrites;
    _exports2.ProcessorOverwrite = ProcessorOverwrite = _exports.ProcessorOverwrite = require('./processors/overwrites/item').ProcessorOverwrite;
    _exports2.ProcessorSources = ProcessorSources = _exports.ProcessorSources = require('./processors/sources/collection').ProcessorSources;
    _exports2.ProcessorSource = ProcessorSource = _exports.ProcessorSource = require('./processors/sources/item').ProcessorSource;
    _exports2.TemplateApplication = TemplateApplication = _exports.TemplateApplication = require('./templates/applications/item').TemplateApplication;
    _exports2.TemplateApplicationsSources = TemplateApplicationsSources = _exports.TemplateApplicationsSources = require('./templates/applications/sources/collection').TemplateApplicationsSources;
    _exports2.TemplateApplicationsSource = TemplateApplicationsSource = _exports.TemplateApplicationsSource = require('./templates/applications/sources/item').TemplateApplicationsSource;
    _exports2.TemplateGlobals = TemplateGlobals = _exports.TemplateGlobals = require('./templates/global/collection').TemplateGlobals;
    _exports2.TemplateGlobal = TemplateGlobal = _exports.TemplateGlobal = require('./templates/global/item').TemplateGlobal;
    _exports2.TemplateGlobalSources = TemplateGlobalSources = _exports.TemplateGlobalSources = require('./templates/global/sources/collection').TemplateGlobalSources;
    _exports2.TemplateGlobalSource = TemplateGlobalSource = _exports.TemplateGlobalSource = require('./templates/global/sources/item').TemplateGlobalSource;
    _exports2.Template = Template = _exports.Template = require('./templates/item').Template;
    _exports2.TemplateOverwrites = TemplateOverwrites = _exports.TemplateOverwrites = require('./templates/overwrites/collection').TemplateOverwrites;
    _exports2.TemplateOverwrite = TemplateOverwrite = _exports.TemplateOverwrite = require('./templates/overwrites/item').TemplateOverwrite;
    _exports2.TemplateProcessor = TemplateProcessor = _exports.TemplateProcessor = require('./templates/processors/item').TemplateProcessor;
    _exports2.TemplateProcessorsSources = TemplateProcessorsSources = _exports.TemplateProcessorsSources = require('./templates/processors/sources/collection').TemplateProcessorsSources;
    _exports2.TemplateProcessorsSource = TemplateProcessorsSource = _exports.TemplateProcessorsSource = require('./templates/processors/sources/item').TemplateProcessorsSource;
  };

  __pkg.initialise(modules);
});