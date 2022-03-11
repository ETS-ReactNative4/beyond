define(["exports", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/ds-editor/code", "@beyond-js/dashboard/applications-settings/code", "@beyond-js/ui/form/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, _js, _code5, _code6, _code7, _code8, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ConfigBoard = ConfigBoard;
  _exports2.hmr = void 0;

  /**
   * CONTEXTS
   */
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/settings/code', false, {
    "txt": {
      "multilanguage": true
    }
  }, dependencies);
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
  /*********
  config.jsx
  *********/


  function ConfigBoard() {
    const [state, setState] = React.useState({});
    const [controller, setController] = React.useState();
    const {
      fetching,
      update
    } = state;
    const [active, setActive] = React.useState('general');
    const tabs = {
      general: EditorSettings,
      apps: _code6.ApplicationsSettings
    };
    React.useEffect(() => {
      const controller = new Controller();
      setController(controller);
      setState(state => ({ ...state,
        controller,
        update: performance.now()
      }));

      const onChange = () => setState({ ...state,
        update: performance.now()
      });

      controller.bind('change', onChange);
      return () => controller.unbind('change', onChange);
    }, []);
    if (!update || !controller?.ready) return null;
    const {
      editorSettings,
      texts
    } = controller;
    const {
      unpublished
    } = editorSettings;
    const Control = tabs[active];
    return /*#__PURE__*/React.createElement(_code8.ConfigContext.Provider, {
      value: {
        editorSettings,
        active,
        unpublished,
        texts,
        tabs,
        setActive
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "workspace__board"
    }, /*#__PURE__*/React.createElement(Tabs, null), /*#__PURE__*/React.createElement(Control, null)));
  }
  /*********
  editor.jsx
  *********/


  function EditorSettings() {
    const {
      texts,
      editorSettings
    } = (0, _code8.useConfigContext)();
    const attrs = {};
    if (!editorSettings.unpublished) attrs.disabled = true;
    const [, setState] = React.useState({});

    const onSave = async event => {
      event.stopPropagation();
      event.preventDefault();
      await editorSettings.save();
      setState({});
    };

    const onChange = event => {
      event.stopPropagation();
      const target = event.currentTarget;

      try {
        editorSettings[target.name] = target.value;
      } catch (e) {
        console.warn('this is not a configuration property');
      }
    };

    return /*#__PURE__*/React.createElement("form", {
      className: "form",
      onSubmit: onSave
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h3", null, texts.title, " ")), /*#__PURE__*/React.createElement(Theme, null), /*#__PURE__*/React.createElement("div", {
      className: "settings__item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.controls.fontSize.label), /*#__PURE__*/React.createElement("input", {
      type: "text",
      onChange: onChange,
      name: "fontSize",
      value: editorSettings.fontSize,
      placeholder: texts.controls.fontSize.placeholder
    })), /*#__PURE__*/React.createElement("div", {
      className: "settings-item"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: ""
    }, texts.controls.wordWrap.label), /*#__PURE__*/React.createElement(_code7.BeyondSwitch, {
      name: "wordWrap",
      value: editorSettings.wordWrap,
      onChange: onChange
    }))), editorSettings.unpublished && /*#__PURE__*/React.createElement("footer", {
      className: "settings__actions"
    }, /*#__PURE__*/React.createElement(_code7.BeyondButton, _extends({}, attrs, {
      onClick: onSave,
      className: "btn primary"
    }), texts.actions.save)));
  }
  /*******
  tabs.jsx
  *******/


  function Tabs() {
    const {
      active,
      tabs,
      setActive,
      texts
    } = (0, _code8.useConfigContext)();
    const output = Object.keys(tabs).map(key => {
      const onClick = () => setActive(key);

      const attrs = {
        onClick,
        key
      };
      if (active === key) attrs.className = "tab--active";
      return /*#__PURE__*/React.createElement("li", attrs, texts.tabs[key]);
    });
    return /*#__PURE__*/React.createElement("ul", {
      className: "settings__tabs-list"
    }, output);
  }
  /********
  theme.jsx
  ********/


  function Theme() {
    const {
      editorSettings,
      texts: {
        controls
      }
    } = (0, _code8.useConfigContext)();

    const handleChange = ele => {
      editorSettings.theme = ele.value;
    };

    const options = [{
      value: 'vs-light',
      label: 'vs-light'
    }, {
      value: 'vs-dark',
      label: 'vs-dark'
    }, {
      value: 'vs-black',
      label: 'vs-black'
    }, {
      value: 'hc-black',
      label: 'hc-black'
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "form-column"
    }, /*#__PURE__*/React.createElement("label", null, controls.theme.label), /*#__PURE__*/React.createElement(_code4.DSSelect, {
      options: options,
      value: editorSettings.theme,
      onSelect: handleChange
    }));
  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  class Controller extends _js.ReactiveModel {
    get ready() {
      return module.texts?.ready;
    }

    #editorSettings;

    get editorSettings() {
      return this.#editorSettings;
    }

    get texts() {
      return module.texts?.value ?? {};
    }

    constructor() {
      super();
      module.texts.bind('change', this.triggerEvent);
      this.#editorSettings = _code5.monacoDependency.settings;
      this.#editorSettings.bind('change', this.triggerEvent);
    }

    dispose() {
      module.texts.unbind('change', this.triggerEvent);
    }

  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.workspace__board{--border-color:var(--beyond-gray-darker-color);--border-color-focus:var(--beyond-gray-dark-color);display:flex;flex-direction:column;justify-content:center}.workspace__board label{padding:15px 0}.workspace__board .settings__item{padding:15px 0;display:grid;gap:10px}.workspace__board .settings__item input{background:0 0;border:1px solid var(--border-color);padding:8px;color:var(--beyond-text-on-primary);outline:0}.workspace__board .settings__item input:hover{border-color:var(--border-color-focus)}.workspace__board .form{align-self:normal}.workspace__board .settings__actions{margin-top:15px;padding:15px 0;justify-content:flex-end;align-items:center;display:flex;border-top:1px solid var(--beyond-gray-light-color)}.workspace__board .relative__container{position:relative}.workspace__board .relative__container .beyond-element-spinner{position:absolute;right:15px;top:10px}.settings__tabs-list{list-style:none;display:flex;gap:8px;padding:0}.settings__tabs-list li{padding:8px 15px;text-transform:upper;border-radius:2px;cursor:pointer}.settings__tabs-list li.tab--active,.settings__tabs-list li:active{background:rgba(240,240,240,.4)}';
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