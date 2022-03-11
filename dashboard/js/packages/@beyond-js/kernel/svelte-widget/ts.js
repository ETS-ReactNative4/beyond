define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.SvelteWidgetController = _exports2.PageSvelteWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/svelte-widget/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /****************************
  INTERNAL MODULE: ./controller
  ****************************/

  modules.set('./controller', {
    hash: 1166283149,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SvelteWidgetController = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle*/


      class SvelteWidgetController extends _ts.BeyondWidgetControllerSSR {
        render(props) {
          const {
            Widget
          } = this.bundle.package().exports.values;

          if (!Widget) {
            return {
              errors: [`Widget "${this.element}" does not export a Widget class`]
            };
          } // Render the widget


          let html;

          try {
            const rendered = Widget.render(props);
            ({
              html
            } = rendered);
          } catch (exc) {
            return {
              errors: [exc.message]
            };
          }

          return {
            html
          };
        }

      }

      exports.SvelteWidgetController = SvelteWidgetController;
    }
  });
  /**********************
  INTERNAL MODULE: ./page
  **********************/

  modules.set('./page', {
    hash: 2185612079,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageSvelteWidgetController = void 0;

      var _controller = require("./controller");
      /*bundle*/


      class PageSvelteWidgetController extends _controller.SvelteWidgetController {}

      exports.PageSvelteWidgetController = PageSvelteWidgetController;
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.SvelteWidgetController = require('./controller').SvelteWidgetController;
    _exports.PageSvelteWidgetController = require('./page').PageSvelteWidgetController;
  };

  let SvelteWidgetController, PageSvelteWidgetController; // Module exports

  _exports2.PageSvelteWidgetController = PageSvelteWidgetController;
  _exports2.SvelteWidgetController = SvelteWidgetController;

  __pkg.exports.process = function (require) {
    _exports2.SvelteWidgetController = SvelteWidgetController = require('./controller').SvelteWidgetController;
    _exports2.PageSvelteWidgetController = PageSvelteWidgetController = require('./page').PageSvelteWidgetController;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});