define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/library/view/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('en');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
    hash: 1047851266,
    creator: function (require, exports) {
      exports.txt = {
        "titles": {
          "libraries": "Librerias",
          "modules": "Modules",
          "routes": "routes",
          "statics": "Statics",
          "static": "Static",
          "templates": "Templates",
          "excluded": "Archivos excluidos",
          "path": "path",
          "host": "host"
        },
        "actions": {
          "navigate": "navigate",
          "compile": "compilar",
          "editDescription": "Editar Descripción",
          "filter": "Filters Bundles",
          "selectView": "Select View",
          "show": "Show Library Information"
        },
        "elements": {
          "descriptionText": "Elements",
          "count": "elementos"
        }
      };
    }
  });
  let txt;
  _exports2.txt = txt;

  __pkg.exports.process = function (require, _exports) {
    _exports2.txt = txt = _exports.txt = require('./txt').txt;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});