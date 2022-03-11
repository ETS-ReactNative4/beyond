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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/icon/pages/icons/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /**********
  control.jsx
  **********/


  class Control extends React.Component {
    render() {
      const iconsList = _code.BEYOND_ICONS;
      const iconsName = Object.keys(iconsList);
      return /*#__PURE__*/React.createElement("div", {
        className: "icon-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Icons"), /*#__PURE__*/React.createElement(_code2.BeyondImport, {
        name: "BeyondIcon",
        route: "/libraries/beyond-ui/icon/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondIcon className="cls" icon="Nombre del ícono"/>'), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Icon Packs"), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Use Name: "), /*#__PURE__*/React.createElement("div", {
        className: "icon-list"
      }, iconsName.map((iconName, index) => {
        const title = iconName === 'av:stop' ? {
          title: 'icon title'
        } : null;
        return /*#__PURE__*/React.createElement("div", {
          className: "icon-element",
          key: index
        }, iconName, /*#__PURE__*/React.createElement(_code.BeyondIcon, _extends({
          className: "",
          icon: iconName
        }, title)));
      })));
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
      this.container.id = 'beyond-element-icons-page';
      this.container.appendChild(wrapper);
    };
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-element-icons-page .icon-container{text-align:left}#beyond-element-icons-page .icon-container .icon-list{margin-top:20px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;background:#121f36}#beyond-element-icons-page .icon-container .icon-list path{fill:white}#beyond-element-icons-page .icon-container .icon-list .icon-element{text-align:center;padding:20px;font-size:16px;display:grid;grid-gap:10px;transition:.8s background-color;cursor:pointer;fill:white}#beyond-element-icons-page .icon-container .icon-list .icon-element:hover{background:#e36152;color:#fff;fill:#FFFFFF}#beyond-element-icons-page .icon-container .icon-list .icon-element .beyond-icon{margin:auto}';
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