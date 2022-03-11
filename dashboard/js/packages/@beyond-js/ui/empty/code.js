define(["exports", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondEmpty = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/empty/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /********
  empty.jsx
  ********/

  class BeyondEmpty extends React.Component {
    render() {
      const text = this.props.text ? this.props.text : 'No hay registros';
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-element-empty"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, this.props.icon ? this.props.icon : /*#__PURE__*/React.createElement(_code.BeyondIcon, {
        icon: "icon"
      }), /*#__PURE__*/React.createElement("h3", null, text), this.props.additionalElement ? this.props.additionalElement : null, this.props.children ? this.props.children : null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondEmpty = BeyondEmpty;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-empty{text-align:center;color:var(--beyond-gray-light-color);padding:15px 15%;display:flex;flex-flow:row;justify-items:center;align-items:center;height:100%}.beyond-element-empty .content{justify-items:center;display:flex;margin:auto;flex-flow:column}.beyond-element-empty h3{margin:15px 0;font-size:18px;text-transform:lowercase}.beyond-element-empty h3:first-letter{text-transform:uppercase}.beyond-element-empty a{color:var(--beyond-gray-light-color);font-size:18px}.beyond-element-empty a:hover{text-decoration:none;cursor:pointer}.beyond-element-empty svg{width:45px;height:45px;display:grid;margin:auto;fill:var(--beyond-gray-light-color)}';
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