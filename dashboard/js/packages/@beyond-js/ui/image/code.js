define(["exports", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondImage = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/image/code', false, {}, dependencies);
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
  /********
  image.jsx
  ********/


  class BeyondImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        size: '200x200',
        loaded: false
      };
      this.reload = this.reload.bind(this);
      this.onLoad = this.onLoad.bind(this);
      this.handleError = this.handleError.bind(this);
      this.imageLoaded = this.imageLoaded.bind(this);
    }

    onLoad() {
      this.setState({
        loaded: true,
        error: false
      });
    }

    reload() {
      this.handleUpdate(false);
    }

    handleError(src) {
      this.setState({
        error: true,
        loaded: false
      });
    }

    imageLoaded(event) {
      this.setState({
        htmlLoaded: true
      });
    }

    getGraphSrc(url, size) {
      const index = url.indexOf('&');
      let params = '';
      let urlPicture = url;
      const appId = beyond.params.application.id;

      if (index >= 0) {
        urlPicture = url.substr(0, index);
        params = url.substr(index);
      }

      return `${urlPicture}?size=${size}&fit=cover${params}&application_id=${appId}`;
    }

    loadImage(url, size) {
      let urlPicture = url;
      let finalSrc = urlPicture;

      if (this.props.graphSrc) {
        finalSrc = this.getGraphSrc(this.props.graphSrc, size);
      }

      const image = new Image();
      image.onload = this.onLoad;
      image.onerror = this.handleError;
      image.src = finalSrc;
      this.image = image;
      this.setState({
        url: url,
        size: size,
        src: finalSrc
      });
    }

    componentDidUpdate() {
      const currentSrc = this.props.graphSrc || this.props.src;

      if (this.state.url !== currentSrc) {
        let size = this.props.size ? this.props.size : this.state.size;
        this.loadImage(currentSrc, size);
      }
    }

    componentDidMount() {
      const currentSrc = this.props.graphSrc || this.props.src;
      let size = this.props.size ? this.props.size : this.state.size;
      this.loadImage(currentSrc, size);
    }

    componentWillUnmount() {
      this.image.onload = undefined;
      this.image.onerror = undefined;
    }

    render() {
      let output;
      const {
        onClick,
        cover
      } = this.props;
      let data = {};
      Object.entries(this.props).map(item => {
        if (item[0].startsWith('data')) data[item[0]] = item[1];
      });
      let cls = this.props.className ? `beyond-element-image ${this.props.className}` : 'beyond-element-image ';
      if (cover) cls += " cover-image";

      if (this.state.error) {
        cls += ' beyond-element-image-error';

        if (this.props.reload) {
          output = /*#__PURE__*/React.createElement("div", {
            key: "error",
            "data-src": this.state.src
          }, /*#__PURE__*/React.createElement(_code.BeyondIconButton, {
            icon: "refresh"
          }));
        }
      } else if (this.state.loaded) {
        output = /*#__PURE__*/React.createElement("img", {
          src: this.state.src,
          onLoad: this.imageLoaded
        });
      }

      if (!this.state.error && !this.state.loaded) cls += ' beyond-element-image-preload ';
      if (!this.state.htmlLoaded) cls += ' beyond-element-image-preload';
      return /*#__PURE__*/React.createElement("figure", _extends({
        "data-src": this.state.src,
        className: cls
      }, data, {
        onClick: onClick
      }), output, this.props.children);
    }

  }
  /**********
  SCSS STYLES
  **********/


  _exports2.BeyondImage = BeyondImage;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-image{position:relative}.beyond-element-image.beyond-element-image-error,.beyond-element-image.beyond-element-image-preload{background:gray;display:block}.beyond-element-image.cover-image img{width:100%;height:100%;object-fit:cover}.beyond-element-image.contain img{object-fit:contain}.beyond-element-image.fill img{object-fit:fill}';
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