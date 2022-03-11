define(["exports", "react-dom/server.js", "react", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.ReactWidgetController = _exports2.PageReactWidgetController = void 0;
  const dependencies = new Map();
  dependencies.set('react-dom/server.js', dependency_0);
  dependencies.set('react', dependency_1);
  dependencies.set('@beyond-js/kernel/core/ts', dependency_2);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/kernel/react-widget/ts', false, {}, dependencies);
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
    hash: 1604595885,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ReactWidgetController = void 0;

      var ReactDOMServer = require("react-dom/server.js");

      var React = require("react");

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle*/


      class ReactWidgetController extends _ts.BeyondWidgetControllerSSR {
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
            html = ReactDOMServer.renderToString(React.createElement(Widget, props));
          } catch (exc) {
            console.error(exc.stack);
            return {
              errors: [exc.message]
            };
          }

          return {
            html
          };
        }

      }

      exports.ReactWidgetController = ReactWidgetController;
    }
  });
  /**********************
  INTERNAL MODULE: ./page
  **********************/

  modules.set('./page', {
    hash: 1127446281,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PageReactWidgetController = void 0;

      var _controller = require("./controller");
      /*bundle*/


      class PageReactWidgetController extends _controller.ReactWidgetController {}

      exports.PageReactWidgetController = PageReactWidgetController;
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.ReactWidgetController = require('./controller').ReactWidgetController;
    _exports.PageReactWidgetController = require('./page').PageReactWidgetController;
  };

  let ReactWidgetController, PageReactWidgetController; // Module exports

  _exports2.PageReactWidgetController = PageReactWidgetController;
  _exports2.ReactWidgetController = ReactWidgetController;

  __pkg.exports.process = function (require) {
    _exports2.ReactWidgetController = ReactWidgetController = require('./controller').ReactWidgetController;
    _exports2.PageReactWidgetController = PageReactWidgetController = require('./page').PageReactWidgetController;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});