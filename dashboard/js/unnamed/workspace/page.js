define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/form/code", "@beyond-js/ui/spinner/code", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/unnamed/components/uploader/code", "@beyond-js/dashboard/unnamed/components/breadcrumb/code", "@beyond-js/dashboard/models/code", "@beyond-js/dashboard/settings/code", "@beyond-js/dashboard/applications-board/code", "@beyond-js/dashboard/unnamed/application/create/code", "@beyond-js/dashboard/app-compile/code", "@beyond-js/dashboard/unnamed/application/board/code", "@beyond-js/dashboard/aside/code", "@beyond-js/dashboard/unnamed/workspace/components/navigator/code", "@beyond-js/dashboard/unnamed/workspace/components/panels/code", "@beyond-js/dashboard/ds-notifications/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/unnamed/modules/view/code", "@beyond-js/dashboard/unnamed/modules/create/code", "@beyond-js/dashboard/unnamed/layout/header-bar/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _ts, _code4, _code5, _code6, _code7, _code8, _code9, _code10, _code11, _code12, _code13, _code14, _code15, _code16, _code17, _code18, _code19, _code20, _code21, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ContextMenu = void 0;
  _exports2.DSWorkspace = DSWorkspace;
  _exports2.Page = Page;
  _exports2.hmr = _exports2.Workspace = void 0;
  //Beyond  UI
  //Libraries
  //Dashboard
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/page', false, {
    "txt": {
      "multilanguage": true
    }
  }, dependencies);
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
  FILE: aside.js
  *************/

  class WorkspaceAside extends _ts.ReactiveModel {
    #preaside;

    get preaside() {
      return this.#preaside;
    }

    #panel;

    get panel() {
      return this.#panel;
    }

    #workspace;

    get workspace() {
      return this.#workspace;
    }

    constructor(parent) {
      super();
      this.#workspace = parent;
      this.#workspace.bind('change', this.#binder);
    }

    #binder = () => {
      this.workspace.active ? this.addApplicationItems() : this.removeApplicationItems();
    };

    removeApplicationItems() {
      _code18.DSPreAside.remove(['application', 'module', 'favorites', 'add', 'template', 'statics']);
    }

    addApplicationItems() {
      _code18.DSPreAside.addItems('top', {
        application: {
          action: name => {
            this.setActive(name); // this.workspace.openBoard(name);
          },
          icon: 'project',
          title: 'Aplicación',
          tippy: {
            placement: 'right'
          }
        },
        module: {
          action: this.setActive,
          icon: 'folder',
          title: 'Modulo',
          tippy: {
            placement: 'right'
          }
        },
        favorites: {
          action: this.setActive,
          icon: 'favorite',
          title: 'Favoritos',
          tippy: {
            placement: 'right'
          }
        }
      });

      _code18.DSPreAside.addItems('bottom', {
        add: {
          action: () => this.workspace.setState({
            addModule: true
          }),
          icon: 'add',
          title: 'Crear modulo',
          tippy: {
            placement: 'right'
          }
        },
        template: {
          action: this.setActive,
          icon: 'folder',
          title: 'Template',
          tippy: {
            placement: 'right'
          }
        },
        statics: {
          action: this.setActive,
          icon: 'photoSize',
          title: 'Archivos estaticos',
          tippy: {
            placement: 'right'
          }
        },
        settings: {
          action: (name, params) => {
            this.workspace.openBoard(name, params);
          },
          icon: 'setting',
          title: 'Configuración',
          tippy: {
            placement: 'right'
          }
        }
      });

      this.triggerEvent();
    }

    setActive = (item, params = {}) => {
      if (!this.workspace.active) {
        console.error('there is any application selected');
        return;
      }

      this.#panel = this.panel !== item ? item : undefined;
      this.triggerEvent();
    };
  }
  /********************
  FILE: context-menu.js
  ********************/


  class ContextMenu extends _ts.ReactiveModel {
    _event;

    get event() {
      return this._event;
    }

    get currentTarget() {
      return this.event?.currentTarget;
    }

    get target() {
      return this.event?.target;
    }

    constructor() {
      super();
      this.init();
    }

    init() {
      window.oncontextmenu = event => {
        this._event = event;
        const target = event.target;
        const parentContext = target.closest('[data-context]');

        if (target.dataset.context || parentContext) {
          event.preventDefault();
          event.stopPropagation();
          event = target.dataset.context || parentContext.dataset.context;
          this.triggerEvent('closed');
          this.triggerEvent(`fired.${event}`);
          return;
        }

        if (target.classList.contains('ds-context-menu') || target.closest('.ds-context-menu')) {
          this.triggerEvent('closed');
        }
      };
    }

  }
  /************
  FILE: page.js
  ************/


  _exports2.ContextMenu = ContextMenu;

  function Page() {
    (() => {
      _code18.DSBoards.add('application', {
        control: _code13.ApplicationBoard,
        label: 'app'
      });

      _code18.DSBoards.add('applicationConfig', {
        control: _code13.ApplicationConfig,
        label: 'appConfig'
      });

      _code18.DSBoards.add('module', {
        control: _code19.ModuleBoard,
        label: 'module'
      });

      _code18.DSBoards.add('static', {
        control: _code13.StaticBoard,
        label: 'static'
      });

      _code18.DSBoards.add('settings', {
        control: _code9.ConfigBoard,
        label: 'settings'
      });

      _code18.DSBoards.add('applications', {
        control: _code10.ApplicationsBoard,
        label: 'apps'
      });

      _code18.DSBoards.add('navigator', {
        control: _code15.NavigatorBoard,
        label: 'navigator'
      });

      _code18.DSBoards.add('compile', {
        control: _code12.CompileBoard,
        label: 'compile'
      });
    })();

    const specs = {};

    if (this.qs.has('application_id')) {
      specs.id = this.qs.get('application_id');
    }

    const workspace = new Workspace(specs);
    ReactDOM.render(React.createElement(DSWorkspace, {
      workspace,
      board: this.vdir
    }), this.container);
    this.container.classList.add('ds-home-page');

    this.show = () => {// controller.createApp = this.vdir === 'create_app';
    };
  }
  /************
  FILE: tree.js
  ************/


  const TREE = {
    APPS: {
      tree: {
        properties: {
          bee: true,
          am: true
        }
      }
    }
  };
  /****************
  FILE: uploader.js
  ****************/

  class UploaderController extends _ts.ReactiveModel {
    _uploader;

    get uploader() {
      return this._uploader;
    }

    _workspace;
    _model;

    get application() {
      return this._workspace?.application;
    }

    _ready;

    get ready() {
      return this._ready;
    }

    _interval;
    _items = new Map();

    get items() {
      return this._items;
    }

    constructor(workspace) {
      super();
      this._workspace = workspace;
      this._loadEnd = this._loadEnd.bind(this);
      this.loadImages = this.loadImages.bind(this);
      this.load();
    }

    load() {
      const uploader = new _code6.JidaUploader({
        type: 'image',
        name: 'images',
        params: {},
        url: `${beyond.baseUrl}/uploader`,
        input: {
          name: 'images',
          multiple: true
        }
      });
      this._uploader = uploader;
      uploader.bind('loadend', this._loadEnd);
      uploader.bind('file.loaded', this.loadImages);
      this._ready = true;
    }

    loadImages() {
      const {
        files
      } = this.uploader;
      files.items.forEach((item, key) => this.items.set(key, item));
      clearInterval(this._interval);
      this._interval = window.setTimeout(this.triggerEvent, 0);
    }

    create(selector, dragAndDrop = undefined, model) {
      this._model = model;
      this.uploader.create(selector);
      if (dragAndDrop) this.uploader.addDragAndDrop(dragAndDrop);
      this.triggerEvent();
    }

    deleteItem(name) {
      const item = this.items.get(name);
      item.delete();
      this.items.delete(name);
      this.triggerEvent();
    }

    async _loadEnd() {
      try {
        this._fetching = true;
        this.triggerEvent();
        const model = this._model;

        const getType = () => {
          if (model.table.name === 'applications') return 'application';
          return model.table.name === 'modules' ? 'module' : 'overwrite';
        };

        const type = getType();
        type !== 'overwrite' && (await model.checkStatic());
        const specs = {
          id: model.id,
          type: type
        };
        const response = await this._uploader.publish(specs);

        for (const item of response.data) {
          if (!item.name) continue;
          const instance = this.getInstance(type, item);
          type === 'overwrite' && model.upload({
            origin: model.filename,
            overwrite: item.name
          }); //No existe el item ya que es un overwrite lo que se esta cargando

          if (!instance) continue;

          const update = async () => {
            if (!instance.found) return;
            this.items.set(item.name, instance);
            instance.off('change', update);
            this.triggerEvent();
          };

          instance.on('change', update);
          instance.fetch();
        }

        this._fetching = false;
        this.triggerEvent();
        this.triggerEvent('loadSuccess');
      } catch (e) {
        console.error(e);
      }
    }

    getInstance(type, item) {
      if (type === 'overwrite') return;
      const id = type === 'module' ? this._model.id : `application//${this._model.id}`;
      const specs = {
        identifier: {
          id: `${id}//${item.name}`
        }
      };
      const Model = type === 'module' ? _ts.ModuleStatic : _ts.ApplicationStatic;
      return new Model(specs);
    }

  }
  /*****************
  FILE: workspace.js
  *****************/


  const Workspace = class extends _ts.ReactiveModel {
    #contextMenu;

    get contextMenu() {
      return this.#contextMenu;
    }

    get types() {
      return [{}];
    }

    #panels;

    get panels() {
      return this.#panels;
    }

    #uploader;

    get uploader() {
      return this.#uploader;
    }

    #active;

    get active() {
      return this.#active;
    }

    set active(value) {
      if (value === this.active) return;
      this.#active = value;
      this.triggerEvent();
    }

    get application() {
      return this.#active;
    }

    #appsOpened = new Set();
    #applications;

    get applications() {
      return this.#applications;
    }

    #store;
    #firstTime = true;

    get ready() {
      if (this.#dsmodel?.ready && this.#firstTime && this.applications.tree.landed) this.#firstTime = false;
      const isReady = this.#user.validated && (!this.#firstTime || this.applications.tree.landed);
      return isReady && module.texts.ready;
    }

    get texts() {
      return module.texts?.value;
    }

    #state = {};

    get state() {
      return this.#state;
    }

    #dashboard;

    get dashboard() {
      return this.#dashboard;
    }

    #dsmodel;

    get dsmodel() {
      return this.#dsmodel;
    }

    #aside;

    get aside() {
      return this.#aside;
    }
    /**
     * @property {DSUser}
     */


    #user;

    get user() {
      return this.#user;
    }

    #wd;

    get wd() {
      return this.#wd;
    }

    constructor(specs = {}) {
      super();
      this.#applications = new _ts.Applications(TREE.APPS);
      this.#dashboard = _ts.Dashboard;
      this.#user = new _code8.DSUser(this.#dashboard);
      this.applications.bind('change', this.triggerEvent);
      this.applications.bind('change', this.#addNotifications);
      this.#user.bind('change', this.triggerEvent);
      module.texts.bind('change', this.triggerEvent);
      this.#applications.fetch();
      this.#dsmodel = _code8.DSModel;
      window.workspace = this;
      this.#load(specs);
    }

    #addNotifications = () => {
      if (!this.applications.tree.landed) return;

      _code17.DSNotifications.start(this.applications.items);
    };

    async #load() {
      this.#wd = await _ts.Dashboard.getWD();
      await this.#dsmodel.initialise(this.#wd);
      await _code8.DSModel.initialise();
      this.#store = _code8.DSModel.db.store('workspace');
      let data = await this.#store.get(this.#wd);
      const apps = Array.from(data.opened.values());

      if (!!apps.length) {
        const promises = apps.map(id => _code8.applicationsFactory.get(id));
        await Promise.all(promises);
      }

      if (data.activeApp) {
        this.#active = await _code8.applicationsFactory.get(data.activeApp);
        if (this.#active.application.found) this.#appsOpened.add(data.activeApp);else data = await _code8.DSModel.reset(this.#wd);
      }

      this.#contextMenu = new ContextMenu();
      this.#uploader = new UploaderController(this);
      this.#aside = new WorkspaceAside(this);
      this.#panels = new _code16.PanelsManager(_code18.DSBoards, this, data.panels);
      this.#panels.bind('panels.updated', this.#save);
      this.openBoard = this.openBoard.bind(this);
    }

    #save = () => {
      this.#store.save({
        wd: this.#wd,
        opened: this.#appsOpened,
        panels: this.#panels.getData(),
        activeApp: this.active?.application?.id
      });
    };
    setState = state => {
      this.#state = Object.assign(this.#state, state);
      this.triggerEvent();
    };
    /**
     * Opens a board into the active panel
     * @param name
     * @param specs
     */

    openBoard(name, specs) {
      this.#panels.active.add(name, specs);
    }

    openApp = async id => {
      this.active = await this.getApplication(id);
      this.#appsOpened.add(id);
      const specs = {
        id,
        name: `app.${id}`
      };
      this.openBoard('application', specs);
    };

    closeApp(id) {
      this.#appsOpened.delete(id);
      this.#save();
    }

    openNavigator(id, url, newTab = true) {
      const {
        panels,
        active
      } = this;
      const specs = {
        applicationId: id,
        url,
        id: `navigator.${performance.now()}`
      };

      if (panels.items.size === 1) {
        this.panels.add('navigator', specs);
        return;
      }

      const toActivateId = panels.active.id > 1 ? panels.active.id - 1 : 2;
      panels.active = panels.items.get(toActivateId);
      this.openBoard('navigator', specs);
    }

    getApplication(id, moduleId, element) {
      if ([undefined, NaN].includes(id)) return;
      return _code8.applicationsFactory.get(parseInt(id), moduleId, element);
    }
    /**
     *
     * @param specs
     */


    openFile = specs => {
      /**
       * Must be the PLM application object.
       */
      specs.application = this.application.application;
      this.panels.active.openFile(specs);
    };
    register = async (name, code) => {
      const response = await this.user.register(name, code);
      window.setTimeout(() => {
        this.triggerEvent();
      }, 1000);
      return response;
    };
  };
  _exports2.Workspace = Workspace;

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
  404.jsx
  ******/


  function Error404() {
    const {
      texts
    } = (0, _code18.useDSWorkspaceContext)();
    if (!texts) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "app__empty__container"
    }, /*#__PURE__*/React.createElement("h2", null, texts.application?.error404));
  }
  /*************
  app-errors.jsx
  *************/


  function AppErrors() {
    const {
      module,
      application
    } = (0, _code18.useDSWorkspaceContext)();
    const errors = application?.errors.map((error, i) => /*#__PURE__*/React.createElement("li", {
      key: `error-${i}`
    }, error));
    const warnings = application?.warnings.map((warnings, i) => /*#__PURE__*/React.createElement("li", {
      key: `warnings-${i}`
    }, warnings));
    return /*#__PURE__*/React.createElement("div", {
      className: "ds__workspace__errors"
    }, !!errors?.length && /*#__PURE__*/React.createElement(_code5.BeyondAlert, {
      type: "error"
    }, /*#__PURE__*/React.createElement("ul", null, errors)), !!warnings?.length && /*#__PURE__*/React.createElement(_code5.BeyondAlert, {
      type: "warning"
    }, /*#__PURE__*/React.createElement("ul", null, warnings)));
  }
  /*****************
  developer-form.jsx
  *****************/


  function DeveloperForm({
    texts,
    workspace
  }) {
    const [state, setState] = React.useState({
      name: "",
      email: ""
    });
    const ref = React.useRef();

    const handleInputChange = event => {
      const target = event.currentTarget;
      const data = {};
      data[target.name] = target.value;
      setState(state => ({ ...state,
        ...data
      }));
    };

    const handleSubmit = async e => {
      e.preventDefault();
      setState({ ...state,
        fetching: true
      });
      const container = ref.current;
      container.closest('html').classList.toggle('is-processing');
      container.classList.toggle('is-fetching');

      try {
        window.setTimeout(async () => {
          await workspace.register(state.name, state.email);
          container.classList.toggle('is-fetching');
          window.setTimeout(() => {
            container.classList.add('ending', 'ending-left');
            container.closest('html')?.classList.toggle('is-processing');
            return;
          }, 1000);
        }, 2000);
      } catch (e) {
        console.error(e);
      } // reset()

    };

    React.useEffect(() => {
      return () => {
        const container = ref.current;
        container.classList?.add('ending', 'ending-left');
        container.closest('html').classList?.toggle('is-processing');
      };
    }, []);
    const disabled = {};
    if (!state.name || !state.email || state.fetching) disabled.disabled = true;
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "container__early__form"
    }, /*#__PURE__*/React.createElement("div", {
      className: "elements__section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "logo"
    }, /*#__PURE__*/React.createElement(_code.BeyondImage, {
      src: "/images/logo.png",
      s: true,
      alt: "logo"
    })), /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, texts.early.title), /*#__PURE__*/React.createElement("h4", null, texts.early.title2), state.error && /*#__PURE__*/React.createElement("h5", {
      className: "warning-text"
    }, texts.early.error)), /*#__PURE__*/React.createElement("form", {
      action: "#",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-sub-group"
    }, /*#__PURE__*/React.createElement(_code2.BeyondInput, {
      name: "name",
      label: texts.early.inputs.name,
      required: true,
      value: state.name,
      onChange: handleInputChange,
      autoComplete: "off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-sub-group"
    }, /*#__PURE__*/React.createElement(_code2.BeyondInput, {
      name: "email",
      label: texts.early.inputs.email,
      required: true,
      value: state.email,
      onChange: handleInputChange,
      autoComplete: "off"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form__actions"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, _extends({
      type: "submit"
    }, disabled, {
      className: "btn secondary"
    }), state.fetching ? /*#__PURE__*/React.createElement(_code3.BeyondSpinner, {
      className: "on-primary",
      active: true
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, texts.early.action))), /*#__PURE__*/React.createElement("div", {
      className: "early__message"
    }, texts.early.message))));
  }
  /*************
  footer-bar.jsx
  *************/


  function FooterBar() {
    const {
      workspace,
      workspace: {
        application
      },
      texts
    } = (0, _code18.useDSWorkspaceContext)();
    const [fetching, setFetching] = React.useState();

    const clean = event => {
      event.preventDefault();
      workspace.dashboard.cleanCache();
    };

    return /*#__PURE__*/React.createElement("footer", {
      className: "ds-footer-bar"
    }, /*#__PURE__*/React.createElement("div", null, "Beyond JS"), /*#__PURE__*/React.createElement("div", {
      className: "flex-container"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
      onClick: clean
    }, fetching ? /*#__PURE__*/React.createElement(_code3.BeyondSpinner, {
      active: true,
      className: "on-primary"
    }) : `Clean cache`, " "), application ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "footer__label"
    }, texts.footer.project), /*#__PURE__*/React.createElement("span", {
      className: "primary-text"
    }, application.application.name)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      color: "footer__label empty-label"
    }, texts.footer.projectEmpty))));
  }
  /*******
  icon.jsx
  *******/


  function IconLogo() {
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-preload__icon-container"
    }, /*#__PURE__*/React.createElement(_code5.DSIcon, {
      className: "ds-preload__icon",
      icon: {
        viewBox: '0 0 51.1 94.341',
        icon: `<g id="beyond-ales" transform="translate(0 58.014)">
                <path style="fill:#b6bdc7;"
                      d="M134.558,86.353c-1.639,6.215-2.471,12.1-2.192,15.5.286,3.471,1.683,3.847,3.666.984a43.137,43.137,0,0,0,4.522-10.109A28.74,28.74,0,0,1,134.558,86.353Zm35.834,9.609a28.705,28.705,0,0,1-8.381,2.521,43.14,43.14,0,0,0-1.137,11.018c.286,3.469,1.684,3.843,3.666.981C166.485,107.674,168.7,102.165,170.392,95.962Zm-23.269.565c-2.3,8.985-3.763,17.18-3.931,21.955-.184,5.224,1.214,5.6,3.666.981,2.241-4.223,5.065-12.054,7.566-20.98a25.534,25.534,0,0,1-7.3-1.956Z"
                      transform="translate(-132.313 -86.353)"/>
            </g>
            <g id="beyond-circle">
                <path style="fill:#d9684a;"
                      d="M128.259,81.117q-.921-.031-1.833.006a24.566,24.566,0,1,0,1.833-.006Zm-.2,5.473a19.516,19.516,0,0,1,4.345.658,19.238,19.238,0,1,1-5.774-.655c.475-.019.95-.021,1.429,0Zm9.44-22.429a11.85,11.85,0,0,0-4.7,1.2,17.688,17.688,0,0,0-5.318,3.917,45.527,45.527,0,0,0-6.429,8.65,28.413,28.413,0,0,1,8.056-.687,32.179,32.179,0,0,1,3.335-4.186c3.645-3.672,6.623-3.975,8.134,2.181a32.7,32.7,0,0,1,.827,5.642,28.5,28.5,0,0,1,6.6,5.1,46.806,46.806,0,0,0-1.246-11.534A17.7,17.7,0,0,0,144.1,68.4c-1.208-1.671-2.838-3.456-4.981-4.03a6.208,6.208,0,0,0-1.63-.206Zm-9.218,16.448q-.94-.032-1.87.007a25.07,25.07,0,1,0,1.87-.006Zm-.209,5.586a19.913,19.913,0,0,1,4.434.672,19.632,19.632,0,1,1-5.892-.669c.484-.019.969-.021,1.458,0Z"
                      transform="translate(-101.592 -64.162)"/>
            </g>`
      }
    }));
  }
  /**********
  preload.jsx
  **********/


  function AppPreload() {
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-application-view-layout"
    }, /*#__PURE__*/React.createElement(Toolbar, null), /*#__PURE__*/React.createElement(_code14.WorspaceAside, null), /*#__PURE__*/React.createElement("div", {
      className: "ds__main-container"
    }, children), /*#__PURE__*/React.createElement(FooterBar, null));
  }
  /*********************
  preload\collection.jsx
  *********************/


  function PreloadCollection({
    header
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, header && /*#__PURE__*/React.createElement(_code21.DsHeaderBar, null, /*#__PURE__*/React.createElement("header", {
      className: "app-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "info-list"
    }, /*#__PURE__*/React.createElement("h4", null, "\xA0")))), /*#__PURE__*/React.createElement("div", {
      className: "ds-container"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(PreloadHeader, {
      title: "Applications"
    }), /*#__PURE__*/React.createElement(PreloadItem, null)), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(PreloadHeader, {
      title: "Libraries"
    }), /*#__PURE__*/React.createElement(PreloadItem, null), /*#__PURE__*/React.createElement(PreloadItem, null), /*#__PURE__*/React.createElement(PreloadItem, null))));
  }
  /*****************
  preload\header.jsx
  *****************/


  const PreloadHeader = ({
    title
  }) => {
    return /*#__PURE__*/React.createElement("header", {
      className: "list_header"
    }, /*#__PURE__*/React.createElement("h4", null, "\xA0"), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }));
  };
  /***********************
  preload\item-preload.jsx
  ***********************/


  function PreloadItem() {
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-item_list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "item-info"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "link bold"
    }, /*#__PURE__*/React.createElement(BeyondPreloadText, {
      color: "#fff",
      height: "150px"
    })), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, /*#__PURE__*/React.createElement(BeyondPreloadText, {
      color: "#fff",
      height: "250px"
    })), /*#__PURE__*/React.createElement("a", {
      className: "link",
      target: "_blank"
    }, /*#__PURE__*/React.createElement(BeyondPreloadText, {
      height: "50px"
    })), /*#__PURE__*/React.createElement("p", {
      className: "p2 primary-dark-color"
    }, /*#__PURE__*/React.createElement(BeyondPreloadText, {
      height: "50px",
      className: "primary"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "right-col actions"
    }, /*#__PURE__*/React.createElement(_code5.DashboardIconButton, {
      icon: "upload",
      className: "circle",
      disabled: true
    }), /*#__PURE__*/React.createElement(_code5.DashboardIconButton, {
      icon: "plus",
      className: "circle",
      disabled: true
    })));
  }
  /******************
  preload\welcome.jsx
  ******************/


  const PreloadWelcome = ({
    workspace,
    setReady
  }) => {
    const ref = React.useRef();

    const onChange = () => {
      const container = ref.current;
      if (!workspace.ready) return;
      window.setTimeout(() => {
        container.classList.add('finishing');
        window.setTimeout(() => setReady(true), 800);
      }, 1500);
    };

    (0, _code4.useBinder)([workspace], onChange);
    React.useEffect(() => document.querySelector('body').classList.add('no-scroll'), []);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "preload-container"
    }, /*#__PURE__*/React.createElement(_code.BeyondImage, {
      src: "/images/logo.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "animation-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "circle"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        '--i': 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        '--i': 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        '--i': 3
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        '--i': 4
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        '--i': 5
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "animate-svg__container"
    }, /*#__PURE__*/React.createElement(IconLogo, null), /*#__PURE__*/React.createElement("div", {
      className: "line line-one"
    }), /*#__PURE__*/React.createElement("div", {
      className: "line line-one-two"
    }), /*#__PURE__*/React.createElement("div", {
      className: "line line-two"
    }), /*#__PURE__*/React.createElement("div", {
      className: "line line-two-two"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "overlay"
    }), /*#__PURE__*/React.createElement("div", {
      className: "overlay-2"
    }));
  };
  /**********
  toolbar.jsx
  **********/


  function Toolbar() {
    const {
      workspace: {
        user,
        application
      }
    } = (0, _code18.useDSWorkspaceContext)();
    const cls = "primary";
    const items = [['Home']];

    if (application) {
      items.push([`${application.application.name}`, () => workspace.openApp(application.application.id)]);
    }

    return /*#__PURE__*/React.createElement("section", {
      className: `ds-toolbar ${cls}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "toolbar__aside__logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "group-items-toolbar"
    }, /*#__PURE__*/React.createElement(_code7.DsBreadcrumb, {
      items: items
    }), /*#__PURE__*/React.createElement("div", {
      className: "right__panel"
    }, /*#__PURE__*/React.createElement("section", {
      className: " user__label"
    }, user.name), /*#__PURE__*/React.createElement(_code17.NotificationPanel, null))));
  }
  /************
  workspace.jsx
  ************/


  function DSWorkspace({
    workspace
  }) {
    // TODO: @julio the navigator must be a board
    const [state, setState] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [ready, setReady] = React.useState(false);

    const navigateModule = route => setState({
      navigator: route,
      openNavigator: true
    });

    (0, _code4.useBinder)([workspace], () => setState({
      ready: workspace.ready,
      ...workspace.state
    }));
    React.useEffect(() => {
      _code18.DSPreAside.addToTop("applications", {
        icon: 'apps',
        title: 'Aplicaciones',
        tippy: {
          placement: 'right'
        },
        action: () => workspace.openBoard('applications')
      });

      _code18.DSPreAside.addToBottom('settings', {
        action: (name, params) => workspace.openBoard(name, params),
        icon: 'setting',
        title: 'Configuración',
        tippy: {
          placement: 'right'
        }
      });
    }, []);

    if (!workspace.ready || !ready) {
      return /*#__PURE__*/React.createElement(PreloadWelcome, {
        setReady: setReady,
        workspace: workspace
      });
    }

    if (!workspace.user.hasAccess) {
      return /*#__PURE__*/React.createElement(DeveloperForm, {
        texts: workspace.texts,
        workspace: workspace
      });
    }

    const {
      texts,
      applications,
      active,
      panels
    } = workspace;
    let value = {
      ready: state.ready,
      workspace,
      texts,
      applications,
      navigateModule,
      active,
      panels,
      showAppForm: () => setShowModal(true),
      showModuleForm: () => setState({
        addModule: true
      }),
      panel: panels.active
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_code18.DSWorkspaceContext.Provider, {
      value: value
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-application-view-layout"
    }, /*#__PURE__*/React.createElement(Toolbar, null), /*#__PURE__*/React.createElement(AppErrors, null), /*#__PURE__*/React.createElement(_code14.WorspaceAside, null), /*#__PURE__*/React.createElement("div", {
      className: "ds__main-container"
    }, /*#__PURE__*/React.createElement(_code16.Panels, null)), /*#__PURE__*/React.createElement(FooterBar, null))), showModal && /*#__PURE__*/React.createElement(_code11.ApplicationCreate, {
      closeModal: () => {
        setShowModal(false);
      }
    }), state.addModule && /*#__PURE__*/React.createElement(_code20.CreateModuleForm, {
      workspace: workspace,
      onClose: () => {
        workspace.setState({
          addModule: false
        });
      }
    }));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-alert{border-radius:0}.beyond-alert .beyond-alert_content{display:grid;align-items:center}.beyond-alert ul{display:grid;list-style:none;padding:0;margin:0;align-items:center}.beyond-alert ul li:first-letter{text-transform:uppercase}.beyond-alert.alert-warning{color:#533c06}.container__early__form{display:flex;align-items:center;justify-content:center;height:100vh;justify-items:center;flex-direction:column;max-width:500px;margin:auto;-webkit-animation-name:fadeIn;-moz-animation-name:fadeIn;-ms-animation-name:fadeIn;-o-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{.container__early__form 0%{opacity:0}.container__early__form 100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.container__early__form .warning-text{color:#f7d994;-webkit-animation-name:fadeIn;-moz-animation-name:fadeIn;-ms-animation-name:fadeIn;-o-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{.container__early__form .warning-text 0%{opacity:0}.container__early__form .warning-text 100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.container__early__form .logo img{max-width:200px}.container__early__form header{text-align:center;margin-bottom:30px}.container__early__form header h1{font-size:20px;margin-left:1rem}.container__early__form.ending .elements__section{opacity:.1}.container__early__form.ending.ending-left .elements__section{-webkit-animation-name:fadeOutLeft;-moz-animation-name:fadeOutLeft;-ms-animation-name:fadeOutLeft;-o-animation-name:fadeOutLeft;animation-name:fadeOutLeft;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeOutLeft{0%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}100%{opacity:0;-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);-ms-transform:translateX(-20px);-o-transform:translateX(-20px);transform:translateX(-20px)}}@-moz-keyframes fadeOutLeft{0%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}100%{opacity:0;-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);-ms-transform:translateX(-20px);-o-transform:translateX(-20px);transform:translateX(-20px)}}@-ms-keyframes fadeOutLeft{.container__early__form.ending.ending-left .elements__section 0%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}.container__early__form.ending.ending-left .elements__section 100%{opacity:0;-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);-ms-transform:translateX(-20px);-o-transform:translateX(-20px);transform:translateX(-20px)}}@-o-keyframes fadeOutLeft{0%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}100%{opacity:0;-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);-ms-transform:translateX(-20px);-o-transform:translateX(-20px);transform:translateX(-20px)}}@keyframes fadeOutLeft{0%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}100%{opacity:0;-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);-ms-transform:translateX(-20px);-o-transform:translateX(-20px);transform:translateX(-20px)}}.container__early__form .elements__section{display:flex;justify-content:center;flex-direction:column;align-items:center}.container__early__form form{width:100%}.container__early__form form .form-group{display:flex;border-radius:4px}.container__early__form form .form-group .form-sub-group{position:relative}.container__early__form form .form-group .form-sub-group:last-child{flex-grow:1}.container__early__form form .form-group .form-sub-group .beyond-element-input{color:#fff}.container__early__form form .form-group .form-sub-group label{position:absolute;top:0;left:0;cursor:text;transform-origin:0 0;transition:all .3s}.container__early__form form .upper-text{text-transform:uppercase}.container__early__form form .form__actions{margin:40px 0;display:flex;justify-items:center;align-content:center;justify-content:center}.container__early__form form .form__actions .beyond-button{height:40px;width:60%}.container__early__form form .form__actions .beyond-button[disabled]{opacity:.2}.container__early__form form .early__message{font-size:1.1rem;padding:0 20px;text-align:center;color:#ff8056}.early-access__container{display:flex;align-items:center;justify-content:center;flex-direction:column;width:100%}.early-access__container header h1{color:#ff8056}.early-access__container form{display:grid;gap:15px}.early-access__container form label{display:inline-grid;text-align:center;font-size:1.4rem}.early-access__container form input{margin-top:30px;border:1px solid #ff8056;background:0 0;padding:15px;border-radius:15px;font-size:1.5rem;color:#ff8056;text-transform:uppercase;text-align:center;outline:0}.app__empty__container{height:100%;width:100%;display:flex;justify-content:center;align-items:top;padding-top:15%}.ds-footer-bar{grid-area:footer;z-index:8;position:fixed;bottom:0;font-family:Consolas,"Liberation Mono",Menlo,Courier,monospace;left:0;right:0;padding:8px 15px;background:#050910;display:flex;justify-content:space-between;align-items:center}.ds-footer-bar *{font-size:10px;padding:0}.ds-footer-bar h1,.ds-footer-bar h2,.ds-footer-bar h3,.ds-footer-bar p{padding:0;margin:0}.ds-footer-bar span{display:inline-flex;padding:0 5px}.ds-footer-bar .primary-text{color:#ff8056}.ds-footer-bar .beyond-button{background:#000;border:0;color:#fff}.ds__main-container{display:flex;width:100%;position:relative;flex-grow:0;flex-wrap:nowrap;overflow:hidden;flex-shrink:0;grid-area:panel;min-height:100%;overflow-x:auto;background:#000;z-index:1}.preload-container{height:100vh;width:100vw;overflow:hidden}.ds-application-view-layout{display:grid;height:100%;grid-template-areas:"toolbar toolbar" "errors errors" "aside panel" "aside panel" "footer footer";grid-template-columns:auto 1fr;grid-template-rows:auto auto 1fr auto;overflow:hidden}.ds-application-view-layout .ds-toolbar{grid-area:toolbar;z-index:2}.ds-application-view-layout .ds__aside{grid-area:aside}.ds-application-view-layout .ds__workspace__errors{grid-area:errors}.ds-application-view-layout .ds__main-content{display:flex;width:100%;position:relative;flex-grow:0;flex-wrap:nowrap;overflow:hidden;flex-shrink:0;grid-area:panel;min-height:100%;overflow-x:auto;background:#1a1a1a}.dashboard-layout .ds-toolbar .toolbar__aside__logo{background:url("/images/logo.png") no-repeat center center #313c50;background-size:50%;width:274px;display:flex;align-items:center;justify-content:center;height:50px}.dashboard-layout.aside-hidden .ds-toolbar .toolbar__aside__logo{width:54px;background-image:url("/images/beyond-iso.png");background-size:35%;overflow:hidden}.dashboard-layout .ds-toolbar{display:flex;position:sticky;justify-content:flex-start;align-items:center;gap:20px;height:50px;top:0;transition:all .3s linear;background:#121f36}.dashboard-layout .ds-toolbar .group-items-toolbar{display:flex;justify-content:space-between;width:100%;height:100%;align-items:center}.dashboard-layout .ds-toolbar .group-items-toolbar .right__panel{display:flex;gap:15px;place-items:center;height:100%}.dashboard-layout .ds-toolbar .ds-editor__module-name{display:flex;gap:15px;align-items:center}.dashboard-layout .ds-toolbar .ds-editor__module-name .beyond-icon{fill:#fff}';
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