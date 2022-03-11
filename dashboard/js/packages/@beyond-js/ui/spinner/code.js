define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondSpinner = BeyondSpinner;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/spinner/code', false, {}, dependencies);
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
  /**********
  spinner.jsx
  **********/


  function BeyondSpinner({
    className,
    fetching,
    active,
    size,
    color,
    type
  }) {
    let cls = fetching || active ? 'beyond-element-spinner show' : 'beyond-element-spinner';
    if (className) cls += ` ${className}`;
    if (type) cls += ` ${type}`;
    const attrs = {
      className: cls,
      viewBox: "0 0 66 66",
      style: {}
    };

    if (size) {
      if (color) attrs.style.stroke = color;

      if (size) {
        attrs.style.height = size;
        attrs.style.width = size;
      }
    }

    const output = [];

    if (color) {
      const keyframeName = `color-custom`;
      output.push( /*#__PURE__*/React.createElement("style", {
        key: "custom-keyframe"
      }, `
                @keyframes ${keyframeName} {
                  0% {
                    stroke: ${color};
                  }
                }`));
      attrs.className = `${attrs.className} custom-color ${type ? `${type}` : ''}`;
      attrs.style = {
        stroke: color
      };
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", _extends({
      className: cls
    }, attrs, {
      xmlns: "http://www.w3.org/2000/svg"
    }), /*#__PURE__*/React.createElement("circle", {
      className: "path",
      fill: "none",
      strokeWidth: "6",
      strokeLinecap: "round",
      cx: "33",
      cy: "33",
      r: "30"
    })));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes rotator{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}}@keyframes introfade{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes pathgrow{0%{stroke-width:1}50%{stroke-width:6}100%{stroke-width:1}}@keyframes dash{0%{stroke-dashoffset:227}50%{stroke-dashoffset:46.75;-webkit-transform:rotate(135deg);transform:rotate(135deg)}100%{stroke-dashoffset:227;-webkit-transform:rotate(450deg);transform:rotate(450deg)}}.beyond-element-spinner{top:40px;vertical-align:top;height:15px;width:15px;-webkit-animation:rotator 2.4s linear infinite;animation:rotator 2.4s linear infinite}@keyframes primary-colors{0%{stroke:#FF8056}25%{stroke:#ff612d}50%{stroke:#ffa689}75%{stroke:#ff612d}100%{stroke:#FF8056}}@keyframes colors{0%{stroke:#FF8056}25%{stroke:#ff612d}50%{stroke:#ffa689}75%{stroke:#ff612d}100%{stroke:#FF8056}}@keyframes secondary-colors{0%{stroke:#121F36}25%{stroke:#080d17}50%{stroke:#1f355c}75%{stroke:#080d17}100%{stroke:#121F36}}@keyframes accent-colors{0%{stroke:#A2000A}25%{stroke:#790007}50%{stroke:#d5000d}75%{stroke:#790007}100%{stroke:#A2000A}}@keyframes on-primary{0%{stroke:#fff}25%{stroke:#ebebeb}50%{stroke:white}75%{stroke:#ebebeb}100%{stroke:#fff}}.beyond-element-spinner .path{stroke-dasharray:227;opacity:0;stroke-dashoffset:0;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-animation-delay:1s;animation-delay:1s;animation:dash 2.4s ease-in-out infinite,colors 5.6s ease-in-out infinite,pathgrow 2.4s ease-in-out infinite,introfade 2.4s linear infinite}.beyond-element-spinner.custom-color .path{animation:dash 2.4s ease-in-out infinite,pathgrow 2.4s ease-in-out infinite,introfade 2.4s linear infinite}.beyond-element-spinner.primary .path{animation:dash 2.4s ease-in-out infinite,primary-colors 5.6s ease-in-out infinite,pathgrow 2.4s ease-in-out infinite,introfade 2.4s linear infinite}.beyond-element-spinner.on-primary .path{animation:dash 2.4s ease-in-out infinite,on-primary 5.6s ease-in-out infinite,pathgrow 2.4s ease-in-out infinite,introfade 2.4s linear infinite}.beyond-element-spinner.secondary .path{animation:dash 2.4s ease-in-out infinite,secondary-colors 5.6s ease-in-out infinite,pathgrow 2.4s ease-in-out infinite,introfade 2.4s linear infinite}.beyond-element-spinner.accent .path{animation:dash 2.4s ease-in-out infinite,accent-colors 5.6s ease-in-out infinite,pathgrow 2.4s ease-in-out infinite,introfade 2.4s linear infinite}';
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