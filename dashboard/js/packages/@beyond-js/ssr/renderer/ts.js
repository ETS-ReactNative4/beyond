define(["exports", "@beyond-js/kernel/core/ts", "@beyond-js/kernel/routing/ts", "cheerio"], function (_exports2, dependency_0, dependency_1, dependency_2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.renderer = _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  dependencies.set('@beyond-js/kernel/routing/ts', dependency_1);
  dependencies.set('cheerio', dependency_2);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ssr/renderer/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /******************************
  INTERNAL MODULE: ./renderWidget
  ******************************/

  modules.set('./renderWidget', {
    hash: 2207420990,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.renderWidget = renderWidget;

      var _ts = require("@beyond-js/kernel/core/ts");

      async function renderWidget(element, props) {
        if (!_ts.beyond.widgets.has(element)) {
          return {
            errors: [`Widget element "${element}" is not registered`]
          };
        }

        const specs = _ts.beyond.widgets.get(element);

        const bundle = await _ts.beyond.import(specs.id);
        const {
          Controller
        } = bundle;

        if (!Controller || typeof Controller !== 'function') {
          return {
            errors: [`Widget "${element}" does not export its Controller`]
          };
        }

        try {
          const controller = new Controller({
            specs
          });
          const store = controller.createStore?.();
          await store?.fetch();
          const css = controller.bundle.styles.external ? controller.bundle.pathname : void 0;
          const {
            html,
            errors
          } = controller.render(Object.assign({}, props, {
            store
          }));
          return {
            html,
            errors,
            css,
            store
          };
        } catch (exc) {
          console.error(exc.stack);
          return {
            errors: exc.message
          };
        }
      }
    }
  });
  /**************************
  INTERNAL MODULE: ./renderer
  **************************/

  modules.set('./renderer', {
    hash: 763356026,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.renderer = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _ts2 = require("@beyond-js/kernel/routing/ts");

      var _renderWidget = require("./renderWidget");

      var _cheerio = require("cheerio");
      /*bundle*/


      const renderer = new class {
        async render(_uri) {
          const widgets = new Map();
          const hierarchy = [];
          const {
            page,
            error,
            redirected,
            uri
          } = await _ts2.routing.page(_uri);
          if (redirected) return {
            redirected
          };
          if (error) return {
            errors: [error]
          };
          let html, errors, css, store; // Render the application main layout

          const main = _ts.beyond.application.layout;
          ({
            html,
            errors,
            css,
            store
          } = main ? await (0, _renderWidget.renderWidget)(main) : {
            html: void 0,
            errors: void 0,
            css: void 0,
            store: void 0
          });
          main && widgets.set(hierarchy.length, {
            html,
            errors,
            css,
            store
          });
          main && hierarchy.push(main); // Find child widgets

          const $ = _cheerio.default.load(html);

          if ($('menu-layout').length) {// ({html, errors, css, store} = await renderWidget('menu-layout'));
            // widgets.set(hierarchy.length, {html, errors, css, store});
            // hierarchy.push('menu-layout');
          }

          const {
            element,
            parents
          } = page;
          ({
            html,
            errors,
            css,
            store
          } = await (0, _renderWidget.renderWidget)(element, {
            uri
          }));
          widgets.set(hierarchy.length, {
            html,
            errors,
            css,
            store
          });
          hierarchy.push(element); // Render the ascending layouts of the page

          void parents; // The parents layouts of the page

          return {
            hierarchy,
            widgets: [...widgets]
          };
        }

      }();
      exports.renderer = renderer;
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.renderer = require('./renderer').renderer;
  };

  let renderer; // Module exports

  _exports2.renderer = renderer;

  __pkg.exports.process = function (require) {
    _exports2.renderer = renderer = require('./renderer').renderer;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});