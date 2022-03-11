define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ToastContext = void 0;
  _exports2.ToastContextProvider = ToastContextProvider;
  _exports2.useToastContext = _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/toast/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /************
  container.jsx
  ************/

  class Container extends React.Component {
    constructor(props) {
      super(props);
      this._body = document.querySelector('body');
      this._container = document.createElement('div');
    }

    componentDidMount() {
      this._body.appendChild(this._container);
    }

    componentWillUnmount() {
      this._body.removeChild(this._container);
    }

    render() {
      return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
        className: "beyond-element-toast-container"
      }, this.props.children), this._container);
    }

  }
  /**********
  context.jsx
  **********/


  const ToastContext = React.createContext();
  _exports2.ToastContext = ToastContext;

  function ToastContextProvider({
    children
  }) {
    const TOAST_DURATION = 3000;
    const [toasts, setToasts] = React.useState([]);
    React.useEffect(() => {
      if (toasts.length) {
        const timer = setTimeout(() => setToasts(toasts => toasts.slice(1)), TOAST_DURATION);
        return () => clearTimeout(timer);
      }
    }, [toasts]);
    const add = React.useCallback(toast => {
      setToasts(toasts => [...toasts, toast]);
    }, [setToasts]);
    const toastsOutput = [];
    toasts.map((toast, id) => toastsOutput.push( /*#__PURE__*/React.createElement(Toast, {
      key: id
    }, toast)));
    return /*#__PURE__*/React.createElement(ToastContext.Provider, {
      value: {
        add: add
      }
    }, children, /*#__PURE__*/React.createElement(Container, null, toastsOutput));
  }

  const useToastContext = () => React.useContext(ToastContext);
  /********
  toast.jsx
  ********/


  _exports2.useToastContext = useToastContext;

  const Toast = ({
    children
  }) => {
    return /*#__PURE__*/React.createElement("div", {
      className: `beyond-element-toast ${children.type ? children.type : 'info'}`
    }, children.message);
  };
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-toast{position:relative;-webkit-box-shadow:0 1px 4px rgba(0,0,0,.3),0 0 40px rgba(0,0,0,.1) inset;-moz-box-shadow:0 1px 4px rgba(0,0,0,.3),0 0 40px rgba(0,0,0,.1) inset;box-shadow:0 1px 4px rgba(0,0,0,.3),0 0 40px rgba(0,0,0,.1) inset}.beyond-element-toast:after,.beyond-element-toast:before{content:"";position:absolute;z-index:-1;-webkit-box-shadow:0 0 20px rgba(0,0,0,.8);-moz-box-shadow:0 0 20px rgba(0,0,0,.8);box-shadow:0 0 20px rgba(0,0,0,.8);top:50%;bottom:0;left:10px;right:10px;-moz-border-radius:100px/10px;border-radius:100px/10px}.beyond-element-toast:after{right:10px;left:auto;-webkit-transform:skew(8deg) rotate(3deg);-moz-transform:skew(8deg) rotate(3deg);-ms-transform:skew(8deg) rotate(3deg);-o-transform:skew(8deg) rotate(3deg);transform:skew(8deg) rotate(3deg)}.beyond-element-toast-container{position:fixed;bottom:30px;left:30px}.beyond-element-toast-container .beyond-element-toast{padding:15px;width:200px;color:#fff;background:#e36152;margin-top:8px}.beyond-element-toast-container .beyond-element-toast.accent{background:#a2000a;color:#fff}.beyond-element-toast-container .beyond-element-toast.primary{background:#ff8056;color:#fff}.beyond-element-toast-container .beyond-element-toast.secondary{background:#121f36;color:#fff}.beyond-element-toast-container .beyond-element-toast.success{background:var(--beyond-success-color);color:#fff}.beyond-element-toast-container .beyond-element-toast.warning{background:#f7d994;color:#fff}.beyond-element-toast-container .beyond-element-toast.info{background:var(--beyond-info-color);color:#fff}.beyond-element-toast-container .beyond-element-toast.error{background:#d2281e;color:#fff}';
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