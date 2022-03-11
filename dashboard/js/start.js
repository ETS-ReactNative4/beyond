requirejs.config({baseUrl: '/packages'});


define(["@beyond-js/kernel/core/ts", "@beyond-js/kernel/routing/ts"], function (dependency_0, dependency_1) {
  "use strict";

  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_1);
  const transversal = beyond.transversals.obtain('start', '', dependencies);
  /***********
  BUNDLE: PAGE
  ***********/

  routing.config.pages.register([{
    "route": "/indexdb",
    "bundle": "@beyond-js/plm/unnamed/cache/indexeddb/tests/page/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/indexed/plm",
    "bundle": "@beyond-js/plm/unnamed/cache/indexeddb/tests/plm/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/beyond/ui/alerts",
    "bundle": "@beyond-js/ui/unnamed/alert/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/code",
    "bundle": "@beyond-js/ui/unnamed/code/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/template",
    "bundle": "@beyond-js/ui/unnamed/css-template/page/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/beyond/ui/empty",
    "bundle": "@beyond-js/ui/unnamed/empty/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/form",
    "bundle": "@beyond-js/ui/unnamed/form/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui",
    "bundle": "@beyond-js/ui/unnamed/home/page",
    "vdir": true,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/icons/buttons",
    "bundle": "@beyond-js/ui/unnamed/icon/pages/buttons/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/icons",
    "bundle": "@beyond-js/ui/unnamed/icon/pages/icons/page",
    "vdir": false,
    "layout": "editor"
  }, {
    "route": "/beyond/ui/image",
    "bundle": "@beyond-js/ui/unnamed/image/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/import",
    "bundle": "@beyond-js/ui/unnamed/import/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/instruction",
    "bundle": "@beyond-js/ui/unnamed/instruction/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/popper",
    "bundle": "@beyond-js/ui/unnamed/libs/popper/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/tippy",
    "bundle": "@beyond-js/ui/unnamed/libs/tippy/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/list",
    "bundle": "@beyond-js/ui/unnamed/list/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/loading",
    "bundle": "@beyond-js/ui/unnamed/loading/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/modals",
    "bundle": "@beyond-js/ui/unnamed/modal/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/overlay",
    "bundle": "@beyond-js/ui/unnamed/overlay/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/scroll",
    "bundle": "@beyond-js/ui/unnamed/perfect-scrollbar/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/picture",
    "bundle": "@beyond-js/ui/unnamed/picture/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/popover",
    "bundle": "@beyond-js/ui/beyond-ui-popover/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/preloadText",
    "bundle": "@beyond-js/ui/unnamed/preload-text/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/preload",
    "bundle": "@beyond-js/ui/unnamed/preload/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/publication",
    "bundle": "@beyond-js/ui/unnamed/publication/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/ripple",
    "bundle": "@beyond-js/ui/unnamed/ripple/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/select",
    "bundle": "@beyond-js/ui/unnamed/select/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/spinner",
    "bundle": "@beyond-js/ui/unnamed/spinner/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/swiper",
    "bundle": "@beyond-js/ui/unnamed/swiper/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/tabs",
    "bundle": "@beyond-js/ui/unnamed/tabs/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/toast",
    "bundle": "@beyond-js/ui/unnamed/toast/page/page",
    "vdir": false
  }, {
    "route": "/beyond/ui/toolbar",
    "bundle": "@beyond-js/ui/unnamed/toolbar/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/beyond/ui/waves",
    "bundle": "@beyond-js/ui/unnamed/waves/page/page",
    "vdir": false,
    "layout": "beyond-ui"
  }, {
    "route": "/application/create",
    "bundle": "@beyond-js/dashboard/unnamed/application/create/page/page",
    "vdir": false,
    "layout": "dashboard"
  }, {
    "route": "/beyond/dashboard/icons",
    "bundle": "@beyond-js/dashboard/unnamed/components/core/page/page",
    "vdir": false
  }, {
    "route": "/empty",
    "bundle": "@beyond-js/dashboard/unnamed/components/empty/page",
    "vdir": false
  }, {
    "route": "/beyond/uploader",
    "bundle": "@beyond-js/dashboard/unnamed/components/uploader/page/page",
    "vdir": false,
    "layout": "dashboard"
  }, {
    "route": "/layout",
    "bundle": "@beyond-js/dashboard/unnamed/layout-test/page",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library/compile",
    "bundle": "@beyond-js/dashboard/unnamed/library/compile/page",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library/modules",
    "bundle": "@beyond-js/dashboard/unnamed/library/modules/page",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/library",
    "bundle": "@beyond-js/dashboard/unnamed/library/view/page",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/indexdb",
    "bundle": "@beyond-js/dashboard/unnamed/models/indexeddb/tests/page/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/indexed/plm",
    "bundle": "@beyond-js/dashboard/unnamed/models/indexeddb/tests/plm/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/services/compile",
    "bundle": "@beyond-js/dashboard/unnamed/services/compile/page",
    "vdir": true,
    "layout": "dashboard"
  }, {
    "route": "/test",
    "bundle": "@beyond-js/dashboard/unnamed/test/page",
    "vdir": false,
    "layout": "default"
  }, {
    "route": "/",
    "bundle": "@beyond-js/dashboard/unnamed/workspace/page",
    "vdir": true,
    "layout": "dashboard"
  }]);
  /*************
  BUNDLE: LAYOUT
  *************/

  routing.config.layouts.register([{
    "name": "beyond-ui",
    "bundle": "@beyond-js/ui/unnamed/layout/layout/layout"
  }, {
    "name": "dashboard",
    "bundle": "@beyond-js/dashboard/unnamed/layout/dashboard/layout"
  }, {
    "name": "editor",
    "bundle": "@beyond-js/dashboard/unnamed/layout/editor/layout"
  }]);
  const bundles = new Map();
  /*****************
  LIBRARY: undefined
  *****************/

  bundles.set('@beyond-js/dashboard-lib/start', {
    hash: 3653106571,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***********************
      INTERNAL MODULE: ./start
      ***********************/

      modules.set('./start', {
        hash: 1365629960,
        creator: function (require, exports) {
          "use strict";

          bundle.container.io.querystring = async () => ({
            monitor: beyond.params.monitor
          });
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {};

      return modules;
    }
  });
  /************************************
  MODULE: packages/@beyond-js/ui/popper
  ************************************/

  bundles.set('@beyond-js/ui/popper/start', {
    hash: 4240628911,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***********************
      INTERNAL MODULE: ./start
      ***********************/

      modules.set('./start', {
        hash: 658201554,
        creator: function (require, exports) {
          "use strict";

          var _ts = require("@beyond-js/kernel/core/ts");

          ((config, vendorPath) => {
            const paths = {
              '@popperjs/core': `${_ts.beyond.baseUrl}/${vendorPath}/popper.min`
            };
            config({
              paths
            });
          })(requirejs.config, `packages/@beyond-js/ui/popper/vendor`);
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {};

      return modules;
    }
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/tippy
  ***********************************/

  bundles.set('@beyond-js/ui/tippy/start', {
    hash: 3326046690,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***********************
      INTERNAL MODULE: ./start
      ***********************/

      modules.set('./start', {
        hash: 4059939561,
        creator: function (require, exports) {
          "use strict";

          var _ts = require("@beyond-js/kernel/core/ts");

          ((config, vendorPath) => {
            const paths = {
              'tippy': `${_ts.beyond.baseUrl}/${vendorPath}/tippy.umd`
            };
            config({
              paths
            });
          })(requirejs.config, `packages/@beyond-js/ui/tippy/vendor`);
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {};

      return modules;
    }
  });
  /***********************************
  MODULE: packages/@beyond-js/ui/waves
  ***********************************/

  bundles.set('@beyond-js/ui/waves/start', {
    hash: 2510997085,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***********************
      INTERNAL MODULE: ./start
      ***********************/

      modules.set('./start', {
        hash: 3486166342,
        creator: function (require, exports) {
          "use strict";

          var _ts = require("@beyond-js/kernel/core/ts");

          ((config, vendorPath) => {
            const paths = {
              'waves': `${_ts.beyond.baseUrl}/${vendorPath}/waves.min`
            };
            config({
              paths
            });
          })(requirejs.config, `packages/@beyond-js/ui/waves/vendor`);
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {};

      return modules;
    }
  });
  /***********************************************
  MODULE: packages/@beyond-js/dashboard-lib/models
  ***********************************************/

  bundles.set('@beyond-js/dashboard-lib/models/start', {
    hash: 3259047581,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***************************
      INTERNAL MODULE: ./bees-logs
      ***************************/

      modules.set('./bees-logs', {
        hash: 3637047693,
        creator: function (require, exports) {
          "use strict";

          var _beyond_context = require("beyond_context");

          (async () => {
            const socket = await _beyond_context.bundle.container.socket;
            socket.on('bees.log', message => {
              console.log('BEE log message received:', message);
            });
          })().catch(exc => console.error(exc.stack));
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {};

      return modules;
    }
  });
  /*********************
  MODULE: unnamed/boards
  *********************/

  bundles.set('@beyond-js/dashboard/unnamed/boards/start', {
    hash: 378809316,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***********************
      INTERNAL MODULE: ./start
      ***********************/

      modules.set('./start', {
        hash: 1508892331,
        creator: function (require, exports) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.DSBoards = void 0;

          var _ts = require("@beyond-js/kernel/core/ts");
          /*bundle*/


          const DSBoards = new class extends _ts.Events {
            #items = new Map();

            get items() {
              return this.#items;
            }

            add(identifier, specs) {
              this.items.set(identifier, specs);
              this.trigger('board.added');
            }

          }();
          exports.DSBoards = DSBoards;
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {
        _exports.DSBoards = require('./start').DSBoards;
      };

      return modules;
    }
  });
  /*************
  MODULE: monaco
  *************/

  bundles.set('@beyond-js/dashboard/monaco/start', {
    hash: 581447823,
    specs: {},
    creator: function (transversal, bundle, __pkg) {
      const modules = new Map();
      /***********************
      INTERNAL MODULE: ./start
      ***********************/

      modules.set('./start', {
        hash: 3153178789,
        creator: function (require, exports) {
          "use strict";

          var _ts = require("@beyond-js/kernel/core/ts");

          (function (config) {
            const path = `${_ts.beyond.baseUrl}/monaco/${!_ts.beyond.local ? 'min' : 'dev'}/vs`;
            config({
              paths: {
                vs: path
              }
            });
          })(requirejs.config);
        }
      }); // Exports managed by beyond bundle objects

      __pkg.exports.managed = function (require, _exports) {};

      return modules;
    }
  });
  transversal.initialise(bundles);
  routing.setUp(
  /*routing mode is by "pathname"*/
  1);
});