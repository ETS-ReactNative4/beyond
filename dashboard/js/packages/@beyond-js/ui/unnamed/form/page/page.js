define(["exports", "@beyond-js/ui/form/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/select/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Page = Page;
  _exports2.hmr = _exports2.View = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/form/page/page', false, {}, dependencies);
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

  /************
  FILE: page.js
  ************/

  function Page() {
    'use strict';

    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.id = 'beyond-elements-form-page';
  }
  /**********
  buttons.jsx
  **********/


  function Buttons({
    fetching,
    texts
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Button"), /*#__PURE__*/React.createElement(_code4.BeyondImport, {
      name: "BeyondButton",
      route: "/libraries/beyond-ui/form/code.js"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondButton type="submit" className="primary">${texts.loginIn}</BeyondButton>`), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      type: "submit",
      title: "button title",
      className: "primary",
      disabled: fetching
    }, texts.loginIn), /*#__PURE__*/React.createElement("pre", null, `<BeyondButton className="primary-outline">${texts.loginIn}</BeyondButton>`), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      className: "primary-outline"
    }, texts.loginIn), /*#__PURE__*/React.createElement("pre", null, `<BeyondButton className="secondary">${texts.loginIn}</BeyondButton>`), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Others Examples: "), /*#__PURE__*/React.createElement("div", {
      className: "container-buttons"
    }, /*#__PURE__*/React.createElement(_code.BeyondButton, {
      className: "secondary"
    }, texts.loginIn), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      className: "secondary-outline"
    }, texts.loginIn), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      className: "facebook"
    }, texts.loginIn), /*#__PURE__*/React.createElement(_code.BeyondButton, null, "Texto", /*#__PURE__*/React.createElement(_code2.BeyondIcon, {
      icon: "user"
    })), /*#__PURE__*/React.createElement(_code.BeyondButton, {
      className: "icon-left"
    }, /*#__PURE__*/React.createElement(_code2.BeyondIcon, {
      icon: "user"
    }), "Texto")));
  }
  /*********
  checks.jsx
  *********/


  function Checks({
    fetching,
    texts
  }) {
    const handler = event => {};

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Checkbox"), /*#__PURE__*/React.createElement(_code4.BeyondImport, {
      name: "BeyondCheckbox",
      route: "/libraries/beyond-ui/form/code.js"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondCheckBox/>`), /*#__PURE__*/React.createElement(_code.BeyondCheckbox, {
      label: "Default"
    }), /*#__PURE__*/React.createElement(_code.BeyondCheckbox, {
      label: "Left",
      className: "left"
    }), /*#__PURE__*/React.createElement(_code.BeyondCheckbox, {
      label: "Right",
      className: "right"
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Checkbox Switch"), /*#__PURE__*/React.createElement(_code4.BeyondImport, {
      name: "BeyondSwitch",
      route: "/libraries/beyond-ui/form/code.js"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondSwitch/>`), /*#__PURE__*/React.createElement(_code.BeyondSwitch, null), /*#__PURE__*/React.createElement("hr", null));
  }
  /*********
  inputs.jsx
  *********/


  function Input({
    textarea,
    onTextarea,
    fetching,
    texts
  }) {
    const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 5', 'option 5', 'option 5', 'option 5', 'option 6'];
    const [textAreaValue, setTextAreaValue] = React.useState('ci');

    const onTextAreaChange = event => {
      setTextAreaValue(event.target.value);
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Inputs"), /*#__PURE__*/React.createElement(_code4.BeyondImport, {
      name: "BeyondInput",
      route: "/libraries/beyond-ui/form/code.js"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondInput type="email" placeholder="Tu email" errorMessage={texts.errorMessage} name="email"/>`), /*#__PURE__*/React.createElement(_code.BeyondInput, {
      type: "email",
      placeholder: "Tu email",
      label: "Tu email",
      className: "",
      disabled: fetching,
      errorMessage: texts.errorMessage,
      name: "email"
    }), /*#__PURE__*/React.createElement("h2", null, "textarea"), /*#__PURE__*/React.createElement(_code4.BeyondImport, {
      name: "BeyondTextarea",
      route: "/libraries/beyond-ui/form/code.js"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondTextarea placeholder="Tu Descripción" disabled={fetching} errorMessage={texts.errorMessage} name="description" required/>`), /*#__PURE__*/React.createElement(_code.BeyondTextarea, {
      placeholder: "Tu Descripci\xF3n",
      disabled: fetching,
      onChange: onTextarea,
      value: textarea,
      errorMessage: texts.errorMessage,
      name: "description",
      required: true
    }), /*#__PURE__*/React.createElement("hr", null));
  }
  /*********
  radios.jsx
  *********/


  function Radios({
    fetching,
    texts
  }) {
    const click = event => {
      const target = event.currentTarget;
    };

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Radios"), /*#__PURE__*/React.createElement(_code4.BeyondImport, {
      name: "BeyondRadio",
      route: "/libraries/beyond-ui/form/code.js"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondRadio value="1" data-id="11" label="Si" name="test_radio"/>`), /*#__PURE__*/React.createElement("div", {
      className: "radio-btn-container"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      onClick: click
    }), " Radio Simple", /*#__PURE__*/React.createElement("div", {
      className: ""
    }, /*#__PURE__*/React.createElement("h3", null, "Radios en vertical (Por Defecto)"), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement(_code.BeyondRadio, {
      value: "1",
      "data-id": "11",
      label: "Si",
      name: "test_radio"
    }), /*#__PURE__*/React.createElement(_code.BeyondRadio, {
      value: "2",
      label: "No",
      name: "test_radio"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Radios en horizontal (Display: contents)"), /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, "Example: "), /*#__PURE__*/React.createElement("pre", null, `<BeyondRadio value="1" data-id="11" label="Si" name="test_radio"/>`), /*#__PURE__*/React.createElement(_code.BeyondRadio, {
      className: "radio-horizontal",
      value: "1",
      "data-id": "11",
      label: "Si",
      name: "test_radio"
    }), /*#__PURE__*/React.createElement(_code.BeyondRadio, {
      className: "radio-horizontal",
      value: "2",
      label: "No",
      name: "test_radio"
    }), /*#__PURE__*/React.createElement("hr", null))));
  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'input': '',
        'textarea': ''
      };
      this.setTextArea = this.setTextArea.bind(this);
    }

    handleChange(e) {}

    onSubmit(e) {
      e.preventDefault();
    }

    setTextArea(event) {
      this.setState({
        textarea: event.target.value
      });
    }

    render() {
      let fetching = false;
      const texts = {
        'title': 'Bienvenido!',
        'loginIn': 'Ingresar',
        'register': '¿No posees cuenta ?',
        'recoverPass': '¿Olvidó su contraseña?',
        'information': '(*) La contraseña debe contener un mínimo de 6 caracteres y al menos una (1) mayúscula,' + 'una (1) minúscula y un valor numérico.',
        'errorMessage': 'Formato incorrecto'
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "form-container"
      }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, "Forms"), /*#__PURE__*/React.createElement("p", null, "En esta secci\xF3n de componentes los Forms comprenden aquellos para la interaccion entre usuario y las funcionalidades de tu web, botones, inputs, checkbox, entre otros, los cuales puedes integrar de manera sencilla ")), /*#__PURE__*/React.createElement(Input, {
        onTextarea: this.setTextArea,
        textarea: this.state.textarea,
        fetching: fetching,
        texts: texts
      }), /*#__PURE__*/React.createElement(Radios, {
        fetching: fetching,
        texts: texts
      }), /*#__PURE__*/React.createElement(Checks, {
        fetching: fetching,
        texts: texts
      }), /*#__PURE__*/React.createElement(Buttons, {
        fetching: fetching,
        texts: texts
      }));
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.View = View;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-elements-form-page{margin:auto;overflow:auto;color:#fff}#beyond-elements-form-page header p{color:#b7b7b6;width:80%}#beyond-elements-form-page .beyond-checkbox .checkmark{height:15px;width:22px}#beyond-elements-form-page .beyond-element-input label{font-size:12px;color:#fff}#beyond-elements-form-page .beyond-element-input input{border-bottom:1px solid #fff}#beyond-elements-form-page .form-container{overflow:auto;position:relative}#beyond-elements-form-page .beyond-element-radio label:before{top:4px;border:2px solid #fff}#beyond-elements-form-page .beyond-element-radio label:after{background:#e36152}#beyond-elements-form-page .beyond-element-textarea textarea{border-radius:10px;color:#000}#beyond-elements-form-page .beyond-element-textarea textarea::placeholder{color:gray}#beyond-elements-form-page .select-options{border:solid 2px #fff}#beyond-elements-form-page .select-options svg{fill:white}#beyond-elements-form-page .beyond-element-radio label:after{top:8px;left:4px;width:7px;height:7px}#beyond-elements-form-page .radio-horizontal{display:contents}#beyond-elements-form-page .beyond-element-input{margin-top:5px}#beyond-elements-form-page button{margin:auto}#beyond-elements-form-page .container-buttons{display:inline-flex}#beyond-elements-form-page .container-buttons button{margin-right:15px;height:55px}';
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