define(["exports", "@beyond-js/ui/icon/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Iframe = Iframe;
  _exports2.NavigatorBoard = NavigatorBoard;
  _exports2.NavigatorContext = void 0;
  _exports2.OLDNavigatorBoard = OLDNavigatorBoard;
  _exports2.useNavigatorContext = _exports2.hmr = void 0;
  //Beyond  UI
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/navigator/code', false, {}, dependencies);
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

  /*****************
  FILE: navigator.js
  *****************/

  class Navigator extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({
        mode: 'closed'
      });
      this.shadow = shadow;
      shadow.innerHTML = `<iframe height="500" width="500" src="http://localhost:8080"/>`;
    }

  }

  window.customElements.define('dashboard-navigator', Navigator);
  /***********
  __iframe.jsx
  ***********/

  function OLDNavigatorBoard() {
    const {
      application,
      toggleNavigator,
      urlNavigator
    } = (0, _code3.useDSWorkspaceContext)();
    const refIframe = React.useRef();
    const refResizer = React.useRef();
    const refContainer = React.useRef();
    const [resizing, setResizing] = React.useState();
    const input = React.useRef(null);
    const [url, setURL] = React.useState(urlNavigator ? urlNavigator.url : application.application.url);
    const [value, setValue] = React.useState(![undefined, ''].includes(urlNavigator?.route) ? urlNavigator?.route : '/');
    const [responsive, setResponsive] = React.useState();
    let placeholder = application.application.url;
    React.useEffect(() => {
      const resizer = refResizer.current;
      const container = refContainer.current;
      let w, x, h, panelWidth;
      const panels = document.querySelector('.panels__container');

      const calculateMove = event => {
        const moveW = event.clientX - x;
        container.style.width = `${w - moveW}px`;
        refIframe.current.style.width = `${w - moveW - 245}px`;
        panels.style.width = `${panelWidth + moveW}px`;
      };

      const stopResize = event => {
        setResizing(false);
        document.removeEventListener('mousemove', calculateMove);
        document.removeEventListener('mouseup', stopResize);
      };

      const resize = event => {
        event.preventDefault();
        const styles = window.getComputedStyle(container);
        const stylesPanel = window.getComputedStyle(panels);
        w = parseInt(styles.width, 10);
        h = parseInt(styles.height, 10);
        panelWidth = parseInt(stylesPanel.width, 10);
        setResizing(true);
        x = event.clientX;
        document.addEventListener('mousemove', calculateMove);
        document.addEventListener('mouseup', stopResize);
      };

      const clean = () => {
        panels.removeAttribute('style');
      };

      resizer.addEventListener('mousedown', resize);
      return clean;
    }, []);

    const close = () => toggleNavigator(false);

    const onChange = event => setValue(event.currentTarget.value !== '' ? event.currentTarget.value : '/');

    const toggleResponsive = () => setResponsive(!responsive);

    const onSearch = event => {
      event.preventDefault();
      const route = [undefined, ''].includes(input.current.value) ? event.currentTarget.value : '/';
      setValue(route);
      let url = `${application.application.url}${route}`;
      setURL(url);
    };

    const cls = `ds-navigator__container ${resizing ? ' is-resizing' : ''}`;
    const clsIframe = `ds-navigator__iframe ${responsive ? 'iframe--responsive' : ''}`;
    return /*#__PURE__*/React.createElement("div", {
      ref: refContainer,
      className: cls
    }, /*#__PURE__*/React.createElement("div", {
      ref: refResizer,
      className: "ds-navigator__resizer"
    }), /*#__PURE__*/React.createElement("section", {
      className: "ds-navigator__bar"
    }, /*#__PURE__*/React.createElement("form", {
      className: "ds-navigator__form",
      onSubmit: onSearch
    }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "refresh",
      onClick: onSearch
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: placeholder,
      onChange: onChange,
      value: value,
      type: "text",
      ref: input
    }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "responsive",
      onClick: toggleResponsive
    }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "close",
      onClick: close
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ds-navigator__iframe__container"
    }, /*#__PURE__*/React.createElement("iframe", {
      src: url,
      ref: refIframe,
      frameBorder: "0",
      className: clsIframe
    }), /*#__PURE__*/React.createElement("div", {
      className: "ds-navigator__resizer__shadow"
    })));
  }
  /******
  bar.jsx
  ******/


  function NavigatorBar() {
    const {
      setURL,
      url,
      application,
      toggleResponsive
    } = useNavigatorContext();
    const input = React.useRef(null);
    const [value, setValue] = React.useState(url ? url.replace(application.application.url, '') : '/');
    let placeholder = application.application.url;

    const onSearch = event => {
      event.preventDefault();
      let url = `${application.application.url}${value}`;
      setURL(url);
    };

    const onChange = event => setValue(event.currentTarget.value !== '' ? event.currentTarget.value : '/');

    return /*#__PURE__*/React.createElement("section", {
      className: "ds-navigator__bar"
    }, /*#__PURE__*/React.createElement("form", {
      className: "ds-navigator__form",
      onSubmit: onSearch
    }, /*#__PURE__*/React.createElement("nav", {
      className: "left-actions"
    }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "refresh",
      onClick: onSearch
    })), /*#__PURE__*/React.createElement("input", {
      placeholder: placeholder,
      onChange: onChange,
      value: value,
      type: "text",
      ref: input
    }), /*#__PURE__*/React.createElement("nav", {
      className: "right-actions"
    }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "responsive",
      onClick: toggleResponsive
    }))));
  }
  /********
  board.jsx
  ********/


  const NavigatorContext = React.createContext();
  _exports2.NavigatorContext = NavigatorContext;

  const useNavigatorContext = () => React.useContext(NavigatorContext);

  _exports2.useNavigatorContext = useNavigatorContext;

  function NavigatorBoard({
    specs
  }) {
    const {
      workspace
    } = (0, _code3.useDSWorkspaceContext)();
    const [state, setState] = React.useState({});
    const refContainer = React.useRef();
    const resizing = false;
    const cls = `ds-navigator__container ${resizing ? ' is-resizing' : ''}`;
    React.useEffect(() => {
      const application = workspace.getApplication(specs.applicationId);
      const url = specs?.url ? specs.url : application.application.url;

      const onChange = () => {
        setState({ ...state,
          url,
          application,
          ready: application.ready
        });
      };

      application.bind('change', onChange);
      if (application.ready) onChange();
      return () => application.unbind('change', onChange);
    }, []);
    if (!state.ready) return /*#__PURE__*/React.createElement(Preload, null);
    return /*#__PURE__*/React.createElement(NavigatorContext.Provider, {
      value: {
        toggleResponsive: () => setState({ ...state,
          responsive: !state.responsive
        }),
        setURL: newUrl => setState({ ...state,
          url: newUrl
        }),
        responsive: state.responsive,
        url: state.url,
        application: state.application
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: refContainer,
      className: cls
    }, /*#__PURE__*/React.createElement(NavigatorBar, null), /*#__PURE__*/React.createElement(Iframe, null)));
  }
  /***********
  fetching.jsx
  ***********/


  function IframeFetching() {
    return /*#__PURE__*/React.createElement("div", {
      className: "navigator__fetching-container"
    }, /*#__PURE__*/React.createElement(_code2.DSSpinner, null));
  }
  /*********
  iframe.jsx
  *********/


  function Iframe({
    specs
  }) {
    const {
      responsive,
      url
    } = useNavigatorContext();
    const refIframe = React.useRef();
    const [fetching, setFetching] = React.useState(true);
    React.useEffect(() => {
      refIframe.current.addEventListener('load', () => {
        try {
          setFetching(false);
        } catch (e) {
          console.error("iframe error");
        }
      });
    }, [url]);
    const clsIframe = `ds-navigator__iframe ${responsive ? 'iframe--responsive' : ''}`;
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-navigator__iframe__container"
    }, fetching && /*#__PURE__*/React.createElement(IframeFetching, null), /*#__PURE__*/React.createElement("iframe", {
      src: url,
      ref: refIframe,
      frameBorder: "0",
      className: clsIframe
    }), /*#__PURE__*/React.createElement("div", {
      className: "ds-navigator__resizer__shadow"
    }));
  }
  /**********
  preload.jsx
  **********/


  function Preload() {
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-navigator__container is-fetching"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ds-navigator__bar"
    }, /*#__PURE__*/React.createElement("form", {
      className: "ds-navigator__form"
    }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "refresh",
      readOnly: true
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: "localhost:port",
      readOnly: true
    }), /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
      icon: "responsive",
      readOnly: true
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ds-navigator__iframe__container"
    }, /*#__PURE__*/React.createElement(IframeFetching, null)));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-navigator__container.is-fetching .ds-navigator__bar .ds-navigator__form input{background:rgba(255,255,255,.1)}.ds-navigator__container .ds-navigator__bar{display:flex;align-items:center;width:100%;z-index:1000}.ds-navigator__container .ds-navigator__bar .ds-navigator__form{width:100%;display:grid;padding:5px 0;grid-gap:5px;grid-template-columns:auto 1fr auto}.ds-navigator__container .ds-navigator__bar .ds-navigator__form input{width:100%;padding:8px;color:#fff;outline:0;border:none;background:#000;box-shadow:none}.ds-navigator__container .ds-navigator__bar .ds-navigator__form .beyond-icon-button{background:#333}.ds-navigator__container .ds-navigator__bar .ds-navigator__form .beyond-icon-button svg{fill:#fff}.ds-navigator__container .navigator__fetching-container{position:absolute;top:0;left:0;bottom:0;right:0;display:flex;align-self:center;justify-content:center;justify-items:center}.ds-navigator__container .navigator__fetching-container .ds-spinner__container{display:flex;align-self:center;justify-content:center;justify-items:center}.ds-navigator__container{display:grid;height:100%;width:100%;grid-template-rows:auto 1fr;position:relative;overflow-x:auto;grid-gap:0}.ds-navigator__container .ds-navigator__iframe__container{display:flex;align-items:center;justify-content:center;flex-basis:max-content;align-items:center}.ds-navigator__container .ds-navigator__iframe__container iframe{height:100%;width:100%}.ds-navigator__container .ds-navigator__iframe__container iframe.iframe--responsive{height:142mm;width:72.5mm}.ds-navigator__container .ds-navigator__iframe__container{align-items:center}.ds-navigator__container .ds-navigator__resizer{position:absolute;top:0;bottom:0;left:0;z-index:2;height:100%;width:15px;cursor:col-resize;background:#333}.ds-navigator__container .ds-navigator__resizer:hover{background:#343434}.ds-navigator__container.is-resizing .ds-navigator__resizer__shadow{display:block}.ds-navigator__container .ds-navigator__resizer__shadow{position:absolute;top:0;left:0;bottom:15px;right:0;display:none}';
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