define(["exports", "@beyond-js/dashboard/core-components/code", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Page = Page;
  _exports2.hmr = void 0;

  function A(b) {
    b.items.forEach(item => {
      item.ejecutar(() => console.log(item.name));
    });
  }

  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/core/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /************
  dashboard.jsx
  ************/

  function IconsList({
    icons
  }) {
    const [filterText, setFilterText] = React.useState("");
    const [labelIcon, setLabelIcon] = React.useState('Nombre del ícono');
    const codeCopy = React.useRef();

    const filter = event => setFilterText(event.currentTarget.value);

    icons = icons.filter(item => item.includes(filterText));

    const setName = ({
      currentTarget: target
    }) => setLabelIcon(target.dataset.name);

    const copy = event => {
      /* Select the text field */
      const copyText = codeCopy.current;
      /* Copy the text inside the text field */

      navigator.clipboard.writeText(copyText.innerText);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
      className: "input__search",
      type: "text",
      onChange: filter
    }), /*#__PURE__*/React.createElement("pre", {
      ref: codeCopy,
      onClick: copy
    }, `<DSIcon  icon="${labelIcon}"/>`), /*#__PURE__*/React.createElement("div", {
      className: "icon-list"
    }, icons.map((iconName, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: iconName,
        className: "icon-element",
        "data-name": iconName,
        onClick: setName
      }, iconName, /*#__PURE__*/React.createElement(_code.DSIcon, {
        className: "",
        icon: iconName
      }));
    })));
  }
  /*******
  view.jsx
  *******/


  function View() {
    const ICONS = {
      dashboard: {
        title: 'Dashboard Icons',
        icons: _code.DS_ICONS
      },
      beyondui: {
        title: 'Beyond Icons',
        icons: _code2.BEYOND_ICONS
      }
    };
    const [selected, setSelected] = React.useState(ICONS.dashboard);
    const iconsList = Object.keys(selected.icons).sort((a, b) => a.localeCompare(b));

    const changeIcons = event => {
      event.preventDefault();
      const target = event.currentTarget;
      setSelected(ICONS[target.dataset.icons]);
      target.closest('aside').querySelectorAll('div').forEach(item => item.classList.remove('active'));
      target.classList.add('active');
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "page__icons-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "page__content"
    }, /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
      "data-icons": "dashboard",
      onClick: changeIcons
    }, "Dashboard"), /*#__PURE__*/React.createElement("div", {
      "data-icons": "beyondui",
      onClick: changeIcons
    }, "Beyond"))), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, selected.title)), /*#__PURE__*/React.createElement(IconsList, {
      icons: iconsList
    }))));
  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const specs = {};
    ReactDOM.render(React.createElement(View, specs), this.container);
    this.container.id = 'beyond-element-icons-page';
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.page__icons-container .page__content nav{display:flex;flex-direction:column;grid-gap:8px;position:sticky;top:30px}.page__icons-container .page__content nav div{padding:15px 20px;cursor:pointer;background:#050910;transition:.3s all ease-in}.page__icons-container .page__content nav div.active,.page__icons-container .page__content nav div:hover{background:#a2000a}.page__icons-container{text-align:center;padding:30px}.page__icons-container header{display:flex;align-content:flex-start}.page__icons-container .page__content{display:grid;grid-template-columns:auto 1fr;gap:15px}.page__icons-container .input__search{width:100%;background:0 0;border:1px solid #fff;margin:0 0 15px 0;padding:8px;color:#fff}.page__icons-container svg{fill:white}.page__icons-container pre{display:block;padding:9.5px 20px;margin:0 0 10px;font-size:13px;text-align:left;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px;cursor:pointer;transition:.3s all ease-in}.page__icons-container pre:hover{background:#e4e5dc}.page__icons-container .icon-list{margin-top:20px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr}.page__icons-container .icon-list .icon-element{text-align:center;padding:20px;font-size:16px;display:grid;grid-gap:10px;transition:250ms background-color;cursor:pointer;border:1px solid #050910}.page__icons-container .icon-list .icon-element:hover{background:#263145;color:#fff;fill:#FFFFFF}.page__icons-container .icon-list .icon-element .beyond-icon{margin:auto}';
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