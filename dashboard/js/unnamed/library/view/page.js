define(["exports", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/ui/icon/code", "@beyond-js/ui/perfect-scrollbar/code", "@beyond-js/dashboard/unnamed/modules/list/page", "@beyond-js/dashboard/core-components/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports2, _ts, _code, _code2, _page, _code3, _code4, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ListModules = void 0;
  _exports2.Page = Page;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/library/view/page', false, {
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
  /**********
  actions.jsx
  **********/

  class ApplicationActions extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        logged: auth.valid
      };
      this.updateUser = this.updateUser.bind(this);

      this.modal = modal => this.props.actions.addRefs({
        modal: modal
      });

      this.loginModal = modal => this.props.actions.addRefs({
        modal: modal
      });
    }

    componentDidMount() {
      auth.bind('login', this.updateUser);
    }

    componentWillUnmount() {
      auth.unbind('login', this.updateUser);
    }

    async updateUser() {
      const user = await auth.localSession.user;
      this.setState({
        user: user,
        logged: auth.valid
      });
    }

    process() {}

    render() {
      const {
        library,
        texts,
        actions,
        application
      } = this.props;
      const {
        user,
        logged
      } = this.state;
      const action = application.running ? "Play" : "Stop";
      return /*#__PURE__*/React.createElement("article", {
        className: "actions-container"
      }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "primary app-library-views-btn",
        onClick: this.process,
        title: action,
        name: action
      }), /*#__PURE__*/React.createElement(UploadButton, {
        className: "primary btn-action",
        type: "library",
        path: library.path
      })), /*#__PURE__*/React.createElement("section", {
        className: "text-right"
      }, /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "primary btn-action",
        title: texts.actions.publish,
        icon: "upload",
        name: "upload",
        onClick: actions.publish
      }), library.connect && /*#__PURE__*/React.createElement(_code4.BeyondButton, {
        className: "primary small details",
        onClick: () => actions.compile('client', library)
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        icon: "settings"
      }), texts.actions.compile))), logged ? /*#__PURE__*/React.createElement(PublishModal, {
        ref: this.modal,
        application: application,
        actions: actions,
        user: user
      }) : /*#__PURE__*/React.createElement(AuthLogin, {
        ref: this.loginModal
      }));
    }

  }
  /*******************
  details\excluded.jsx
  *******************/


  class Excluded extends React.Component {
    constructor(props) {
      super(props);
    }

    onClick(library) {//beyond.navigate(`/library/module/${library.name}`);
    }

    render() {
      const {
        excluded,
        library,
        texts
      } = this.props;
      if (!excluded || !excluded.items) return null;
      return /*#__PURE__*/React.createElement("div", {
        className: "detail"
      }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        className: "detail-icon",
        name: "chart-pie"
      }), /*#__PURE__*/React.createElement("div", {
        className: "detail-content"
      }, /*#__PURE__*/React.createElement("h3", null, texts.titles.excluded), /*#__PURE__*/React.createElement("article", {
        className: "collapse-container"
      }, excluded.items.map(excluded => /*#__PURE__*/React.createElement("p", {
        key: excluded.id
      }, excluded.path)))), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "detail-icon",
        icon: "expandMore"
      }));
    }

  }
  /********************
  details\libraries.jsx
  ********************/


  class Libraries extends React.Component {
    constructor(props) {
      super(props);
    }

    onClick(library) {//beyond.navigate(`/library/module/${library.name}`);
    }

    render() {
      let {
        libraries,
        texts
      } = this.props;
      let count = libraries && libraries.counters.all.fetched ? libraries.counters.all.value : 0;
      return /*#__PURE__*/React.createElement("div", {
        className: "detail"
      }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        className: "detail-icon",
        name: "archive"
      }), /*#__PURE__*/React.createElement("div", {
        className: "detail-content"
      }, /*#__PURE__*/React.createElement("h3", null, texts.titles.libraries), /*#__PURE__*/React.createElement("div", {
        className: "description"
      }, "(", count, ") ", texts.elements.count), /*#__PURE__*/React.createElement("article", {
        className: "collapse-container"
      })), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "detail-icon",
        icon: "expandMore"
      }));
    }

  }
  /*****************
  details\routes.jsx
  *****************/


  class Routes extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let {
        texts
      } = this.props;
      const routes = [{
        'id': 1,
        'path': 'c://ruta/libraries'
      }]; //remplazar por el original

      return /*#__PURE__*/React.createElement("div", {
        className: "detail"
      }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        className: "detail-icon",
        name: "folder-plus"
      }), /*#__PURE__*/React.createElement("div", {
        className: "detail-content"
      }, /*#__PURE__*/React.createElement("h3", null, texts.titles.routes), /*#__PURE__*/React.createElement("article", {
        className: "collapse-container"
      }, routes.map(route => /*#__PURE__*/React.createElement("p", {
        key: route.id
      }, route.path)))), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "detail-icon",
        icon: "expandMore"
      }));
    }

  }
  /***********************
  details\static-files.jsx
  ***********************/


  class StaticFiles extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let {
        statics,
        texts
      } = this.props;
      if (!statics || !statics.items) return null;
      return /*#__PURE__*/React.createElement("div", {
        className: "detail"
      }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        className: "detail-icon",
        name: "archive"
      }), /*#__PURE__*/React.createElement("div", {
        className: "detail-content"
      }, /*#__PURE__*/React.createElement("h3", null, texts.titles.excluded), /*#__PURE__*/React.createElement("article", {
        className: "collapse-container"
      }, statics.items.map(statics => /*#__PURE__*/React.createElement("p", {
        key: statics.id
      }, statics.path)))), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "detail-icon",
        icon: "expandMore"
      }));
    }

  }
  /*****************
  details\static.jsx
  *****************/


  function Static({
    statics,
    texts
  }) {
    if (!statics || !statics.items) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "detail"
    }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
      className: "detail-icon",
      name: "archive"
    }), /*#__PURE__*/React.createElement("div", {
      className: "detail-content"
    }, /*#__PURE__*/React.createElement("h3", null, texts.titles.static), /*#__PURE__*/React.createElement("article", {
      className: "collapse-container"
    }, statics.items.map(statics => /*#__PURE__*/React.createElement("p", {
      key: statics.id
    }, statics.path)))), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
      className: "detail-icon",
      icon: "expandMore"
    }));
  }
  /******************
  details\statics.jsx
  ******************/


  function Statics({
    library,
    texts
  }) {
    const {
      statics
    } = library;
    if (!statics) return null;
    const port = library.servers.value[0].port;
    const items = [];
    const [openCollapse, setOpen] = React.useState(false);

    const open = event => {
      const target = event.currentTarget;
      const element = statics[target.dataset.index];
      window.open(`http://localhost:${port}/${element.filename}`, '_BLANK');
    };

    const icon = openCollapse ? 'arrowDropDown' : 'arrowDropUp';
    let clsContainer = 'detail';
    if (openCollapse) clsContainer += ' opened';
    statics.map((file, index) => {
      items.push( /*#__PURE__*/React.createElement("div", {
        className: "element-item",
        "data-index": index,
        onClick: open,
        key: index
      }, file.filename));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: clsContainer
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
      className: "detail-icon",
      name: "archive"
    }), /*#__PURE__*/React.createElement("div", {
      className: "title-content"
    }, /*#__PURE__*/React.createElement("h3", null, texts.titles.static)), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
      onClick: () => setOpen(!openCollapse),
      className: "detail-icon",
      icon: icon
    })), /*#__PURE__*/React.createElement(_code2.BeyondScrollContainer, {
      className: "collapse-container"
    }, items));
  }
  /*******************
  details\template.jsx
  *******************/


  class Template extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return /*#__PURE__*/React.createElement("article", {
        className: 'template-item'
      }, /*#__PURE__*/React.createElement("p", null, "name: "), /*#__PURE__*/React.createElement("p", null, "processors: "), /*#__PURE__*/React.createElement("p", null, "overwrites: "));
    }

  }
  /********************
  details\templates.jsx
  ********************/


  class Templates extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let {
        texts
      } = this.props;
      const templates = [{
        'id': 1,
        'path': 'c://ruta/libraries'
      }]; //remplazar library por libraries.items

      return /*#__PURE__*/React.createElement("div", {
        className: "detail"
      }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        className: "detail-icon",
        name: "archive"
      }), /*#__PURE__*/React.createElement("div", {
        className: "detail-content"
      }, /*#__PURE__*/React.createElement("h3", null, texts.titles.temoplates), /*#__PURE__*/React.createElement("article", {
        className: "collapse-container"
      }, templates.map(template => /*#__PURE__*/React.createElement("p", {
        key: template.id
      }, template.path)))), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "detail-icon",
        icon: "expandMore"
      }));
    }

  }
  /*********
  errors.jsx
  *********/


  function LibraryErrors({
    library,
    texts
  }) {
    const {
      errors,
      warnings
    } = library;
    const output = [];

    if (errors.length) {
      const errorsOutput = [];
      errors.map((error, index) => {
        errorsOutput.push( /*#__PURE__*/React.createElement("div", {
          key: `error-${index}`
        }, error));
      });
      output.push( /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
        title: texts.titles.errors,
        key: "errors",
        className: "error"
      }, errorsOutput));
    }

    if (warnings.length) {
      const warningsOutput = [];
      warnings.map((error, index) => {
        warningsOutput.push( /*#__PURE__*/React.createElement("div", {
          key: `error-${index}`
        }, error));
      });
      output.push( /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
        key: "warnings",
        className: "error"
      }, warningsOutput));
    }

    return /*#__PURE__*/React.createElement("header", {
      className: "item message"
    }, output);
  }
  /***************
  list-modules.jsx
  ***************/


  class ListModules extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        texts,
        library
      } = this.props;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LibraryErrors, {
        library: library,
        texts: texts
      }), /*#__PURE__*/React.createElement(_page.ModulesList, {
        collection: library,
        filter: "library",
        texts: texts
      }));
    }

  }
  /******************
  modules\modules.jsx
  ******************/


  _exports2.ListModules = ListModules;

  class Modules extends React.Component {
    onClickModules(library) {
      beyond.navigate(`/library/modules/${library.name}`);
    }

    render() {
      const {
        modules,
        library,
        texts
      } = this.props;
      if (!modules.loaded) return null;
      const list = [];
      let count = modules.counters.all.fetched ? modules.counters.all.value : '0';
      return /*#__PURE__*/React.createElement("section", {
        className: "detail",
        onClick: () => this.onClickModules(library)
      }, /*#__PURE__*/React.createElement(_code3.DashboardIcon, {
        className: "detail-icon",
        name: "folder-plus"
      }), /*#__PURE__*/React.createElement("div", {
        className: "detail-content"
      }, /*#__PURE__*/React.createElement("h3", null, texts.titles.modules), /*#__PURE__*/React.createElement("div", {
        className: "description"
      }, "(", count, ") ", texts.elements.count)), /*#__PURE__*/React.createElement(_code3.DashboardIconButton, {
        className: "detail-icon",
        icon: "expandMore"
      }));
    }

  }
  /*******
  view.jsx
  *******/


  class View extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'library': this.props.library,
        'actions': props.actions,
        'texts': props.texts.value,
        'ready': props.texts.ready
      };

      this.update = () => this.setState({
        'ready': props.texts.ready,
        'texts': props.texts.value
      });
    }

    componentDidMount() {
      this.props.library.bind('change', this.update);
      this.props.texts.bind('change', this.update);
    }

    componentWillUnmount() {
      this.props.texts.unbind('change', this.update);
    }

    render() {
      const {
        library,
        actions,
        ready,
        texts
      } = this.state;
      if (!library.loaded || !ready) return null;
      return /*#__PURE__*/React.createElement(ListModules, {
        texts: texts,
        library: library,
        actions: actions
      });
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: actions.js
  ***************/


  function Actions(model) {
    this.open = () => window.open(model.url, '_blank');

    this.compile = (layer, application) => beyond.navigate(`/library/compile/${application.name}`);

    this.storeDescription = async value => {
      model.description = value;

      try {
        await model.publish();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    };
  }
  /************
  FILE: page.js
  ************/


  function Page() {
    const library = new _ts.Library({
      identifier: {
        id: parseInt(this.vdir)
      },
      tree: {
        properties: {
          modules: {
            properties: {
              counters: true,
              module: {
                properties: {
                  container: true,
                  bundles: {
                    properties: {
                      processors: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    library.load({
      modules: {
        counters: {
          all: true
        }
      }
    });
    const actions = new Actions(library);
    ReactDOM.render(React.createElement(View, {
      library: library,
      actions: actions,
      texts: module.texts
    }), this.container);
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}';
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