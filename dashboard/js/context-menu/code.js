define(["exports", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/unnamed/components/tooltip/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.DSContextMenu = DSContextMenu;
  _exports2.ItemMenu = ItemMenu;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/context-menu/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /***************
  context-menu.jsx
  ***************/

  function DSContextMenu({
    specs,
    unmount,
    children
  }) {
    return /*#__PURE__*/React.createElement(_code2.BeyondTooltip, {
      specs: specs,
      unmount: unmount,
      className: "ds-context-menu item-actions"
    }, children);
  }
  /************
  item-menu.jsx
  ************/


  function ItemMenu({
    onClick,
    icon,
    label
  }) {
    return /*#__PURE__*/React.createElement("li", {
      onClick: onClick
    }, /*#__PURE__*/React.createElement(_code.DSIcon, {
      icon: icon
    }), label);
  }
  /***********
  JS PROCESSOR
  ***********/

  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-context-menu{padding:0;background:#141414;border-radius:3px;z-index:1000;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);min-width:200px;cursor:pointer}.ds-context-menu svg{fill:#fff;height:14px;width:14px}.ds-context-menu ul{list-style:none;padding:0;display:grid;margin:0;align-items:center}.ds-context-menu ul li{padding:5px 15px;align-items:center;display:flex;gap:5px}.ds-context-menu ul li:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.ds-context-menu ul li:last-child{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.ds-context-menu ul li:hover{background:#333}';
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