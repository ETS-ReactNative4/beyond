define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondAlert = BeyondAlert;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/alert/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /********
  alert.jsx
  ********/

  function BeyondAlert(props) {
    const types = Object.freeze({
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
      danger: 'alert-danger',
      info: 'alert-info'
    });
    const [closed, setClosed] = React.useState(false);
    let {
      type,
      title,
      message,
      className,
      icon,
      align,
      close,
      onClose
    } = props;

    const onClickClose = event => {
      const target = event.currentTarget;
      const parent = target.closest('.beyond-alert');
      parent.classList.add('hiding-component');
      window.setTimeout(() => {
        if (onClose) onClose();
        setClosed(true);
      }, 400);
    };

    if (!type) type = 'info';
    let cls = className ? `beyond-alert ${className}` : 'beyond-alert';
    cls += types.hasOwnProperty(type) ? ` ${types[type]}` : '';
    if (icon) cls += ' alert-icon';
    if (align) cls += ` alert-icon-${align}`;
    const output = [];
    if (title) output.push( /*#__PURE__*/React.createElement("h3", {
      key: "title"
    }, title));
    if (message) output.push( /*#__PURE__*/React.createElement("div", {
      key: "message"
    }, message));
    if (closed) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: cls
    }, icon && !align && /*#__PURE__*/React.createElement(DashboardIcon, {
      className: "alert-icon",
      name: icon
    }), /*#__PURE__*/React.createElement("div", {
      className: "beyond-alert_content"
    }, output, props.children), icon && align === 'right' && /*#__PURE__*/React.createElement(DashboardIcon, {
      className: "alert-icon",
      name: icon
    }), close && /*#__PURE__*/React.createElement(DSIconButton, {
      onClick: onClickClose,
      className: "beyond-alert__close-icon xs",
      icon: "close"
    }));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyondalert{padding:15px;color:#fff;margin:10px 0;margin-bottom:20px;display:grid;align-items:center;align-content:center;border-radius:2px;box-shadow:0 10px 13px -7px #000,0 2px 11px 3px transparent}.beyondalert.alert-icon,.beyondalert.alert-icon-left{grid-template-columns:auto 1fr}.beyondalert.alert-icon-right{grid-template-columns:1fr auto}._beyond-alert{border-radius:5px;margin:10px 0;padding:10px}._beyond-alert .alert-icon{padding:0 10px;display:flex}._beyond-alert h3{margin:0;text-transform:uppercase}._beyond-alert p{margin:0;text-transform:uppercase}._beyond-alert.info{background-color:gray}._beyond-alert.success{background:green}._beyond-alert.danger,._beyond-alert.error{background:red}._beyond-alert.warning{background:#ff0}';
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