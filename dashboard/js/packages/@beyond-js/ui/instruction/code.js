define(["exports", "/libraries/beyond-ui/form/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondInstruction = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/instruction/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**************
  instruction.jsx
  **************/

  class BeyondInstruction extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'show': true
      };
      this.hideInstructions = this.hideInstructions.bind(this);
    }

    hideInstructions() {
      if (this.props.hideAction) this.props.hideAction();
      this.setState({
        'show': false
      });
    }

    render() {
      const {
        texts
      } = this.props;
      const cls = `beyond-element-instruction ${this.state.show ? 'show' : 'hide'}`;
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("span", {
        className: "main-text"
      }, texts.title), /*#__PURE__*/React.createElement("span", {
        className: "detail"
      }, texts.detail), /*#__PURE__*/React.createElement(_code.BeyondButton, {
        className: "instruction-button",
        onClick: this.hideInstructions
      }, texts.buttonText)));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondInstruction = BeyondInstruction;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-instruction{width:100%;padding:30px;background:var(--beyond-background-color);font-size:1.1em;opacity:0;transition:all .4s ease;z-index:1;text-align:right;-webkit-box-shadow:0 2px 6px -1px rgba(0,0,0,.4);box-shadow:0 2px 6px -1px rgba(0,0,0,.4);margin-bottom:1px}.beyond-element-instruction.show{opacity:1;transform:none}.beyond-element-instruction.hide{display:none}.beyond-element-instruction .content{text-align:left;max-width:600px;margin:auto;width:100%}.beyond-element-instruction .content .main-text{font-size:20px;font-weight:700;color:var(--beyond-text-color);text-transform:uppercase;text-align:left;letter-spacing:.15px}.beyond-element-instruction .content .detail{color:var(--beyond-text-color);font-weight:400;display:block;font-size:16px;text-align:left;letter-spacing:.5px}.beyond-element-instruction .content .instruction-button{color:var(--beyond-text-color);font-size:10px;box-shadow:none;border-radius:0;border:none;border-bottom:var(--beyond-text-color) 2px solid;padding-left:2px;padding-right:0;background:0 0;font-weight:700;letter-spacing:5px;margin-left:auto;margin-top:15px;text-align:right;width:auto;display:block;min-width:fit-content}';
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