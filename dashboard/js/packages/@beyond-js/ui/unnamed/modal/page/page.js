define(["exports", "@beyond-js/ui/modal/code", "@beyond-js/ui/form/code", "@beyond-js/ui/import/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/modal/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /*******
  view.jsx
  *******/

  class PageView extends React.Component {
    constructor(props) {
      super(props);
      this.modal = React.createRef();
      this.button = React.createRef();
      this.parent = React.createRef();
      this.alert = React.createRef();
      this.textarea = React.createRef();
      this.alertCentered = React.createRef();
      this.confirm = React.createRef();
      this.state = {
        'cls': ''
      };
    }

    open(cls) {
      this.setState({
        'cls': cls
      });
      this.modal.current.open();
    }

    openAlert(centered) {
      const alert = centered ? this.alertCentered : this.alert;
      alert.current.open();
    }

    openConfirm() {
      this.confirm.current.open();
    }

    copy(event) {
      const target = event.currentTarget;
      const textarea = this.textarea.current;
      textarea.value = target.innerText;
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      /*For mobile devices*/

      document.execCommand("copy");
      console.log(`text copied`);
    }

    componentDidMount() {
      const codes = this.parent.current.querySelectorAll('pre');
      codes.forEach(item => item.addEventListener('click', this.copy.bind(this)));
    }

    render() {
      const cls = this.state.cls;
      return /*#__PURE__*/React.createElement("main", {
        ref: this.parent
      }, /*#__PURE__*/React.createElement("textarea", {
        ref: this.textarea
      }), /*#__PURE__*/React.createElement("h2", null, "Custom Modal"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondModal",
        route: "/libraries/beyond-ui/modal/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondModal className="cls">{content}</BeyondModal>'), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.open()
      }, "Abrir"), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.open('md')
      }, "Abrir Mediano"), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.open('lg')
      }, "Abrir Grande"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Alert Modal"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondAlertModal",
        route: "/libraries/beyond-ui/modal/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondAlertModal ref={this.alert} text="Esto es un alert"/>'), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.openAlert()
      }, "Alert"), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.openAlert('centered')
      }, "Alert centrado"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Confirmation Modal"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondConfirmModal",
        route: "/libraries/beyond-ui/modal/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondAlertModal ref={this.alert} text="Esto es un confirm" title="title"/>'), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.openConfirm()
      }, "Confirm"), /*#__PURE__*/React.createElement(_code2.BeyondButton, {
        onClick: () => this.openConfirm()
      }, "Confirm Centrado"), /*#__PURE__*/React.createElement(_code.BeyondAlertModal, {
        ref: this.alert,
        text: "Esto es un alert"
      }), /*#__PURE__*/React.createElement(_code.BeyondAlertModal, {
        ref: this.alertCentered,
        centered: true,
        title: "Esto es un alert centrado"
      }), /*#__PURE__*/React.createElement(_code.BeyondConfirmModal, {
        ref: this.confirm,
        text: "Esto es un alert",
        onConfirm: () => console.log("confirmado"),
        onCancel: () => console.log('cancelado')
      }), /*#__PURE__*/React.createElement(_code.BeyondModal, {
        ref: this.modal,
        className: cls
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Esto es un modal"), /*#__PURE__*/React.createElement("h4", null, "Esto tiene contenido"), /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur cum doloribus eaque facilis modi sapiente sunt voluptas. Ab aliquam animi, aperiam asperiores consequatur consequuntur culpa deleniti deserunt dignissimos dolorem error, esse exercitationem expedita facilis id illum impedit ipsa ipsam laboriosam libero magnam molestiae nemo officia, pariatur porro quas qui quidem quo quod rem similique suscipit temporibus tenetur veniam vero vitae voluptatum? Asperiores assumenda dolores, ipsam mollitia repellendus temporibus voluptates? Alias dignissimos eos eum incidunt nostrum odit perspiciatis qui repellendus, reprehenderit ut. Culpa eius nam quaerat! A accusantium aspernatur, cum excepturi fugiat illum ipsam maiores molestiae, officia quo, similique sit tempore. Adipisci consequuntur cumque dolore doloribus dolorum, eaque esse facere minima modi molestiae praesentium quaerat quibusdam reiciendis reprehenderit sequi similique temporibus veritatis? Alias aspernatur iste minus numquam officia, soluta sunt? Harum natus, odio! Aspernatur, autem, eos error, eveniet expedita iste laudantium maiores mollitia qui quos recusandae reprehenderit saepe soluta. Ut."), /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur corporis deleniti doloribus neque, nulla officiis quo rem rerum vel? Aperiam atque consectetur culpa distinctio eaque esse eum explicabo fuga id inventore iusto laudantium libero mollitia nemo, nulla numquam officiis optio quae quasi quibusdam quo quod recusandae sed, tempore ullam vitae voluptas voluptatem. Cupiditate, delectus dolorem error est et expedita iste maxime molestias neque nesciunt non odio omnis placeat quos ratione repellat vel. Alias, culpa cupiditate deleniti dolor dolorem eaque, enim hic incidunt inventore iste labore magnam molestiae neque non nulla odio voluptates? Dolores ducimus, ea et ratione tempora totam."), /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur cum doloribus eaque facilis modi sapiente sunt voluptas. Ab aliquam animi, aperiam asperiores consequatur consequuntur culpa deleniti deserunt dignissimos dolorem error, esse exercitationem expedita facilis id illum impedit ipsa ipsam laboriosam libero magnam molestiae nemo officia, pariatur porro quas qui quidem quo quod rem similique suscipit temporibus tenetur veniam vero vitae voluptatum? Asperiores assumenda dolores, ipsam mollitia repellendus temporibus voluptates? Alias dignissimos eos eum incidunt nostrum odit perspiciatis qui repellendus, reprehenderit ut. Culpa eius nam quaerat! A accusantium aspernatur, cum excepturi fugiat illum ipsam maiores molestiae, officia quo, similique sit tempore. Adipisci consequuntur cumque dolore doloribus dolorum, eaque esse facere minima modi molestiae praesentium quaerat quibusdam reiciendis reprehenderit sequi similique temporibus veritatis? Alias aspernatur iste minus numquam officia, soluta sunt? Harum natus, odio! Aspernatur, autem, eos error, eveniet expedita iste laudantium maiores mollitia qui quos recusandae reprehenderit saepe soluta. Ut."), /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur corporis deleniti doloribus neque, nulla officiis quo rem rerum vel? Aperiam atque consectetur culpa distinctio eaque esse eum explicabo fuga id inventore iusto laudantium libero mollitia nemo, nulla numquam officiis optio quae quasi quibusdam quo quod recusandae sed, tempore ullam vitae voluptas voluptatem. Cupiditate, delectus dolorem error est et expedita iste maxime molestias neque nesciunt non odio omnis placeat quos ratione repellat vel. Alias, culpa cupiditate deleniti dolor dolorem eaque, enim hic incidunt inventore iste labore magnam molestiae neque non nulla odio voluptates? Dolores ducimus, ea et ratione tempora totam."), /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur cum doloribus eaque facilis modi sapiente sunt voluptas. Ab aliquam animi, aperiam asperiores consequatur consequuntur culpa deleniti deserunt dignissimos dolorem error, esse exercitationem expedita facilis id illum impedit ipsa ipsam laboriosam libero magnam molestiae nemo officia, pariatur porro quas qui quidem quo quod rem similique suscipit temporibus tenetur veniam vero vitae voluptatum? Asperiores assumenda dolores, ipsam mollitia repellendus temporibus voluptates? Alias dignissimos eos eum incidunt nostrum odit perspiciatis qui repellendus, reprehenderit ut. Culpa eius nam quaerat! A accusantium aspernatur, cum excepturi fugiat illum ipsam maiores molestiae, officia quo, similique sit tempore. Adipisci consequuntur cumque dolore doloribus dolorum, eaque esse facere minima modi molestiae praesentium quaerat quibusdam reiciendis reprehenderit sequi similique temporibus veritatis? Alias aspernatur iste minus numquam officia, soluta sunt? Harum natus, odio! Aspernatur, autem, eos error, eveniet expedita iste laudantium maiores mollitia qui quos recusandae reprehenderit saepe soluta. Ut."), /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur corporis deleniti doloribus neque, nulla officiis quo rem rerum vel? Aperiam atque consectetur culpa distinctio eaque esse eum explicabo fuga id inventore iusto laudantium libero mollitia nemo, nulla numquam officiis optio quae quasi quibusdam quo quod recusandae sed, tempore ullam vitae voluptas voluptatem. Cupiditate, delectus dolorem error est et expedita iste maxime molestias neque nesciunt non odio omnis placeat quos ratione repellat vel. Alias, culpa cupiditate deleniti dolor dolorem eaque, enim hic incidunt inventore iste labore magnam molestiae neque non nulla odio voluptates? Dolores ducimus, ea et ratione tempora totam."))));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: page.js
  ************/


  function Page() {
    const specs = {};
    ReactDOM.render(React.createElement(PageView, specs), this.container);
    this.container.id = 'beyond-ui-dialogs-page';
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#beyond-ui-dialogs-page textarea{display:none}#beyond-ui-dialogs-page span{display:grid}#beyond-ui-dialogs-page button{margin-right:5px}#beyond-ui-dialogs-page pre{margin:20px 0;padding:15px;position:relative;transition:all .1s ease-in-out;cursor:pointer}#beyond-ui-dialogs-page pre:hover{background:#ff8056;color:#fff;transition:all .1s ease-in}#beyond-ui-dialogs-page pre:before{content:"Copy";position:absolute;padding:15px 20px;top:0;right:0;background:#333;color:#e4e5dc}';
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