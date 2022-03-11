define(["exports", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/form/code", "@beyond-js/ui/image/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/popover/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/preload-text/code", "@beyond-js/ui/modal/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/models/code", "@beyond-js/dashboard/unnamed/components/tooltip/code", "@beyond-js/dashboard/unnamed/workspace/components/uploader/code", "@beyond-js/dashboard/ds-editor/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/context-menu/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _js, _code, _code2, _code3, _code4, _code5, _code6, _code7, _code8, _code9, _code10, _code11, _code12, _code13, _code14, _code15, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ApplicationBoard = ApplicationBoard;
  _exports2.ApplicationConfig = ApplicationConfig;
  _exports2.Header = Header;
  _exports2.ModulesList = ModulesList;
  _exports2.StaticBoard = StaticBoard;
  _exports2.hmr = void 0;
  _exports2.useController = useController;
  //DASHBOARD
  //CONTEXTS
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/board/code', false, {
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

  /******************
  FILE: controller.js
  ******************/

  const controller = new class Controller extends _js.ReactiveModel {
    #workspace;
    /**
     *
     */

    #application;

    get application() {
      return this.#application;
    }

    #changed = false;

    get ready() {
      const dependencies = !!module.texts.ready && !!_code12.monacoDependency?.ready;
      const models = !!this.application?.ready && !!_code9.DSModel.ready;
      return dependencies && models && this.currentId === this.application?.application?.id;
    }

    #moduleManager;

    get moduleManager() {
      return this.#moduleManager;
    }

    #favorites;

    get favorites() {
      return this.#favorites;
    }

    get texts() {
      return module.texts.value;
    }

    #currentId;

    get currentId() {
      return this.#currentId;
    }

    start(workspace, appId, moduleId, element) {
      if (this.#application && this.currentId !== appId) {
        this.#application.unbind('change', this.triggerEvent);
        this.#application = undefined;
      }

      const model = workspace.getApplication(appId, moduleId, element);
      this.#currentId = appId;
      model.bind('change', this.triggerEvent);
      this.#workspace = workspace;
      this.#application = model;
      this.#favorites = model.favorites;
      this.#moduleManager = model.moduleManager;
      module.texts.bind('change', this.triggerEvent);

      _code12.monacoDependency.bind('change', this.triggerEvent);

      this.triggerEvent();
    }

  }();
  /**********
  context.jsx
  **********/

  const StaticContext = React.createContext();

  const useStaticContext = () => React.useContext(StaticContext);
  /****************************
  application\action-button.jsx
  ****************************/


  function DSProcessButton({
    title,
    className,
    icon,
    onClick
  }) {
    const [fetching, setFetching] = React.useState();

    if (fetching) {
      return /*#__PURE__*/React.createElement("button", {
        className: "beyond-icon-button circle button--fetching"
      }, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
        active: true,
        className: "primary"
      }));
    }

    const action = async event => {
      setFetching(true);
      event.stopPropagation();
      await onClick();
      setFetching(false);
    };

    return /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: action,
      icon: icon,
      className: className,
      title: title
    });
  }
  /*********************
  application\config.jsx
  *********************/
  //TODO @julio @felix este archivo ya no se usa?
  // tiene una configuracion en el board, validar


  function ApplicationConfig() {
    let {
      texts: {
        actions
      },
      application
    } = (0, _code15.useAppContext)();
    const model = application?.application;
    if (!model) return null;
    const {
      declarations
    } = model;
    const {
      itemsProcessed,
      total
    } = declarations;
    const [state, setState] = React.useState({});
    (0, _code8.useBinder)([model, declarations], () => setState({}));

    const generateDeclarations = () => declarations.update();

    return /*#__PURE__*/React.createElement("div", {
      className: "workspace__board ds-board__application ds__board"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, model.name), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(BeeActions, {
      bee: model.bee,
      texts: actions
    }), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      onClick: generateDeclarations,
      className: "btn primary"
    }, !declarations.processing ? /*#__PURE__*/React.createElement(React.Fragment, null, actions.declarations) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      className: "on-primary"
    }), `${actions.generatingDeclarations} ${itemsProcessed}/${total}`)))), /*#__PURE__*/React.createElement(Description, null));
  }
  /**************************
  application\description.jsx
  **************************/


  function Description() {
    let {
      texts: {
        actions
      },
      application: {
        application
      }
    } = (0, _code15.useAppContext)();
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(EditField, {
      field: "title"
    }), /*#__PURE__*/React.createElement(EditField, {
      field: "description"
    }));
  }
  /**********************************
  application\distributions-board.jsx
  **********************************/


  function DistributionsBoard() {}
  /*******************
  application\edit.jsx
  *******************/


  function EditField({
    field
  }) {
    const [edit, setEdit] = React.useState(false);
    let {
      texts: {
        application: texts
      },
      application: {
        application
      }
    } = (0, _code15.useAppContext)();
    const [value, setValue] = React.useState(application[field] ?? '');
    const label = texts.info[field];
    const fieldValue = application[field] ?? texts.info.empty[field];

    const toggleEdit = () => setEdit(!edit);

    const onSubmit = event => {
      event.preventDefault();
      const data = {};
      data[field] = value;
      application.edit(data);
      setEdit(!edit);
    };

    const onEdit = event => {
      const target = event.currentTarget;
      setValue(target.value);
    };

    if (!fieldValue) {
      return /*#__PURE__*/React.createElement("div", {
        className: "item-formation"
      }, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement("form", {
        onSubmit: onSubmit,
        className: "form-group"
      }, /*#__PURE__*/React.createElement("input", {
        autoComplete: "off",
        onChange: onEdit,
        name: field,
        defaultValue: value
      })));
    }

    if (edit) {
      return /*#__PURE__*/React.createElement("div", {
        className: "item-information item-information--edit"
      }, /*#__PURE__*/React.createElement("div", null, label, " "), /*#__PURE__*/React.createElement("form", {
        onSubmit: onSubmit,
        className: "form-group"
      }, /*#__PURE__*/React.createElement("input", {
        autoComplete: "off",
        onChange: onEdit,
        name: field,
        defaultValue: value
      }), /*#__PURE__*/React.createElement(_code13.FadeIn, null, /*#__PURE__*/React.createElement("div", {
        className: "form__actions"
      }, /*#__PURE__*/React.createElement(_code.BeyondButton, {
        className: "btn primary",
        type: "submit"
      }, texts.actions.save), /*#__PURE__*/React.createElement(_code.BeyondButton, {
        className: "secondary rbtn btn-secondary",
        onClick: toggleEdit,
        type: "button"
      }, texts.actions.close)))));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "item-information"
    }, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement("div", {
      className: "description-item"
    }, /*#__PURE__*/React.createElement("p", {
      className: "p1 p-0"
    }, fieldValue), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: toggleEdit,
      icon: "edit"
    })));
  }
  /*****************************
  application\use-controller.jsx
  *****************************/


  function useController() {
    const [controller, setController] = React.useState(null);
    React.useEffect(() => {
      const controller = new Controller(...arguments);

      const onChange = () => {};

      controller.bind('change', onChange);
      return () => controller.unbind('change', onChange);
    }, []);
    return [controller];
  }
  /*************
  bee-action.jsx
  *************/


  function BeeActions({
    bee,
    texts
  }) {
    const [fetching, setFetching] = React.useState(bee?.status === 'initialising');
    if (!bee) return null;
    const icons = {
      stopped: 'play',
      running: 'stop'
    };
    const action = bee.status !== 'initialising' && icons[bee.status];

    if (fetching) {
      return /*#__PURE__*/React.createElement("button", {
        className: "beyond-icon-button circle button--fetching"
      }, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
        active: true,
        className: "primary"
      }));
    }

    const onClick = async event => {
      event.stopPropagation();
      const action = bee.status === 'stopped' ? 'start' : 'stop';
      setFetching(!fetching);

      try {
        await bee[action]();
        setFetching(!fetching);
      } catch (e) {
        console.error(e);
      }
    };

    const cls = `circle bee--action action--${action}`;
    return /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: onClick,
      icon: action,
      className: cls,
      title: texts[action]
    });
  }
  /********
  board.jsx
  ********/


  function ApplicationBoard(props) {
    const [displayView, setDisplayView] = React.useState(localStorage.getItem('beyond.lists.view') ?? 'table');
    const [state, setState] = React.useState({});
    const {
      panel,
      workspace
    } = (0, _code15.useDSWorkspaceContext)();
    const {
      id,
      moduleId
    } = props?.specs ?? {};
    React.useEffect(() => {
      if (!id) return;

      const onChange = () => {
        const {
          ready,
          texts
        } = controller;
        setState(state => ({ ...state,
          controller,
          ready
        }));

        if (ready) {
          let {
            application: {
              application
            }
          } = controller;
          panel.setTabName(`app.${application.id}`, application.name);
        }
      };

      controller.start(workspace, id, moduleId);
      controller.bind('change', onChange);
      if (controller.ready) onChange();
      return () => controller.unbind('change', onChange);
    }, [id]);
    if (!state.ready || controller.currentId !== id) return /*#__PURE__*/React.createElement(Preloader, null);
    const value = {
      application: controller.application,
      texts: controller.texts,
      displayView,
      setDisplayView,
      id
    };
    return /*#__PURE__*/React.createElement(_code15.AppContext.Provider, {
      value: value
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds__board"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(HeaderList, null), /*#__PURE__*/React.createElement(ModulesList, null)));
  }
  /*********
  header.jsx
  *********/


  function Header() {
    let {
      texts,
      texts: {
        actions
      },
      application
    } = (0, _code15.useAppContext)();
    const model = application?.application;
    const [state, setState] = React.useState({});
    const [processed, setProcessed] = React.useState(application.moduleManager.processed);
    const [showDescription, toggleDescription] = React.useState();
    if (!model) return null;
    const {
      declarations
    } = model;
    const {
      itemsProcessed,
      total
    } = declarations;

    const openNavigator = event => {
      event.preventDefault();
      event.stopPropagation();
      workspace.openNavigator(model.id, model.url);
    };

    (0, _code8.useBinder)([model, declarations], () => setState({}));
    (0, _code8.useBinder)([application.moduleManager], () => setProcessed(application.moduleManager.processed));

    const generateDeclarations = () => declarations.update();

    const openDistributions = event => {
      event.preventDefault();
    };

    const compile = event => {
      event.stopPropagation();
      event.preventDefault();
      workspace.openBoard('compile', {
        id: application.application.id
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "application__detail"
    }, /*#__PURE__*/React.createElement("section", {
      className: "board__header"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, model.name, " ", /*#__PURE__*/React.createElement("small", null, `(id: ${model.id})`)), /*#__PURE__*/React.createElement("span", {
      className: "pathname"
    }, model.path), model.url && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      onClick: openNavigator,
      href: model.url,
      className: "link",
      target: "_blank"
    }, model.url))), /*#__PURE__*/React.createElement("div", {
      className: "board__header__actions flex-center flex-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "scanned__section  flex-center flex-container"
    }, /*#__PURE__*/React.createElement("span", {
      className: "title"
    }, texts.scanner.title), /*#__PURE__*/React.createElement("div", {
      className: "detail_item"
    }, processed, " / ", application.moduleManager.total), /*#__PURE__*/React.createElement(DSProcessButton, {
      title: texts.actions.scanAll,
      onClick: application.moduleManager.loadAll,
      className: "on-primary circle",
      icon: "scan"
    })), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: openDistributions,
      icon: "distributions",
      title: texts.actions.distributions
    }), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: compile,
      icon: "compile",
      title: texts.actions.compile
    }), /*#__PURE__*/React.createElement(BeeActions, {
      bee: model.bee,
      texts: actions
    }), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      onClick: generateDeclarations,
      className: "btn primary"
    }, !declarations.processing ? /*#__PURE__*/React.createElement(React.Fragment, null, actions.declarations) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      className: "on-primary"
    }), `${actions.generatingDeclarations} ${itemsProcessed}/${total}`)))), /*#__PURE__*/React.createElement("section", {
      className: "pd-base"
    }, /*#__PURE__*/React.createElement("span", {
      className: "link",
      onClick: () => toggleDescription(!showDescription)
    }, " More details"), showDescription && /*#__PURE__*/React.createElement(Description, null)));
  }
  /*************
  list\empty.jsx
  *************/


  function Empty({
    texts,
    type
  }) {
    const {
      bundleFilter,
      workspace
    } = (0, _code15.useDSWorkspaceContext)();
    const label = bundleFilter ? 'filter' : 'application';
    const title = type === 'all' ? texts.empty[label].title : texts.empty.filter.title;
    const description = type === 'all' ? texts.empty[label].description : texts.empty.filter.description;

    const addModule = () => workspace.setState({
      addModule: true
    });

    return /*#__PURE__*/React.createElement("div", {
      className: "ds-empty-container mt-100"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", {
      className: "primary-color",
      dangerouslySetInnerHTML: {
        __html: title
      }
    }), /*#__PURE__*/React.createElement("h2", {
      dangerouslySetInnerHTML: {
        __html: description
      }
    })), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      onClick: addModule,
      className: "primary icon-on-primary"
    }, texts.actions.add, /*#__PURE__*/React.createElement(_code13.DashboardIcon, {
      icon: "add",
      className: "circle"
    })));
  }
  /********************************
  list\header\containers-filter.jsx
  ********************************/


  function ContainersFilter() {
    const {
      application
    } = (0, _code15.useDSWorkspaceContext)();
    if (!application) return null;
    const containerRef = React.useRef();
    const [container, setContainer] = React.useState('application');

    const filterContainer = event => {
      //stop propagation is added to prevent the execution of the toggleList function
      //that is added in the onclick event of the container selector
      event.stopPropagation();
      const target = event.currentTarget;
      application.filterContainer = target.dataset.id;
      setContainer(target.dataset.id);
      closeList();
    };

    const toggleList = event => {
      event.preventDefault();
      event.stopPropagation();
      const target = containerRef.current;
      target.classList.toggle('opened');
      const action = target.classList.contains('opened') ? 'addEventListener' : 'removeEventListener';
      document[action]('click', checkToClose);
    };

    const closeList = () => {
      containerRef.current.classList.remove('opened');
      document.removeEventListener('click', checkToClose);
    };

    const checkToClose = event => {
      const target = event.target || event.srcElement;
      const parent = target.closest('.header-container-container');
      if (!parent) closeList();
    };

    const libraries = application.containers.map(item => {
      const id = typeof item === 'string' ? item : item[0];
      const label = typeof item === 'string' ? item : item[1];
      return /*#__PURE__*/React.createElement("div", {
        className: "header-filter_item",
        onClick: filterContainer,
        key: id,
        "data-id": id
      }, label);
    });
    return /*#__PURE__*/React.createElement("section", {
      onClick: toggleList,
      className: "header_container app__container-filter"
    }, /*#__PURE__*/React.createElement("span", null, container), /*#__PURE__*/React.createElement(_code3.BeyondIconButton, {
      icon: "expandMore",
      className: "circle"
    }), /*#__PURE__*/React.createElement("div", {
      ref: containerRef,
      className: "header-filter_list"
    }, libraries));
  }
  /*****************************
  list\header\filter-bundles.jsx
  *****************************/


  function FilterBundles({
    texts
  }) {
    /**
     * Originally, the headers belonged to application view module
     * and the model represented the application model, for this reason
     * the name is overwritten here
     */
    const {
      application: model
    } = (0, _code15.useAppContext)();
    const {
      bundles
    } = model;
    const [active, setActive] = React.useState(model.filterBundle); // useBinder([model], () => setActive(model.filterBundle));

    React.useEffect(() => {
      const onChange = () => setActive(model.filterBundle);

      model.bind('change', onChange);
      return () => model.unbind('change', onChange);
    }, []);

    const changeFilter = event => {
      const {
        bundle
      } = event.currentTarget.dataset;
      model.filterBundle = bundle;
    };

    const filters = bundles.map(bundle => {
      const cls = active === bundle ? "tag tag-active" : "tag";
      return /*#__PURE__*/React.createElement("span", {
        key: bundle,
        className: cls,
        "data-bundle": bundle,
        onClick: changeFilter
      }, bundle);
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, filters);
  }
  /*********************
  list\header\header.jsx
  *********************/


  function HeaderList() {
    let {
      texts,
      displayView,
      setDisplayView
    } = (0, _code15.useAppContext)();
    texts = texts.navbar;
    /**
     * Changes the view from list view to grid and vice versa
     * @param event
     */

    const changeView = event => {
      const target = event.currentTarget;
      const {
        view
      } = target.dataset; //remove all active classes in display button

      const removeActive = item => item.classList.remove('active');

      target.closest('.actions').querySelectorAll('.beyond-icon-button').forEach(removeActive);
      target.classList.add('active');
      localStorage.setItem('beyond.lists.view', view);
      setDisplayView(view);
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "ds-board__application application-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "left-col"
    }, /*#__PURE__*/React.createElement(SearchForm, null)), /*#__PURE__*/React.createElement("div", {
      className: "right-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: changeView,
      "data-view": "grid",
      icon: "thSolid",
      className: `circle  ${displayView === 'grid' ? 'active' : ''}`
    }), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      onClick: changeView,
      "data-view": "table",
      icon: "barsSolid",
      className: `circle  ${displayView === 'table' ? 'active' : ''}`
    })), /*#__PURE__*/React.createElement(FilterBundles, {
      texts: texts
    })));
  }
  /**************************
  list\header\search-form.jsx
  **************************/


  function SearchForm() {
    const [showFinder] = React.useState(false);
    const [toFound, setToFound] = React.useState('');
    const {
      addModule,
      texts,
      application: model
    } = (0, _code15.useAppContext)();

    const onChange = event => {
      setToFound(event.currentTarget.value);
      model.filterText = event.currentTarget.value;
    };

    const searcher = React.useRef();
    React.useEffect(() => {
      if (showFinder) searcher.current.focus();
    });

    const search = event => {
      event.preventDefault();
      setTitle(toFound);
    };

    const clickForm = event => {
      const target = event.currentTarget;

      if (target.contains(searcher.current)) {
        searcher.current.focus();
      }
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "modules-list_header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "header_container"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: search,
      onClick: clickForm
    }, /*#__PURE__*/React.createElement("input", {
      ref: searcher,
      placeholder: texts.header.searcher,
      className: "modules-list_search-input",
      onChange: onChange,
      value: toFound
    })), /*#__PURE__*/React.createElement("a", {
      onClick: addModule,
      className: "primary-color link action"
    }, texts.actions.add)), /*#__PURE__*/React.createElement(ContainersFilter, null));
  }
  /**********************
  list\header\service.jsx
  **********************/


  function ServiceActions() {
    let {
      application
    } = (0, _code15.useAppContext)();
    if (!application.backend) return null;
    const [iconApp, setIconApp] = React.useState('av:stop');
    const runAction = React.useRef(null);

    const toggleApp = () => {
      const icon = iconApp === 'av:stop' ? 'av:play' : 'av:stop';
      setIconApp(icon);
      runAction.current.button.classList.toggle('active');
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      ref: runAction,
      onClick: toggleApp,
      icon: iconApp,
      className: "circle secondary active"
    }));
  }
  /********************
  list\item\actions.jsx
  ********************/


  function ItemActions({
    am
  }) {
    const [state, setState] = React.useState({
      modal: false,
      confirm: false
    });
    const [showContextMenu, toggleContextMenu] = React.useState();

    const updateState = newState => setState({ ...state,
      ...newState
    });

    const openModal = e => {
      e.stopPropagation();
      updateState({
        modal: true
      });
    };

    const openConfirm = () => updateState({
      confirm: true
    });

    const closeModal = () => updateState({
      modal: false,
      fetching: false
    });

    const closeConfirm = () => updateState({
      confirm: false,
      fetching: false
    });

    const onClick = event => {
      event.stopPropagation();
      event.preventDefault();
      toggleContextMenu({
        x: event.clientX,
        y: event.clientY
      });
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_code13.DSIcon, {
      icon: "moreVert",
      className: "actions-icon",
      onClick: onClick
    }), showContextMenu && /*#__PURE__*/React.createElement(_code14.DSContextMenu, {
      className: "item-actions",
      specs: showContextMenu,
      unmount: () => toggleContextMenu(false)
    }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
      onClick: openModal,
      "data-action": "rename"
    }, /*#__PURE__*/React.createElement(_code13.DSIcon, {
      icon: "edit",
      "data-element": "file"
    }), "Duplicar"), /*#__PURE__*/React.createElement("li", {
      onClick: openConfirm,
      "data-action": "delete"
    }, /*#__PURE__*/React.createElement(_code13.DSIcon, {
      icon: "delete"
    }), "Eliminar"))), state.modal && /*#__PURE__*/React.createElement(ItemCloneAction, {
      am: am,
      onClose: closeModal
    }), state.confirm && /*#__PURE__*/React.createElement(ItemDeleteAction, {
      am: am,
      onClose: closeConfirm
    }));
  }
  /**************************
  list\item\actions\clone.jsx
  **************************/


  function ItemCloneAction({
    am,
    onClose
  }) {
    const [state, setState] = React.useState({
      modal: false,
      confirm: false
    });

    const updateState = newState => setState({ ...state,
      ...newState
    });

    const handleName = event => {
      event.stopPropagation();
      updateState({
        name: event.currentTarget.value
      });
    };

    const onClone = async () => {
      try {
        updateState({
          fetching: true
        });
        await am.clone(state.name);
        onClose();
      } catch (e) {
        console.error(e);
      }
    };

    return /*#__PURE__*/React.createElement(_code7.BeyondModal, {
      show: true,
      onClose: onClose,
      className: "xs ds-modal ds-tree__forms"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, "Duplicar"))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: onClone
    }, /*#__PURE__*/React.createElement("input", {
      autoComplete: "off",
      required: true,
      name: "name",
      label: "Nombre del modulo",
      placeholder: "mi-modulo | directorio/mi-modulo",
      onChange: handleName
    }), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code.BeyondButton, {
      onClick: onClone,
      className: "primary"
    }, state.fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : 'Duplicar')))));
  }
  /***************************
  list\item\actions\delete.jsx
  ***************************/


  function ItemDeleteAction({
    am,
    onClose
  }) {
    const [state, setState] = React.useState({
      modal: false
    });

    const updateState = newState => setState({ ...state,
      ...newState
    });

    const onDelete = async () => {
      try {
        updateState({
          fetching: true
        });
        await am.delete();
        onClose();
      } catch (e) {
        console.error(e);
      }
    };

    return /*#__PURE__*/React.createElement(_code7.BeyondConfirmModal, {
      show: true,
      className: "xs ds-modal",
      text: '¿Desea eliminar el modulo?',
      onConfirm: onDelete,
      onCancel: onClose
    });
  }
  /**********************
  list\item\grid-item.jsx
  **********************/

  /**
   *
   * @param {ApplicationModule} module
   * @returns {JSX.Element}
   * @constructor
   */


  function GridItem({
    am
  }) {
    const {
      application,
      navigateModule
    } = (0, _code15.useAppContext)();
    const {
      errors,
      warnings
    } = am.module;
    let {
      path,
      name
    } = am.module;
    path = path.toLowerCase().replace(application.application.path.toLowerCase(), '');
    return /*#__PURE__*/React.createElement(ModuleLink, {
      am: am
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
      className: "col mb-15"
    }, /*#__PURE__*/React.createElement(Processors, {
      am: am
    })), /*#__PURE__*/React.createElement("div", {
      className: "item-information col col-end"
    }, !!warnings.length && /*#__PURE__*/React.createElement(_code13.DSIcon, {
      icon: "warning",
      className: "icon icon--warning"
    }), !!errors.length && /*#__PURE__*/React.createElement(_code13.DSIcon, {
      icon: "error",
      className: "icon icon--error"
    }))), /*#__PURE__*/React.createElement(ModuleInformation, {
      am: am
    }), /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "primary-color"
    }, path), am.module.description && /*#__PURE__*/React.createElement("span", {
      className: "p1 light"
    }, am.module.description)), /*#__PURE__*/React.createElement(ItemActions, {
      am: am
    }));
  }
  /************************
  list\item\information.jsx
  ************************/


  function ModuleInformation({
    am
  }) {
    if (!am) return null;
    const {
      application,
      navigateModule
    } = (0, _code15.useAppContext)();
    const link = am.route ? `${application.application.url}${am.route.toLowerCase()}` : '';
    let {
      path,
      name
    } = am.module;
    path = path.toLowerCase().replace(application.application.path.toLowerCase(), '');

    const navigate = event => {
      event.preventDefault();
      navigateModule({
        url: link,
        route: am.route
      });
    };

    const route = `${am.route?.toLowerCase()}`;
    return /*#__PURE__*/React.createElement("div", {
      className: "col flex-center-y"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "lower"
    }, path), name && /*#__PURE__*/React.createElement("h6", {
      className: "module__name primary-color"
    }, name), am.route && /*#__PURE__*/React.createElement("span", {
      target: "_blank",
      className: "link acent",
      onClick: navigate
    }, route));
  }
  /*****************
  list\item\item.jsx
  *****************/

  /**
   *
   * @param {ApplicationModule} module
   * @param {Application} application
   * @returns {JSX.Element}
   * @constructor
   */


  function Item({
    am,
    application
  }) {
    if (!am?.module) {
      console.warn(`the module ${module.id} does not load correctly`);
      return null;
    }

    const {
      errors,
      warnings
    } = am.module;
    return /*#__PURE__*/React.createElement(ModuleLink, {
      am: am
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement(ModuleInformation, {
      am: am
    }), am.module.name && /*#__PURE__*/React.createElement("p", {
      className: "p1 bold"
    }, am.module.name), am.module.description && /*#__PURE__*/React.createElement("span", {
      className: "p1 light"
    }, am.description)), /*#__PURE__*/React.createElement("div", {
      className: "ds-module-list__item__info"
    }, !!warnings.length && /*#__PURE__*/React.createElement(_code13.DashboardIcon, {
      icon: "warning",
      className: "warning-icon"
    }), !!errors.length && /*#__PURE__*/React.createElement(_code13.DashboardIcon, {
      icon: "error",
      className: "error-icon"
    })), /*#__PURE__*/React.createElement("div", {
      className: "col  actions right-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "processors__list"
    }, /*#__PURE__*/React.createElement(Processors, {
      am: am
    })), /*#__PURE__*/React.createElement(ItemActions, {
      am: am
    })));
  }
  /*****************
  list\item\link.jsx
  *****************/


  function ModuleLink({
    am,
    children
  }) {
    const {
      workspace
    } = (0, _code15.useDSWorkspaceContext)();

    const showModule = event => {
      event.stopPropagation();
      event.preventDefault();
      workspace.openBoard('module', {
        label: am.module.pathname,
        moduleId: am.module.id
      });
    };

    return /*#__PURE__*/React.createElement("article", {
      className: "module-list__item",
      onClick: showModule
    }, children);
  }
  /***********************
  list\item\processors.jsx
  ***********************/


  function Processors({
    am
  }) {
    const bundles = am.bundles;
    const processors = new Set(); //todo: @julio
    //todo: set logic directly in the Module Item object

    bundles.forEach(bundle => bundle.processors.forEach(processor => processors.add(processor.name)));
    const items = [...processors].map(item => /*#__PURE__*/React.createElement("span", {
      key: `processor-${item}`,
      className: "badge-item"
    }, item));
    return /*#__PURE__*/React.createElement(React.Fragment, null, items);
  }
  /************
  list\list.jsx
  ************/


  function ModulesList() {
    const {
      filterBundle,
      application
    } = (0, _code15.useAppContext)();
    let {
      texts,
      displayView
    } = (0, _code15.useAppContext)();
    (0, _code8.useBinder)([application], () => setItems(application?.items));
    if (!application) return null;
    const [items, setItems] = React.useState(application?.items ?? []);
    texts = texts.modules;
    if (!items.length) return /*#__PURE__*/React.createElement(Empty, {
      texts: texts
    });
    const Control = displayView === 'table' ? Item : GridItem;
    const output = items.map(item => /*#__PURE__*/React.createElement(Control, {
      am: item,
      key: item.id
    }));
    const cls = `ds-list list--${displayView}`;
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-board__list-container ds-module-list__component"
    }, /*#__PURE__*/React.createElement("div", {
      className: cls
    }, output), !output?.length && /*#__PURE__*/React.createElement(Empty, {
      texts: texts,
      type: filterBundle
    }));
  }
  /************
  preloader.jsx
  ************/


  function Preloader() {
    return /*#__PURE__*/React.createElement("div", {
      className: "ds__board"
    }, /*#__PURE__*/React.createElement("div", {
      className: "application__detail"
    }, /*#__PURE__*/React.createElement("section", {
      className: "board__header"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(_code6.BeyondPreloadText, {
      height: "17px",
      width: "50px"
    })), /*#__PURE__*/React.createElement("span", {
      className: "pathname"
    }, /*#__PURE__*/React.createElement(_code6.BeyondPreloadText, {
      height: "7px",
      width: "150px"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "board__header__actions flex-center flex-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "scanned__section  flex-center flex-container"
    }, /*#__PURE__*/React.createElement("span", {
      className: "title"
    }, /*#__PURE__*/React.createElement(_code6.BeyondPreloadText, {
      height: "7px",
      width: "100px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "detail_item"
    }, "..."), /*#__PURE__*/React.createElement("button", {
      className: "beyond-icon-button circle button--fetching"
    }, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      active: true,
      className: "primary"
    }))), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      icon: "distributions",
      className: "btn primary"
    }), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      className: "circle bee--action action--play",
      icon: "compile"
    }), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      icon: "play"
    }), /*#__PURE__*/React.createElement("button", {
      className: "beyond-icon-button circle button--fetching"
    }, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      active: true,
      className: "primary"
    })), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      className: "btn primary"
    }, /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      className: "on-primary"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "pd-base"
    }, /*#__PURE__*/React.createElement("span", {
      className: "link"
    }, " ", /*#__PURE__*/React.createElement(_code6.BeyondPreloadText, {
      height: "7px",
      width: "50px"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ds-board__application application-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "left-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modules-list_header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "header_container"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("input", {
      className: "modules-list_search-input"
    }))), /*#__PURE__*/React.createElement("section", {
      className: "header_container app__container-filter"
    }, /*#__PURE__*/React.createElement(_code6.BeyondPreloadText, {
      height: "7px",
      width: "50px"
    }), /*#__PURE__*/React.createElement(_code3.BeyondIconButton, {
      icon: "expandMore",
      className: "circle"
    }), /*#__PURE__*/React.createElement(_code6.BeyondPreloadText, {
      height: "7px",
      width: "50px"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "right-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      "data-view": "grid",
      icon: "thSolid",
      className: `circle`
    }), /*#__PURE__*/React.createElement(_code13.DSIconButton, {
      "data-view": "table",
      icon: "thSolid",
      className: `circle`
    })), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tag"
    }, " \xA0 \xA0\xA0\xA0\xA0\xA0"), /*#__PURE__*/React.createElement("span", {
      className: "tag"
    }, " \xA0 \xA0\xA0\xA0\xA0\xA0"), /*#__PURE__*/React.createElement("span", {
      className: "tag"
    }, " \xA0 \xA0\xA0\xA0\xA0\xA0"), /*#__PURE__*/React.createElement("span", {
      className: "tag"
    }, " \xA0 \xA0\xA0\xA0\xA0\xA0")))));
  }
  /*****************
  static\actions.jsx
  *****************/


  function StaticActions() {
    const actions = {
      name: 'static'
    };
    const {
      image,
      type
    } = useStaticContext();

    const updateState = update => setState({ ...state,
      ...update
    });

    const [state, setState] = React.useState({
      modal: false,
      confirm: false
    });

    const onDelete = event => {
      event.stopPropagation();
      event.preventDefault();
      updateState({
        confirm: true
      });
    };

    const onConfirm = async () => {
      try {
        updateState({
          confirm: false
        });
        image.delete(type === 'overwrite');
      } catch (e) {
        console.error(e);
        updateState({
          confirm: false
        });
      }
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
      className: "static__actions"
    }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code3.BeyondIconButton, {
      "data-title": "delete",
      icon: "delete",
      onClick: onDelete
    })))), state.confirm && /*#__PURE__*/React.createElement(_code7.BeyondConfirmModal, {
      show: true,
      className: "xs ds-modal",
      onConfirm: onConfirm,
      text: "Cambiar texto",
      onCancel: () => updateState({
        confirm: false
      })
    }));
  }
  /***************
  static\aside.jsx
  ***************/


  function StaticAside() {
    const {
      originalSrc
    } = useStaticContext();
    return /*#__PURE__*/React.createElement("aside", {
      className: "static__items"
    }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code2.BeyondImage, {
      src: encodeURI(originalSrc)
    })), /*#__PURE__*/React.createElement(StaticOverwrite, null)));
  }
  /***************
  static\board.jsx
  ***************/


  function StaticBoard({
    specs
  }) {
    const {
      image,
      type
    } = specs;
    if (!image) return null;
    const {
      workspace: {
        application
      }
    } = (0, _code15.useDSWorkspaceContext)();

    if (!application) {
      console.warn("you are trying to access static files without had selected an application");
      return;
    }

    const urlApp = application.application.url;
    const originalSrc = `${urlApp}${image?.pathname}?original`;
    const overwriteSrc = image.overwrite && `${urlApp}${image?.pathname}`;
    const [src, setSrc] = React.useState({});
    let source = type === 'overwrite' ? overwriteSrc : originalSrc;
    source = src.original === image.id && src.base64 ? src.base64 : source;
    return /*#__PURE__*/React.createElement(StaticContext.Provider, {
      value: {
        type,
        image,
        originalSrc,
        overwriteSrc,
        src,
        setSrc
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-panel__static-board"
    }, /*#__PURE__*/React.createElement(StaticHeader, {
      type: type
    }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(StaticAside, null), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code2.BeyondImage, {
      src: source
    }, /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(StaticActions, null)))))));
  }
  /****************
  static\header.jsx
  ****************/


  function StaticHeader() {
    const {
      image
    } = useStaticContext();
    return /*#__PURE__*/React.createElement("div", {
      className: "static__header"
    }, /*#__PURE__*/React.createElement("header", {
      className: "text-left"
    }, /*#__PURE__*/React.createElement("h3", null, image.filename), /*#__PURE__*/React.createElement("h6", {
      className: "text-muted"
    }, image.file)));
  }
  /**************************
  static\static-overwrite.jsx
  **************************/


  function StaticOverwrite() {
    const {
      image,
      overwriteSrc,
      setSrc
    } = useStaticContext();
    const [sourceFile, setSourceFile] = React.useState({});
    let src = overwriteSrc ?? undefined;
    src = sourceFile.original === image.id ? sourceFile.base64 : src;
    if (src) return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code2.BeyondImage, {
      src: src
    }));
    const regex = /\/\/[a-zA-z]*\.[a-zA-z]*/;
    const specs = {
      id: image.id.replace(regex, ''),
      type: 'overwrite',
      image: image.relative.file.replace('\\', '/')
    };

    const onLoadFile = images => {
      // the uploader returns a map with the images loaded
      const base64 = [...images.values()][0];
      const specs = {
        original: image.id,
        base64: base64.src
      };
      setSourceFile(specs);
      setSrc(specs);
    };

    const onLoadEnd = response => {
      if (!response.status) return;
      const specs = {};
      specs.origin = image.relative.file.replace('\\', '/');
      specs.overwrite = response.data[0].pathname;
      image.upload(specs);
    };

    return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_code11.Uploader, {
      url: "/uploader",
      specs: specs,
      multiple: true,
      onLoadFile: onLoadFile,
      onLoadEnd: onLoadEnd
    }, /*#__PURE__*/React.createElement(_code3.BeyondIconButton, {
      "data-tipy-content": "Agregar overwrite",
      className: "primary",
      icon: "add"
    })));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-board__application.ds__board{padding:20px}.workspace__board{padding:20px}.ds__board .application__detail .board__header__actions{display:flex;align-content:center;justify-content:center;gap:10px}.ds__board .application__detail .board__header__actions .beyond-icon-button.action--play{fill:green;border:1px solid rgba(0,128,0,.2)}.ds__board .application__detail .board__header__actions .beyond-icon-button.action--stop{fill:red;border:1px solid rgba(255,0,0,.2);background:rgba(255,0,0,.2)}.ds__board .item-information{display:grid;grid-gap:8px;align-items:center;margin-top:15px}.ds__board .item-information .description-item{background:#333;padding:5px 15px;display:flex;justify-content:space-between;transition:all .2s ease-in;cursor:pointer}.ds__board .item-information .description-item:hover{background:#262626}.ds__board .item-information .description-item:hover .beyond-icon-button{opacity:1}.ds__board .item-information .description-item .beyond-icon-button{opacity:.3;transition:all .2s ease-in}.ds__board .item-information .description-item .beyond-icon-button svg{transition:all .2s ease-in;fill:#FFFFFF}.ds__board .item-information.item-information--edit .form-group{display:grid;grid-template-columns:1fr;grid-gap:5px;width:100%}.ds__board .item-information.item-information--edit .form-group input{background:#333;outline:0!important;color:#fff;border:1px solid #f0f0f0;padding:15px;font-size:16px}.ds__board .item-information.item-information--edit .form-group input:hover{border-color:#e4e5dc}.ds__board .item-information.item-information--edit .form-group .form__actions{margin:15px;display:flex;gap:8px;justify-content:flex-end}.modules-list_header .app__container-filter{position:relative;padding-right:0}.modules-list_header .app__container-filter .header-filter_list{position:absolute;top:100%;left:0;bottom:0;right:0;cursor:pointer;display:grid;background:rgba(5,9,16,.6);transition:all .3s ease-in-out;z-index:999;height:0;overflow:hidden;opacity:0}.modules-list_header .app__container-filter .header-filter_list.opened{opacity:1;transition:all .3s ease-in;height:auto;overflow:visible}.modules-list_header .app__container-filter .header-filter_list .header-filter_item{padding:8px 15px;transition:all .3s ease-in-out;cursor:pointer;background:rgba(5,9,16,.6)}.modules-list_header .app__container-filter .header-filter_list .header-filter_item:last-child{box-shadow:0 5px 5px -4px rgba(5,9,16,.6)}.modules-list_header .app__container-filter .header-filter_list .header-filter_item:hover{background:#ff8056;transition:all .3s ease-in}.modules-list_header{display:grid;width:100%;grid-template-columns:60% 40%;gap:8px}.modules-list_header .header_container{cursor:pointer;display:grid;grid-template-columns:1fr auto auto;transition:all ease-in .3s;align-items:center;border-bottom:1px solid #82837f;font-size:14px;padding:0 8px}.modules-list_header .header_container .filter-container{display:grid;grid-template-columns:1fr auto}.modules-list_header .header_container:focus-within{background:rgba(0,0,0,.4)}.modules-list_header .header_container .modules-list_search-input{border:0;background:0 0;cursor:pointer;color:#fff;outline:0;width:100%;transition:all .2s ease-in}.modules-list_header .header_container .modules-list_search-input::placeholder{color:#fff}.ds-board__application.application-header{display:grid;padding:15px;width:100%;grid-template-columns:1fr auto;grid-gap:15px}.ds-board__application.application-header .right-col{justify-content:flex-end}.ds-board__application.application-header .left-col,.ds-board__application.application-header .right-col{display:flex;justify-content:space-between;align-items:center;gap:15px}.ds-board__application.application-header .left-col label,.ds-board__application.application-header .right-col label{display:flex;align-items:center}.ds-board__application.application-header .left-col .actions,.ds-board__application.application-header .right-col .actions{display:flex;gap:5px}.module-list__item .beyond-icon-button,.module-list__item .beyond-icon.error-icon,.module-list__item .beyond-icon.warning-icon{border:1px solid #121f36;border-radius:50%;padding:10px;height:3.2rem;width:3.2rem;background:#050910;fill:#fff;transition:all .3s ease-in}.module-list__item .beyond-icon-button .beyond-ripple,.module-list__item .beyond-icon.error-icon .beyond-ripple,.module-list__item .beyond-icon.warning-icon .beyond-ripple{border-radius:50%}.module-list__item .beyond-icon-button.error-icon,.module-list__item .beyond-icon.error-icon.error-icon,.module-list__item .beyond-icon.warning-icon.error-icon{background:#d2281e}.module-list__item .beyond-icon-button.warning-icon,.module-list__item .beyond-icon.error-icon.warning-icon,.module-list__item .beyond-icon.warning-icon.warning-icon{fill:#F7D994}.ds-module-list__component .ds-list.list--grid{display:grid;padding:15px;grid-template-columns:1fr 1fr 1fr;grid-gap:15px}.ds-module-list__component .ds-list.list--grid .actions-icon,.ds-module-list__component .ds-list.list--grid .beyond-popover__target{fill:#fff;position:absolute;top:5px;padding:5px;right:5px;height:25px;width:25px;z-index:999}.ds-module-list__component .ds-list.list--grid .col-end{display:flex;justify-content:flex-end}.ds-module-list__component .ds-list.list--grid .module-list__item{padding:20px;border:1px solid #313c50;background-image:linear-gradient(to right,#121f36 0,#050910 100%);transition:all ease-in .3s;cursor:pointer}.ds-module-list__component .ds-list.list--grid .module-list__item .badge-item+.badge-item{margin-left:8px}.ds-module-list__component .ds-list.list--grid .module-list__item:hover{background-image:linear-gradient(to right,#050910 0,#121f36 100%);box-shadow:0 5px 5px -5px #000}.ds-module-list__component .ds-list.list--grid .module-list__item h4,.ds-module-list__component .ds-list.list--grid .module-list__item h5,.ds-module-list__component .ds-list.list--grid .module-list__item h6{padding:0;margin:0}.ds-module-list__component .ds-list.list--grid .module-list__item .col{margin-top:15px}.ds-module-list__component .ds-list.list--grid .module-list__item .icon{padding:5px 8px;height:30px;width:30px;border-radius:50%;background:#000}.ds-module-list__component .ds-list.list--grid .module-list__item .icon+.icon{margin-left:5px}.ds-module-list__component .ds-list.list--grid .module-list__item .icon.icon--error{fill:#D2281E}.ds-module-list__component .ds-list.list--grid .module-list__item .icon.icon--warning{fill:#F7D994}.ds-module-list__component .module-list__item{position:relative}.ds-module-list__component .module-list__item .actions-icon,.ds-module-list__component .module-list__item .beyond-popover__target{fill:#fff}.ds-module-list__component .module-list__item .beyond-popover__target.target--opened .beyond-icon{background:#000}.ds-module-list__component .module-list__item .beyond-popover__content.item-actions{z-index:9999}.ds-module-list__component .module-list__item .beyond-popover__content.item-actions ul{list-style:none;padding:0;margin:0;background:#000!important;box-shadow:0 3px 5px #050910}.ds-module-list__component .module-list__item .beyond-popover__content.item-actions ul li{padding:8px;display:flex;align-items:center;gap:8px}.ds-module-list__component .module-list__item .beyond-popover__content.item-actions ul li .beyond-icon{fill:#FF8056}.ds-module-list__component .module-list__item .beyond-popover__content.item-actions ul li:hover{background:#121f36}.ds-list.list--table .module-list__item{display:grid;grid-template-columns:1fr auto auto;align-content:center;grid-gap:15px;justify-content:space-between;align-items:center;flex-flow:row;cursor:pointer;transition:all .3s ease-in;border-bottom:1px solid #f0f0f0;padding:20px;display:grid;justify-content:space-between;align-items:center;flex-flow:row}.ds-list.list--table .module-list__item:hover{background-image:linear-gradient(to right,rgba(18,31,54,.5) 0,rgba(5,9,16,.5) 100%);transition:all .3s ease-in}.ds-list.list--table .module-list__item:last-child{border-bottom:none;margin-bottom:20px}.ds-list.list--table .module-list__item .right-col{text-align:right;justify-content:flex-end}.ds-list.list--table .module-list__item .p1,.ds-list.list--table .module-list__item h3,.ds-list.list--table .module-list__item h4{margin:0;padding:0}.ds-list.list--table .module-list__item .actions,.ds-list.list--table .module-list__item .item-information{display:flex;gap:8px}.ds-list.list--table .module-list__item .actions .action-icon:hover .beyond-icon,.ds-list.list--table .module-list__item .item-information .action-icon:hover .beyond-icon{border:1px solid #a2000a;background:#a2000a;transition:all .3s ease-in}.ds-list.list--table .module-list__item .actions .beyond-icon-button.error-icon .beyond-icon,.ds-list.list--table .module-list__item .item-information .beyond-icon-button.error-icon .beyond-icon{background:#d2281e}.ds-list.list--table .module-list__item .actions .beyond-icon-button,.ds-list.list--table .module-list__item .item-information .beyond-icon-button{border:1px solid #121f36;border-radius:50%;padding:10px;height:5.2rem;width:3.2rem;background:#050910;fill:#fff;transition:all .3s ease-in}.ds-list.list--table .module-list__item .actions .beyond-icon-button .beyond-ripple,.ds-list.list--table .module-list__item .item-information .beyond-icon-button .beyond-ripple{border-radius:50%}.ds-list.list--table .module-list__item .actions .beyond-icon-button.error-icon,.ds-list.list--table .module-list__item .item-information .beyond-icon-button.error-icon{background:#d2281e}.ds-list.list--table .module-list__item .actions .beyond-icon-button.warning-icon,.ds-list.list--table .module-list__item .item-information .beyond-icon-button.warning-icon{fill:#F7D994}.ds-list.list--table .module-list__item h4,.ds-list.list--table .module-list__item h5,.ds-list.list--table .module-list__item h6{padding:5px 0}.ds-list.list--table .module-list__item h4.module__name,.ds-list.list--table .module-list__item h4.module__name:first-letter,.ds-list.list--table .module-list__item h5.module__name,.ds-list.list--table .module-list__item h5.module__name:first-letter,.ds-list.list--table .module-list__item h6.module__name,.ds-list.list--table .module-list__item h6.module__name:first-letter{text-transform:lowercase}.ds-list.list--table .module-list__item .processors__list{display:flex;gap:5px}.ds-list.list--table .module-list__item .actions{display:flex;gap:8px;align-items:center}.ds-panel__static-board{display:grid;grid-template-rows:auto 1fr;padding:40px}.ds-panel__static-board .text-left{align-self:flex-start;justify-content:start}.ds-panel__static-board .text-left h3{padding:0;margin:0}.ds-panel__static-board>main{display:grid;grid-template-columns:60px 1fr;grid-gap:15px}.ds-panel__static-board>main .static__items ul{padding:0;margin:0;list-style:none;display:grid;grid-gap:5px}.ds-panel__static-board>main .static__items ul .beyond-icon-button{fill:var(--beyond-text-on-primary);stroke:var(--beyond-text-on-primary);display:grid;justify-content:center;align-items:center;width:100%;height:60px}.ds-panel__static-board>main .static__items ul li{cursor:pointer;display:grid;width:100%;position:relative;transition:.3s ease all}.ds-panel__static-board>main .static__items ul li .beyond-element-image{height:60px;margin:0;width:60px}.ds-panel__static-board>main .static__items ul li .beyond-element-image img{object-fit:contain;min-height:100%;width:100%}.ds-panel__static-board>main .static__items ul li:hover:after{content:" ";position:absolute;top:0;left:0;bottom:0;right:0;background:rgba(255,128,86,.3)}.ds-panel__static-board>main section .beyond-element-image{max-height:100%;max-width:100%;display:inline-grid;position:relative;transition:all .3s ease-in;opacity:.9;cursor:pointer}.ds-panel__static-board>main section .beyond-element-image:hover{opacity:1}.ds-panel__static-board>main section .beyond-element-image figcaption{display:none;transition:all .3s ease-in}.ds-panel__static-board>main section .beyond-element-image:hover figcaption{position:absolute;top:0;left:0;bottom:0;right:0;display:flex;transition:all .3s ease-in;justify-content:center;align-content:center;align-items:center;background:rgba(255,128,86,.4)}.ds-panel__static-board>main section .beyond-element-image.beyond-element-image-preload{background:0 0}.ds-panel__static-board>main section .beyond-element-image img{max-width:100%;max-height:100%;object-fit:contain}.ds-panel__static-board .static__header{display:flex;justify-content:space-between}.ds-panel__static-board .static__actions ul{display:flex;padding:0;list-style:none}.ds-panel__static-board .static__actions ul .beyond-ripple{border-radius:50%}.ds-panel__static-board .static__actions ul .beyond-icon-button{border:1px solid #121f36;border-radius:50%;background:#121f36}.ds-panel__static-board .static__actions ul .beyond-icon-button svg{fill:#fff}.ds-board__application .tag{background:#313c50;color:#fff;display:inline-flex;padding:3px 8px;font-size:.7rem;border-radius:2px;justify-content:center;align-items:center;cursor:pointer;text-transform:uppercase;text-align:center}.ds-board__application .tag.tag-active{background:#e4e5dc;color:#121f36}.ds-board__application .tag.tag-error{background:#e36152}.ds-board__application.application-header .actions .beyond-icon-button{transition:all .2s ease-in}.ds-board__application.application-header .actions .beyond-icon-button.active{background:#a2000a}';
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