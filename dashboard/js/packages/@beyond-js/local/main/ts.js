define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.services = _exports2.local = _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/local/main/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /************************************
  INTERNAL MODULE: ./application-styles
  ************************************/

  modules.set('./application-styles', {
    hash: 3175953887,
    creator: function (require, exports) {
      "use strict";

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");

      new class ApplicationStyles extends _ts.Events {
        /**
         * The application styles has changed, therefore it must be updated
         */
        #update = is => {
          const resource = is === 'application' ? 'styles' : 'global';
          document.getElementById(`beyond-${is}-styles`).setAttribute('href', `/${resource}.css?updated=${Date.now()}`);
          this.trigger(`${is}:change`);
        };
        #subscribe = async () => {
          const socket = await _beyond_context.module.socket;
          socket.on('application-styles', () => this.#update('application'));
          socket.on('global-styles', () => this.#update('global'));
        };

        constructor() {
          super();
          if (typeof window === 'undefined') return;
          this.#subscribe().catch(exc => console.error(exc.stack));
        }

      }();
    }
  });
  /***********************
  INTERNAL MODULE: ./local
  ***********************/

  modules.set('./local', {
    hash: 1410203166,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.local = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");

      var _services = require("./services/services");

      class BeyondLocal extends _ts.Events {
        #onchange = message => {
          const {
            bundle,
            processor,
            extname,
            distribution,
            language
          } = message;
          this.trigger(`change:${bundle}//${distribution}`, processor, extname, language);
        };

        get services() {
          return _services.services;
        }

        #subscribe = async () => {
          const socket = await _beyond_context.module.socket;
          socket.on('processor/change', this.#onchange);
        };

        constructor() {
          super();
          this.#subscribe().catch(exc => console.error(exc.stack));
        }

      }
      /*bundle*/


      const local = new BeyondLocal();
      exports.local = local;
    }
  });
  /**********************************
  INTERNAL MODULE: ./services/service
  **********************************/

  modules.set('./services/service', {
    hash: 624765756,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ManagedService = void 0;

      var _beyond_context = require("beyond_context");

      var _ts = require("@beyond-js/kernel/core/ts");

      class ManagedService extends _ts.Events {
        #service;
        #id;

        constructor(service) {
          super();
          this.#service = service;
          this.#id = (service.is === 'library' ? 'library' : 'application') + `/${service.local.id}`;
        }

        #params() {
          const legacies = ['@beyond-js/local', '@beyond-js/dashboard-lib'];
          const kind = legacies.includes(this.#service.package.id) ? 'legacy' : 'backend';
          return {
            id: this.#id,
            kind
          };
        }

        #status = async () => {
          if (this.#service.package.id === '@beyond-js/local') {
            throw new Error('Cannot check the status of beyond-local, ' + 'as beyond-local is the service used to check the status of the services');
          }

          return await _beyond_context.module.execute('libraries/status', this.#params());
        };

        get status() {
          return this.#status();
        }

        async start() {
          await _beyond_context.module.execute('libraries/start', this.#params());
        }

        async stop() {
          await _beyond_context.module.execute('libraries/stop', this.#params());
        }

      }

      exports.ManagedService = ManagedService;
    }
  });
  /***********************************
  INTERNAL MODULE: ./services/services
  ***********************************/

  modules.set('./services/services', {
    hash: 793868436,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.services = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _service = require("./service");
      /*bundle*/


      const services = new class extends Map {
        constructor() {
          super();

          const add = service => service.connect && this.set(service.host, new _service.ManagedService(service));

          add(_ts.beyond.application);

          _ts.beyond.libraries.forEach(library => add(library));
        }

      }();
      exports.services = services;
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.local = require('./local').local;
    _exports.services = require('./services/services').services;
  };

  let local, services; // Module exports

  _exports2.services = services;
  _exports2.local = local;

  __pkg.exports.process = function (require) {
    _exports2.local = local = require('./local').local;
    _exports2.services = services = require('./services/services').services;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});