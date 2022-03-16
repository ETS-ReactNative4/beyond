define(["exports", "@beyond-js/dashboard/core-components/code", "@beyond-js/ui/image/code", "@beyond-js/dashboard/unnamed/components/notify/js", "@beyond-js/dashboard/hooks/code", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/dashboard-lib/models/js", "react", "react-dom"], function (_exports2, _code, _code2, _js, _code3, _code4, _code5, _code6, _js2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.ApplicationCreate = void 0;
  //  APP
  //  Library Beyond-UI
  //  Library beyond-Dashboard
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/application/create/code', false, {
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
  /**********
  context.jsx
  **********/


  const CreateAppContext = React.createContext();

  const useCreateAppContext = () => React.useContext(CreateAppContext);
  /**************
  form\detail.jsx
  **************/


  function DetailApp() {
    const {
      texts: {
        errors,
        form: texts,
        actions
      },
      model,
      fetching
    } = useCreateAppContext();
    const [state, setState] = React.useState({});
    const btnAttrs = {};

    const handleName = event => handleChange(event, / /g);

    const handleChange = (event, pattern) => {
      const target = event.target;
      let {
        name,
        value
      } = target;
      if (pattern) value = value.replace(pattern, '-');
      model[name] = value;
      setState({ ...state,
        ...{
          [name]: model[name]
        }
      });
    };

    if (!model.valid) btnAttrs.disabled = true;
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-create-app__fields"
    }, model.error && /*#__PURE__*/React.createElement(_code.BeyondAlert, {
      title: "Ha ocurrido un error",
      type: "error"
    }, errors[model.error]), /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      name: "scope",
      label: texts.scope,
      placeholder: texts.scope,
      value: state.scope,
      onChange: handleName
    }), /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      name: "name",
      label: texts.name,
      placeholder: texts.name,
      required: true,
      value: state.name,
      onChange: handleName
    }), /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      name: "title",
      label: texts.title,
      placeholder: texts.title,
      value: state.title,
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex-container"
    }, model.useNavigatePort && /*#__PURE__*/React.createElement(PortField, {
      identifier: "navigate",
      name: "navigatePort"
    }), model.useInspectPort && /*#__PURE__*/React.createElement(PortField, {
      identifier: "inspect",
      name: "inspectPort"
    })), /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      value: state.description,
      placeholder: texts.description,
      name: "description",
      label: texts.description,
      onChange: handleChange
    })), /*#__PURE__*/React.createElement("footer", {
      className: "footer ds-modal__actions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, _extends({}, btnAttrs, {
      className: "btn-large btn primary",
      type: "submit"
    }), fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      className: "on-primary",
      fetching: true
    }) : actions.submit))));
  }
  /************
  form\form.jsx
  ************/


  function Form() {
    const {
      type,
      setType,
      model,
      texts: {
        form: texts
      }
    } = useCreateAppContext();

    const onSubmit = event => {
      event.preventDefault();
      model.create();
    };

    const typeIcon = type === 'empty' ? 'appTemplate' : 'newApp';
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-modal_content form-content"
    }, /*#__PURE__*/React.createElement(_code6.BeyondForm, {
      onSubmit: onSubmit
    }, !type ? /*#__PURE__*/React.createElement(ProjectTypes, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "block-types__selected",
      onClick: () => setType(undefined)
    }, /*#__PURE__*/React.createElement(_code.DSIcon, {
      icon: typeIcon
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, texts.types[type].title), /*#__PURE__*/React.createElement("p", null, texts.types[type].description))), /*#__PURE__*/React.createElement(DetailApp, {
      type: type
    }))));
  }
  /******************
  form\port-field.jsx
  ******************/


  function PortField({
    name,
    identifier
  }) {
    const {
      texts: {
        form: texts
      },
      model
    } = useCreateAppContext();
    const [valid, setValid] = React.useState();
    const clsPortLabel = `fade-in ${valid === 'success' ? 'form__text-success' : 'form__text-error'}`;

    const handleChange = (event, pattern) => {
      const target = event.target;
      let {
        name,
        value
      } = target;
      if (pattern) value = value.replace(pattern, '-');
      model[name] = value;

      if (value.length === 4) {
        checkPort();
      }
    };

    const checkPort = async () => {
      const port = model[name];
      if (!port) return;
      const isValid = await model.checkPort(port);
      setValid(isValid ? 'success' : 'error');
    };

    return /*#__PURE__*/React.createElement(_code6.BeyondInput, {
      name: name,
      label: texts.ports[identifier].label,
      className: "icon-right form__field-port",
      type: "text",
      placeholder: texts.ports[identifier].label,
      maxLength: 4,
      value: model[name],
      onChange: handleChange
    }, /*#__PURE__*/React.createElement(_code.DSIconButton, {
      icon: "refresh",
      className: "primary",
      title: texts.ports.tooltip
    }), valid && /*#__PURE__*/React.createElement("span", {
      className: clsPortLabel
    }, texts.ports[valid]));
  }
  /*********
  header.jsx
  *********/


  const Header = React.memo(() => {
    const {
      texts
    } = useCreateAppContext();
    return /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.title), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.subtitle)));
  });
  /***************
  options\item.jsx
  ***************/

  function Item({
    name,
    is
  }) {
    const {
      setType,
      model,
      texts: {
        form: texts
      }
    } = useCreateAppContext();

    const selectType = event => {
      const target = event.currentTarget;
      const name = target.dataset.name;
      model.type = name;
      model.is = is;
      setType(name);
    };

    const src = `/images/logos/${name}.png`;
    return /*#__PURE__*/React.createElement("li", {
      onClick: selectType,
      "data-name": name,
      className: "list__item"
    }, /*#__PURE__*/React.createElement(_code2.BeyondImage, {
      src: src
    }), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("h4", null, texts.types[name].title), /*#__PURE__*/React.createElement("p", null, texts.types[name].description)));
  }
  /****************
  options\types.jsx
  ****************/


  function ProjectTypes() {
    const {
      texts: {
        form: texts
      },
      model: {
        TYPES,
        templates
      }
    } = useCreateAppContext();
    const outputItems = TYPES.map(item => /*#__PURE__*/React.createElement(Item, {
      is: "type",
      key: item.name,
      name: item.name
    }));
    const outputTemplates = templates.map(item => /*#__PURE__*/React.createElement(Item, {
      is: "template",
      key: item.name,
      name: item.name
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "applications__types"
    }, /*#__PURE__*/React.createElement("h4", {
      className: ""
    }, texts.types.titles.empty), /*#__PURE__*/React.createElement("ul", {
      className: "items__list"
    }, outputItems), /*#__PURE__*/React.createElement("h4", {
      className: "block_types-title"
    }, texts.types.titles.templates), /*#__PURE__*/React.createElement("ul", null, outputTemplates));
  }
  /*******
  view.jsx
  *******/


  const ApplicationCreate = function ({
    closeModal
  }) {
    const [state, setState] = React.useState({});
    const [type, setType] = React.useState(undefined);
    const notify = _js.NotifyManager;
    const model = createController.model;
    (0, _code3.useBinder)([createController], () => {
      const fetching = model.processing || model.application?.fetching;

      if (model.created) {
        closeModal();
        notify.success(texts?.created);
        window.setTimeout(model.clean(), 100);
        return;
      }

      setState(() => ({ ...state,
        fetching
      }));
    });
    const output = [];
    const {
      fetching
    } = state;

    if (createController.ready) {
      output.push( /*#__PURE__*/React.createElement(React.Fragment, {
        key: "content"
      }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Form, null)));
    }

    const texts = createController.texts;
    return /*#__PURE__*/React.createElement(CreateAppContext.Provider, {
      value: {
        type,
        setType,
        model,
        texts,
        fetching
      },
      key: "content"
    }, /*#__PURE__*/React.createElement(_code4.BeyondModal, {
      show: true,
      onClose: closeModal,
      className: "md ds-modal ds-app-create_modal"
    }, output));
  };
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: controller.js
  ******************/


  _exports2.ApplicationCreate = ApplicationCreate;
  const createController = new class Controller extends _js2.ReactiveModel {
    #model;

    get model() {
      return this.#model;
    }

    get texts() {
      return module.texts?.value;
    }

    get ready() {
      return module.texts.ready && this.#model.ready;
    }

    constructor(props) {
      super(props);
      const model = new _js2.ApplicationBuilder();
      this.#model = model;
      module.texts.bind('change', this.triggerEvent);
      model.bind('change', this.triggerEvent);
    }

  }();
  /**********
  SCSS STYLES
  **********/

  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-modal.ds-app-create_modal .ds-create-app__fields{padding:20px 60px}.ds-app-create_modal .block-selected{display:flex;align-items:center;background:#ffa789;transition:.2s all ease-in;cursor:pointer}.ds-app-create_modal .block-selected:hover{background:#e36152}.ds-app-create_modal .block-selected svg{padding:30px;height:120px;width:120px}.ds-app-create_modal .form__field-port{margin-bottom:10px}.ds-app-create_modal .form__field-port span{position:absolute;bottom:-10px}.ds-app-create_modal .form__field-port .item{margin-top:15px}.ds-app-create_modal .form__field-port .item.two-columns{display:grid;grid-template-columns:1fr 1fr}.ds-app-create_modal .applications__types{padding:20px}.ds-app-create_modal .applications__types>h4{padding:15px}.ds-app-create_modal .applications__types ul{list-style:none;padding:0;margin-top:15px;grid-template-columns:1fr 1fr 1fr;display:grid;flex-wrap:wrap}.ds-app-create_modal .applications__types ul li{padding:10px 15px 10px;display:grid;width:300px;grid-template-columns:auto 1fr;align-items:center;justify-items:center;grid-gap:15px;transition:.2s all ease-in;cursor:pointer}.ds-app-create_modal .applications__types ul li.disabled{opacity:.3}.ds-app-create_modal .applications__types ul li h4{padding:0;font-size:1.1rem;margin-bottom:5px}.ds-app-create_modal .applications__types ul li p{margin:0;font-size:.9rem}.ds-app-create_modal .applications__types ul li .beyond-element-image,.ds-app-create_modal .applications__types ul li .beyond-element-image img{height:30px!important;aspect-ratio:1/1;object-fit:cover}.ds-app-create_modal .applications__types ul li:hover:not(.disabled){background:#f0f0f0}';
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