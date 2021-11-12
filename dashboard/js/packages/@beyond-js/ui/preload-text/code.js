define(["exports", "react", "react-dom"], function (_exports, React, ReactDOM) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.BeyondPreloadText = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/preload-text/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /**********
  control.jsx
  **********/


  class BeyondPreloadText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {
        width,
        height,
        color
      } = this.props;
      return /*#__PURE__*/React.createElement("span", {
        className: "preload-text",
        style: {
          width: width || "100%",
          height: height || "14px",
          background: color || ""
        }
      }, /*#__PURE__*/React.createElement("span", null));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports.BeyondPreloadText = BeyondPreloadText;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.preload-text{display:inline-block;background:var(--beyond-preload-color,#e4e5dc);width:100%;height:14px;overflow:hidden;border-radius:3px}@keyframes movement{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.preload-text span{height:100%;display:block;animation-duration:2s;animation-iteration-count:infinite;animation-name:movement}.preload-text span:after{content:" ";width:50%;min-width:40px;height:100%;display:block;background:linear-gradient(90deg,rgba(255,255,255,0) 0,var(--spinner-background,gray) 50%,rgba(255,255,255,0) 100%);background-size:100%}';
  bundle.styles.appendToDOM();
});