define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondRipple = BeyondRipple;
  _exports2.hmr = _exports2.BeyondWaves = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/ripple/code', false, {}, dependencies);
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

  /**************
  FILE: ripple.js
  **************/

  function BeyondRipple(match) {
    'use strict';

    let waves;
    Object.defineProperty(this, 'ready', {
      'get': () => !!waves
    });

    const load = async () => {
      waves = await beyond.require('waves');
      return waves;
    };

    this.removeEvent = element => element && waves && waves.calm(element);

    this.add = element => {
      if (!waves) return;
      waves.attach(element);
      waves.init();
    };

    this.init = async match => {
      await load();
      this.add(match);
    };

    match && this.init(match);
    load().catch(exc => console.error(exc.stack));
  }
  /*********
  ripple.jsx
  *********/


  class BeyondWaves extends React.Component {
    constructor(props) {
      super(props);
      this._ripple = new BeyondRipple();
      this.ripple = new React.createRef();
    }

    componentDidMount() {
      this._ripple.init(this.ripple.current);
    }

    componentWillUnmount() {
      if (this.ripple.current) this._ripple.removeEvent(this.ripple.current);
    }

    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-ripple",
        ref: this.ripple
      });
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondWaves = BeyondWaves;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-ripple{position:absolute!important;left:0;top:0;right:0;left:0;height:100%;width:100%}.waves-effect{position:relative;cursor:pointer;display:inline-block;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.waves-effect .waves-ripple{position:absolute;border-radius:50%;width:100px;height:100px;margin-top:-50px;margin-left:-50px;opacity:0;background:rgba(0,0,0,.2);background:-webkit-radial-gradient(rgba(0,0,0,.2) 0,rgba(0,0,0,.3) 40%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.5) 60%,rgba(255,255,255,0) 70%);background:-o-radial-gradient(rgba(0,0,0,.2) 0,rgba(0,0,0,.3) 40%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.5) 60%,rgba(255,255,255,0) 70%);background:-moz-radial-gradient(rgba(0,0,0,.2) 0,rgba(0,0,0,.3) 40%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.5) 60%,rgba(255,255,255,0) 70%);background:radial-gradient(rgba(0,0,0,.2) 0,rgba(0,0,0,.3) 40%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.5) 60%,rgba(255,255,255,0) 70%);-webkit-transition:all .5s ease-out;-moz-transition:all .5s ease-out;-o-transition:all .5s ease-out;transition:all .5s ease-out;-webkit-transition-property:-webkit-transform,opacity;-moz-transition-property:-moz-transform,opacity;-o-transition-property:-o-transform,opacity;transition-property:transform,opacity;-webkit-transform:scale(0) translate(0,0);-moz-transform:scale(0) translate(0,0);-ms-transform:scale(0) translate(0,0);-o-transform:scale(0) translate(0,0);transform:scale(0) translate(0,0);pointer-events:none}.waves-effect.waves-light .waves-ripple{background:rgba(255,255,255,.4);background:-webkit-radial-gradient(rgba(255,255,255,.2) 0,rgba(255,255,255,.3) 40%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 70%);background:-o-radial-gradient(rgba(255,255,255,.2) 0,rgba(255,255,255,.3) 40%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 70%);background:-moz-radial-gradient(rgba(255,255,255,.2) 0,rgba(255,255,255,.3) 40%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 70%);background:radial-gradient(rgba(255,255,255,.2) 0,rgba(255,255,255,.3) 40%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 70%)}.waves-effect.waves-classic .waves-ripple{background:rgba(0,0,0,.2)}.waves-effect.waves-classic.waves-light .waves-ripple{background:rgba(255,255,255,.4)}.waves-notransition{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.waves-button,.waves-circle{-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0);-webkit-mask-image:-webkit-radial-gradient(circle,white 100%,black 100%)}.waves-button,.waves-button-input,.waves-button:hover,.waves-button:visited{white-space:nowrap;vertical-align:middle;cursor:pointer;border:none;outline:0;color:inherit;background-color:rgba(0,0,0,0);font-size:1em;line-height:1em;text-align:center;text-decoration:none;z-index:1}.waves-button{padding:.85em 1.1em;border-radius:.2em}.waves-button-input{margin:0;padding:.85em 1.1em}.waves-input-wrapper{border-radius:.2em;vertical-align:bottom}.waves-input-wrapper.waves-button{padding:0}.waves-input-wrapper .waves-button-input{position:relative;top:0;left:0;z-index:1}.waves-circle{text-align:center;width:2.5em;height:2.5em;line-height:2.5em;border-radius:50%}.waves-float{-webkit-mask-image:none;-webkit-box-shadow:0 1px 1.5px 1px rgba(0,0,0,.12);box-shadow:0 1px 1.5px 1px rgba(0,0,0,.12);-webkit-transition:all .3s;-moz-transition:all .3s;-o-transition:all .3s;transition:all .3s}.waves-float:active{-webkit-box-shadow:0 8px 20px 1px rgba(0,0,0,.3);box-shadow:0 8px 20px 1px rgba(0,0,0,.3)}.waves-block{display:block}';
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