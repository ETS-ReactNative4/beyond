define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/txt', true, {
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
    hash: 618865166,
    creator: function (require, exports) {
      exports.txt = {
        "panels": {
          "tab": {
            "actions": {
              "splitRight": "Split Right",
              "splitDown": "Split Down",
              "close": "Close"
            },
            "labels": {
              "apps": "Proyectos",
              "navigator": "Navegador",
              "compile": "Compilador",
              "static": "Estaticos",
              "app": "Aplicación",
              "appConfig": "Configuración",
              "module": "Modulo",
              "settings": "Preferencias"
            }
          }
        },
        "footer": {
          "path": "pathname",
          "project": "Project",
          "projectEmpty": "No projects selected"
        },
        "early": {
          "title2": "Introduzca su nombre y código de acceso para que empieces con nosotros",
          "title": "Bienvenido a BeyondJS",
          "label": "Ingresa tu código de acceso temprano",
          "action": "Empezar",
          "error": "Código invalido, verifiquelo por favor",
          "message": "BeyondJS esta siento lanzado en etapas. Actualmente estamos ofreciendo un accceso temprano a aquellos que esten interesados en probarlo y brindarnos retroalimentación. ",
          "inputs": {
            "name": "Tú nombre",
            "code": "Código"
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