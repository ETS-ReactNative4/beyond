define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-board/txt', true, {
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
    hash: 2224261874,
    creator: function (require, exports) {
      exports.txt = {
        "empty": {
          "title": "Bienvenido a BeyondJS",
          "subtitle": "Crea tu primera aplicación",
          "info": "¿Que es esto?"
        },
        "header": {
          "title": "Proyectos",
          "projectsTitle": "Proyectos",
          "applications": "Proyectos",
          "elements": "Elementos",
          "titleHeader": "El nombre del proyecto va aquí",
          "showApps": "Información del proyecto",
          "filtersTitle": "Filtro",
          "selectView": "Vista",
          "welcome": "Bienvenido:",
          "logIn": "Inicio de sesion:"
        },
        "application": {
          "description": "No posee descripcion"
        },
        "actions": {
          "play": "Arrancar",
          "stop": "Detener",
          "restart": "Reiniciar",
          "details": "Detaalles",
          "compile": "Compilar",
          "publish": "Publicar",
          "create": "Crear proyecto",
          "download": "Descargar"
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