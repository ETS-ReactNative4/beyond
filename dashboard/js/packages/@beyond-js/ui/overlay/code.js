define(["exports", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondOverlay = void 0;
  _exports2.Overlay = Overlay;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/overlay/code', false, {}, dependencies);
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

  /***************
  FILE: overlay.js
  ***************/

  function Overlay(config) {
    if (!config) {
      throw new Error('config modal params is necessary');
    }

    this.open = create;
    this.close = destroy;

    function destroy() {
      const body = document.querySelector('body');
      const exist = document.querySelector('#__graphs-overlay');
      body.setAttribute('style', '');
      if (exist) body.removeChild(exist);
    }

    function create() {
      const body = document.querySelector('body');
      const exist = document.querySelector('#__graphs-overlay');
      if (exist) exist.remove();
      const wrapper = document.createElement('div');
      wrapper.id = '__graphs-overlay';
      body.setAttribute('style', 'overflow:hidden');
      body.appendChild(wrapper);
      ReactDOM.render(React.createElement(BeyondOverlay, {
        'config': config
      }), wrapper);
    }
  }

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
  options.jsx
  **********/


  class Options extends React.Component {
    render() {
      const {
        item
      } = this.props;
      let properties = {};
      if (item.data) properties.data = item.data;
      return /*#__PURE__*/React.createElement("div", {
        className: "item"
      }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, _extends({
        onClick: item.action,
        icon: item.icon
      }, properties)), /*#__PURE__*/React.createElement("h5", null, item.text));
    }

  }
  /**********
  overlay.jsx
  **********/


  class BeyondOverlay extends React.Component {
    componentDidMount() {
      this.refs.overlay.addEventListener('click', event => this.hideOverlay(event));
    }

    componentWillUnmount() {
      this.refs.overlay.removeEventListener('click', event => this.hideOverlay(event));
    }

    hideOverlay(event) {
      if (event.target !== this.refs.overlay) return;
      event.stopPropagation();
      this.props.config.handler();
    }

    render() {
      const config = this.props.config;
      const {
        title,
        options
      } = config;
      const properties = Object.keys(options);
      const overlayStyle = {
        'gridTemplateColumns': `repeat(${properties.length},1fr)`
      };
      let output = [];
      properties.map(entry => output.push( /*#__PURE__*/React.createElement(Options, {
        key: entry,
        item: options[entry]
      })));
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-overlay",
        ref: "overlay"
      }, /*#__PURE__*/React.createElement("div", {
        className: "overlay-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "overlay-header"
      }, /*#__PURE__*/React.createElement("span", {
        className: "title"
      }, title)), /*#__PURE__*/React.createElement("div", {
        className: "overlay-main",
        style: overlayStyle
      }, output)));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondOverlay = BeyondOverlay;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-overlay{position:absolute;top:0;left:0;bottom:0;right:0;display:block;width:100%;height:100%;background-color:rgba(0,0,0,.5);z-index:100}.beyond-overlay .overlay-content{position:absolute;bottom:0;left:0;right:0;height:227px;display:grid;grid-template-rows:50px 1fr;background:var(--beyond-background-color)}.beyond-overlay .overlay-content .overlay-header{padding:15px 15px 0;text-align:left}.beyond-overlay .overlay-content .overlay-header .title{font-size:16px;font-weight:500;letter-spacing:.15px;color:var(--beyond-text-color)}.beyond-overlay .overlay-content .overlay-actions-link,.beyond-overlay .overlay-content .overlay-main{text-align:center;display:grid;padding:30px 15px;grid-auto-flow:column}.beyond-overlay .overlay-content .overlay-actions-link .item,.beyond-overlay .overlay-content .overlay-main .item{display:grid;grid-template-rows:min-content min-content;grid-gap:10px;align-self:center}.beyond-overlay .overlay-content .overlay-actions-link .item h5,.beyond-overlay .overlay-content .overlay-main .item h5{margin:0}.beyond-overlay .overlay-content .overlay-actions-link .item button,.beyond-overlay .overlay-content .overlay-main .item button{background-color:var(--beyond-background-variant-color);border-radius:50%;margin:auto;fill:var(--beyond-text-color);padding:16px;height:60px;width:60px}.beyond-overlay .overlay-content .overlay-add-link{display:grid;padding:0 15px;grid-row-gap:15px}.beyond-overlay .overlay-content .overlay-add-link input{padding:7px 0}.beyond-overlay .overlay-content .overlay-add-link button{text-align:center;background-color:var(--beyond-background-variant-color);width:80%;margin:auto;letter-spacing:5px}';
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