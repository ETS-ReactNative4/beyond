define(["exports", "@beyond-js/ui/icon/code", "@beyond-js/ui/image/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Page = Page;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/layout-test/page', false, {
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
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/

  function Page() {
    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.id = 'app-layout';
  }
  /***********************
  FILE: sidebar-options.js
  ***********************/


  const sidebarOptions = [{
    id: '1',
    name: 'Paginas',
    href: '#',
    icon: 'pages'
  }, {
    id: '2',
    name: 'Usuarios',
    href: '#',
    icon: 'user'
  }, {
    id: '3',
    name: 'Tendencias',
    href: '#',
    icon: 'trends'
  }, {
    id: '4',
    name: 'Colecciones',
    href: '#',
    icon: 'collection'
  }, {
    id: '5',
    name: 'Comentarios',
    href: '#',
    icon: 'comments'
  }, {
    id: '6',
    name: 'Apariencia',
    href: '#',
    icon: 'appearance'
  }];
  const sidebarOptionsSettings = [{
    id: '1',
    name: 'Configuracion',
    href: '#',
    icon: 'settings'
  }, {
    id: '2',
    name: 'Opciones',
    href: '#',
    icon: 'options'
  }, {
    id: '3',
    name: 'Encuestas',
    href: '#',
    icon: 'charts'
  }];
  /***************
  sidebar-item.jsx
  ***************/

  const SidebarItem = ({
    href,
    icon,
    text
  }) => {
    return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: href
    }, /*#__PURE__*/React.createElement(_code.BeyondIcon, {
      icon: icon
    }), /*#__PURE__*/React.createElement("span", null, text)));
  };
  /*******
  view.jsx
  *******/


  function View() {
    const [state, setState] = React.useState(false);

    const handleClick = e => {
      e.stopPropagation();
      setState(!state);
    };

    const sidebarItems = sidebarOptions.map(item => {
      return /*#__PURE__*/React.createElement(SidebarItem, {
        key: item.id,
        href: item.href,
        icon: item.icon,
        text: item.name
      });
    });
    const sidebarItemsSettings = sidebarOptionsSettings.map(item => {
      return /*#__PURE__*/React.createElement(SidebarItem, {
        key: item.id,
        href: item.href,
        icon: item.icon,
        text: item.name
      });
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "page-header"
    }, /*#__PURE__*/React.createElement("nav", {
      onClick: () => setState(!state)
    }, /*#__PURE__*/React.createElement(_code2.BeyondImage, {
      className: "logo",
      src: "/images/logo.png",
      alt: "logo"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: handleClick,
      className: "toggle-mob-menu"
    }, /*#__PURE__*/React.createElement(_code.BeyondIcon, {
      icon: "arrowDropDown"
    })), /*#__PURE__*/React.createElement("ul", {
      className: state ? "admin-menu menu-visibility" : "admin-menu"
    }, /*#__PURE__*/React.createElement("li", {
      className: "menu-heading"
    }, /*#__PURE__*/React.createElement("h3", null, "Admin")), sidebarItems, /*#__PURE__*/React.createElement("li", {
      className: "menu-heading"
    }, /*#__PURE__*/React.createElement("h3", null, "Settings")), sidebarItemsSettings, /*#__PURE__*/React.createElement("li", null)))), /*#__PURE__*/React.createElement("section", {
      className: "page-content"
    }, /*#__PURE__*/React.createElement("section", {
      className: "search-and-user"
    }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("input", {
      type: "search",
      placeholder: "Search ...",
      readOnly: true
    }), /*#__PURE__*/React.createElement(_code3.BeyondButton, {
      type: "submit",
      "aria-label": "submit form"
    }, /*#__PURE__*/React.createElement(_code.BeyondIcon, {
      icon: "searchSolid"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "admin-profile"
    }, /*#__PURE__*/React.createElement("span", {
      className: "greeting"
    }, "Hello admin"), /*#__PURE__*/React.createElement("div", {
      className: "notifications"
    }, /*#__PURE__*/React.createElement("span", {
      className: "badge"
    }, "1"), /*#__PURE__*/React.createElement(_code.BeyondIcon, {
      icon: "user"
    })))), /*#__PURE__*/React.createElement("section", {
      className: "grid"
    }, /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null), /*#__PURE__*/React.createElement("article", null)), /*#__PURE__*/React.createElement("footer", {
      className: "page-footer"
    }, /*#__PURE__*/React.createElement("span", null, "Hecho con \u2764 por "), /*#__PURE__*/React.createElement(_code2.BeyondImage, {
      src: "/images/logo.png",
      alt: "logo"
    }))));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@charset "UTF-8";@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}ul{list-style:none}a,button{color:inherit}a{text-decoration:none}button{background:0 0;cursor:pointer}input{-webkit-appearance:none}[type=checkbox]{position:absolute;left:-9999px}label{cursor:pointer}button,input{border:none}svg{display:block}.page-header{position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto;padding-top:20px;width:220px;color:#e4e5dc;background-color:#121f36}.page-header nav{display:flex;flex-direction:column;min-height:100%}.page-header .logo{display:block;padding-left:3rem}.page-header .logo img{max-width:120px}.page-header .toggle-mob-menu{display:none;margin-left:30px;padding:4px;background-color:#fff;border-radius:4px}.page-header .toggle-mob-menu img{transition:transform .2s}.page-header .admin-menu{display:flex;flex-direction:column;flex-grow:1}.page-header .admin-menu li:nth-last-child(2){margin-bottom:35px}.page-header .admin-menu li:last-child{margin-top:auto;margin-bottom:20px}.page-header .admin-menu li>*{width:100%;padding:12px 15px}.page-header .admin-menu .menu-heading h3{text-transform:uppercase;letter-spacing:.15em;font-size:12px;margin-top:12px;color:#7889a4}.page-header .admin-menu svg{width:20px;height:20px;fill:#E4E5DC;margin-right:10px}.page-header .admin-menu a,.page-header .admin-menu button{display:flex;align-items:center;font-size:.9rem}.page-header .admin-menu a:focus,.page-header .admin-menu a:hover,.page-header .admin-menu button:focus,.page-header .admin-menu button:hover{background:#050910;color:#00b9eb;outline:0}.page-header .admin-menu a:focus svg,.page-header .admin-menu a:hover svg,.page-header .admin-menu button:focus svg,.page-header .admin-menu button:hover svg{fill:#00b9eb}.page-content{position:relative;left:220px;width:calc(100% - 220px);min-height:100vh;color:#333;background:#f0f0f0}.page-content .search-and-user{display:grid;grid-template-columns:1fr auto;grid-column-gap:50px;align-items:center;background-color:#121f36;height:6rem;margin-bottom:30px}.page-content .search-and-user form{position:relative}.page-content .search-and-user form svg{width:26px;height:26px;fill:#333333}.page-content .search-and-user form button{position:absolute;top:50%;right:11%;transform:translateY(-50%)}.page-content .search-and-user input{width:80%;height:50px;font-size:1.5rem;padding-left:15px;background:#fff;color:#fff;border-radius:4px;box-shadow:0 0 10px -2px rgba(0,0,0,.075);margin-left:7rem}.page-content .search-and-user input::placeholder{color:#333}.page-content .search-and-user .admin-profile{display:flex;align-items:center;margin-right:2rem}.page-content .search-and-user .admin-profile .greeting{margin:0 10px 0 20px;color:#fff}.page-content .search-and-user .admin-profile svg{width:30px;height:30px;fill:#fff}.page-content .search-and-user .admin-profile .notifications{position:relative}.page-content .search-and-user .admin-profile .badge{display:flex;align-items:center;justify-content:center;position:absolute;top:-10px;right:-3px;width:18px;height:18px;border-radius:50%;font-size:10px;color:#fff;background-color:#ef000f}.page-content .grid{display:grid;grid-template-columns:repeat(2,1fr);grid-gap:30px;padding:0 2rem 1rem}.page-content .grid>article{display:flex;height:300px;background:#fff;border-radius:4px;box-shadow:0 0 10px -2px rgba(0,0,0,.075)}.page-content .grid>article:first-child,.page-content .grid>article:last-child{grid-column:1/-1}@media screen and (max-width:767px){.page-content,.page-header{position:static;width:100%}.page-header{padding:10px}.page-header nav{flex-direction:row}.page-header .logo{margin:0;padding:0}.page-header .logo svg{width:83px;height:35px}.page-header .toggle-mob-menu{display:block}.page-header .toggle-mob-menu svg{margin:0 auto}.page-header .admin-menu{position:absolute;left:98px;top:35px;margin-top:0;z-index:2;border-radius:4px;background:#121f36;visibility:hidden;opacity:0;transform:scale(.95);padding:1rem .5rem;transition:all .4s cubic-bezier(.18, .89, .43, 1.19)}.page-header .admin-menu li:nth-last-child(2){margin-bottom:12px}.page-header .admin-menu .search-and-user .admin-profile .greeting,.page-header .admin-menu :last-child button{display:none}.page-header .admin-menu.menu-visibility{visibility:visible;opacity:1}.page-content{min-height:0;padding:10px}.page-content .search-and-user{position:absolute;left:131px;top:-12px;padding:0;grid-column-gap:5px;width:calc(100% - 141px);border-radius:4px;background:0 0}.page-content .search-and-user input{font-size:1rem;height:35px}.page-content .search-and-user form button{right:15px}.page-content .search-and-user form svg{width:18px;height:18px}.page-content .search-and-user .admin-profile .greeting{color:#fff}.page-content .search-and-user .admin-profile svg{fill:#fff}.page-content .grid{grid-gap:10px}}@media screen and (max-width:400px){.page-content .grid>article{grid-column:1/-1}}.page-footer{font-size:1rem;display:flex;align-items:center;justify-content:flex-end;margin-top:10px;column-gap:1rem;padding:1rem 2rem}.page-footer .beyond-element-image{margin:0}.page-footer .beyond-element-image img{width:100px}';
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