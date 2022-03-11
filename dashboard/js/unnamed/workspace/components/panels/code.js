define(["exports", "@beyond-js/ui/perfect-scrollbar/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/models/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/context-menu/code", "@beyond-js/dashboard/ds-editor/code", "react", "react-dom"], function (_exports2, _code, _js, _code2, _code3, _code4, _code5, _code6, _code7, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.PanelTab = PanelTab;
  _exports2.PanelView = PanelView;
  _exports2.Panels = Panels;
  _exports2.hmr = _exports2.PanelsManager = void 0;
  //BEYOND
  //DASHBOARD LIB
  //CONTEXT
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/panels/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /***********
  JS PROCESSOR
  ***********/

  /*************
  FILE: panel.js
  *************/

  class Panel extends _js.ReactiveModel {
    /**
     * Represents the active tab
     * @private
     */
    #activeItem;

    get activeItem() {
      return this.#activeItem;
    }

    _boards;

    get boards() {
      return this._boards;
    }

    #editor;

    get editor() {
      return this.#editor;
    }

    #id;

    get id() {
      return this.#id;
    }

    set id(value) {
      if (this.id === value) return;
      this.#id = value;
    }

    _name;

    get name() {
      return this._name;
    }
    /**
     * The panels manager
     * @private
     */


    _parent;

    get parent() {
      return this._parent;
    }

    _source;
    #editorManager;
    #tabs = new Map();

    get tabs() {
      return this.#tabs;
    }

    _type;

    get type() {
      return this._type;
    }

    #store;

    get workspace() {
      return this._parent.workspace;
    }

    constructor(parent, id, boardsOpened = []) {
      super();
      this.#id = id;
      this._parent = parent;
      this._boards = parent.boards;
      window.panel = this;
      this.#load();

      if (boardsOpened) {
        boardsOpened.forEach(board => this.openBoard(board));
      }
    }

    async #load() {
      await _code3.DSModel.initialise();
      this.#store = _code3.DSModel.db.store('panels');
    }
    /**
     *
     * @param type
     * @param application
     */


    createEditor(application, type) {
      const manager = (0, _code7.getEditorManager)(application);
      this.#editorManager = manager;
      this.#editor = manager.create({
        type,
        application,
        // the PLM object of application, not the manager
        id: `editor-panel-${this.id}`
      });
      this.triggerEvent();
    }

    getData() {
      const tabs = Array.from(this.#tabs.values()).map(item => {
        let data = { ...item
        };
        delete data.control;
        delete data.source;
        return data;
      });
      return {
        id: this.id,
        tabs,
        active: this.#activeItem
      };
    }

    async openBoard(board) {
      if (board?.type !== 'editor') {
        this.add(board.name, board.specs);
        return;
      }

      const application = await _code3.applicationsFactory.get(board.applicationId);
      const module = await application.moduleManager.load(board.moduleId);
      const source = await module.sources.get(board.sourceId);
      const {
        type,
        path,
        processor
      } = board;

      if (!source) {
        console.warn(`the source ${board.sourceId} was not found`);
        return;
      }

      await this.openFile({
        type,
        source,
        path,
        module,
        processor,
        applicationId: board.applicationId,
        application: application.application
      });
    }
    /**
     * Open a source in a new tab into a monaco editor instance
     *
     * @param specs.path
     * @param specs.source
     * @param specs.processor
     * @param specs.module
     * @param specs.application
     * @param specs.position
     * @param specs.type
     */


    async openFile(specs) {
      let {
        source,
        path,
        processor,
        applicationId,
        moduleId,
        module,
        type
      } = specs;
      this.#activeItem = path;

      if (!module && !moduleId) {
        throw new Error('The file requires the module or moduleId parameter');
      }

      const app = await _code3.applicationsFactory.get(applicationId);
      /**
       * TODO: @julio unify the way to get parameters in the function and simplify it.
       *
       * @type {*}
       */

      module = module ?? (await app.moduleManager.load(moduleId));
      if (!this.editor) await this.createEditor(app.application, type);
      this.editor.addFile({
        type,
        processor,
        source,
        module,
        active: true
      });

      if (!source) {
        console.trace("no se obtiene el source", source);
      }

      const tabSpecs = {
        sourceType: type,
        label: source.filename,
        id: source.filename,
        sourceId: source.id,
        type: 'editor',
        processor,
        moduleId: module.id,
        applicationId: app.application.id,
        source,
        path
      };

      if (type === 'dependency') {
        tabSpecs.label = source.label;
        tabSpecs.id = path;
      }
      /**
       * Label is used to show the user, id is used to identify de tab selected
       */


      this.tabs.set(path, tabSpecs);
      this.triggerEvent('panel.updated');
      this.triggerEvent();
    }
    /**
     * Adds tabs that doesn't needs the editor instance
     *
     * The tab must exists in the boards object.
     * @param name
     * @param specs
     */


    async add(name, specs = {}) {
      const control = this.boards.items.get(name);

      if (!control) {
        throw Error(`The board required does not exists: ${name}`);
      }

      let label = specs.label ? specs.label : control.label;
      const labelName = specs.label ? `${name}.${label.toLowerCase().replace(/ /g, '-')}` : undefined;
      const tabName = specs.name ? specs.name : specs.moduleId ? specs.moduleId : specs.label ? labelName : name;

      if (name === 'application') {
        const application = await _code3.applicationsFactory.get(specs.id);
        label = application.name;
      }

      this.tabs.set(tabName, {
        label: label,
        type: 'content',
        id: tabName,
        path: name,
        name: name,
        control: control.control,
        specs
      });
      this.#activeItem = tabName;
      this.triggerEvent('panel.updated');
      this.triggerEvent();
    }
    /**
     * Set the panel as active
     */


    setActive = () => this.parent.active = this;

    setTabName(id, name) {
      const data = this.tabs.get(id);
      if (!data) return;
      data.label = name;
      this.tabs.set(id, data);
      this.triggerEvent(`tab.change.${id}`);
      this.triggerEvent('panel.updated');
    }

    changeTab(tab) {
      if (!tab || !this.tabs.has(tab.id)) return;

      if (tab.type === 'editor') {
        this.editor.setSource(tab.sourceType ?? 'source', tab.source);
      }

      this._source = tab._source;
      this.#activeItem = tab.id;
      this.triggerEvent();
    }

    async closeTab(tab) {
      try {
        if (!this.tabs.has(tab.id)) return;
        if (tab.name === 'application') this.workspace.closeApp(tab.specs.id);
        const keys = [...this.tabs.keys()];

        if (keys.length === 1) {
          if (this.editor) {
            this.editor.instance.dispose();
            this.#editorManager.items.delete(this.#editor.id);
          }

          this.parent.closePanel(this.id);
          this.triggerEvent('panel.updated');
          return;
        }

        const pos = keys.indexOf(tab.id); // if the tab to be closed is the first tab, then the next tab
        // may be the active tab, if the tab to be closed is another tab, then
        // the active tab will be the previous tab.

        this.#activeItem = pos === 0 ? keys[pos + 1] : keys[pos - 1];
        this.tabs.delete(tab.id);
        this.triggerEvent('panel.updated');
        this.triggerEvent();
      } catch (e) {
        console.error(888, e);
      }
    }

  }
  /**************
  FILE: panels.js
  **************/

  /**
   * Manage the panels opened in the view
   *
   * A panel is a tab that can contains info content and editors tabs opened.
   */


  class PanelsManager extends _js.ReactiveModel {
    _boards;

    get boards() {
      return this._boards;
    }

    _total = 1;

    get total() {
      return this._total;
    }

    #items = new Map();

    get items() {
      return this.#items;
    }

    _active;

    get active() {
      return this._active;
    }

    _workspace;

    get workspace() {
      return this._workspace;
    }

    set active(panel) {
      if (this._active?.id === panel?.id) return;
      this._active = panel;
      this.triggerEvent();
    }

    #ready;

    get ready() {
      return this.#ready;
    }

    #store;
    /**
     *
     * @param boards
     * @param workspace
     * @param data
     */

    constructor(boards, workspace, data) {
      super();
      this.bind('editor', this.triggerEvent);
      this._boards = boards;
      this._workspace = workspace;
      this.#load(data);
    }

    async #load(data) {
      if (!data.items.size) {
        const panel = new Panel(this, 1);
        panel.add('applications');
        panel.bind('panel.updated', this.#triggerUpdate);
        this._active = panel;
        this.#items.set(1, panel);
        this.#triggerUpdate();
        this.triggerEvent();
        return;
      }

      data.items.forEach(item => {
        const panel = new Panel(this, item.id, item.tabs ?? []);
        const activeItem = item.tabs.find(item => item.id === item.active);

        if (activeItem) {
          panel.changeTab(activeItem);
        }

        this.#items.set(item.id, panel);
        this._active = !data.active || data.active === panel.id ? panel : undefined;
      });
      this.triggerEvent();
      this.#items.forEach(item => item.bind('panel.updated', this.#triggerUpdate));
    }

    #triggerUpdate = () => this.triggerEvent('panels.updated');
    getData = () => {
      const items = new Map();
      this.items.forEach(item => items.set(item.id, item.getData()));
      return {
        active: this._active.id,
        items: items
      };
    };
    /**
     * Adds a new panel
     * @param name
     * @param specs
     */

    async add(name, specs = {}) {
      const id = this.items.size + 1;
      const active = this.active;
      const newPanel = new Panel(this, id);
      const tab = active.tabs.get(active.activeItem);
      this._active = newPanel;
      newPanel.bind('change', this.triggerEvent);
      newPanel.bind('panel.updated', this.#triggerUpdate);
      this.#items.set(id, newPanel);

      if (name) {
        newPanel.add(name, specs);
        this.triggerEvent();
        return;
      } //if the method is called without params then the new
      //editor must be have opened the current active tab
      // const tab = active.tabs.get(active.activeItem);


      tab.type === 'editor' ? await newPanel.openFile(tab) : await newPanel.add(tab.path, tab.specs);
      this.triggerEvent();
      this.#triggerUpdate();
    }
    /**
     * Remove an opened panel
     * @param id
     */


    closePanel(id) {
      if (this.items.size === 1) return;
      const keys = [...this.items.keys()];
      const pos = keys.indexOf(id);
      const active = pos === 0 ? keys[pos + 1] : keys[pos - 1];
      this._active = this.items.get(active);
      const newOrder = new Map();
      this.items.delete(id);
      [...this.items.values()].forEach((item, index) => {
        item.id = index;
        newOrder.set(index, item);
      });
      this.#items = newOrder;
      this.triggerEvent();
    }

  }

  _exports2.PanelsManager = PanelsManager;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /******
  tab.jsx
  ******/


  function PanelTab({
    panel,
    item,
    id
  }) {
    const cls = `ds__tab ${panel.activeItem === id ? ' item-active' : ''}`;
    const isUnique = panel.tabs.size === 1 && panel.parent.items.size === 1;
    const attrs = {
      className: cls
    };
    const {
      texts: {
        panels: {
          tab: texts
        }
      },
      workspace: {
        contextMenu
      }
    } = (0, _code2.useDSWorkspaceContext)();
    const {
      addPanel
    } = (0, _code2.useWorkspacePanelsContext)();
    const [unpublished, setUnpublished] = React.useState(panel?.editor?.unpublished);
    const [showContextMenu, toggleContextMenu] = React.useState();
    const ref = React.useRef();
    let label = typeof item === 'string' ? item : item.label;
    if (!label && item.type !== 'editor' && item.path !== 'module') label = texts.labels[item.label];
    const [name, setName] = React.useState(label);
    if (panel.activeItem !== id) attrs.onClick = () => changeTab(item);

    const changeTab = item => panel.changeTab(item);

    const openContextMenu = () => {
      if (!ref.current === contextMenu.target) return;
      if (showContextMenu) return;
      toggleContextMenu({
        x: contextMenu.event.clientX,
        y: contextMenu.event.clientY
      });
    };

    (0, _code5.useBinder)([contextMenu], openContextMenu, 'fired.tab');
    (0, _code5.useBinder)([contextMenu], () => toggleContextMenu(false), 'closed');
    (0, _code5.useBinder)([panel], () => setName(panel.tabs.get(id).label), `tab.change.${id}`);
    (0, _code5.useBinder)([panel, panel.editor], () => {
      if (panel?.editor?.filename !== name) return;
      setUnpublished(panel.editor.unpublished);
    });
    React.useEffect(() => {
      if (item.type !== 'editor') return;

      const onChange = () => {
        if (item.source?.id === panel.editor.currentSource?.id) {
          setUnpublished(panel?.editor?.unpublished);
        }
      };

      panel.editor.bind('model.changed', onChange);
      return () => panel.editor.unbind('model.changed', onChange);
    }, []);

    const onClose = event => {
      event.stopPropagation();
      panel.closeTab(item);
    };

    const IconTab = () => {
      const cls = unpublished ? 'tab__icon tab--unpublished' : 'tab__icon';
      const attrs = {
        className: cls
      };
      if (isUnique) return null;
      if (!isUnique) attrs.onClick = onClose;
      return /*#__PURE__*/React.createElement(_code4.DSIconButton, _extends({
        icon: "close",
        title: texts.actions.close
      }, attrs));
    };

    return /*#__PURE__*/React.createElement("div", _extends({
      ref: ref,
      "data-context": "tab"
    }, attrs), name, /*#__PURE__*/React.createElement(IconTab, null), showContextMenu && /*#__PURE__*/React.createElement(_code6.DSContextMenu, {
      unmount: toggleContextMenu,
      specs: showContextMenu
    }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement(_code6.ItemMenu, {
      onClick: addPanel,
      icon: "splitView",
      label: texts.actions.splitRight
    }), /*#__PURE__*/React.createElement(_code6.ItemMenu, {
      onClick: onClose,
      icon: "splitView",
      label: texts.actions.close
    }))));
  }
  /***************
  context-menu.jsx
  ***************/


  function _DSContextMenu({
    specs,
    unmount
  }) {
    const container = document.createElement('span');

    const close = () => {
      document.removeEventListener('click', close);
      unmount(false);
    };

    React.useEffect(() => {
      const body = document.querySelector('body');
      document.addEventListener('click', close);
      body.appendChild(container);
      return () => container.remove();
    });
    return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: `${specs.y}px`,
        left: `${specs.x}px`
      },
      className: "ds-context-menu item-actions"
    }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Una accion"), /*#__PURE__*/React.createElement("li", null, "Otra accion"))), container);
  }
  /********
  panel.jsx
  ********/

  /**
   * Represents the Panel View.
   *
   * Each panel can contain multiple boards/tabs. The view suscribes by itself
   * to the model changes and is updated from that changes without wait for
   * appContext changes.
   * @param panel
   * @returns {JSX.Element}
   * @constructor
   */


  function PanelView({
    panel
  }) {
    const [state, setState] = React.useState({
      total: panel.tabs.size,
      activeTab: panel.activeItem
    });
    const {
      activeTab
    } = state;
    const tab = panel.tabs.get(activeTab);
    const ref = React.useRef(null);
    (0, _code5.useBinder)([panel], () => {
      setState({ ...state,
        total: panel.tabs.size,
        activeTab: panel.activeItem
      });
    });
    React.useEffect(() => {
      const onClick = event => panel.setActive();

      ref.current?.addEventListener('click', onClick);
      return () => ref.current?.removeEventListener('click', onClick);
    }, []);

    if (!tab || tab.type === 'editor' && !panel.editor) {
      return null;
    }

    const Control = tab.type === 'editor' ? _code7.EditorView : tab.control;
    const tabs = [];
    panel.tabs.forEach((item, id) => {
      tabs.push( /*#__PURE__*/React.createElement(PanelTab, {
        key: `tab-${panel.id}-${id}`,
        id: id,
        panel: panel,
        item: item
      }));
    });
    const specs = {
      panel: panel
    };
    if (tab.type === 'editor') specs.editor = panel.editor;
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "ds__panel"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ds__tabs-container"
    }, tabs), /*#__PURE__*/React.createElement(_code.BeyondScrollContainer, {
      className: "panel__container"
    }, /*#__PURE__*/React.createElement(Control, _extends({}, specs, {
      specs: tab.specs
    }))));
  }
  /*********
  panels.jsx
  *********/


  function Panels() {
    const {
      ready,
      workspace
    } = (0, _code2.useDSWorkspaceContext)();
    const {
      panels
    } = workspace;
    const output = [];
    const container = React.useRef();
    const [state, setState] = React.useState({});
    (0, _code5.useBinder)([panels], () => {
      setState({ ...state,
        items: panels.items
      });
    });
    if (!ready) return /*#__PURE__*/React.createElement(Preload, null);

    const pushPanel = (item, id) => /*#__PURE__*/React.createElement(PanelView, {
      specs: item.specs,
      panel: item,
      key: `panel-${id}`
    });

    panels.items.forEach((item, id) => output.push(pushPanel(item, id)));

    const addPanel = event => {
      panels.add();
    };

    const {
      vertical
    } = state;
    const panelsCss = {};
    const prop = vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
    panelsCss[prop] = `repeat(${panels.items.size}, minmax(0, 1fr))`;
    const cls = `panels__container ${vertical ? 'panels--vertical' : ''}`;
    return /*#__PURE__*/React.createElement(_code2.WorkspacePanelsContext.Provider, {
      value: {
        addPanel,
        panels: panels,
        panel: panels.active
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: container,
      style: panelsCss,
      className: cls
    }, /*#__PURE__*/React.createElement("nav", {
      className: "ds-panels__actions"
    }, /*#__PURE__*/React.createElement(_code4.DSIconButton, {
      onClick: addPanel,
      icon: "splitView",
      title: "Split editor"
    })), output));
  }
  /**********
  preload.jsx
  **********/


  function Preload() {
    return /*#__PURE__*/React.createElement("main", {
      className: "panels__container"
    }, /*#__PURE__*/React.createElement("nav", {
      className: "ds-editor__actions"
    }, /*#__PURE__*/React.createElement(_code4.DSIconButton, {
      icon: "splitView",
      title: "Split editor"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ds__panel"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ds__tabs-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds__tab item-active"
    }, "\xA0\xA0 \xA0\xA0 \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0")), /*#__PURE__*/React.createElement(_code.BeyondScrollContainer, {
      className: "panel__container"
    }, /*#__PURE__*/React.createElement("div", null))));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds__content-panel{padding:20px;width:100%}.ds__content-panel header{border-bottom:1px solid #a2000a;margin-bottom:30px}.ds__content-panel .form-column{display:flex;gap:10px;align-items:center}.ds__content-panel .form-column select{background:0 0;color:#fff;padding:8px}.ds__content-panel .form-column select option{color:#000}.panels__container .ds__panel{display:grid;grid-template-rows:auto 1fr;width:100%;flex-grow:0;overflow:auto;height:100%}.panels__container .ds__panel+.ds__panel{border-left:solid 2px #050910}@media (max-width:600px){.panels__container .ds__panel{flex-direction:row}}.panels__container .ds__panel>div{min-height:100%}.panels__container .ds-panels__actions{position:absolute;top:0;right:15px;z-index:1;height:34px}.panels__container .ds-panels__actions .beyond-icon-button{height:100%;width:30px;background:0 0;fill:#FFFFFF}.ds-application-view-layout .panels__container{display:grid;width:100%;height:calc(100vh - 81px);overflow:hidden;position:relative;z-index:2}.ds-application-view-layout .panels__container.panels--vertical{grid-auto-flow:row}.ds-application-view-layout .ds__tabs-container{display:flex;background:#313c50}.ds-application-view-layout .ds__tabs-container .ds__tab{height:34px;padding:8px 15px;background:#1a1a1a;display:flex;gap:8px;border-bottom:2px solid transparent;align-items:center;font-size:.9rem;cursor:pointer}.ds-application-view-layout .ds__tabs-container .ds__tab:hover{background:rgba(255,128,86,.4)}.ds-application-view-layout .ds__tabs-container .ds__tab:hover .beyond-icon{stroke-width:15px;stroke:#fff}.ds-application-view-layout .ds__tabs-container .ds__tab.item-active{border-left:.5px solid rgba(255,128,86,.8);border-right:.5px solid rgba(255,128,86,.8);border-bottom-color:#ff8056;background:rgba(255,128,86,.8)}.ds-application-view-layout .ds__tabs-container .ds__tab .beyond-icon-button.tab__icon{margin:0 -10px 0 0;height:15px;width:15px;padding:0}.ds-application-view-layout .ds__tabs-container .ds__tab .beyond-icon-button.tab__icon.tab--unpublished:not(:hover){background:#ff8056;border-radius:50%;fill:#FF8056}.ds-application-view-layout .ds__tabs-container .ds__tab .beyond-icon{height:.8rem;width:.8rem;transition:all .2s linear;fill:#fff}.ds-application-view-layout .ds__tabs-container .ds__tab .beyond-icon:hover{stroke-width:15px;stroke:#fff}';
  bundle.styles.appendToDOM();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});