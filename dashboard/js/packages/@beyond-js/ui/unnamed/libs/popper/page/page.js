define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/libs/popper/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*******
  view.jsx
  *******/

  function View({
    popper
  }) {
    const button = React.useRef(null);
    const tooltip = React.useRef(null);
    const [popperInstance, setPopperInstance] = React.useState();

    const show = () => {
      tooltip.current.setAttribute('data-show', '');
      popperInstance?.update();
    };

    const hide = () => tooltip.current.removeAttribute('data-show');

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];
    React.useEffect(() => {
      setPopperInstance(popper.createPopper(button.current, tooltip.current), {
        placement: 'top'
      });
      showEvents.forEach(event => button.current.addEventListener(event, show));
      hideEvents.forEach(event => button.current.addEventListener(event, hide));
    }, []);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "page-header"
    }, "Popper Library"), /*#__PURE__*/React.createElement("button", {
      ref: button,
      "aria-describedby": "tooltip"
    }, "My button"), /*#__PURE__*/React.createElement("div", {
      className: "tooltip",
      ref: tooltip,
      role: "tooltip"
    }, "My tooltip"));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-ui-page.popper__page .tooltip{background:#333;color:#fff;font-weight:700;padding:4px 8px;font-size:13px;border-radius:4px;display:none}.beyond-ui-page.popper__page .tooltip[data-show]{display:block}';
  bundle.styles.appendToDOM();
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/

  function Page() {
    this.container.classList.add('beyond-ui-page', 'popper__page');

    const load = async () => {
      // const url = `/libraries/beyond-ui/libs/popper/static/vendor/popper.min.js`;
      // const popper = await beyond.require(url);
      require(['@popperjs/core'], popper => {
        ReactDOM.render(React.createElement(View, {
          popper: popper
        }), this.container);
      });
    };

    load();
  }

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