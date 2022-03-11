define(["exports", "/libraries/beyond-ui/select/code", "/libraries/beyond-ui/import/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.MainComponent = void 0;
  _exports2.Page = Page;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/select/page/page', false, {}, dependencies);
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

    ReactDOM.render(React.createElement(MainComponent, {}), this.container);
    this.container.id = 'beyond-elements-select-page';
  }
  /**********
  control.jsx
  **********/


  class MainComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 5', 'option 5', 'option 5', 'option 5', 'option 6'];
      const options2 = [{
        'id': 5,
        'cedula': 1,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 20
      }, {
        'id': 7,
        'cedula': 2,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 31
      }, {
        'id': 8,
        'cedula': 3,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 40
      }, {
        'id': 9,
        'cedula': 5,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 55
      }, {
        'id': 10,
        'cedula': 4,
        'nombre': 'Pepito 1',
        'sexo': 'm',
        'age': 17
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: "container-select"
      }, /*#__PURE__*/React.createElement("h2", null, "Select "), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondSelect",
        route: "/libraries/beyond-ui/select/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondSelect identifier="nombre" options={options} value={options[3]} pk=\'cedula\'></BeyondSelect>'), /*#__PURE__*/React.createElement(_code.BeyondSelect, {
        identifier: "nombre",
        options: options2,
        value: options[3],
        pk: "cedula"
      }), /*#__PURE__*/React.createElement("h2", null, "Simple Select"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<select name="carrera"> <option value="1">Informática</option><option value="2">Administración</option><option value="3">Comercio</option></select>'), /*#__PURE__*/React.createElement("select", {
        name: "carrera"
      }, /*#__PURE__*/React.createElement("option", {
        value: "1"
      }, "Inform\xE1tica"), /*#__PURE__*/React.createElement("option", {
        value: "2"
      }, "Administraci\xF3n"), /*#__PURE__*/React.createElement("option", {
        value: "3"
      }, "Comercio")));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.MainComponent = MainComponent;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-elements-select-page select{width:50%}#beyond-elements-select-page .select-options{border:solid 1px #fff}#beyond-elements-select-page .select-options svg{fill:white}';
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