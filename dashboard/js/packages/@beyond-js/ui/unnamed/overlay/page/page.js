define(["exports", "@beyond-js/ui/overlay/code", "@beyond-js/ui/toolbar/code", "@beyond-js/ui/import/code", "@beyond-js/ui/form/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, dependency_0, dependency_1) {
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
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/overlay/page/page', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**************
  jsx\control.jsx
  **************/

  class Control extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        'overlay': false
      };
      this.showOverlay = this.showOverlay.bind(this);
      this.closeOverlay = this.closeOverlay.bind(this);
    }

    closeOverlay() {
      this.setState({
        'overlay': false
      });
    }

    showOverlay(event) {
      event.stopPropagation();
      this.setState({
        'overlay': true
      });
    }

    render() {
      return /*#__PURE__*/React.createElement("main", {
        ref: "main"
      }, /*#__PURE__*/React.createElement("h2", null, "Overlay"), /*#__PURE__*/React.createElement(_code3.BeyondImport, {
        name: "BeyondOverlay",
        route: "/libraries/beyond-ui/overlay/code.js"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "Example: "), /*#__PURE__*/React.createElement("pre", null, '<BeyondOverlay config={this.props.config} state={this.state} handler={this.closeOverlay}/>'), /*#__PURE__*/React.createElement(_code4.BeyondButton, {
        onClick: this.showOverlay
      }, "SHOW"), this.state.overlay && /*#__PURE__*/React.createElement(_code.BeyondOverlay, {
        config: this.props.config,
        state: this.state,
        handler: this.closeOverlay
      }));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: js\page.js
  ***************/


  function Page() {
    function navigate(event) {
      event.stopPropagation();
      beyond.navigate('/beyond/ui/overlay');
    }

    const config = {
      'title': '¿Qué deseas realizar?',
      'options': {
        'edit': {
          'text': 'Editar',
          'icon': 'edit',
          'action': navigate,
          'data': {
            'url': 'www.marca.com'
          }
        },
        'delete': {
          'text': 'Eliminar',
          'icon': 'delete',
          'action': navigate,
          'data': {
            'id': 123456
          }
        },
        'unFollow': {
          'text': 'Dejar de seguir',
          'icon': 'share',
          'action': navigate
        }
      }
    };

    this.render = function () {
      const wrapper = document.createElement('span');
      const specs = {
        'config': config
      };
      ReactDOM.render(React.createElement(Control, specs), wrapper);
      this.container.id = 'elements-overlay-page';
      this.container.appendChild(wrapper);
    };
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}#elements-overlay-page .overlay-content{position:absolute;bottom:0;right:0;left:0;height:227px;display:grid;background:gray}#elements-overlay-page .overlay-content .overlay-header{padding:15px 15px 0}#elements-overlay-page .overlay-content .overlay-header .title{font-size:16px;font-weight:500;letter-spacing:.15px;color:var(--beyond-element-secondary-text-color)}#elements-overlay-page .overlay-content .overlay-actions-link,#elements-overlay-page .overlay-content .overlay-main{display:grid;padding:30px 15px;grid-auto-flow:column}#elements-overlay-page .overlay-content .overlay-actions-link .item,#elements-overlay-page .overlay-content .overlay-main .item{display:grid;justify-items:center;background:0 0;box-shadow:none}#elements-overlay-page .overlay-content .overlay-add-link{display:grid;padding:0 15px;grid-row-gap:15px}#elements-overlay-page .overlay-content .overlay-add-link input{padding:7px 0}';
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