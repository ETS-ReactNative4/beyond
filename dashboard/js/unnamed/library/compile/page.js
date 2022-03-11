define(["exports", "@beyond-js/ui/form/code", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/ui/perfect-scrollbar/code", "react", "react-dom"], function (_exports2, _code, _ts, _code2, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/library/compile/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /***********
  messages.jsx
  ***********/

  class Messages extends React.Component {
    constructor(props) {
      super(props);

      this.update = () => this.setState({});
    }

    componentDidMount() {
      this.props.builder.bind('change', this.update);
    }

    componentWillUnmount() {
      this.props.builder.unbind('change', this.update);
    }

    render() {
      const messages = this.props.builder.messages;
      const output = [];
      messages.map(message => output.push( /*#__PURE__*/React.createElement("div", {
        key: message.id,
        className: message.is
      }, message.id, " - ", message.text)));
      return /*#__PURE__*/React.createElement("div", {
        className: "item"
      }, output);
    }

  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    constructor(props) {
      super(props);

      this.update = () => this.setState({});

      this.navigate = this.navigate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.props.library.bind('change', this.update);
    }

    componentWillUnmount() {
      this.props.library.unbind('change', this.update);
    }

    navigate() {
      const library = this.props.library;
      beyond.navigate(`/cloud/payments/bns?service=${library.name}&type=library`);
    }

    handleSubmit(event) {
      event.preventDefault();
      const library = this.props.library;
      library.builder.build();
    }

    render() {
      const library = this.props.library;
      return /*#__PURE__*/React.createElement("div", {
        className: "app-library-compile-page"
      }, /*#__PURE__*/React.createElement("section", {
        className: "item info-app"
      }, /*#__PURE__*/React.createElement("h1", null, "Library ", /*#__PURE__*/React.createElement("strong", null, library.name)), /*#__PURE__*/React.createElement("span", null, "Compila tu libreria"), /*#__PURE__*/React.createElement(_code.BeyondButton, {
        className: "primary small",
        onClick: this.handleSubmit
      }, "Compilar")), /*#__PURE__*/React.createElement(_code2.BeyondScrollContainer, {
        className: "build-detail"
      }, /*#__PURE__*/React.createElement("span", null, "Compilacion"), /*#__PURE__*/React.createElement(Messages, {
        builder: library.builder
      }), /*#__PURE__*/React.createElement(_code.BeyondButton, {
        className: "primary small",
        onClick: this.navigate
      }, "Contratar BNS")));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const library = new _ts.Library(this.vdir);
    ReactDOM.render(React.createElement(View, {
      'library': library
    }), this.container);
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.app-library-compile-page{display:grid;grid-template-columns:auto auto;grid-column-gap:20px;grid-row-gap:10px}.app-library-compile-page .info-app h1,.app-library-compile-page .info-app h3,.app-library-compile-page .info-start h1,.app-library-compile-page .info-start h3{margin:0}.app-library-compile-page .info-app h1,.app-library-compile-page .info-start h1{margin-bottom:10px}.app-library-compile-page .info-app strong,.app-library-compile-page .info-start strong{color:#ff8056}.app-library-compile-page .info-app span,.app-library-compile-page .info-start span{text-transform:uppercase;top:-4px;position:relative;font-size:11px;margin:5px 10px 5px 0;color:#a2000a}.app-library-compile-page .build-detail{max-width:500px;max-height:300px}';
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