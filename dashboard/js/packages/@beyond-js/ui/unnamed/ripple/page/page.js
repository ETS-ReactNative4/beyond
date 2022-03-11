define(["exports", "@beyond-js/ui/ripple/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/import/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/ripple/page/page', false, {}, dependencies);
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

  /************
  FILE: page.js
  ************/

  function Page() {
    'use strict';

    const ripple = new _code.BeyondRipple();
    const wrapper = document.createElement('div');
    const specs = {};
    ReactDOM.render(React.createElement(MainComponent, specs), wrapper);
    const styles = document.createElement('style');
    styles.textContent = bundle.styles.value;
    this.container.id = 'beyond-element-ripple-page';
    this.container.appendChild(styles);
    this.container.appendChild(wrapper);
    ripple.init(document.querySelectorAll('button'));
  }
  /*******
  main.jsx
  *******/


  class MainComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "main-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Ripple"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondRipple",
        route: "/libraries/beyond-ui/ripple/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, 'const ripple = new BeyondRipple();' + '    ripple.init(document.querySelectorAll(\'button\'));\n'), /*#__PURE__*/React.createElement(_code4.BeyondButton, {
        type: "button primary"
      }, " CLICK ME"), /*#__PURE__*/React.createElement("hr", null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-element-ripple-page{height:100%;overflow:auto;transform:scale(.9) translate3d(0,0,0);transition:transform .4s ease,opacity .4s ease}#beyond-element-ripple-page.show{opacity:1;transform:none}';
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