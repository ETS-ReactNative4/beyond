define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/services/compile/txt', true, {
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
    hash: 2885826070,
    creator: function (require, exports) {
      exports.txt = {
        "title": "Compila tu aplicación",
        "subtitle": "Optimizada y lista para producción",
        "compress": "¿Desea comprimir?",
        "rebuild": "¿Desea compilar iconos y splash si no han sido creados?",
        "builds": {
          "message": "Ver compilaciones anteriores",
          "title": "Compilaciones previas",
          "subtitle": "Historico de compilaciones por plataforma y tipo.",
          "platform": "Plataforma",
          "path": "Path"
        },
        "actions": {
          "compile": "Compilar",
          "change": "Cambiar",
          "close": "Cerrar",
          "finish": "Continuar"
        },
        "compilation": {
          "start": "Empezando proceso de compilación",
          "title": "Proceso de compilación",
          "subtitle": "Haciendo magia con tu código.",
          "finished": "La compilación se realizó exitosamente."
        },
        "environments": {
          "title": "Selecciona el entorno de compilación",
          "titleSelected": "Entorno",
          "dev": {
            "title": "Desarrollo",
            "description": "Compila el código de la aplicación generando bundles sin comprimir que permitan realizar pruebas y revisar el código."
          },
          "prod": {
            "title": "Producción",
            "description": "El código queda optimizado para producción, con los bundles comprimidos y minificados."
          }
        },
        "platforms": {
          "title": "Selecciona la plataforma",
          "titleSelected": "Plataforma",
          "mobile": {
            "title": "Mobile",
            "description": "Se genera código listo para compilar con cordova/phonegap"
          },
          "web": {
            "title": "Web",
            "description": "Código compilado para SPA."
          }
        },
        "so": {
          "title": "¿Que sistema operativo vas a compilar?",
          "titleSelected": "Sistema operativo",
          "android": {
            "title": "Android",
            "description": "Se genera código listo para compilar con cordova/phonegap"
          },
          "ios": {
            "title": "IOs",
            "description": "Código compilado para SPA."
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