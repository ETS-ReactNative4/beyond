define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/modules/create/txt', true, {
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
    hash: 3424818134,
    creator: function (require, exports) {
      exports.txt = {
        "form": {
          "steps": {
            "first": "General data",
            "second": "Module details"
          },
          "name": "Module name",
          "description": "Description",
          "title": "Title",
          "multilanguage": "translations?",
          "webcomponent": "Web Component name",
          "server": "Server code",
          "styles": "Styles",
          "url": "URL",
          "button": "Create",
          "errors": {
            "route": "There is already a module with this defined path:"
          }
        },
        "placeholder": {
          "name": "Define a semantic name for your module",
          "title": "My beyondJs module",
          "description": "Add a description of your module",
          "button": "button",
          "webcomponent": "web-component"
        },
        "help": {
          "name": "The module name defines the folder name and the import path.",
          "description": "A description of what the module does",
          "title": "A title to use",
          "url": "The URL to navigate to your module in the app",
          "styles": "The style sheets, by default, are handled with sass.",
          "webcomponent": "Is the name of the HTML tag which going to be used to include it. Must be in lowercase and with two words separated by '-'",
          "titles": {
            "text": "Definicion en el module.json para archivos de textos",
            "server": "Definicion en el module.json para backend del modulo",
            "styles": "Definicion en el module.json para hojas de estilo con sass"
          }
        },
        "title": "Creación de un nuevo módulo",
        "subtitle": "Indica que tipo de modulo desea crear",
        "aditionalFeatures": "Additional Configuration",
        "types": {
          "bundles": {
            "title": "Modulo en blanco",
            "description": "Se crea una aplicación configurada y en blanco para que puedas definir lo que consideres necesario desde cero."
          },
          "templates": {
            "title": "Basic template",
            "description": "Elige una de las plantillas bases de los tipos de modulo para que puedas guiarte y avanzar de manera simple"
          }
        },
        "actions": {
          "changeModuleType": "Cambiar tipo de modulo"
        },
        "templates": {
          "title": "Plantilla",
          "options": [{
            "id": "page",
            "title": "Página en blanco",
            "description": "Módulo de página basico para web",
            "icon": "web"
          }, {
            "id": "server_page",
            "title": "Módulo con servicio node",
            "description": "Página con servicio y conexión webSocket implementada",
            "icon": "server"
          }, {
            "id": "mobile_login",
            "title": "Mobile login",
            "description": "Pagina con diseño login para aplicación de telefonos",
            "icon": "mobile"
          }]
        },
        "bundles": {
          "title": "Bundle type",
          "options": [{
            "id": "page",
            "title": "Página",
            "description": "Un modulo que puede ser accedigo por medio de una URL."
          }, {
            "id": "widget",
            "title": "Widget",
            "description": "Texto para widget"
          }, {
            "id": "layout",
            "title": "Layout",
            "description": "Permite definir la estructura general de varias páginas y compartir elementos en común de la aplicación"
          }, {
            "id": "code",
            "title": "Código",
            "description": "Tiene multiples funciones. Puede ser un componente react que será utilizado en múltiples páginas y modulos, o puede ser código para manejo de modelos y lógica."
          }, {
            "id": "bridge",
            "title": "Bridge",
            "description": "Texto para bridges"
          }, {
            "id": "ts",
            "title": "Typescript",
            "description": "Texto para typecript"
          }]
        },
        "page": {
          "layout": "Layout",
          "input": {
            "layout": {
              "placeholder": "Select."
            }
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