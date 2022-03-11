define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.txt = _exports2.hmr = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/create/txt', true, {
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
    hash: 1890146533,
    creator: function (require, exports) {
      exports.txt = {
        "subtitle": "Select what you want to do",
        "actions": {
          "submit": "Create"
        },
        "created": "Application created",
        "form": {
          "scope": "Project scope",
          "name": "Project name",
          "title": "Add a title to your new project",
          "description": "Description",
          "ports": {
            "navigate": {
              "label": "Port",
              "info": "Port to navigate your project"
            },
            "inspect": {
              "label": "Inspect Port",
              "info": "Port to inspect the project with devtools"
            },
            "error": "Port isn't available",
            "success": "Port checked and available",
            "tooltip": "Check port"
          },
          "types": {
            "titles": {
              "empty": "Blank projects",
              "templates": "Templates"
            },
            "empty": {
              "description": "A configured and blank project is created so that you can define what you consider necessary from scratch."
            },
            "node": {
              "title": "Node Project",
              "description": "Project that will be compiled to be executed in a Node.js environment."
            },
            "backend": {
              "title": "Backend",
              "description": "Node.js project that exposes communication interfaces to be consumed by both web clients and other backends"
            },
            "web": {
              "title": "Web",
              "description": "Web, Android, iOS project. Both the client code and the backend code coexist in the same  project."
            },
            "express": {
              "title": "Express template",
              "description": "Create an express server in the simplest way possible"
            },
            "library": {
              "title": "Library",
              "description": " Container of client and server modules to be consumed by other projects.."
            },
            "web-backend": {
              "title": "Template Web - Backend",
              "description": "Web App template with backend."
            },
            "board": {
              "title": "Board template",
              "description": "Template with Trello style to start coding."
            },
            "react": {
              "title": "React starter app",
              "description": "React configured and ready to use."
            },
            "svelte": {
              "title": "Svelte",
              "description": "Svelte configured and ready to use."
            },
            "vue": {
              "title": "Vue App",
              "description": "Svelte configured and ready to use."
            }
          }
        },
        "errors": {
          "APP_EXISTS": "A folder with this name already exists in your directory"
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