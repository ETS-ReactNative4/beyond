define(["exports", "@beyond-js/ui/ripple/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondTextarea = _exports2.BeyondSwitch = _exports2.BeyondRadioContainer = _exports2.BeyondRadio = _exports2.BeyondInput = _exports2.BeyondForm = _exports2.BeyondCheckbox = _exports2.BeyondButton = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/form/code', false, {}, dependencies);
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
  button.jsx
  *********/


  class BeyondButton extends React.Component {
    constructor(props) {
      super(props);
      this.ripple = React.createRef();
      this._ripple = new _code.BeyondRipple();
    }

    async componentDidMount() {
      this._ripple.init(this.ripple.current);

      if (!this.props.title) return;
      this.title = await beyond.require('tippy');
      this.title(this.ripple.current);
    }

    async onClick(event, callback) {
      if (callback) {
        callback(event);
        return;
      }

      if (this.props.navigate) {
        beyond.navigate(this.props.navigate);
      }
    }

    render() {
      const {
        className,
        onClick,
        data,
        label,
        children
      } = this.props;
      const props = { ...this.props,
        className: !!className ? `${className} beyond-button` : 'beyond-button',
        type: !!this.props.type ? this.props.type : 'button'
      };

      if (data) {
        let properties = Object.keys(data);
        properties.map(entry => props[`data-${entry}`] = data[entry]);
      }

      if (this.props.disabled) props.disabled = true;
      this.props.title ? props['data-tippy-content'] = this.props.title : null;
      return /*#__PURE__*/React.createElement("button", _extends({
        ref: this.ripple
      }, props, {
        onClick: event => this.onClick(event, onClick)
      }), label, children);
    }

  }
  /***********
  checkbox.jsx
  ***********/


  _exports2.BeyondButton = BeyondButton;

  class BeyondCheckbox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: this.props.checked ? this.props.checked : false
      };
      this.onChange = this.onChange.bind(this);
      this.checkbox = React.createRef();
    }

    onChange(event) {
      let newValue = !this.state.checked;
      this.checkbox.current.checked = newValue;
      this.setState({
        checked: newValue
      });
      let data = {
        name: this.props.name,
        value: this.props.value,
        checked: newValue
      };
      if (this.props.onChange) this.props.onChange({
        target: data,
        currentTarget: data
      });
    }

    render() {
      const {
        className,
        label
      } = this.props;
      let cls = `beyond-checkbox ${className ? className : ''}`;
      cls = this.state.checked ? `${cls} beyond-checkbox-checked` : cls;
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        ref: this.checkbox,
        onChange: this.onChange,
        name: this.props.name,
        value: this.props.value,
        checked: this.state.checked
      }), /*#__PURE__*/React.createElement("span", {
        className: "checkmark",
        onClick: this.onChange
      }), /*#__PURE__*/React.createElement("label", {
        onClick: this.onChange
      }, label));
    }

  }
  /*******
  form.jsx
  *******/


  _exports2.BeyondCheckbox = BeyondCheckbox;

  class BeyondForm extends React.Component {
    onSubmit(event) {
      const target = event.currentTarget;
      this.props.onSubmit(event);
      event.preventDefault();
    }

    render() {
      const items = React.Children.map(this.props.children, child => {
        return React.cloneElement(child);
      });
      let props = Object.assign({}, { ...this.props
      });
      delete props.onSubmit;
      return /*#__PURE__*/React.createElement("form", _extends({}, props, {
        autoComplete: "off",
        onSubmit: event => this.onSubmit(event)
      }), this.props.children);
    }

  }
  /********
  input.jsx
  ********/


  _exports2.BeyondForm = BeyondForm;

  class BeyondInput extends React.Component {
    constructor(props) {
      super(props);
      this.input = React.createRef();
      this.state = {
        value: this.props.value ? this.props.value : '',
        errorMessage: props.errorMessage ? props.errorMessage : 'Formato incorrecto',
        lengthMessage: 'Cantidad máxima: ',
        emptyMessage: 'Este campo es requerido'
      };
      this.clean = this.clean.bind(this);
      this.onInvalid = this.checkInvalid.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    clean() {
      this.setState({
        value: ''
      });
    }

    get selector() {
      return this.input.current;
    }

    handleChange(event) {
      if (!!this.props.onChange) this.props.onChange(event);
      this.setState({
        _hasError: false,
        value: event.target.value
      });
    }

    get value() {
      return this.state.value;
    }

    set value(value) {
      this.setState({
        value: value
      });
    }

    checkInvalid(event) {
      event.preventDefault();
      this.setState({
        _hasError: true
      });
    }

    componentDidMount() {
      this.input.current.addEventListener('invalid', this.onInvalid);
    }

    componentWillUnmount() {
      this.input.current.removeEventListener('invalid', this.onInvalid);
    }

    getError(hasError) {
      if (!this.state._hasError && !hasError) return;
      let errorMessage = this.state.emptyMessage;

      if (hasError || this.input.value !== '') {
        errorMessage = this.props.errorMessage ? this.props.errorMessage : this.state.errorMessage;
      }

      if (this.props.max && parseFloat(this.input.value) > parseInt(this.props.max)) {
        errorMessage = this.props.lengthMessage ? this.props.lengthMessage : this.state.lengthMessage + ` (max ${this.props.max})`;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-element-input-error"
      }, errorMessage);
    }

    render() {
      const props = this.props;
      const error = this.getError(props.hasError);
      let properties = { ...props
      };
      let cls = 'beyond-element-input ';
      cls += props.className ? props.className : '';
      cls += props.icon ? ' has-icon' : '';
      delete properties.className;
      delete properties.hasError;
      delete properties.errorMessage;
      delete properties.children;
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, /*#__PURE__*/React.createElement("input", _extends({
        ref: this.input
      }, properties, {
        className: cls,
        onChange: this.handleChange,
        type: props.type ? props.type : 'text',
        value: typeof props.value !== 'undefined' ? props.value : this.state.value,
        placeholder: props.placeholder
      })), this.props.children, error, this.props.label && /*#__PURE__*/React.createElement("label", null, this.props.label, this.props.required && /*#__PURE__*/React.createElement("span", {
        className: "beyond-input__required-label"
      }, "*")));
    }

  }
  /******************
  radio-container.jsx
  ******************/


  _exports2.BeyondInput = BeyondInput;

  class BeyondRadioContainer extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-radio-container"
      });
    }

  }
  /********
  radio.jsx
  ********/


  _exports2.BeyondRadioContainer = BeyondRadioContainer;

  class BeyondRadio extends React.Component {
    constructor(props) {
      super(props);
      this.input = React.createRef();
      this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
      this.input.current.checked = true;
      if (!!this.props.onChange) this.props.onChange(event);
    }

    render() {
      const props = this.props;
      let properties = { ...props
      };
      delete properties.onChange;
      let cls = `beyond-element-radio ${properties.className ? properties.className : ''}`;
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, /*#__PURE__*/React.createElement("input", _extends({
        ref: this.input
      }, properties, {
        type: "radio",
        onChange: this.onClick
      })), properties.label && /*#__PURE__*/React.createElement("label", {
        htmlFor: properties.id
      }, properties.label));
    }

  }
  /*********
  switch.jsx
  *********/


  _exports2.BeyondRadio = BeyondRadio;

  class BeyondSwitch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: props.value ?? false
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({
        'checked': !this.state.checked,
        'value': !this.state.checked,
        '_hasError': false
      });
      this.props.onChange && this.props.onChange(event);
    }

    get checked() {
      return this.state.checked;
    }

    render() {
      const {
        state,
        props
      } = this;
      let cls = 'beyond-element-switch ';
      cls += props.className ? props.className : '';
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, /*#__PURE__*/React.createElement("label", {
        className: "switch"
      }, /*#__PURE__*/React.createElement("input", {
        ref: "input",
        type: "checkbox",
        required: props.required,
        name: props.name,
        value: props.value,
        checked: state.checked,
        disabled: props.disabled,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("span", {
        className: "slider"
      })));
    }

  }
  /***********
  textarea.jsx
  ***********/


  _exports2.BeyondSwitch = BeyondSwitch;

  class BeyondTextarea extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        'value': this.props.value
      };
    }

    handleChange(event) {
      if (!!this.props.onChange) this.props.onChange(event);
      this.setState({
        'value': event.target.value
      });
    }

    render() {
      const props = this.props;
      let cls = 'beyond-element-textarea ';
      cls += props.className ? props.className : '';
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, this.props.label && /*#__PURE__*/React.createElement("label", null, this.props.label), /*#__PURE__*/React.createElement("textarea", {
        ref: this.props.textareaRef,
        required: props.required,
        autoFocus: this.props.autoFocus,
        name: props.name,
        rows: props.rows,
        value: typeof props.value !== 'undefined' ? props.value : this.state.value,
        disabled: props.disabled,
        pattern: props.pattern,
        onChange: this.handleChange,
        onFocus: this.props.onFocus,
        placeholder: props.placeholder ? props.placeholder : props.name
      }), this.props.error && /*#__PURE__*/React.createElement("span", {
        className: "error"
      }, this.props.error), this.props.children);
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondTextarea = BeyondTextarea;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@import url(https://fonts.googleapis.com/css?family=Roboto);@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-button{outline:0;display:inline-grid;align-items:center;justify-content:center;grid-gap:5px;grid-auto-flow:column}.beyond-button:active,.beyond-button:focus,.beyond-button:hover{outline:0}.beyond-button.icon-right,.beyond-button.right-icon{grid-template-columns:1fr auto}.beyond-button.icon-left,.beyond-button.left-icon{grid-template-columns:auto 1fr}.beyond-button.secondary{background:#121f36;color:#fff;border:1px solid #050910;transition:all .3s ease-in-out}.beyond-button.secondary:hover{background:#050910;transition:all .3s ease-in}.beyond-button.primary{background:#ff8056;color:#fff;border:1px solid #e36152;transition:all .3s ease-in-out}.beyond-button.primary:hover{background:#e36152;transition:all .3s ease-in}.beyond-checkbox.checkbox-btn{border:1px solid #a2000a;color:#a2000a;display:inline-grid;width:auto;padding:8px;border-radius:15px;transition:all ease-in 150ms}.beyond-checkbox.checkbox-btn .checkmark{display:none}.beyond-checkbox.checkbox-btn.beyond-checkbox-checked{background:#a2000a;color:#e36152}.beyond-checkbox{display:inline-flex;flex-direction:row;align-items:center;cursor:pointer}.beyond-checkbox.left{flex-direction:row}.beyond-checkbox.left .checkmark{margin-right:5px}.beyond-checkbox.right{flex-direction:row-reverse}.beyond-checkbox.right .checkmark{margin-left:5px}.beyond-checkbox input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.beyond-checkbox .checkmark{position:relative;height:12px;width:12px;margin:5px;background-color:var(--beyond-border-color);border:var(--beyond-border-color) 2px solid;border-radius:50%}.beyond-checkbox input:checked~.checkmark{background-color:var(--beyond-primary-color);border:var(--beyond-border-color) 2px solid}.beyond-checkbox label{width:100%;display:inline-flex;margin:0 5px!important}.beyond-element-input .beyond-element-input-error{position:absolute;display:block;font-size:.8em;padding:5px 15px;bottom:-30px;color:var(--beyond-color-error)}.beyond-element-input.has-icon{display:flex;flex-wrap:nowrap;align-items:stretch}.beyond-element-input.has-icon .beyond-icon-button{width:50px;height:auto}.beyond-element-input.has-icon .beyond-icon-button,.beyond-element-input.has-icon .beyond-icon-button .beyond-ripple{border-radius:0}.beyond-element-group .beyond-element-input{width:100%}.beyond-element-input{position:relative;background:0 0;display:grid;outline:0;margin:10px 0;border-radius:0}.beyond-element-input.icon-right,.beyond-element-input.right-icon{grid-template-columns:1fr auto;align-items:center}.beyond-element-input.icon-left,.beyond-element-input.left-icon{grid-template-columns:auto 1fr}.beyond-element-input label{position:absolute;top:0;display:inline-block;transition:.2s;left:0;font-size:1rem;color:var(--beyond-text-color)}.beyond-element-input input{border-radius:0;width:100%;border:0;border-bottom:2px solid #333;outline:0;padding:10px 0;margin:10px 0 0;background:0 0;transition:border-color .2s}.beyond-element-input input::placeholder{color:transparent}.beyond-element-input input:invalid,.beyond-element-input input:required{box-shadow:none}.beyond-element-input input:focus-within~label{position:absolute;top:0;display:block;transition:.2s;font-size:.7rem;color:#a2000a}.beyond-element-input .beyond-element-input-error{color:#d2281e;position:absolute;bottom:-25px}@keyframes ripple{0%{box-shadow:0 0 0 1px transparent}50%{box-shadow:0 0 0 12px rgba(0,0,0,.1)}100%{box-shadow:0 0 0 12px transparent}}.beyond-element-radio{margin:16px 0}.beyond-element-radio *,.beyond-element-radio :after,.beyond-element-radio :before{box-sizing:border-box}.beyond-element-radio.--inline{display:inline-block}.beyond-element-radio input[type=radio]:checked+label:before{border-color:var(--beyond-primary-accent-color);animation:ripple .2s linear forwards;display:block}.beyond-element-radio input[type=radio]:checked+label:after{transform:scale(1);display:block}.beyond-element-radio label{display:inline-block;min-height:15px;position:relative;padding:0 25px;margin-bottom:0;font-size:17px;cursor:pointer;vertical-align:bottom}.beyond-element-radio label:after,.beyond-element-radio label:before{position:absolute;content:"";border-radius:50%;transition:all .3s ease;transition-property:transform,border-color}.beyond-element-radio label:before{left:0;top:0;width:15px;height:15px;border:2px solid #fff;display:block}.beyond-element-radio label:after{top:4.5px;left:4.5px;width:6px;height:6px;transform:scale(0);background:#121f36;display:block!important}.beyond-element-switch .switch{position:relative;display:inline-block;width:50px;height:24px}.beyond-element-switch .switch input{opacity:0;width:0;height:0}.beyond-element-switch .switch input:focus+.slider{box-shadow:0 0 1px #2196f3}.beyond-element-switch .switch input:checked+.slider{background-color:var(--beyond-secondary-color);border-color:var(--beyond-secondary-color)}.beyond-element-switch .switch input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.beyond-element-switch .switch input:focus+.slider{box-shadow:0 0 1px var(--beyond-secondary-color)}.beyond-element-switch .switch .slider{position:absolute;top:0;left:0;bottom:0;right:0;cursor:pointer;background-color:var(--beyond-gray-light-color);border:1px solid var(--beyond-gray-light-color);-webkit-transition:.4s;transition:.4s;border-radius:34px;box-sizing:border-box}.beyond-element-switch .switch .slider:before{position:absolute;top:1px;left:1px;bottom:0;right:0;content:"";height:20px;width:20px;background-color:var(--beyond-text-color);-webkit-transition:.4s;transition:.4s;border-radius:50%}.beyond-element-switch.round .slider{border-radius:34px}.beyond-element-switch.round .slider:before{border-radius:50%}.beyond-element-textarea{position:relative;display:block;min-width:300px;min-height:80px;grid-row-gap:0;border:var(--beyond-border-color);margin-bottom:10px}.beyond-element-textarea textarea{width:100%;border-radius:30px;background:var(--beyond-background-color);border:var(--beyond-border-color);padding:15px;color:var(--beyond-secondary-contrast-color);height:80px;border:1px solid var(--beyond-gray-lighter-color);resize:vertical;letter-spacing:.21px;font-weight:400;font-size:14px;text-align:left}.beyond-element-textarea label{padding-left:15px;color:var(--beyond-primary-accent-color);font-size:11px;font-weight:400;letter-spacing:.17px}.beyond-element-textarea ::placeholder{font-size:14px;font-weight:400;letter-spacing:.21px;color:var(--beyond-gray-light-color)}.btn{border-radius:30px}.beyond-button{border-radius:30px;padding:8px 20px;font-size:1.1rem;display:flex;align-items:center}.beyond-button.btn-large{width:60%;display:grid}.beyond-button.btn-block{padding:8px 100px}.beyond-button.primary{background-image:linear-gradient(to bottom,#ffa789,#e36152);color:#fff}.beyond-button.primary.icon-on-primary .beyond-icon{margin-left:8px;background:#fff;color:#ff8056;fill:#FF8056}.beyond-button.primary[disabled]{opacity:.7;cursor:not-allowed}.beyond-button.primary[disabled]:hover{background-image:linear-gradient(to bottom,#ffa789,#e36152)}.beyond-element-input label{font-size:1.2rem}.beyond-element-input input{border-bottom:1px solid #e4e5dc}.beyond-element-switch .switch input:focus+.slider{box-shadow:0 0 1px #ff8056}.beyond-element-switch .switch input:checked+.slider{background-color:#ff8056}';
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