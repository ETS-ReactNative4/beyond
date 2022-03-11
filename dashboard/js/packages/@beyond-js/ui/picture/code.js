define(["exports", "@beyond-js/ui/overlay/code", "@beyond-js/ui/image/code", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondPicture = void 0;
  _exports2.BeyondPictureModel = BeyondPictureModel;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/picture/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /**********
  picture.jsx
  **********/

  class BeyondPicture extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.model = props.model ? props.model : new BeyondPictureModel();
      this.showOverlay = this.showOverlay.bind(this);
      this.closeOverlay = this.closeOverlay.bind(this);
      this.updateState = this.updateState.bind(this);
      this.model.setCallbackListener(this.updateState);
      this.overlayConfig = {
        'handler': this.closeOverlay,
        'title': '¿Qué deseas realizar?',
        'options': {
          'camera': {
            'icon': 'camera',
            'text': 'Tomar una foto',
            'action': () => this.setPicture('camera')
          },
          'gallery': {
            'icon': 'gallery',
            'text': 'Subir una foto de la galería',
            'action': () => this.setPicture('gallery')
          }
        }
      };
      this.overlay = new _code.Overlay(this.overlayConfig);
    }

    updateState(state) {
      this.setState(state);
    }

    async setPicture(source) {
      await this.model.capture(source);
      this.overlay.close();
      this.setState({
        'src': this.model.src
      });
    }

    closeOverlay() {
      this.overlay.close();
    }

    showOverlay(event) {
      event.stopPropagation();
      this.overlay.open();
    }

    render() {
      const {
        picture,
        cover
      } = this.props;
      let imagePicture = {};
      if (this.state.src) imagePicture.src = this.state.src;else imagePicture = picture;
      return /*#__PURE__*/React.createElement("div", {
        className: "content-picture"
      }, /*#__PURE__*/React.createElement(_code2.BeyondImage, imagePicture), /*#__PURE__*/React.createElement(_code3.BeyondIconButton, {
        icon: "camera",
        className: "upload-picture",
        onClick: this.showOverlay
      }));
    }

  }
  /***********
  JS PROCESSOR
  ***********/

  /***************
  FILE: picture.js
  ***************/


  _exports2.BeyondPicture = BeyondPicture;

  function BeyondPictureModel() {
    let url;
    const events = new Events({
      'bind': this
    });
    const TYPE_IMAGE = Object.freeze({
      'ICON': 'icon',
      'COVER': 'cover',
      'PICTURE': 'picture'
    });
    let src;
    Object.defineProperty(this, 'src', {
      'get': () => src
    });
    let orientation;
    Object.defineProperty(this, 'orientation', {
      'get': () => orientation
    });
    let width;
    Object.defineProperty(this, 'width', {
      'get': () => width
    });
    let height;
    Object.defineProperty(this, 'height', {
      'get': () => height
    });
    let uploaded;
    Object.defineProperty(this, 'uploaded', {
      'get': () => !!uploaded
    });
    let uploading;
    Object.defineProperty(this, 'uploading', {
      'get': () => !!uploading
    });
    let loading;
    Object.defineProperty(this, 'loading', {
      'get': () => !!loading
    });
    let srcFilter;
    Object.defineProperty(this, 'srcFilter', {
      'get': () => srcFilter
    });
    let base64;
    Object.defineProperty(this, 'source', {
      'get': () => base64
    });
    Object.defineProperty(this, 'getters', {
      'get': () => base64
    });

    const clean = () => {
      uploaded = src = orientation = width = height = undefined;
      events.trigger('change');
    };

    this.clean = clean;

    this.cleanFilter = () => srcFilter = undefined;

    let callbackListener;

    this.setCallbackListener = callback => {
      callbackListener = callback;
    };

    const triggerChange = state => {
      if (callbackListener) callbackListener(state);
      events.trigger('change');
    };

    this.capture = async (source, specs) => {
      const media = await beyond.import('libraries/beyond-ui/media/js.js');
      if (src) clean();
      const square = specs && specs.square ? specs.square : null;
      specs = specs ? specs : {};
      loading = true;
      triggerChange();
      const resource = await media.getResource(source, specs);
      url = resource.url;

      try {
        const specs = {
          'maxWidth': 2048,
          'maxHeight': 2048,
          'rotate': resource.rotate
        };
        const resize = await media.resizePicture(url, specs);
        src = resize.src;
        orientation = resize.orientation;
        width = resize.width;
        height = resize.height;
        loading = false;
        triggerChange({
          'src': src
        });

        if (square && width !== height) {
          clean();
          return false;
        }

        return true;
      } catch (e) {
        console.error('Error process image: ', e);
        let mediaError = new media.ResourceSelectorError('e001', 'message error');

        if (e && e !== mediaError.code) {
          console.error(e);
          beyond.showWarning('Error procesando imagen.');
        }

        clean();
        return false;
      }
    };

    this.overlay = async function (source) {
      const media = await beyond.import('libraries/beyond-ui/media/js.js');
      const processor = new media.imageProcessor(url);
      const image = new Image();
      image.src = source;

      async function onLoad() {
        try {
          const merge = await processor.morph(image);
          srcFilter = merge.src;
          triggerChange();
        } catch (e) {
          console.error('error picture: ', e);
        }
      }

      image.onload = onLoad;
    };
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.content-picture{display:flex;position:relative}.content-picture .upload-picture{position:absolute;right:50px;bottom:20px;border:var(--beyond-text-on-primary) 2px solid}.content-picture .upload-picture svg{position:absolute;top:6px;left:6px;height:23px;width:23px;fill:var(--beyond-text-on-primary)}';
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