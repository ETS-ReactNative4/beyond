define(["exports", "@beyond-js/dashboard/unnamed/components/uploader/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Uploader = Uploader;
  _exports2.hmr = void 0;
  //WORKSPACE CONTEXT
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/uploader/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /***********
  uploader.jsx
  ***********/

  function Uploader({
    onLoadFile,
    onLoadEnd,
    name = 'images',
    multiple,
    children,
    specs
  }) {
    const btn = React.useRef();
    const [uploader, setUploader] = React.useState();
    const {
      workspace: {
        application
      }
    } = (0, _code2.useDSWorkspaceContext)();
    const url = `${application.application.url}/uploader`;
    React.useEffect(() => {
      const model = new _code.JidaUploader({
        type: 'image',
        name: 'images',
        params: specs,
        url: url,
        input: {
          name: name,
          multiple: !!multiple
        }
      });
      model.create(btn.current);

      const onLoad = () => {
        [...model.files.items.values()][0];
        onLoadFile(model.files.items);
      };

      const loadend = async () => {
        const response = await model.publish();
        onLoadEnd(response);
      };

      model.bind('file.loaded', onLoad);
      model.bind('loadend', loadend);
      setUploader(model);
    }, [url, multiple]);
    return /*#__PURE__*/React.createElement("span", {
      ref: btn
    }, children);
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