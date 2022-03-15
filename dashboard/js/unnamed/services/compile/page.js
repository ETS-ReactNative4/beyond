define(["exports", "@beyond-js/ui/modal/code", "@beyond-js/ui/form/code", "@beyond-js/ui/spinner/code", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/unnamed/layout/header-bar/code", "@beyond-js/dashboard/unnamed/components/breadcrumb/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _ts, _code4, _code5, _code6, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Page = Page;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/services/compile/page', false, {
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
  /**************
  compilation.jsx
  **************/

  class CompilationModal extends React.Component {
    constructor(props) {
      super(props);
      /**
       * when this component is mounted the module is already loaded so, we can
       * access to the module texts without check if it is ready.
       *
       * @type {{showed: number, messages: [], message: {text}, items: number}}
       */

      this.state = {
        messages: [],
        items: 0,
        showed: 0,
        message: {
          "text": module.texts.value.compilation.start
        }
      };
      this.container = React.createRef();

      this.updateState = () => this.setState({});

      this.processMessages = this.processMessages.bind(this);
      window._state = this.state;
      window._bulder = this.props.builder;
    }
    /**
     * Trying to add some animation,
     * this code needs to be removed later.
     *
     */


    processMessages() {
      const messages = this.props.builder.messages;
      const total = this.props.builder.messages.length;

      if (total > this.state.showed) {
        const message = messages[this.state.showed + 1];

        if (!message?.text) {
          return;
        }

        this.setState((state, props) => {
          return {
            messages: this.state.messages.concat([message.text]),
            message: message,
            showed: state.showed + 1
          };
        });
      }
    }

    componentDidMount() {
      this.processMessages(this.container.current); // this.props.builder.bind('change', this.updateState);

      this.props.builder.bind('change', this.processMessages);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.showed < this.props.builder.messages.length) {
        this.processMessages();
      }
    }

    componentWillUnmount() {
      this.props.builder.unbind('change', this.processMessages);
    }

    render() {
      const {
        onClose,
        texts,
        builder,
        openPrevious
      } = this.props;
      const {
        finished,
        error,
        processing
      } = builder;

      const closeModal = event => {
        builder.clean();
        onClose();
      };

      const onFinish = () => {
        closeModal();
        openPrevious();
      };

      const output = [];
      const footer = [];

      if (error) {
        output.push( /*#__PURE__*/React.createElement(_code4.BeyondAlert, {
          key: "message",
          close: true,
          onClose: builder.cleanError,
          type: "error"
        }, error));
        footer.push( /*#__PURE__*/React.createElement("footer", {
          className: "ds-modal__actions"
        }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
          key: "button",
          onClick: closeModal,
          className: "primary btn-block"
        }, " ", texts.actions.close)));
      } else {
        output.push( /*#__PURE__*/React.createElement(_code3.BeyondSpinner, {
          key: "spinner",
          fetching: processing
        }));
      }

      const cls = finished || error ? 'compilation__message hidden' : 'compilation__message ';
      return /*#__PURE__*/React.createElement(_code.BeyondModal, {
        className: "md ds-modal ds-modal-compilation",
        onClose: closeModal,
        show: true
      }, /*#__PURE__*/React.createElement("header", {
        className: "ds-modal_header"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.compilation.title), /*#__PURE__*/React.createElement("h5", {
        className: "primary-color"
      }, texts.compilation.subtitle))), /*#__PURE__*/React.createElement("div", {
        className: "ds-modal__content"
      }, output, finished && /*#__PURE__*/React.createElement(_code4.FadeIn, null, /*#__PURE__*/React.createElement(_code4.BeyondAlert, {
        onClose: builder.cleanError,
        type: "success"
      }, texts.compilation.finished), /*#__PURE__*/React.createElement("footer", {
        className: "ds-modal__actions"
      }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        key: "button",
        onClick: onFinish,
        className: "primary btn-block"
      }, " ", texts.actions.close))), /*#__PURE__*/React.createElement(_code4.FadeIn, null, /*#__PURE__*/React.createElement("div", {
        key: "messages",
        className: cls,
        ref: this.container
      }, this.state.message.text)), footer));
    }

  }
  /**************
  environment.jsx
  **************/


  function Environment() {
    const {
      texts,
      changeValue,
      onSelectEnvironment,
      environment
    } = useCompilerContext();

    if (environment) {
      return /*#__PURE__*/React.createElement("section", {
        className: "form-section"
      }, /*#__PURE__*/React.createElement("h4", null, texts.environments.titleSelected), /*#__PURE__*/React.createElement("div", {
        className: "block-options"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "active",
        "data-environment": "development"
      }, /*#__PURE__*/React.createElement(_code4.DSIcon, {
        icon: "code"
      }), /*#__PURE__*/React.createElement("h4", null, texts.environments.dev.title), /*#__PURE__*/React.createElement("button", {
        "data-property": "environment",
        onClick: changeValue,
        className: "btn link"
      }, texts.actions.change))));
    }

    return /*#__PURE__*/React.createElement("section", {
      className: "form-section"
    }, /*#__PURE__*/React.createElement("h4", null, texts.environments.title), /*#__PURE__*/React.createElement("div", {
      className: "block-options"
    }, /*#__PURE__*/React.createElement("figure", {
      onClick: onSelectEnvironment,
      "data-environment": "development"
    }, /*#__PURE__*/React.createElement(_code4.DSIcon, {
      icon: "code"
    }), /*#__PURE__*/React.createElement("h4", null, texts.environments.dev.title), /*#__PURE__*/React.createElement("p", null, texts.environments.dev.description)), /*#__PURE__*/React.createElement("figure", {
      onClick: onSelectEnvironment,
      "data-environment": "production"
    }, /*#__PURE__*/React.createElement(_code4.DSIcon, {
      icon: "cloudDone"
    }), /*#__PURE__*/React.createElement("h4", null, texts.environments.prod.title), /*#__PURE__*/React.createElement("p", null, texts.environments.prod.description))));
  }
  /***********
  previous.jsx
  ***********/


  function PreviousCompilations({
    open
  }) {
    const {
      texts,
      builder
    } = useCompilerContext();
    const [modal, toggleModal] = React.useState(open);
    React.useEffect(() => toggleModal(open), [open]);

    const show = event => {
      toggleModal(!modal);
    };

    if (!builder.builds || !Object.keys(builder.builds).length) return null;

    const onDelete = event => {//TODO: add delete functionality
    };

    const builds = [];

    if (builder.builds) {
      for (const key in builder.builds) {
        if (!builder.builds.hasOwnProperty(key)) continue;
        const build = builder.builds[key];
        builds.push( /*#__PURE__*/React.createElement("li", {
          "data-id": key,
          key: key
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
          className: "primary-color upper"
        }, build.platform), /*#__PURE__*/React.createElement("strong", null, texts.builds.path, ":"), " ", /*#__PURE__*/React.createElement("span", null, build.base)), /*#__PURE__*/React.createElement(_code4.DSIconButton, {
          className: "primary",
          icon: "delete",
          onClick: onDelete
        })));
      }
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "column__right-content"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn link",
      onClick: show
    }, texts.builds.message)), modal && /*#__PURE__*/React.createElement(_code.BeyondModal, {
      className: "md ds-modal ds-modal-compilation",
      show: true
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.builds.title), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.builds.subtitle))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal_content"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "list-builds"
    }, builds))));
  }
  /*******
  view.jsx
  *******/


  const CompilerContext = React.createContext();

  const useCompilerContext = () => React.useContext(CompilerContext);

  class View extends React.Component {
    constructor(props) {
      super(props);
      const {
        service
      } = props;
      this.state = {};

      this.update = () => {
        this.setState({});
      };

      this.service = service;
      window.s = service;
      this.onSelectEnvironment = this.onSelectEnvironment.bind(this);
      this.changeValue = this.changeValue.bind(this);
      this.compile = this.compile.bind(this);
      this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
      this.props.texts.bind('change', this.update);
      this.props.service.bind('change', this.update);
    }

    componentWillUnmount() {
      this.props.texts.unbind('change', this.update);
      this.props.service.unbind('change', this.update);
    }

    compile(event) {
      event.preventDefault();
      event.stopPropagation();
      const {
        service
      } = this;
      this.setState({
        showCompilation: true
      });
      service.builder.build({
        environment: 'development'
      });
    }

    onSelectEnvironment(event) {
      const target = event.currentTarget;
      const {
        environment
      } = target.dataset;
      target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      target.classList.toggle('active');
      this.setState({
        environment: environment
      });
    }

    changeValue(event) {
      const target = event.currentTarget;
      const {
        property
      } = target.dataset;
      const value = {};
      value[property] = undefined;
      this.setState(value);
    }

    onClose() {
      this.setState({
        showCompilation: undefined
      });
    }

    render() {
      let {
        texts,
        service
      } = this.props;
      if (!texts.ready) return null;
      if (!service.loaded || !service?.builder?.builds) return null;
      texts = texts.value;
      const items = [['Home', '/'], ['App', `/services/compile?id=${service.id}`]];
      const {
        environment
      } = this.state;
      const isValid = environment;
      const value = {
        texts: texts,
        ready: service.loaded,
        ...this.state,
        builder: service.builder,
        onSelectEnvironment: this.onSelectEnvironment,
        changeValue: this.changeValue,
        isValid: isValid,
        previousOpened: this.state.openPrevious
      };
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CompilerContext.Provider, {
        value: value
      }, /*#__PURE__*/React.createElement(_code5.DsHeaderBar, {
        className: "service-header"
      }, /*#__PURE__*/React.createElement("div", {
        className: "left-col"
      }, /*#__PURE__*/React.createElement("div", {
        className: "title-col"
      }, /*#__PURE__*/React.createElement(_code6.DsBreadcrumb, {
        items: items
      }), /*#__PURE__*/React.createElement("h2", {
        className: "title primary-color"
      }, service.name)))), /*#__PURE__*/React.createElement("div", {
        className: "ds-container app-service-compile-page"
      }, /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h4", null, texts.title), /*#__PURE__*/React.createElement("h5", null, texts.subtitle)), /*#__PURE__*/React.createElement(PreviousCompilations, {
        open: this.state.openPrevious
      }), /*#__PURE__*/React.createElement("div", {
        className: "panels"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-container"
      }, /*#__PURE__*/React.createElement(Environment, null))), /*#__PURE__*/React.createElement("hr", null), isValid && /*#__PURE__*/React.createElement("footer", {
        className: "center-block"
      }, /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: this.compile,
        className: "primary btn-block"
      }, " ", texts.actions.compile))))), this.state.showCompilation && /*#__PURE__*/React.createElement(CompilationModal, {
        builder: service.builder,
        onClose: this.onClose,
        openPrevious: this.togglePrevious,
        texts: texts
      }));
    }

  }

  View.contextType = CompilerContext;
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/

  /************
  FILE: page.js
  ************/

  function Page() {
    const texts = module.texts;

    this.show = () => {
      const service = new _ts.Service(this.qs.id);
      const id = service.id.split('/');
      const is = id[0];
      const name = id[1];
      service.load();
      ReactDOM.render(React.createElement(View, {
        'is': is,
        'name': name,
        'texts': texts,
        'service': service
      }), this.container);
    };
    /**
     * The component is unmmount to clean all functionality selected,
     * There is not a standard defined to make it (clean up a component or state component),
     * each case must be evaluated in separated way. In this case, all state is managed by
     * the main react component and is not necessary has memory about that.
     */


    this.hide = () => {
      ReactDOM.unmountComponentAtNode(this.container);
    };
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-modal.ds-modal-compilation .beyond-element-spinner{position:absolute;right:20px;top:20px}.ds-modal.ds-modal-compilation .hidden{display:none}.ds-modal.ds-modal-compilation .beyond-button{display:grid;width:70%;margin:auto}.ds-modal.ds-modal-compilation .ds-modal__content{padding:20px;position:relative;display:grid}.ds-modal.ds-modal-compilation .ds-modal__content .compilation__message,.ds-modal.ds-modal-compilation .ds-modal__content .ds-modal__actions{margin:15px 0 0}.ds-modal.ds-modal-compilation .list-builds{list-style:none;padding:20px}.ds-modal.ds-modal-compilation .list-builds li{border-bottom:1px solid #f0f0f0;display:grid;grid-template-columns:1fr auto;padding:8px;align-items:center}.ds-modal.ds-modal-compilation .list-builds li h5{padding:0;color:#ff8056}.ds-modal.ds-modal-compilation .list-builds li:last-child{border-bottom:none}';
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