define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/layout/toolbar/code", "@beyond-js/ui/layout/footer/code", "@beyond-js/ui/layout/sidenav/code", "@beyond-js/ui/perfect-scrollbar/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, _code5, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Layout = Layout;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/layout/layout/layout', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*********
  layout.jsx
  *********/

  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.container = React.createRef();
      this.props.parent.bind('change', () => this.setState({}));
    }

    componentDidMount() {
      this.props.parent.rendered();
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "layout-container"
      }, /*#__PURE__*/React.createElement(_code2.Toolbar, null), /*#__PURE__*/React.createElement("div", {
        className: "container-content"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code4.Sidenav, null)), /*#__PURE__*/React.createElement("div", {
        className: "content",
        ref: this.container
      })), /*#__PURE__*/React.createElement(_code3.Footer, null));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: layout.js
  **************/


  function Layout() {
    this.control = ReactDOM.render(React.createElement(Control, {
      'parent': this
    }), this.container);
    this.container.classList.add('beyond-ui-layout');
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.layout-container{background:#1e2d42;color:#fff}.layout-container .container-content{padding:45px;display:grid;grid-template-columns:200px 1fr;grid-gap:20px;min-height:600px}.layout-container .container-content .content{overflow-x:hidden;padding:1px}.layout-container .container-content pre{margin:20px 0;padding:15px;position:relative;transition:all .1s ease-in-out;cursor:pointer}.layout-container .container-content pre:hover{background:#ff8056;color:#fff;transition:all .1s ease-in}.layout-container .container-content pre:before{content:"Copy";position:absolute;padding:15px 20px;top:0;right:0;background:#333;color:#e4e5dc}';
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