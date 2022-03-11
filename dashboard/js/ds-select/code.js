define(["exports", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.DSSelect = DSSelect;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/ds-select/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*********
  select.jsx
  *********/

  function DSSelect({
    options,
    value,
    name,
    label,
    onSelect
  }) {
    const [opened, toggle] = React.useState();
    const [labelText, setValue] = React.useState(value ? value : label);
    const icon = opened ? 'arrowDropUp' : 'arrowDropDown';
    const map = new Map();

    const onClick = event => {
      event.preventDefault();
      toggle(!opened);
    };

    const select = event => {
      event.stopPropagation();
      event.preventDefault();
      toggle(!opened);
      const target = event.currentTarget;
      const ele = map.get(target.dataset.value);
      setValue(ele.label);
      ele.target = {
        name,
        value: ele.value
      };
      if (onSelect) onSelect(ele);
    };

    const items = options.map(item => {
      map.set(item.value, item);
      return /*#__PURE__*/React.createElement("div", {
        key: item.value,
        onClick: select,
        "data-value": item.value,
        className: "option"
      }, item.label);
    });
    const cls = `form__select ${opened ? ' opened' : ''}`;
    return /*#__PURE__*/React.createElement("div", {
      tabIndex: "0",
      className: cls,
      onClick: onClick,
      onFocus: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, /*#__PURE__*/React.createElement("span", null, labelText), /*#__PURE__*/React.createElement(_code.BeyondIcon, {
      icon: icon
    })), /*#__PURE__*/React.createElement("div", {
      className: "form__select__options"
    }, items));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.form__select{padding:8px 12px;border-radius:1px;border:1px solid #dee2e6;position:relative;cursor:pointer}.form__select .beyond-icon{position:absolute;right:15px;fill:var(--beyond-text-on-primary)}.form__select .form__select__options{position:absolute;left:0;right:0;margin-top:16px;display:none}.form__select .label{padding-right:40px}.form__select .label:first-letter{text-transform:uppercase}.form__select.opened .form__select__options{display:grid;background:var(--beyond-background-color);border:1px solid var(--beyond-secondary-dark-color);box-shadow:0 5px 5px -5px #333;z-index:10}.form__select.opened .form__select__options .option{padding:8px;color:var(--beyond-text-on-primary)}.form__select.opened .form__select__options .option:hover{background:var(--beyond-facebook-accent-color)}.form__select.opened .form__select__options .option:not(:first-child){border-top:1px solid #dee2e6}';
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