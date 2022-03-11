define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondTooltip = BeyondTooltip;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/tooltip/code', false, {}, dependencies);
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
  beyond-tooltip.jsx
  *****************/

  function BeyondTooltip({
    specs,
    className,
    unmount,
    children
  }) {
    const container = document.createElement('span');
    const ref = React.useRef();
    const [position, setPosition] = React.useState(specs);

    const close = () => {
      document.removeEventListener('click', close);
      unmount(false);
    };

    React.useEffect(() => {
      const body = document.querySelector('body');
      document.addEventListener('click', close);
      body.appendChild(container);
      const {
        offsetWidth,
        offsetHeight
      } = ref.current;
      const tWidth = offsetWidth + specs.x;
      const tHeight = offsetHeight + specs.y;
      const newPosition = {};
      if (tWidth > window.innerWidth) ref.current.style.left = `${position.x - offsetWidth}px`;
      if (tHeight > window.innerHeight) ref.current.style.top = `${position.y - offsetHeight}px`;
      return () => {
        document.removeEventListener('click', close);
        container.remove();
      };
    }, []);
    const styles = {
      position: 'absolute',
      top: `${position.y}px`,
      left: `${position.x}px`
    };
    return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      style: styles,
      ref: ref,
      className: className
    }, children), container);
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