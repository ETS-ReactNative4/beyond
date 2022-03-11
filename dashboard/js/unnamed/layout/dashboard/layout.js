define(["exports", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard/unnamed/components/notify/js", "@beyond-js/dashboard/unnamed/layout/toolbar/code", "@beyond-js/ui/modal/code", "@beyond-js/ui/form/code", "@beyond-js/ui/image/code", "@beyond-js/ui/perfect-scrollbar/code", "@beyond-js/ui/toast/code", "react", "react-dom"], function (_exports2, _js, _js2, _code, _code2, _code3, _code4, _code5, _code6, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.DsDocs = void 0;
  _exports2.Layout = Layout;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/layout/dashboard/layout', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /***********
  docs\app.jsx
  ***********/

  function AppDoc({
    closeModal
  }) {
    const go = event => {
      closeModal();
      beyond.navigate('/create_app');
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("h4", null, "Aplicaciones en Beyond")), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal_content pd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "img-list"
    }, /*#__PURE__*/React.createElement(_code4.BeyondImage, {
      src: "/images/logos/js.png"
    }), /*#__PURE__*/React.createElement(_code4.BeyondImage, {
      src: "/images/logos/react.png"
    }), /*#__PURE__*/React.createElement(_code4.BeyondImage, {
      src: "/images/logos/socket-1.png"
    }), /*#__PURE__*/React.createElement(_code4.BeyondImage, {
      src: "/images/logos/typescript.png"
    })), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, "Al crear una nueva aplicaci\xF3n, este dashboard va a crear autom\xE1ticamente los archivos de configuraci\xF3n necesarios para que puedas comenzar a trabajar em tu nueva app."), /*#__PURE__*/React.createElement("p", {
      className: "p1"
    }, "Para conocer todas las opciones disponibles de configuraci\xF3n y los detalles de estos archivos puedes revisar la documentaci\xF3n completa"), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement(_code3.BeyondButton, {
      className: "primary",
      onClick: go
    }, "Crear mi primera aplicaci\xF3n"))));
  }
  /****************
  documentation.jsx
  ****************/


  function Documentation({
    onClose,
    doc
  }) {
    const DOCS = {
      app: AppDoc
    };
    if (!DOCS.hasOwnProperty(doc)) return null;
    const Control = DOCS[doc];
    return /*#__PURE__*/React.createElement(_code2.BeyondModal, {
      className: "ds-modal ds-modal-doc md pd",
      show: true,
      onClose: onClose
    }, /*#__PURE__*/React.createElement(Control, null));
  }
  /*********
  layout.jsx
  *********/


  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.docs = props.docs;
      this.container = React.createRef();
      this.scroll = React.createRef();
      this.props.parent.bind('change', () => this.setState({}));

      this.update = () => this.setState({});

      this.openDoc = this.openDoc.bind(this);
      this.onScroll = this.onScroll.bind(this);
    }

    onScroll(e, target, ps) {
      if (!ps?.reach?.y) {
        e.currentTarget.classList.add('sticky');
        return;
      }

      if (ps?.reach?.y === 'start') {
        e.currentTarget.classList.remove('sticky');
      }
    }

    componentDidMount() {
      this.props.parent.rendered();
      this.docs.bind('change', this.update);
    }

    openDoc(doc) {
      this.setState({
        openDoc: true,
        doc: doc
      });
    }

    componentWillUnmount() {
      this.docs.unbind('change', this.update);
      this.scroll.current.removeEventListener('ps-scroll-y', this.onScroll);
    }

    render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "dashboard-layout",
        ref: this.container
      }), this.docs.showing && /*#__PURE__*/React.createElement(Documentation, {
        doc: this.docs.current,
        onClose: this.docs.clean
      }));
    }

  }
  /*********
  notify.jsx
  *********/


  class Notify extends React.Component {
    constructor(props) {
      super(props);
      this.notify = _js2.NotifyManager;

      this.update = () => this.context.add(this.notify.value);
    }

    componentDidMount() {
      this.notify.bind('change', this.update);
    }

    componentWillUnmount() {
      this.notify.bind('change', this.update);
    }

    render() {
      return null;
    }

  }

  Notify.contextType = _code6.ToastContext;
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: docs.js
  ************/

  class DashboardDocs extends _js.ReactiveModel {
    _showing;
    _current;

    constructor() {
      super();
      this.clean = this.clean.bind(this);
      this.open = this.open.bind(this);
    }

    get showing() {
      return this._showing;
    }

    get current() {
      return this._current;
    }

    open(doc) {
      this._showing = true;
      this._current = doc;
      this.triggerEvent();
    }

    clean() {
      this._showing = false;
      this._current = undefined;
      this.triggerEvent();
    }

  }

  const DsDocs = new DashboardDocs();
  /**************
  FILE: layout.js
  **************/

  _exports2.DsDocs = DsDocs;

  function Layout() {
    this.control = ReactDOM.render(React.createElement(Control, {
      parent: this,
      docs: DsDocs
    }), this.container);
    this.container.classList.add('beyond-dashboard-layout');
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-modal.ds-modal-doc .modal-content .img-list{display:flex;gap:15px;justify-content:center}.ds-modal.ds-modal-doc .modal-content .img-list .beyond-element-image img{object-fit:cover;height:50px;width:50px}.beyond-dashboard-layout{min-width:800px;overflow-x:hidden}.beyond-dashboard-layout .dashboard-scroll-container{height:100vh;display:grid;grid-template-rows:auto 1fr auto;transition:all .3s ease-in}';
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