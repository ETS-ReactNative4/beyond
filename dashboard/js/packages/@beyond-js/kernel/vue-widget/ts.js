define(["exports", "@beyond-js/kernel/core/ts", "vue"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.VueWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('vue', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/vue-widget/ts', false, {}, dependencies);
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
    hash: 2004768854,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.VueWidgetController = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _vue = require("vue");
      /*bundle*/


      class VueWidgetController extends _ts.BeyondWidgetController {
        _mount(props) {
          // const hydrate = this.hydratable;
          (0, _vue.createApp)(this.Widget).mount(this.body);
        }

        mount() {
          this._mount({
            component: this.component,
            store: this.store
          });
        }

        unmount() {}

      }

      exports.VueWidgetController = VueWidgetController;
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.VueWidgetController = require('./controller').VueWidgetController;
  };

  let VueWidgetController; // Module exports

  _exports2.VueWidgetController = VueWidgetController;

  __pkg.exports.process = function (require) {
    _exports2.VueWidgetController = VueWidgetController = require('./controller').VueWidgetController;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});