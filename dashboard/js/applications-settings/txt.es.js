define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-settings/txt', true, {
    "txt": {
      "multilanguage": true
    }
  });
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package('es');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
    hash: 762036597,
    creator: function (require, exports) {
      exports.txt = {
        "errors": {
          "noSelected": "the application selected does not has distributions",
          "ALREADY_EXISTS": "Ya existe una distribución con esta configuración",
          "PORT_USED": "Ya existe una distribución con el puerto indicado"
        },
        "name": "Nombre",
        "platform": {
          "label": "Plataforma",
          "options": {
            "web": "Web",
            "backend": "Backend",
            "android": "Android",
            "ios": "iOS",
            "ssr": "SSR",
            "node": "Node"
          },
          "environment": "Entorno",
          "checkType": "Comprobación de tipos",
          "port": {
            "label": "Puerto",
            "error": "El puerto no está disponible",
            "success": "Puerto disponible",
            "tooltip": "Check port"
          },
          "ts": "TS",
          "default": "default",
          "ssr": "ssr",
          "titleModal": "Creememos Una nueva distribucion",
          "modalHeader": "Elige la configuracion para la distribucion",
          "compress": "Comprimir",
          "add": "Añadir",
          "title": "Distribuciones",
          "environments": {
            "dev": "Development",
            "prod": "Production"
          },
          "applications": {
            "select": "Proyecto"
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