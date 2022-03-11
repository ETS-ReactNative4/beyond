define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/icon/code", "@beyond-js/ui/perfect-scrollbar/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.Sidenav = _exports2.COMPONENTS = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/layout/sidenav/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**********
  sidenav.jsx
  **********/

  class Sidenav extends React.Component {
    constructor(props) {
      super(props);

      this.updateState = () => this.setState({});
    }

    navigate(event) {
      const target = event.currentTarget;
      beyond.navigate(`/beyond/ui/${target.dataset.link}`);
    }

    render() {
      const components = Object.values(COMPONENTS);
      return /*#__PURE__*/React.createElement(_code3.BeyondScrollContainer, {
        className: "nav-beyond-ui"
      }, /*#__PURE__*/React.createElement("section", {
        className: "list-components"
      }, /*#__PURE__*/React.createElement("ul", null, components.map(component => {
        return /*#__PURE__*/React.createElement("li", {
          key: component.title
        }, /*#__PURE__*/React.createElement("h4", {
          onClick: this.navigate,
          "data-link": component.link
        }, component.title));
      }))));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /******************
  FILE: components.js
  ******************/


  _exports2.Sidenav = Sidenav;
  const COMPONENTS = {
    'icons': {
      'title': 'Icons',
      'description': 'Una gran variedad de iconos para identificar muchos apartados, con una fácil integración y edición.',
      'icon': 'attractions',
      'link': 'icons'
    },
    'iconsButtons': {
      'title': 'Buttons Icons',
      'description': 'Una gran variedad de iconos para identificar muchos apartados, con una fácil integración y edición.',
      'icon': 'attractions',
      'link': 'icons/buttons'
    },
    'modals': {
      'title': 'Modals',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'modals'
    },
    'select': {
      'title': 'Select',
      'description': 'Cada opción definida se pasa y se muestra en el cuadro de diálogo para Seleccionar.',
      'icon': 'attractions',
      'link': 'select'
    },
    'form': {
      'title': 'Forms',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'form'
    },
    'alerts': {
      'title': 'Alerts',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'alerts'
    },
    'empty': {
      'title': 'Empty',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'empty'
    },
    'image': {
      'title': 'Images',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'image'
    },
    'instruction': {
      'title': 'Instructions',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'instruction'
    },
    'list': {
      'title': 'Lists',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'list'
    },
    'loading': {
      'title': 'Loadings',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'loading'
    },
    'media': {
      'title': 'Media',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'media'
    },
    'overlay': {
      'title': 'Overlays',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'overlay'
    },
    'scroll': {
      'title': 'Scroll',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'scroll'
    },
    'picture': {
      'title': 'Pictures',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'picture'
    },
    'preloadText': {
      'title': 'Preload Text',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'preloadText'
    },
    'preload': {
      'title': 'Preload',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'preload'
    },
    'publication': {
      'title': 'Publications',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'publication'
    },
    'ripple': {
      'title': 'Ripple',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'ripple'
    },
    'spinner': {
      'title': 'Spinners',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'spinner'
    },
    'swiper': {
      'title': 'Swiper',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'swiper'
    },
    'toast': {
      'title': 'Toasts',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'toast'
    },
    'toolbar': {
      'title': 'Toolbar',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'toolbar'
    },
    'videoPlayer': {
      'title': 'Video Player',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'video-player'
    },
    'waves': {
      'title': 'Waves',
      'description': 'Muestra cuadros de diálogo que aparece encima del contenido de la aplicación',
      'icon': 'attractions',
      'link': 'waves'
    }
  };
  /**********
  SCSS STYLES
  **********/

  _exports2.COMPONENTS = COMPONENTS;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.nav-beyond-ui{height:435px;border-right:solid 1px gray;position:fixed;width:180px}.nav-beyond-ui .list-components ul{list-style:none;color:#fff;padding:12px 0;text-align:left}.nav-beyond-ui .list-components li{padding:5px 0}.nav-beyond-ui .list-components li h4{cursor:pointer;transition:.5s color}.nav-beyond-ui .list-components li h4:hover{color:#e36152}.nav-beyond-ui .list-components li h5{color:gray;padding-left:5px;cursor:pointer;transition:.5s color}.nav-beyond-ui .list-components li h5:hover{color:#e36152}';
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