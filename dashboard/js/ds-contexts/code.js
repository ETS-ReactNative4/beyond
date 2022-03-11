define(["exports", "react", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.useWorkspacePanelsContext = _exports2.useDSWorkspaceContext = _exports2.useDSAsideContext = _exports2.useConfigContext = _exports2.useAppContext = _exports2.hmr = _exports2.WorkspacePanelsContext = _exports2.DSWorkspaceContext = _exports2.DSPreAside = _exports2.DSBoards = _exports2.DSAsideContext = _exports2.ConfigContext = _exports2.AppContext = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('@beyond-js/kernel/core/ts', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-contexts/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /*************************
  INTERNAL MODULE: ./context
  *************************/

  modules.set('./context', {
    hash: 3743684182,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.useWorkspacePanelsContext = exports.useDSWorkspaceContext = exports.useDSAsideContext = exports.useConfigContext = exports.useAppModulesContext = exports.useAppContext = exports.WorkspacePanelsContext = exports.DSWorkspaceContext = exports.DSBoards = exports.DSAsideContext = exports.ConfigContext = exports.AppModulesContext = exports.AppContext = void 0;

      var React = require("react");

      var _ts = require("@beyond-js/kernel/core/ts");
      /*bundle */


      const DSBoards = new class extends _ts.Events {
        #items = new Map();

        get items() {
          return this.#items;
        }

        add(identifier, specs) {
          this.items.set(identifier, specs);
          this.trigger('board.added');
        }

      }();
      /**
       * Workspace
       */

      exports.DSBoards = DSBoards;
      /*bundle */

      const DSWorkspaceContext = React.createContext();
      exports.DSWorkspaceContext = DSWorkspaceContext;
      /*bundle */

      const useDSWorkspaceContext = () => React.useContext(DSWorkspaceContext);
      /**
       * ASide
       */


      exports.useDSWorkspaceContext = useDSWorkspaceContext;
      /*bundle */

      const DSAsideContext = React.createContext();
      exports.DSAsideContext = DSAsideContext;
      /*bundle */

      const useDSAsideContext = () => React.useContext(DSAsideContext);
      /**
       * Panels
       */


      exports.useDSAsideContext = useDSAsideContext;
      /*bundle */

      const WorkspacePanelsContext = React.createContext();
      exports.WorkspacePanelsContext = WorkspacePanelsContext;
      /*bundle */

      const useWorkspacePanelsContext = () => React.useContext(WorkspacePanelsContext);
      /**
       * Application
       */


      exports.useWorkspacePanelsContext = useWorkspacePanelsContext;
      /*bundle */

      const AppContext = React.createContext();
      exports.AppContext = AppContext;
      /*bundle */

      const useAppContext = () => React.useContext(AppContext);

      exports.useAppContext = useAppContext;
      /*bundle */

      const ConfigContext = React.createContext();
      exports.ConfigContext = ConfigContext;
      /*bundle */

      const useConfigContext = () => React.useContext(ConfigContext);
      /**
       * MODULES
       */


      exports.useConfigContext = useConfigContext;
      const AppModulesContext = React.createContext();
      exports.AppModulesContext = AppModulesContext;

      const useAppModulesContext = () => React.useContext(AppModulesContext);

      exports.useAppModulesContext = useAppModulesContext;
    }
  });
  /**************************
  INTERNAL MODULE: ./preaside
  **************************/

  modules.set('./preaside', {
    hash: 2495865331,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DSPreAside = void 0;
      /*bundle*/

      const DSPreAside = new class extends Events {
        #bottom = new Map();

        get bottom() {
          return this.#bottom;
        }

        #top = new Map();

        get top() {
          return this.#top;
        }

        addToTop(identifier, specs) {
          this.#top.set(identifier, specs);
          this.trigger('item.added');
        }

        addItemsToTop(items) {}

        addToBottom(identifier, specs) {
          this.#bottom.set(identifier, specs);
          this.trigger('item.added');
        }

        addItems(position, items) {
          const nameFunction = position === 'bottom' ? 'addToBottom' : 'addToTop';
          Object.keys(items).forEach(name => {
            const data = items[name];
            this[nameFunction](name, data);
          });
          this.trigger('item.added');
        }

        remove = items => {
          items.forEach(item => {
            if (this.#bottom.has(item)) this.#bottom.delete(item);
            if (this.#top.has(item)) this.#top.delete(item);
          });
        };
      }();
      exports.DSPreAside = DSPreAside;
    }
  });
  /********************************
  INTERNAL MODULE: ./use-controller
  ********************************/

  modules.set('./use-controller', {
    hash: 1319212642,
    creator: function (require, exports) {
      // import React from "react";
      //
      // function useController(Controller) {
      //
      //     const [controller, setController] = React.useState();
      //     React.useEffect(() => {
      //
      //     }, []);
      //
      // }
      "use strict";
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.DSBoards = require('./context').DSBoards;
    _exports.DSWorkspaceContext = require('./context').DSWorkspaceContext;
    _exports.useDSWorkspaceContext = require('./context').useDSWorkspaceContext;
    _exports.DSAsideContext = require('./context').DSAsideContext;
    _exports.useDSAsideContext = require('./context').useDSAsideContext;
    _exports.WorkspacePanelsContext = require('./context').WorkspacePanelsContext;
    _exports.useWorkspacePanelsContext = require('./context').useWorkspacePanelsContext;
    _exports.AppContext = require('./context').AppContext;
    _exports.useAppContext = require('./context').useAppContext;
    _exports.ConfigContext = require('./context').ConfigContext;
    _exports.useConfigContext = require('./context').useConfigContext;
    _exports.DSPreAside = require('./preaside').DSPreAside;
  };

  let DSBoards, DSWorkspaceContext, useDSWorkspaceContext, DSAsideContext, useDSAsideContext, WorkspacePanelsContext, useWorkspacePanelsContext, AppContext, useAppContext, ConfigContext, useConfigContext, DSPreAside; // Module exports

  _exports2.DSPreAside = DSPreAside;
  _exports2.useConfigContext = useConfigContext;
  _exports2.ConfigContext = ConfigContext;
  _exports2.useAppContext = useAppContext;
  _exports2.AppContext = AppContext;
  _exports2.useWorkspacePanelsContext = useWorkspacePanelsContext;
  _exports2.WorkspacePanelsContext = WorkspacePanelsContext;
  _exports2.useDSAsideContext = useDSAsideContext;
  _exports2.DSAsideContext = DSAsideContext;
  _exports2.useDSWorkspaceContext = useDSWorkspaceContext;
  _exports2.DSWorkspaceContext = DSWorkspaceContext;
  _exports2.DSBoards = DSBoards;

  __pkg.exports.process = function (require) {
    _exports2.DSBoards = DSBoards = require('./context').DSBoards;
    _exports2.DSWorkspaceContext = DSWorkspaceContext = require('./context').DSWorkspaceContext;
    _exports2.useDSWorkspaceContext = useDSWorkspaceContext = require('./context').useDSWorkspaceContext;
    _exports2.DSAsideContext = DSAsideContext = require('./context').DSAsideContext;
    _exports2.useDSAsideContext = useDSAsideContext = require('./context').useDSAsideContext;
    _exports2.WorkspacePanelsContext = WorkspacePanelsContext = require('./context').WorkspacePanelsContext;
    _exports2.useWorkspacePanelsContext = useWorkspacePanelsContext = require('./context').useWorkspacePanelsContext;
    _exports2.AppContext = AppContext = require('./context').AppContext;
    _exports2.useAppContext = useAppContext = require('./context').useAppContext;
    _exports2.ConfigContext = ConfigContext = require('./context').ConfigContext;
    _exports2.useConfigContext = useConfigContext = require('./context').useConfigContext;
    _exports2.DSPreAside = DSPreAside = require('./preaside').DSPreAside;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});