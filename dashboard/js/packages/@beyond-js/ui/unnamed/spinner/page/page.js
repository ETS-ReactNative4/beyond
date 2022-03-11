define(["exports", "@beyond-js/ui/spinner/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/spinner/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**********
  control.jsx
  **********/

  class Control extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("main", {
        className: "beyond-ui-spinner-page",
        ref: "main"
      }, /*#__PURE__*/React.createElement("h2", null, "Spinner"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondSpinner",
        route: "/libraries/beyond-ui/spinner/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSpinner fetching={true}/>'), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "The fetching parameter indicates when the spinner should be active or not: "), /*#__PURE__*/React.createElement("h4", null, "Ejemplos:"), /*#__PURE__*/React.createElement("div", {
        className: "spinners-container"
      }, /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        className: "primary",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        className: "secondary",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        className: "accent",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        color: "yellow",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        color: "green",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        color: "white",
        fetching: true
      }), /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        size: "50px",
        fetching: true
      })), /*#__PURE__*/React.createElement("h3", null, "Propiedades"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "color"), " Permite definir un color, el cual puede ser pasado en formato CSS."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "size"), " Permite especificar un tama\xF1o especifico para el spinner"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "fetching"), " Es la propiedad que activa el spinner, sino se pasa el spinner no es visible, por defecto es false"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "className"), " clase css a aplicar, si se pasa \"primary\", \"secondary\" o \"accent\" el spinner aplicara estilos asociados al template de manera autom\xE1tica.")), /*#__PURE__*/React.createElement("blockqoute", null, "Este componente puede recibir cualquier atributo html adicional."));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const wrapper = document.createElement('span');
    const specs = {};
    ReactDOM.render(React.createElement(Control, specs), wrapper);
    this.container.id = 'beyond-ui-element-spinner-page';
    this.container.appendChild(wrapper);
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-ui-spinner-page .spinners-container{padding:30px;display:flex;gap:15px;align-items:center;justify-content:center}';
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