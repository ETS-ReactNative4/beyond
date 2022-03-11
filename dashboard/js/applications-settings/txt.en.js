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

  const __pkg = bundle.package('en');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
    hash: 3449210140,
    creator: function (require, exports) {
      exports.txt = {
        "errors": {
          "noSelected": "the application selected does not has distributions",
          "ALREADY_EXISTS": "A distribution with this configuration already exists",
          "PORT_USED": "There is already a distribution with the indicated port"
        },
        "name": "Distribution name",
        "platform": {
          "applications": {
            "select": "Project"
          },
          "label": "Platform",
          "options": {
            "web": "Web",
            "backend": "Backend",
            "android": "Android",
            "ios": "iOS",
            "ssr": "SSR",
            "node": "Node"
          },
          "environment": "Environment",
          "port": {
            "label": "Port",
            "error": "Port isn't available",
            "success": "Port checked and available",
            "tooltip": "Check port"
          }
        },
        "ts": "TS",
        "default": "default",
        "checkType": "Check types",
        "ssr": "SSR",
        "titleModal": "Let's add a new distribution",
        "modalHeader": "Configure",
        "compress": "Compress",
        "add": "Add",
        "title": "Distributions",
        "environments": {
          "dev": "Development",
          "prod": "Production"
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