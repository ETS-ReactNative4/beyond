define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = void 0;
  _exports2.useBinder = useBinder;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/hooks/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*****************
  jsx\use-binder.jsx
  *****************/

  /***
   * Executes a useEffect hook binging the event defined in all
   * objects passed
   *
   * @param {array} objects Objects to bind
   * @param {function} onBinder function to be executed when the event is fired
   * @param {string} event the event to be listened, by default is event change
   */

  function useBinder(objects, onBinder, event = 'change') {
    React.useEffect(() => {
      objects.forEach(object => {
        // if (!object) {
        //     throw new Error(`object is not valid in useBinder ${object}`);
        // }
        if (object) object.bind(event, onBinder);
      });
      return () => objects.forEach(object => {
        if (object) object.unbind(event, onBinder);
      });
    }, [objects]);
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