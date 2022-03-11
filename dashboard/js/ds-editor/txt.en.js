define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-editor/txt', true, {
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
    hash: 962902549,
    creator: function (require, exports) {
      exports.txt = {
        "tree": {
          "createFile": "Crear archivo",
          "delete": "Eliminar",
          "rename": "Renombrar"
        },
        "modal": {
          "title": "Crear elemento",
          "action": "Crear",
          "label": "Nombre",
          "errors": {
            "PROCESSOR": "¡Ups! Al parecer estas intentando crear que no es de tipo",
            "INVALID": "La estructura del nombre de archivo no es correcta",
            "PROCESSOR_NOT_FOUND": "El procesador sobre el que se está intentando trabajar, no existe."
          }
        }
      };
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.txt = require('./txt').txt;
  };

  let txt; // Module exports

  _exports2.txt = txt;

  __pkg.exports.process = function (require) {
    _exports2.txt = txt = require('./txt').txt;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});