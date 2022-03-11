define(["exports", "@beyond-js/ui/icon/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/icon/pages/buttons/page', false, {}, dependencies);
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
      const iconsList = _code.BEYOND_ICONS;
      const iconsName = Object.keys(iconsList);
      return /*#__PURE__*/React.createElement("div", {
        className: "icon-buttons-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Icon buttons"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondIconButton",
        route: "/libraries/beyond-ui/icon/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondIconButton className="cls" icon="Nombre del ícono"/>'), /*#__PURE__*/React.createElement("div", {
        className: "container-icon-list"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        icon: "user",
        title: "icon button title"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, `<BeyondIconButton icon="user"/>`)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("h2", null, "useful classes"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Examples: "), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "primary circle",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".circle")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "primary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".primary")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle primary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle primary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".primary.circle")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "secondary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".secondary")), /*#__PURE__*/React.createElement("div", {
        className: "class-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle secondary",
        icon: "user"
      }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
        className: "circle secondary",
        icon: "user"
      })), /*#__PURE__*/React.createElement("pre", null, ".secondary.circle"))));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    this.render = function () {
      const wrapper = document.createElement('span');
      const specs = {};
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'beyond-element-icons-buttons-page';
      this.container.appendChild(wrapper);
    };
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-element-icons-buttons-page .class-container{display:grid;grid-template-columns:20% 1fr;grid-gap:15px;margin-bottom:30px;align-items:center}#beyond-element-icons-buttons-page .container-icon-list{text-align:left}#beyond-element-icons-buttons-page button{margin-right:5px}';
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