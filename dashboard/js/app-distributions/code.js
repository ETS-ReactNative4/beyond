define(["exports", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/preload-text/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/ui/modal/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _ts, _code, _code2, _code3, _code4, _code5, _code6, _code7, _code8, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.AppDistributions = void 0;
  //WORKSPACE CONTEXT
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/app-distributions/code', false, {
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
  /*******
  item.jsx
  *******/


  const DistributionItem = ({
    data,
    texts
  }) => {
    return /*#__PURE__*/React.createElement("li", {
      className: "item-distribution"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, data.name), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.label, ": ", /*#__PURE__*/React.createElement("span", null, data.platform)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.environment, ": ", /*#__PURE__*/React.createElement("span", null, data.environment)), /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.platform.port.label, ": ", /*#__PURE__*/React.createElement("span", null, data.port)), data.ts && /*#__PURE__*/React.createElement("div", {
      className: "item__description"
    }, texts.ts, ": ", /*#__PURE__*/React.createElement("span", null, data.ts.compiler))), /*#__PURE__*/React.createElement("div", null, data.default && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.default), data.ssr && /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, texts.ssr)));
  };
  /*******
  list.jsx
  *******/


  const AppDistributions = ({
    application
  }) => {
    const [texts, setTexts] = React.useState(module.texts.value);
    const [ready, setReady] = React.useState(module.texts?.ready);
    const [modal, showModal] = React.useState(false);
    (0, _code6.useBinder)([module.texts], () => {
      setReady(module.texts.ready);
      if (module.texts.ready) setTexts(module.texts.value);
    });
    React.useEffect(() => {
      const onChange = event => console.log(1, `total: `, application.deployment.distributions.size);

      application.deployment.bind('change', onChange);
      return () => application.deployment.unbind('change', onChange);
    });
    if (!ready || !texts) return null;

    if (!application.deployment) {
      console.warn("the application  does not has distributions");
      return null;
    }

    const {
      deployment: {
        distributions
      }
    } = application;

    const handleClick = () => showModal(!modal);

    const output = [];
    distributions.forEach(data => output.push( /*#__PURE__*/React.createElement(DistributionItem, {
      key: data.id,
      data: data,
      texts: texts
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: "container-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "header-distributions"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "title-list-distributions"
    }, texts.platform.title), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
      onClick: handleClick,
      className: "btn primary beyond-button waves-effect"
    }, texts.platform.add)), /*#__PURE__*/React.createElement("ul", {
      className: "list-distributions"
    }, output), modal && /*#__PURE__*/React.createElement(ModalDistributions, {
      application: application,
      texts: texts,
      showModal: showModal
    }));
  };
  /********
  modal.jsx
  ********/


  _exports2.AppDistributions = AppDistributions;

  const ModalDistributions = ({
    showModal,
    application,
    texts
  }) => {
    const {
      workspace: {
        dashboard
      }
    } = (0, _code8.useDSWorkspaceContext)();
    const [ready, setReady] = React.useState();
    const [isValid, setIsValid] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);
    const [error, setError] = React.useState(false);
    const defaultValues = {
      checked: false,
      name: '',
      port: 8080,
      compress: false,
      ssr: false,
      isDefault: false,
      platform: 'web',
      environment: 'development',
      checkType: false
    };
    const [formValues, handleChange] = (0, _code7.useForm)(defaultValues);
    React.useEffect(() => {
      (async () => {
        const port = await dashboard.availablePort();
        setReady(true);
        setIsValid(true);
        handleChange({
          target: {
            name: 'port',
            value: port
          }
        });
      })();
    }, []);
    if (!ready) return null;
    const {
      deployment: {
        distributions
      }
    } = application;
    const {
      name,
      platform,
      port,
      environment,
      isDefault,
      compress,
      ssr,
      checkType,
      checked
    } = formValues;
    const options = [{
      value: 'android',
      label: texts.platform.options.android,
      name: 'platform'
    }, {
      value: 'ios',
      label: texts.platform.options.ios,
      name: 'platform'
    }, {
      value: 'web',
      label: texts.platform.options.web,
      name: 'platform'
    }, {
      value: 'backend',
      label: texts.platform.options.backend,
      name: 'platform'
    }, {
      value: 'ssr',
      label: texts.platform.options.ssr,
      name: 'platform'
    }, {
      value: 'node',
      label: texts.platform.options.node,
      name: 'platform'
    }];
    const optionsEnvironment = [{
      value: 'development',
      label: texts.environments.dev,
      name: "environment"
    }, {
      value: 'production',
      label: texts.environments.prod,
      name: "environment"
    }];

    const close = () => showModal(false);

    const onSubmit = async () => {
      setFetching(true);
      setError(undefined);
      const response = await application.deployment.addDistribution(formValues);
      setFetching(false);

      if (response?.error) {
        setError(response.error);
        return;
      }

      showModal(false);
    };

    const onBlurPort = async event => {
      setFetching(true);
      const isValid = await controller.model.checkPort(port);
      setIsValid(isValid);
      setFetching(false);
    };

    const disabled = {};
    const formValid = name && platform && environment;

    const checkSwitch = event => {
      const target = event.currentTarget;
      handleChange({
        target: {
          name: target.name,
          value: target.checked
        }
      });
    };

    if (!isValid || !formValid) disabled.disabled = true;
    const portMessage = isValid ? texts.port.success : texts.port.error;
    const clsPortLabel = `fade-in ${isValid ? 'form__text-success' : 'form__text-error'}`;
    return /*#__PURE__*/React.createElement(_code5.BeyondModal, {
      show: true,
      onClose: close,
      className: "md ds-modal distributions-modal"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "section-header"
    }, /*#__PURE__*/React.createElement("h4", null, texts.titleModal), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.modalHeader))), /*#__PURE__*/React.createElement(_code2.BeyondForm, {
      onSubmit: onSubmit
    }, /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(_code7.BeyondAlert, {
      type: "error"
    }, " ", texts.errors[error], " "), /*#__PURE__*/React.createElement("div", {
      className: "item"
    }, /*#__PURE__*/React.createElement(_code2.BeyondInput, {
      name: "name",
      label: texts.name,
      placeholder: texts.name,
      required: true,
      value: name,
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "selects-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.platform.label), /*#__PURE__*/React.createElement(_code4.DSSelect, {
      name: "platform",
      options: options,
      value: platform,
      onSelect: handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "distributions-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.environment), /*#__PURE__*/React.createElement(_code4.DSSelect, {
      name: "environment",
      options: optionsEnvironment,
      value: environment,
      onSelect: handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "input-group-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "port"
    }, /*#__PURE__*/React.createElement(_code2.BeyondInput, {
      onBlur: onBlurPort,
      name: "port",
      label: texts.port.label,
      type: "number",
      value: port,
      placeholder: texts.port.label,
      min: "1",
      onChange: handleChange
    }), /*#__PURE__*/React.createElement("span", {
      className: clsPortLabel
    }, portMessage))), /*#__PURE__*/React.createElement("div", {
      className: "input-switch-distributions"
    }, /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.checkType), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "checkType",
      checked: checkType,
      onChange: checkSwitch,
      value: checkType
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.compress), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "compress",
      value: compress,
      onChange: checkSwitch
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.ssr), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "ssr",
      value: ssr,
      onChange: checkSwitch
    })), /*#__PURE__*/React.createElement("div", {
      className: "switch-item"
    }, /*#__PURE__*/React.createElement("label", null, texts.default), /*#__PURE__*/React.createElement(_code2.BeyondSwitch, {
      name: "default",
      value: isDefault,
      onChange: checkSwitch
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal__actions"
    }, /*#__PURE__*/React.createElement(_code2.BeyondButton, _extends({}, disabled, {
      className: "btn primary beyond-button waves-effect",
      type: "submit"
    }), fetching ? /*#__PURE__*/React.createElement(_code.BeyondSpinner, {
      className: "on-primary",
      fetching: true
    }) : texts.add)))));
  };
  /***********
  JS PROCESSOR
  ***********/

  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.workspace__board .container-distributions .item-distribution{display:flex;justify-content:space-between;border-bottom:1px solid #fff;background-color:#0d121a;padding:2rem;margin-bottom:1rem}.workspace__board .container-distributions .item-distribution h2{text-transform:uppercase;margin:0;padding:0}.workspace__board .container-distributions .item-distribution h4{font-size:14px}.workspace__board .container-distributions .item-distribution span{padding-bottom:1rem;font-size:12px;margin-left:.5rem;color:#ff8056}.workspace__board .container-distributions .item-distribution .left-box-distributions{display:flex;flex-direction:column;justify-content:center;text-transform:capitalize;margin-right:2rem;margin-top:1rem}.workspace__board .container-distributions .item-distribution .left-box-distributions span{margin-bottom:1rem;background-color:#050910;color:#fff;border-radius:.5rem;font-size:10px;padding:.5rem;border:1px solid #050910}.workspace__board .container-distributions .item-distribution .left-box-distributions:nth-child(2){text-align:center}.workspace__board .container-distributions{margin-top:30px}.workspace__board .container-distributions .header-distributions{display:flex;justify-content:space-between}.workspace__board .container-distributions .header-distributions .beyond-button{width:7rem;height:3rem}.workspace__board .container-distributions .list-distributions{list-style-type:none;padding:0}.distributions-modal{background-color:rgba(0,0,0,.8)}.distributions-modal .modal-content form{padding:20px!important}.distributions-modal .item .selects-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .item .selects-distributions .distributions-select .form__select{width:95%}.distributions-modal .item .selects-distributions .distributions-select .form__select .form__select__options{background-color:#050910;z-index:100}.distributions-modal .item .selects-distributions .distributions-select .form__select .form__select__options .option{color:#fff}.distributions-modal .item .input-group-distributions{display:grid;grid-template-columns:repeat(2,1fr)}.distributions-modal .item .input-group-distributions .port .beyond-element-input{font-size:15px;width:98%}.distributions-modal .item .input-group-distributions .beyond-checkbox{flex-direction:column-reverse;align-items:flex-start;margin:auto}.distributions-modal .item .input-group-distributions .beyond-checkbox .checkmark{height:18px;width:18px}.distributions-modal .item .input-switch-distributions{display:flex;margin-top:15px;justify-content:start;gap:6rem}.distributions-modal .item .input-switch-distributions .switch-item{justify-self:center}.distributions-modal .div-botton-distributions{display:flex;justify-content:flex-end}.distributions-modal .div-botton-distributions .beyond-button{width:7rem}';
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