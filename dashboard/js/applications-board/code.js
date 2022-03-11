define(["exports", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/preload-text/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _ts, _js, _code, _code2, _code3, _code4, _code5, _code6, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ApplicationsBoard = ApplicationsBoard;
  _exports2.hmr = void 0;
  //WORKSPACE CONTEXT
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/applications-board/code', false, {
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
  /**********
  actions.jsx
  **********/

  function ApplicationActions({
    application
  }) {
    const {
      texts
    } = useDSApplicationsContext();
    const {
      workspace
    } = (0, _code6.useDSWorkspaceContext)(); // noinspection JSMethodCanBeStatic

    const compile = event => {
      event.stopPropagation();
      event.preventDefault();
      workspace.openBoard('compile', {
        id: application.id
      });
    };

    return /*#__PURE__*/React.createElement("article", {
      className: "right-col actions"
    }, /*#__PURE__*/React.createElement(BeeActions, {
      bee: application.bee,
      texts: texts.actions
    }), !!application.errors.length && /*#__PURE__*/React.createElement(_code5.DSIconButton, {
      icon: "error",
      title: `total: ${application.errors.length}`,
      className: "circle error-icon",
      onClick: event => compile(event, 'client', application)
    }), /*#__PURE__*/React.createElement(_code5.DSIconButton, {
      icon: "compile",
      title: texts.actions.compile,
      className: "circle",
      onClick: event => compile(event, 'client', application)
    }));
  }
  /**************
  application.jsx
  **************/


  function ApplicationItem({
    item,
    texts
  }) {
    const application = item;
    if (!application.landed) return /*#__PURE__*/React.createElement(PreloadItem, null);
    const {
      workspace
    } = (0, _code6.useDSWorkspaceContext)();

    const modules = () => workspace.openApp(item.id);

    const description = application.description ?? texts.description;

    const openNavigator = event => {
      event.preventDefault();
      event.stopPropagation();
      workspace.openNavigator(application.id, event.currentTarget.href);
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "ds-item_list",
      key: application.id,
      onClick: modules
    }, /*#__PURE__*/React.createElement("div", {
      className: "item-info"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "link bold"
    }, application.name), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, description), application.port && /*#__PURE__*/React.createElement("a", {
      onClick: openNavigator,
      href: application.url,
      className: "link",
      target: "_blank"
    }, `localhost:${application.port}`), /*#__PURE__*/React.createElement("p", {
      className: "p2 primary-dark-color"
    }, application.path)), /*#__PURE__*/React.createElement(ApplicationActions, {
      application: application
    }));
  }
  /*************
  bee-action.jsx
  *************/

  /**
   * TODO: @julio action and logic is also existing in application board, analyze if can be integrated as a unique exported component
   * @param bee
   * @param texts
   * @returns {JSX.Element|null}
   * @constructor
   */


  function BeeActions({
    bee,
    texts
  }) {
    const [fetching, setFetching] = React.useState(bee?.status === 'initialising');
    if (!bee) return null;
    const icons = {
      stopped: 'play',
      running: 'refresh'
    };
    const action = bee.status !== 'initialising' && icons[bee.status];

    const stop = async event => {
      event.stopPropagation();
      if (bee.status === 'stopped') return;
      setFetching(true);

      try {
        await bee.stop();
        setFetching(false);
      } catch (e) {
        console.error(e);
      }
    };

    const onClick = async event => {
      event.stopPropagation();
      const action = bee.status === 'stopped' ? 'start' : 'restart';
      setFetching(true);

      try {
        await bee[action]();
        setFetching(false);
      } catch (e) {
        console.error(e);
      }
    };

    const cls = `circle bee--action action--${action}`;
    return /*#__PURE__*/React.createElement(React.Fragment, null, fetching ? /*#__PURE__*/React.createElement("button", {
      className: "beyond-icon-button circle button--fetching"
    }, /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
      active: true,
      className: "primary"
    })) : /*#__PURE__*/React.createElement(_code5.DSIconButton, {
      onClick: onClick,
      icon: action,
      className: cls,
      title: texts[action]
    }), /*#__PURE__*/React.createElement(_code5.DSIconButton, {
      disabled: bee.status === 'stopped',
      onClick: stop,
      icon: "stop",
      className: "circle bee--action action--stop button--fetching",
      title: texts.stop
    }));
  }
  /********
  board.jsx
  ********/


  const DSApplicationsContext = React.createContext();

  const useDSApplicationsContext = () => React.useContext(DSApplicationsContext);

  function ApplicationsBoard() {
    const [state, setState] = React.useState({
      controller: AppsController,
      ready: AppsController.ready
    });
    const {
      showAppForm,
      applications
    } = (0, _code6.useDSWorkspaceContext)();
    React.useEffect(() => {
      AppsController.setApplications(applications);

      const onChange = () => {
        setState(state => ({ ...state,
          controller: AppsController,
          items: applications.items,
          ready: AppsController.ready,
          timeUpdated: performance.now()
        }));
      };

      AppsController.bind('change', onChange);
      onChange();
      return () => AppsController.unbind('change', onChange);
    }, []);
    if (!state.ready || !applications.fetched) return /*#__PURE__*/React.createElement(PreloadCollection, null);
    const {
      texts
    } = state.controller;
    const headerTexts = texts.header;
    let apps = applications.items.map(item => /*#__PURE__*/React.createElement(ApplicationItem, {
      texts: texts,
      key: item.id,
      item: item
    }));
    if (!applications.items.length) apps = /*#__PURE__*/React.createElement(Empty, null);
    const cls = `ds-board__list-container${applications.items.length ? '' : ' empty-container'}`;
    return /*#__PURE__*/React.createElement(DSApplicationsContext.Provider, {
      value: {
        texts,
        timeUpdated: state.timeUpdated,
        creteApp: showAppForm
      }
    }, /*#__PURE__*/React.createElement("main", {
      className: "ds-projects-board"
    }, /*#__PURE__*/React.createElement("header", {
      className: "list_header"
    }, /*#__PURE__*/React.createElement("h4", null, headerTexts.title), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "link",
      onClick: showAppForm
    }, texts.actions.create), /*#__PURE__*/React.createElement("span", null, applications.items.length, " ", headerTexts.title))), /*#__PURE__*/React.createElement("section", {
      className: cls
    }, apps)));
  }
  /********
  empty.jsx
  ********/


  const Empty = () => {
    const {
      texts
    } = useDSApplicationsContext();
    const {
      showAppForm
    } = (0, _code6.useDSWorkspaceContext)();
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-empty-container"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", {
      className: "primary-color"
    }, texts.empty.title), /*#__PURE__*/React.createElement("h3", {
      className: "h1 on-secondary"
    }, texts.empty.subtitle)), /*#__PURE__*/React.createElement("div", {
      className: "ds-empty_buttons-container"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
      onClick: showAppForm,
      className: "btn primary btn-primary icon-on-primary"
    }, texts.actions.create, /*#__PURE__*/React.createElement(_code5.DSIcon, {
      className: "circle",
      icon: "add"
    })), /*#__PURE__*/React.createElement("div", {
      className: "break"
    })));
  };
  /*********************
  preload\collection.jsx
  *********************/


  function PreloadCollection({
    header
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-projects-board"
    }, /*#__PURE__*/React.createElement("header", {
      className: "list_header"
    }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: "17px",
      width: "50px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "link"
    }, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: "17px",
      width: "50px"
    })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: "17px",
      width: "50px"
    })))), /*#__PURE__*/React.createElement(PreloadItem, null), /*#__PURE__*/React.createElement(PreloadItem, null));
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
      className: "bold title-app"
    }, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: `10px`,
      width: `30px`
    })), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: `7px`,
      width: `50px`
    })), /*#__PURE__*/React.createElement("a", {
      className: "link"
    }, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: `7px`,
      width: `100px`
    })), /*#__PURE__*/React.createElement("p", {
      className: "p2 primary-text"
    }, /*#__PURE__*/React.createElement(_code3.BeyondPreloadText, {
      height: `7px`,
      width: `300px`,
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
    texts,
    applications,
    setReady
  }) => {
    const ref = React.useRef();

    const onChange = () => {
      const container = ref.current;
      if (!texts.ready && applications.fetched) return;
      window.setTimeout(() => {
        container.classList.add('finishing');
        window.setTimeout(() => setReady(true), 800);
      }, 1500);
    };

    (0, _code4.useBinder)([applications, texts], onChange);
    React.useEffect(() => document.querySelector('body').classList.add('no-scroll'), []);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "preload-container"
    }, /*#__PURE__*/React.createElement(BeyondImage, {
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
    }, /*#__PURE__*/React.createElement(BeyondIcon, null), /*#__PURE__*/React.createElement("div", {
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
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  const AppsController = new class Controller extends _js.ReactiveModel {
    #createApp;

    get createApp() {
      return this.#createApp;
    }

    set createApp(value) {
      if (value === this.#createApp) return;
      this.#createApp = value;
      this.triggerEvent();
    }

    #applications;

    get applications() {
      return this.#applications;
    }

    #firstTime;

    get ready() {
      let isReady = (this.#firstTime || this.applications?.tree.landed) && module.texts.ready;

      if (!this.#firstTime && isReady) {
        this.#firstTime = true;
      }

      return isReady;
    }

    get texts() {
      return module.texts.value;
    }

    get items() {
      return this.#applications?.items.length ?? 0;
    }

    constructor() {
      super();
      module.texts.bind('change', this.triggerEvent);
    }

    setApplications(applications) {
      this.#applications = applications;
      applications.bind('change', this.triggerEvent);
    }

  }();
  /**********
  SCSS STYLES
  **********/

  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.after-loading{animation:show 1s 1}@keyframes show{0%{opacity:0}100%{height:100%;opacity:1}}.no-scroll{overflow:hidden!important}.preload-container{display:flex;position:absolute;position:absolute;top:0;left:0;bottom:0;right:0;background:#000;z-index:3;align-items:center;justify-content:center;transition:all .3s ease-in}.preload-container .animation-container{display:flex;align-items:center;justify-content:center}.preload-container.finishing-preload{background:#ff0}.preload-container .overlay{position:absolute;bottom:-100px;left:0;background:red;z-index:5;transform:skewY(11deg);width:100%;transition:all 2ms ease-in;opacity:0;height:0}.preload-container .overlay.close{transition:all .3s ease-in;height:130vh;opacity:1}.preload-container .circle span{position:absolute;top:0;left:0;bottom:0;right:0;border-radius:50%;background:#050910;height:400px;width:400px;margin:auto;animation:pulse 2.5s linear infinite;animation-delay:calc(.5s * var(--i));transition:all .3s ease-in}@keyframes pulse{0%{transform:scale(1);opacity:.5}90%{transform:scale(3);opacity:.75}100%{transform:scale(4);opacity:0}}.preload-container.finishing .beyond-element-image{position:absolute;margin:auto;z-index:10;transition:all 1.3s ease-in-out;animation:appear 2s 1;overflow:hidden}.preload-container.finishing .animation-container{height:100%;width:100%;transform:rotate(0);transition:all .3s linear}.preload-container.finishing .animation-container .line{animation:0;transition:all .1s linear;opacity:0}.preload-container.finishing .animation-container .animate-svg__container .ds-preload__icon-container{animation:twist .9s 1;transform-origin:center;transform-box:fill-box;animation-fill-mode:forwards}.preload-container.finishing .animation-container .animate-svg__container .ds-preload__icon-container .ds-preload__icon{height:88px;left:-22px}@keyframes appear{0%{height:0;width:0}90%{height:auto;width:auto;opacity:1}}@keyframes twist{from{transform:rotate(0)}to{transform:rotate(360deg);opacity:0}}.preload-container .beyond-element-image{opacity:0;position:absolute;margin:auto}.preload-container .animation-container{position:relative;height:50%;transition:all .3s ease-in;width:50%;transform:rotate(30deg)}.preload-container .animation-container .animate-svg__container{align-items:center;justify-content:center;display:flex;position:absolute;top:0;left:0;bottom:0;right:0}.preload-container .animation-container .animate-svg__container .ds-preload__icon{z-index:20;height:150px;width:150px;margin:auto;animation:rotate 2s linear infinite;transform-origin:center;transform-box:fill-box;animation-fill-mode:forwards}.preload-container .animation-container .line{position:absolute;height:100px;width:2px;border:2px solid;z-index:1;margin:15px;transform:rotate(30deg);animation:move .3s infinite;animation-fill-mode:forwards}.preload-container .animation-container .line.line-one{margin-top:-100px;margin-left:-200px}.preload-container .animation-container .line.line-one-two{margin-top:-280px;margin-left:-80px;border-color:rgba(255,255,200,.1)}.preload-container .animation-container .line.line-three{margin-left:-20px;border-color:rgba(255,255,200,.1);margin-top:-150px;display:none}.preload-container .animation-container .line.line-two{margin-left:200px;margin-top:150px}.preload-container .animation-container .line.line-two-two{border-color:rgba(255,255,200,.1);margin-left:130px;margin-top:30px}@keyframes move{from{transform:translateY(-150px)}to{transform:translateY(150px)}}@keyframes rotate{0%{transform:rotate(0)}13%{transform:rotate(30deg) scale(1.1)}26%{transform:rotate(45deg) scale(1.01)}39%{transform:rotate(30deg) scale(1)}50%{transform:rotate(0) scale(1.1)}63%{transform:rotate(-30deg) scale(1.01)}76%{transform:rotate(-45deg) scale(1.02)}89%{transform:rotate(-30deg)}}.actions .beyond-icon-button.bee--action,.ds-projects-board .item-information .beyond-icon-button.bee--action{border:1px solid #121f36;border-radius:50%;display:flex;align-content:center;justify-items:center;height:2.5rem;width:2.5rem;background:#050910;fill:#fff;transition:all .3s ease-in}.actions .beyond-icon-button.bee--action.action--play,.ds-projects-board .item-information .beyond-icon-button.bee--action.action--play{fill:green;border:1px solid rgba(0,128,0,.2)}.actions .beyond-icon-button.bee--action.action--stop,.ds-projects-board .item-information .beyond-icon-button.bee--action.action--stop{fill:red;border:1px solid rgba(255,0,0,.2);background:rgba(255,0,0,.2)}.actions .beyond-icon-button.bee--action[disabled],.ds-projects-board .item-information .beyond-icon-button.bee--action[disabled]{opacity:.3;cursor:not-allowed}.ds-board__list-container .ds-item_list{border-bottom:1px solid #f0f0f0;padding:20px;display:grid;justify-content:space-between;align-items:center;flex-flow:row;cursor:pointer;transition:all .2s ease-in;grid-template-columns:1fr 1fr}.ds-board__list-container .ds-item_list:last-child{border-bottom:none;margin-bottom:20px}.ds-board__list-container .ds-item_list:hover{transition:all .2s ease-in-out;background:rgba(5,9,16,.5)}.ds-board__list-container .ds-item_list .p2{padding:0}.ds-board__list-container .ds-item_list .right-col{text-align:right;justify-content:flex-end}.ds-board__list-container .ds-item_list .p1,.ds-board__list-container .ds-item_list h3,.ds-board__list-container .ds-item_list h4{margin:0;padding:0}.ds-board__list-container .ds-item_list .actions,.ds-board__list-container .ds-item_list .item-information{display:flex;gap:8px}.ds-board__list-container .ds-item_list .actions .action-icon:hover .beyond-icon,.ds-board__list-container .ds-item_list .item-information .action-icon:hover .beyond-icon{border:1px solid #a2000a;background:#a2000a;transition:all .3s ease-in}.ds-board__list-container .ds-item_list .actions .beyond-icon-button.error-icon .beyond-icon,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button.error-icon .beyond-icon{background:#d2281e}.ds-board__list-container .ds-item_list .actions .beyond-icon-button,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button{border:1px solid #121f36;border-radius:50%;padding:10px;height:3.2rem;width:3.2rem;background:#050910;fill:#fff;transition:all .3s ease-in}.ds-board__list-container .ds-item_list .actions .beyond-icon-button .beyond-ripple,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button .beyond-ripple{border-radius:50%}.ds-board__list-container .ds-item_list .actions .beyond-icon-button.error-icon,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button.error-icon{background:#d2281e}.ds-board__list-container .ds-item_list .actions .beyond-icon-button.warning-icon,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button.warning-icon{fill:#F7D994}.ds-board__list-container .ds-item_list .actions .beyond-icon-button.bee--action,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button.bee--action{border:1px solid #121f36;border-radius:50%;display:flex;align-content:center;justify-items:center;background:#050910;fill:#fff;transition:all .3s ease-in}.ds-board__list-container .ds-item_list .actions .beyond-icon-button.bee--action.action--play,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button.bee--action.action--play{fill:green;border:1px solid rgba(0,128,0,.2)}.ds-board__list-container .ds-item_list .actions .beyond-icon-button.bee--action.action--stop,.ds-board__list-container .ds-item_list .item-information .beyond-icon-button.bee--action.action--stop{fill:red;border:1px solid rgba(255,0,0,.2);background:rgba(255,0,0,.2)}.ds-board__list-container .ds-item_list .blank-page{min-height:50vh;display:grid;align-items:center;justify-content:center;text-align:center}.preload-container{height:100vh;width:100vw;overflow:hidden}.ds-projects-board{height:100%}.ds-projects-board .list_header{display:flex;justify-content:space-between;flex-flow:row;border-top-right-radius:15px;background-image:linear-gradient(to right,#313c50 0,#050910 100%);color:#fff;padding:2px 15px;align-items:center}.ds-projects-board .list_header .actions{display:grid;grid-auto-flow:column;grid-gap:15px;align-items:center}.ds-projects-board .list_header .information-text{color:#313c50}.ds-projects-board .beyond-icon-button.button--fetching{height:3.2rem;width:3.2rem;border:1px solid #121f36;opacity:.5}.ds-projects-board .ds-board__list-container{height:100%}.ds-projects-board .ds-board__list-container.empty-container{height:calc(100% - 100px)}';
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