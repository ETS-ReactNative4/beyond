define(["exports", "@beyond-js/ui/spinner/code", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondToolbar = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/toolbar/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /***********
  children.jsx
  ***********/

  function Childs({
    children,
    spinner,
    actions,
    refresh,
    fetching
  }) {
    //0 or 1 child
    if (!children || children && !children.length) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, children, " ", /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
        fetching: fetching
      }));
    }

    let output = [];

    if (typeof children === 'object' && children.length) {
      children.map((item, index) => {
        if (spinner && parseInt(spinner) === index) {
          output.push( /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
            key: "spinner",
            fetching: fetching
          }));
        }

        if (refresh && parseInt(spinner) === index) {
          if (!actions) console.warn('the action object must be passed to implement refresh button');
          output.push( /*#__PURE__*/React.createElement(_code2.BeyondIconButton, {
            key: "refresh",
            icon: "refresh",
            onClick: actions.refresh
          }));
        }

        output.push(item);
      });
    }

    return output;
  }
  /**********
  toolbar.jsx
  **********/


  class BeyondToolbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'back': true
      };
      this.onBack = this.onBack.bind(this);
    }

    onBack() {
      if (!!this.props.backAction) this.props.backAction();else beyond.back();
    }

    render() {
      const {
        props
      } = this;
      const {
        fetching,
        children,
        actions,
        refresh
      } = props;
      const disabled = {};
      if (fetching) disabled.disabled = true;
      const back = props.back === false ? props.back : this.state.back;
      let className = 'beyond-element-toolbar';
      className += !!props.className ? ` ${props.className}` : '';
      className += back ? '' : ' no-back';
      const spinner = props.spinner ? props.spinner : 0;
      return /*#__PURE__*/React.createElement("nav", {
        className: `${className}`
      }, back && /*#__PURE__*/React.createElement(_code2.BeyondIconButton, {
        className: "beyond-back-button circle",
        onClick: this.onBack,
        icon: "backArrow"
      }), /*#__PURE__*/React.createElement(Childs, {
        children: children,
        spinner: spinner,
        actions: actions,
        refresh: refresh,
        fetching: fetching
      }));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondToolbar = BeyondToolbar;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-toolbar{height:50px;padding:0 15px;background:#ff8056;display:grid;align-items:center;justify-content:left;grid-template-columns:45px 1fr 40px auto;grid-gap:1px;color:#fff;font-weight:500;letter-spacing:.24px;z-index:1}.beyond-element-toolbar.no-back{grid-template-columns:1fr 40px auto}.beyond-element-toolbar .beyond-icon-button{display:grid;justify-content:center;align-items:center}.beyond-element-toolbar button svg,.beyond-element-toolbar svg{display:inline-grid;justify-self:center;fill:#fff}.beyond-element-toolbar span{display:block;justify-self:left;white-space:nowrap;text-overflow:ellipsis;line-height:1;flex:1}';
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