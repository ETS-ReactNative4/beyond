define(["exports", "@beyond-js/ui/icon/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondConfirmModal = _exports2.BeyondAlertModal = void 0;
  _exports2.BeyondModal = BeyondModal;
  _exports2.useBeyondModalContext = _exports2.hmr = _exports2.BeyondModalContext = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/modal/code', false, {}, dependencies);
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
  /********
  alert.jsx
  ********/


  class BeyondAlertModal extends React.Component {
    constructor(props) {
      super(props);
      this._modal = React.createRef();
      this.state = {
        'fetching': false
      };
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
    }

    open() {
      this._modal.current.open();
    }

    close(event) {
      this.setState({
        'fetching': true
      });

      this._modal.current.close(event);

      if (this.props.onConfirm) this.props.onConfirm();
      this.setState({
        'fetching': false
      });
    }

    render() {
      const {
        text,
        title,
        btn,
        centered
      } = this.props;
      let btnLabel = typeof btn === 'string' ? btn : 'Confirmar';
      let cls = `beyond-alert-dialog${centered ? ' beyond-alert-dialog-centered' : ''}`;
      if (this.props.className) cls += ` ${this.props.className}`;
      const props = Object.assign({}, this.props);
      delete props.btn;
      delete props.text;
      delete props.title;
      delete props.centering;
      delete props.className;

      if (btn && typeof btn === 'object') {
        btnLabel = btn.label ? btn.label : btn;
      }

      const disabled = {};
      if (this.state.fetching) disabled.disabled = true;
      return /*#__PURE__*/React.createElement(BeyondModal, {
        className: cls,
        ref: this._modal
      }, /*#__PURE__*/React.createElement("div", {
        className: "alert-dialog-content"
      }, title && /*#__PURE__*/React.createElement("h3", {
        dangerouslySetInnerHTML: {
          __html: title
        }
      }), text && /*#__PURE__*/React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: text
        }
      }), this.props.children ? this.props.children : null), /*#__PURE__*/React.createElement("div", {
        className: "actions"
      }, /*#__PURE__*/React.createElement(_code2.BeyondButton, _extends({
        label: btnLabel,
        onClick: this.close
      }, disabled))));
    }

  }
  /***********
  children.jsx
  ***********/


  _exports2.BeyondAlertModal = BeyondAlertModal;
  const BeyondModalContext = React.createContext();
  _exports2.BeyondModalContext = BeyondModalContext;

  const useBeyondModalContext = () => React.useContext(BeyondModalContext);

  _exports2.useBeyondModalContext = useBeyondModalContext;

  const Children = ({
    children,
    close,
    dismiss
  }) => {
    const output = [];

    if (dismiss !== false) {
      output.push( /*#__PURE__*/React.createElement("button", {
        className: "close-icon",
        onClick: close,
        "data-dismiss": "modal",
        "aria-label": "Close",
        key: "dismiss-button"
      }, "x"));
    }

    const childrenWithProps = React.Children.map(children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
        const specs = {}; //TODO: check a official way to check the children type

        return React.cloneElement(child, specs);
      }

      return child;
    });
    output.push(childrenWithProps);
    return /*#__PURE__*/React.createElement(BeyondModalContext.Provider, {
      value: {
        close,
        dismiss
      }
    }, output);
  };
  /**********
  confirm.jsx
  **********/


  const BeyondConfirmModal = properties => {
    const [state, setState] = React.useState({
      fetching: false
    });

    const process = async event => {
      event.stopPropagation();
      setState({
        fetching: true
      });
      const {
        onConfirm,
        onClose
      } = properties;

      if (!onConfirm) {
        console.warn("there is no confirm funciton defined");
        return;
      }

      setState({
        fetching: false
      });
      await onConfirm();
    };

    const {
      text,
      title,
      btn,
      onCancel,
      centered,
      onConfirm,
      btnConfirm,
      btnCancel
    } = properties;
    let cls = `beyond-confirm-dialog${centered ? ' beyond-confirm-dialog-centered' : ''}`;
    if (properties.className) cls += ` ${properties.className}`;
    const props = Object.assign({}, properties);
    delete props.text;
    delete props.title;
    delete props.className;
    delete props.centering;
    delete props.btnCancel;
    delete props.btnConfirm;
    delete props.onCancel;
    let cancelLabel = 'Cancelar';
    let confirmLabel = 'Confirmar';
    let clsCancel = 'btn btn-default btn-cancel-button';
    let clsConfirm = 'btn btn-primary btn-confirm-button';

    if (btnConfirm && typeof btnConfirm === 'object') {
      confirmLabel = btnConfirm.label ? btnConfirm.label : btn;
      clsConfirm = btnConfirm.className ? btnConfirm.className : clsConfirm;
    }

    if (btnCancel && typeof btnCancel === 'object') {
      confirmLabel = btnCancel.label ? btnCancel.label : btn;
      clsCancel = btnCancel.className ? btnCancel.className : clsCancel;
    }

    const disabled = {};
    if (state.fetching) disabled.disabled = true;
    return /*#__PURE__*/React.createElement(BeyondModal, {
      show: true,
      className: cls,
      onClose: onCancel
    }, /*#__PURE__*/React.createElement("div", {
      className: "confirm-dialog-content"
    }, title && /*#__PURE__*/React.createElement("h3", null, title), text && /*#__PURE__*/React.createElement("div", null, text), properties.children), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, _extends({
      className: clsCancel,
      label: cancelLabel
    }, disabled, {
      onClick: onCancel
    })), /*#__PURE__*/React.createElement(_code2.BeyondButton, _extends({
      className: clsConfirm,
      label: confirmLabel
    }, disabled, {
      onClick: process
    }))));
  };
  /********
  modal.jsx
  ********/


  _exports2.BeyondConfirmModal = BeyondConfirmModal;

  function BeyondModal(props) {
    const [state, setState] = React.useState({
      show: props?.show
    });
    const modal = React.useRef();
    const body = document.getElementsByTagName('body')[0];

    const close = async event => {
      if (event) event.stopPropagation();
      const {
        onClose
      } = props;
      const body = document.querySelector('body');
      modal.current.classList.add('modal-hidden');
      window.setTimeout(async () => {
        if (typeof onClose === 'function' && !(await onClose())) return;
        setState({
          show: false,
          closeClicked: true
        });
        body.setAttribute('style', '');
        body.classList.remove('body-custom-modal-opened');
      }, 300);
    };

    const onClickBackdrop = event => {
      event.stopPropagation();
      if (event.target !== modal.current) return;
      close(event);
    };

    React.useEffect(() => {
      const container = document.createElement('div');
      setState(state => ({ ...state,
        container
      }));
      body.appendChild(container);
      return () => body.removeChild(container);
    }, []);
    const {
      container
    } = state;
    if (!container) return null;
    const show = state.show && !state.hideClicked;
    let cls = 'beyond-element-modal ';
    cls += props.className ? props.className : '';
    if (show) cls += ' show-modal';
    const output = [];

    if (show) {
      output.push( /*#__PURE__*/React.createElement("div", {
        key: "modal-content-wrapper",
        className: "modal-wrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-content",
        onClick: event => {
          event.stopPropagation();
        }
      }, /*#__PURE__*/React.createElement(Children, _extends({}, props, {
        close: close,
        key: "children-content"
      })))));
    }

    return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      ref: modal,
      onClick: onClickBackdrop,
      className: cls
    }, output), container);
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-moz-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-o-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@-moz-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@-ms-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@-o-keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}50%{opacity:1}}@-webkit-keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}100%{opacity:0}}@-moz-keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}100%{opacity:0}}@-ms-keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}100%{opacity:0}}@-o-keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}100%{opacity:0}}@keyframes zoomOut{0%{opacity:1}50%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);-moz-transform:scale3d(.3,.3,.3);-ms-transform:scale3d(.3,.3,.3);-o-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}100%{opacity:0}}.beyond-alert-dialog.beyond-alert-dialog-centered .actions,.beyond-alert-dialog.beyond-alert-dialog-centered .alert-dialog-content{display:grid;justify-content:center}.beyond-alert-dialog .alert-dialog-content{padding-top:20px}.beyond-alert-dialog .actions{border-top:1px solid #f0f0f0;margin-top:15px;display:grid;justify-content:end;padding:15px 0 0}.beyond-alert-dialog .actions .beyond-button{margin:0}.beyond-element-modal .close-icon{position:absolute;top:20px;right:20px;border:none;background:0 0;display:inline-block;fill:#82837F;color:#82837f;transition:all .1s ease-in;outline:0;cursor:pointer}.beyond-element-modal .close-icon:focus,.beyond-element-modal .close-icon:hover{fill:#333333;color:#82837f;transition:all .1s ease-in}.beyond-element-modal .close-icon svg{height:10px;width:10px}.beyond-confirm-dialog.beyond-confirm-dialog-centered{justify-content:center;text-align:center}.beyond-confirm-dialog.beyond-confirm-dialog-centered .actions,.beyond-confirm-dialog.beyond-confirm-dialog-centered .confirm-dialog-content{display:grid;justify-content:center}.beyond-confirm-dialog .confirm-dialog-content{padding-top:20px}.beyond-confirm-dialog .actions{border-top:1px solid #f0f0f0;padding:15px 0 0;margin-top:15px;display:grid;grid-auto-flow:column;grid-gap:8px;justify-content:end}.beyond-confirm-dialog .actions .beyond-button{margin:0}.beyond-element-modal.md .modal-content{width:70%}.beyond-element-modal.lg .modal-content{width:90%}@media (max-width:600px){.beyond-element-modal .modal-content,.beyond-element-modal.lg .modal-content,.beyond-element-modal.md .modal-content{width:90%}}@media (max-width:900px){.beyond-element-modal.md{min-width:80%}.beyond-element-modal.lg{width:90%}}body.body-beyond-modal-opened{height:100vh;overflow-y:hidden;padding-right:15px}.beyond-element-modal{display:none;position:absolute;top:0;left:0;bottom:0;right:0;z-index:1;overflow:auto;background-color:rgba(0,0,0,.4)}.beyond-element-modal.show-modal{display:block;z-index:99999;height:100vh;width:100vw;padding:20px}.beyond-element-modal .modal-wrapper{width:100%;margin:auto;display:flex;align-items:center;justify-content:center;min-height:80vh;-webkit-animation-name:zoomIn;-moz-animation-name:zoomIn;-ms-animation-name:zoomIn;-o-animation-name:zoomIn;animation-name:zoomIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.3s;-moz-animation-duration:.3s;-ms-animation-duration:300ms;-o-animation-duration:.3s;animation-duration:.3s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}.beyond-element-modal.modal-hidden .modal-wrapper{-webkit-animation-name:zoomOut;-moz-animation-name:zoomOut;-ms-animation-name:zoomOut;-o-animation-name:zoomOut;animation-name:zoomOut;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.2s;-moz-animation-duration:.2s;-ms-animation-duration:200ms;-o-animation-duration:.2s;animation-duration:.2s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}.beyond-element-modal .modal-content{position:relative;color:#000;background:#fff}';
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