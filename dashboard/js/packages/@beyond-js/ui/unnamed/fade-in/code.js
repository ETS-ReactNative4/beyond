define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.default = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/fade-in/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**********
  fade-in.jsx
  **********/

  class FadeIn extends React.Component {
    constructor() {
      super();
      this.state = {
        maxIsVisible: 0
      };
    }

    get delay() {
      return this.props.delay || 50;
    }

    get transitionDuration() {
      return this.props.transitionDuration || 400;
    }

    componentDidMount() {
      const count = React.Children.count(this.props.children);
      let i = 0;
      this.interval = setInterval(() => {
        i++;
        if (i > count) clearInterval(this.interval);
        this.setState({
          maxIsVisible: i
        });
      }, this.delay);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      const transitionDuration = this.transitionDuration;
      const WrapperTag = this.props.wrapperTag || "div";
      const ChildTag = this.props.childTag || "div";
      return /*#__PURE__*/React.createElement(WrapperTag, {
        className: this.props.className
      }, React.Children.map(this.props.children, (child, i) => {
        return /*#__PURE__*/React.createElement(ChildTag, {
          className: this.props.childClassName,
          style: {
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: this.state.maxIsVisible > i ? 'none' : 'translateY(20px)',
            opacity: this.state.maxIsVisible > i ? 1 : 0
          }
        }, child);
      }));
    }

  }

  _exports2.default = FadeIn;
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