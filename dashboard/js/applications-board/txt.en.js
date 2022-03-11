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

  const __pkg = bundle.package('en');

  const modules = new Map();
  /*********************
  INTERNAL MODULE: ./txt
  *********************/

  modules.set('./txt', {
    hash: 1560692901,
    creator: function (require, exports) {
      exports.txt = {
        "empty": {
          "title": "Welcome to BeyondJS",
          "subtitle": "Let's start with your first project",
          "info": "What's that?"
        },
        "header": {
          "title": "Projects",
          "projectsTitle": "Projects",
          "applications": "Projects",
          "libraries": "Libraries",
          "elements": "Elements",
          "titleHeader": "Project name goes here title",
          "showApps": "Show APP Information",
          "filtersTitle": "Filters Bundles",
          "selectView": "Select View",
          "welcome": "Welcome:",
          "logIn": "Log In:"
        },
        "applications": {
          "libraries": "Libraries",
          "libAssoc": "Associated libraries",
          "modules": "Modules",
          "modAssoc": "Associated modules"
        },
        "application": {
          "description": "Does not have description"
        },
        "actions": {
          "play": "Play",
          "stop": "Stop",
          "restart": "Restart",
          "details": "Details",
          "compile": "Compile",
          "publish": "Publish",
          "create": "Create project",
          "download": "Download"
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