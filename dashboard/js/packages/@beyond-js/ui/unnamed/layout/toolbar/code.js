define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/form/code", "@beyond-js/ui/icon/code", "/components/core/code", "/libraries/beyond-dashboard/ui/layout/search/code", "@beyond-js/ui/modal/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, _code5, _code6, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Page = Page;
  _exports2.svgs = _exports2.hmr = _exports2.Toolbar = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/layout/toolbar/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**********
  toolbar.jsx
  **********/

  class Toolbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.modal = React.createRef();
      this.show = this.show.bind(this);
      this.setSidebar = this.setSidebar.bind(this);

      this.updateState = state => this.setState(state);
    }

    show() {
      this.modal.current.open();
    }

    setSidebar() {
      this.setState({
        openSidebar: !this.state.openSidebar
      });
    }

    navigate(event) {
      const target = event.currentTarget;
      if (!target.dataset.link) return;
      beyond.navigate(target.dataset.link);
    }

    render() {
      return /*#__PURE__*/React.createElement("section", {
        className: "ds-toolbar"
      }, /*#__PURE__*/React.createElement(_code.BeyondImage, {
        className: "app-logo",
        src: "/images/logo.png",
        onClick: () => beyond.navigate('/')
      }));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /*************
  FILE: icons.js
  *************/


  _exports2.Toolbar = Toolbar;
  const bell = `<path class="a"
          d="M12.514,28.6a3.575,3.575,0,0,0,3.574-3.576H8.94A3.575,3.575,0,0,0,12.514,28.6Zm12.034-8.364c-1.079-1.16-3.1-2.9-3.1-8.62A8.823,8.823,0,0,0,14.3,2.952V1.788a1.787,1.787,0,1,0-3.573,0V2.952a8.823,8.823,0,0,0-7.148,8.669c0,5.715-2.02,7.46-3.1,8.62A1.746,1.746,0,0,0,0,21.454a1.789,1.789,0,0,0,1.793,1.788H23.235a1.789,1.789,0,0,0,1.793-1.788A1.745,1.745,0,0,0,24.547,20.241Z"
          transform="translate(0.001)"/>`;
  const cloud = `<path class="a"
          d="M31.148,43.275a5.569,5.569,0,0,0-5.191-7.567,5.534,5.534,0,0,0-3.088.939A9.271,9.271,0,0,0,5.562,41.27c0,.156.006.313.012.469A8.345,8.345,0,0,0,8.343,57.957H29.665a7.416,7.416,0,0,0,1.483-14.682Z"
          transform="translate(0 -32)"/>`;
  const users = `<path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>`;
  const login = `<path class="a"
          d="M31.281,92.875H24.965a.905.905,0,0,1-.9-.9V88.965a.905.905,0,0,1,.9-.9h6.316a2.4,2.4,0,0,0,2.406-2.406V71.219a2.4,2.4,0,0,0-2.406-2.406H24.965a.9.9,0,0,1-.9-.9V64.9a.9.9,0,0,1,.9-.9h6.316A7.221,7.221,0,0,1,38.5,71.219V85.656A7.221,7.221,0,0,1,31.281,92.875ZM27.747,77.761,15.114,65.128a1.808,1.808,0,0,0-3.083,1.278v7.219H1.8A1.8,1.8,0,0,0,0,75.43v7.219a1.8,1.8,0,0,0,1.8,1.8H12.031v7.219a1.808,1.808,0,0,0,3.083,1.278L27.747,80.317A1.82,1.82,0,0,0,27.747,77.761Z"
          transform="translate(0 -64)"/>`;
  const community = `<path d="M22.346.013A6.179,6.179,0,0,0,19.88.649a9.279,9.279,0,0,0-2.79,2.07,24.057,24.057,0,0,0-3.372,4.573,14.789,14.789,0,0,1,4.226-.364,16.987,16.987,0,0,1,1.749-2.213c1.912-1.941,3.474-2.1,4.267,1.152A17.414,17.414,0,0,1,24.4,8.851a14.966,14.966,0,0,1,3.463,2.7,24.966,24.966,0,0,0-.653-6.1,9.4,9.4,0,0,0-1.392-3.2A5.131,5.131,0,0,0,23.2.122a3.239,3.239,0,0,0-.855-.109ZM17.51,8.707c-.329-.011-.656-.01-.981,0a13.224,13.224,0,0,0-6.5,2.035,11.749,11.749,0,0,0-2.1,1.76C5,15.59,1.494,22.181,5.9,29.344A8.585,8.585,0,0,0,7.012,30.8a13.207,13.207,0,0,0,22.854-5.262A13.4,13.4,0,0,0,20.487,9.159a13.154,13.154,0,0,0-2.977-.45ZM4.69,30.684a28.424,28.424,0,0,0-1.15,8.2c.15,1.835.883,2.033,1.923.52a22.894,22.894,0,0,0,2.372-5.343A15.139,15.139,0,0,1,4.69,30.684Zm18.8,5.079a14.973,14.973,0,0,1-4.4,1.333,22.976,22.976,0,0,0-.6,5.825c.15,1.834.883,2.032,1.923.519a28.32,28.32,0,0,0,3.07-7.676Zm-12.207.3A63.931,63.931,0,0,0,9.22,47.668c-.1,2.761.637,2.958,1.923.518A63.839,63.839,0,0,0,15.112,37.1a14.962,14.962,0,0,1-1.953-.373,14.924,14.924,0,0,1-1.877-.661Z" 
        transform="translate(-3.513 -0.013)"/>`;
  const usercircle = `<path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>`;
  const svgs = {
    'bell': bell,
    'cloud': cloud,
    'login': login,
    'users': users,
    'community': community,
    'usercircle': usercircle
  };
  /************
  FILE: page.js
  ************/

  _exports2.svgs = svgs;

  function Page() {
    ReactDOM.render(React.createElement(AppHome, {
      'texts': module.texts
    }), this.container);
    this.container.id = 'app-toolbar-page';
    this.container.classList.add('page');
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-toolbar{display:flex;position:sticky;align-items:center;justify-content:center;height:60px;top:0;transition:all .3s ease-in;background:#0c1423;z-index:2;box-shadow:0 5px 5px -5px #333}.ds-toolbar .beyond-element-image.app-logo{height:70%;padding:0;margin:0}.ds-toolbar .beyond-element-image.app-logo img{height:100%}';
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