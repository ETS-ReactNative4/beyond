define(["exports", "@beyond-js/dashboard/unnamed/components/breadcrumb/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/alert/code", "@beyond-js/ui/form/code", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/models/code", "@beyond-js/dashboard/core-components/code", "react", "react-dom"], function (_exports2, _code, _js, _code2, _code3, _code4, _code5, _code6, _code7, _code8, _code9, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.CompileBoard = CompileBoard;
  _exports2.Finished = Finished;
  _exports2.Footer = Footer;
  _exports2.hmr = void 0;

  /**
   * CORE
   */
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/app-compile/code', false, {
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
  /********
  board.jsx
  ********/

  const CompilerContext = React.createContext();

  const useCompilerContext = () => React.useContext(CompilerContext);

  function CompileBoard(props) {
    const [ready, setReady] = React.useState(controller.ready);
    const [finished, setFinished] = React.useState();
    const [selected, setSelected] = React.useState();
    const [fetching, setFetching] = React.useState();
    (0, _code7.useBinder)([controller], () => setReady(controller.ready));
    React.useEffect(() => {
      if (props.specs.id) controller.getApp([props.specs.id]);
      setReady(controller.ready);
    }, [props.specs]);
    if (!ready || props.specs.id !== controller.application?.id) return /*#__PURE__*/React.createElement(_code9.DsFetchingBlock, null);
    const {
      texts,
      application,
      error
    } = controller;
    const Control = finished ? Finished : Start;
    return /*#__PURE__*/React.createElement(CompilerContext.Provider, {
      value: {
        setFetching,
        fetching,
        finished,
        setFinished,
        selected,
        setSelected,
        texts,
        application
      }
    }, /*#__PURE__*/React.createElement(_code9.DSBoard, {
      className: "board__compile"
    }, /*#__PURE__*/React.createElement("header", {
      className: "board__header"
    }, /*#__PURE__*/React.createElement("h2", null, "Compilation ", /*#__PURE__*/React.createElement("small", null, application.name))), /*#__PURE__*/React.createElement(Control, null), /*#__PURE__*/React.createElement(Footer, null)));
  }
  /***********
  finished.jsx
  ***********/


  function Finished() {
    const {
      setFinished
    } = useCompilerContext();
    return /*#__PURE__*/React.createElement("div", {
      className: "pd-base"
    }, /*#__PURE__*/React.createElement(_code2.BeyondAlert, null, /*#__PURE__*/React.createElement("h3", null, "La compilaci\xF3n se ha realizado exitosamente."), /*#__PURE__*/React.createElement("strong", null, "Directorio donde se encuentra"), /*#__PURE__*/React.createElement("span", {
      className: "pathname"
    }, "C://users/julio")), /*#__PURE__*/React.createElement("span", {
      className: "action__end",
      onClick: () => setFinished(false)
    }, "Crear una nueva compilaci\xF3n"));
  }
  /*********
  footer.jsx
  *********/


  function Footer() {
    const {
      finished,
      application,
      setFinished,
      selected,
      setFetching
    } = useCompilerContext();
    const [messages, setMessages] = React.useState([]);
    const list = React.useRef(null);

    const compile = async event => {
      event.stopPropagation();
      const dist = application.deployment.distributions.get(selected);
      const {
        name,
        platform,
        environment
      } = dist;
      setFetching(true);
      window.b = application.builder;

      const setMessage = (entries, error) => {
        const size = entries.length;
        if (!size) return;
        const item = document.createElement('li');
        error && (item.className = 'error');
        item.innerHTML = entries[size - 1].text;
        list.current.appendChild(item);
      };

      application.builder.bind('change', () => {
        const {
          messages,
          error
        } = application.builder;
        messages && setMessage(messages);
        error && setMessage(error, true);
      });
      await application.builder.build({
        name,
        platform,
        environment
      });
      setFetching(false);
      setFinished(true);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, !finished && /*#__PURE__*/React.createElement("div", {
      className: "compile__action"
    }, /*#__PURE__*/React.createElement(_code3.BeyondButton, {
      className: "btn primary",
      onClick: compile
    }, "Compilar")), /*#__PURE__*/React.createElement("ul", {
      className: "compile__trace__list",
      ref: list
    }));
  }
  /*******
  item.jsx
  *******/


  const DistributionItem = ({
    data
  }) => {
    const {
      fetching,
      texts,
      selected,
      setSelected
    } = useCompilerContext();
    if (selected && selected !== data.id) return null;
    let cls = `item-distribution${selected === data.id ? ' selected' : ''}`;
    if (fetching) cls += " is-fetching";

    const onSelect = event => {
      const isSelected = selected ? undefined : data.id;
      setSelected(isSelected);
    };

    const attrs = {
      className: cls
    };
    if (!fetching) attrs.onClick = onSelect;
    return /*#__PURE__*/React.createElement("li", attrs, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, data.name), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.label, ": ", /*#__PURE__*/React.createElement("span", null, data.platform)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.environment, ": ", /*#__PURE__*/React.createElement("span", null, data.environment)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.port.label, ": ", /*#__PURE__*/React.createElement("span", null, data.port)), data.ts && /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.ts, ": ", /*#__PURE__*/React.createElement("span", null, data.ts.compiler))), /*#__PURE__*/React.createElement("div", {
      className: "col__right"
    }, /*#__PURE__*/React.createElement("div", null, data.ssr && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.ssr)), /*#__PURE__*/React.createElement(_code9.DSIcon, {
      icon: "check"
    })));
  };
  /********
  start.jsx
  ********/


  function Start() {
    const {
      selected,
      application
    } = useCompilerContext();
    const distributions = [];
    application.deployment.distributions.forEach(dist => distributions.push( /*#__PURE__*/React.createElement(DistributionItem, {
      key: dist.id,
      data: dist
    })));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "pd-base"
    }, "Titulo"), /*#__PURE__*/React.createElement("ul", {
      className: `distributions__list${selected ? ' is-selected' : ''}`
    }, distributions)));
  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  const controller = new class extends _js.ReactiveModel {
    get texts() {
      return module.texts.value;
    }

    get ready() {
      return module.texts.ready && (this.#application || this.#error);
    }

    #application;

    get application() {
      return this.#application?.application;
    }

    #error;

    get error() {
      return this.#error;
    }

    constructor() {
      super();
      module.texts.bind('change', this.triggerEvent);
    }

    async getApp(id) {
      const application = await _code8.applicationsFactory.get(id);

      if (!application) {
        this.#error = 'APP_NOT_FOUND';
      }

      this.#application = application;
      window._app = this.application;
      this.triggerEvent();
    }

  }();
  /**********
  SCSS STYLES
  **********/

  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.board__compile .distributions__list{list-style:none;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;padding:2rem}.board__compile .distributions__list.is-selected{grid-template-columns:1fr}.board__compile .distributions__list .item-distribution{padding:1rem 2rem;cursor:pointer;display:grid;flex-grow:2;grid-template-columns:1fr 60px;align-items:center}.board__compile .distributions__list .item-distribution h3{font-size:1.6rem;text-transform:uppercase;padding:0}.board__compile .distributions__list .item-distribution.selected,.board__compile .distributions__list .item-distribution:hover{background:rgba(18,31,54,.3)}.board__compile .distributions__list .item-distribution.selected .col__right .beyond-icon,.board__compile .distributions__list .item-distribution:hover .col__right .beyond-icon{display:flex}.board__compile .distributions__list .item-distribution .col__right{display:flex;gap:15px}.board__compile .distributions__list .item-distribution .col__right .beyond-icon{display:none;background:var(--beyond-primary-color);border-radius:50%;padding:5px;height:20px;width:20px}.board__compile .compile__action{padding:2rem;display:flex;justify-content:flex-end}.board__compile .action__end{display:flex;align-self:flex-end;justify-content:flex-end;margin:1rem 0;color:#a2000a;text-decoration:none}.compile__trace__list .error{color:red}.ds-modal.ds-modal-compilation .beyond-element-spinner{position:absolute;right:20px;top:20px}.ds-modal.ds-modal-compilation .hidden{display:none}.ds-modal.ds-modal-compilation .beyond-button{display:grid;width:70%;margin:auto}.ds-modal.ds-modal-compilation .ds-modal__content{padding:20px;position:relative;display:grid}.ds-modal.ds-modal-compilation .ds-modal__content .compilation__message,.ds-modal.ds-modal-compilation .ds-modal__content .ds-modal__actions{margin:15px 0 0}.ds-modal.ds-modal-compilation .list-builds{list-style:none;padding:20px}.ds-modal.ds-modal-compilation .list-builds li{border-bottom:1px solid #f0f0f0;display:grid;grid-template-columns:1fr auto;padding:8px;align-items:center}.ds-modal.ds-modal-compilation .list-builds li h5{padding:0;color:#ff8056}.ds-modal.ds-modal-compilation .list-builds li:last-child{border-bottom:none}.app-application-compile-page header{padding:15px;margin-bottom:30px}.app-application-compile-page header h4,.app-application-compile-page header h5{padding:0;margin:0}.app-application-compile-page header h5{margin-top:8px;color:#ff8056}.app-application-compile-page .panels{display:grid}.app-application-compile-page .panels .form-container{display:grid;grid-auto-flow:column}.app-application-compile-page .panels .form-section{display:grid;grid-template-rows:50px auto}.app-application-compile-page .panels .form-section:nth-child(2) .block-options figure.active{background:#ff7142}.app-application-compile-page .panels .form-section:nth-child(2) .block-options figure.active:hover{background:#ff612d}.app-application-compile-page .panels .form-section:nth-child(3) .block-options figure.active{background:#ff5a23}.app-application-compile-page .panels .form-section:nth-child(3) .block-options figure.active:hover{background:#ff8056}.app-application-compile-page .block-options{display:flex;display:flex}.app-application-compile-page .block-options p{font-size:12px}.app-application-compile-page .block-options figure{flex:1 1 0;display:grid;flex-direction:column;text-align:center;align-items:center;padding:40px;cursor:pointer;gap:8px;margin:0;justify-content:center;text-align:center;transition:all 150ms ease-in}.app-application-compile-page .block-options figure h4{padding:0 0 8px}.app-application-compile-page .block-options figure svg{height:4rem;width:4rem;margin:auto;fill:#FF8056}.app-application-compile-page .block-options figure.active,.app-application-compile-page .block-options figure:hover{transition:all 150ms ease-in;background:#ff8056;color:#fff}.app-application-compile-page .block-options figure.active svg,.app-application-compile-page .block-options figure:hover svg{fill:#fff}.app-application-compile-page .block-options figure.active:hover,.app-application-compile-page .block-options figure:hover:hover{background:rgba(0,0,0,.5)}.app-application-compile-page .block-options figure.active:hover svg,.app-application-compile-page .block-options figure:hover:hover svg{fill:#FF8056}.app-application-compile-page .block-options figure.active.active:hover,.app-application-compile-page .block-options figure:hover.active:hover{background:#ff6d3d}.app-application-compile-page .block-options figure.active.active:hover svg,.app-application-compile-page .block-options figure:hover.active:hover svg{fill:#fff}.app-application-compile-page .block-options figure{flex:1}.app-application-compile-page .block-options figure:hover h4{color:#ff8056}.app-application-compile-page .block-options figure.active:hover h4{color:#fff}.app-application-compile-page .checkbox-section,.app-application-compile-page .flex-column{display:flex;gap:15px}.app-application-compile-page .flex-column{padding:8px 15px}.app-application-compile-page .flex-column+.app-application-compile-page .flex-column{padding-left:30px}.app-application-compile-page .column__right-content{display:flex;justify-content:flex-end}';
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