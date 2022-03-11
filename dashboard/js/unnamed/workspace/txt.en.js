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

  const __pkg = bundle.package('en');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
    hash: 1037588558,
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
              "apps": "Projects",
              "navigator": "navigator",
              "compile": "Compile app",
              "static": "Static",
              "app": "Application",
              "appConfig": "Application config",
              "module": "Module",
              "settings": "Settings"
            }
          }
        },
        "footer": {
          "path": "pathname",
          "project": "Project",
          "projectEmpty": "No projects selected"
        },
        "early": {
          "title2": "Introduce your name and access code to start with us",
          "title": "The only framework for universal JavaScript",
          "label": "Entry your early code access",
          "action": "Start",
          "error": "The code is invalid, try again",
          "message": "BeyondJS is being launched in stages. We are actually offering early access for those who are interested to try  BeyondJS with us and to help with your appreciated feedback.`",
          "inputs": {
            "name": "Your name",
            "code": "Code",
            "email": "Email"
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