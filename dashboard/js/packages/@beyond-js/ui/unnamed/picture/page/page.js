define(["exports", "@beyond-js/ui/toolbar/code", "@beyond-js/ui/picture/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/picture/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**************
  jsx\control.jsx
  **************/

  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.setImage = this.setImage.bind(this);
    }

    setImage(event) {
      this.props.picture.capture('gallery');
    }

    render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: event => this.setImage(event)
      }, "set image");
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/


  function Page() {
    this.render = function () {
      let picture = new _code2.BeyondPictureModel();
      const wrapper = document.createElement('span');
      const specs = {
        'picture': picture
      };
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'beyond-elements-overlay-page';
      this.container.appendChild(wrapper);
    };
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