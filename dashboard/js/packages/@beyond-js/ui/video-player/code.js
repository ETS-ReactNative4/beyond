define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondVideoPlayer = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/video-player/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');
  /********
  vhtml.jsx
  ********/

  function Vhtml({
    src,
    poster
  }) {
    return /*#__PURE__*/React.createElement("video", {
      className: "graphs-element-video-player",
      muted: true,
      controls: true,
      poster: poster
    }, /*#__PURE__*/React.createElement("source", {
      src: src,
      muted: "muted",
      type: "video/mp4"
    }));
  }
  /***************
  video-player.jsx
  ***************/


  class BeyondVideoPlayer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      let {
        type,
        url,
        poster,
        autoplay
      } = this.props;

      if (type === 'youtube') {
        return /*#__PURE__*/React.createElement(Youtube, {
          id: this.props['video-id']
        });
      } else {
        return /*#__PURE__*/React.createElement(Vhtml, {
          src: url,
          poster: poster
        });
      }
    }

  }
  /**********
  youtube.jsx
  **********/


  _exports2.BeyondVideoPlayer = BeyondVideoPlayer;

  function Youtube({
    id
  }) {
    if (!id) return /*#__PURE__*/React.createElement("div", {
      className: "beyond-element-video-player preload"
    });
    let src = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
    return /*#__PURE__*/React.createElement("div", {
      className: "beyond-element-video-player youtube"
    }, /*#__PURE__*/React.createElement("iframe", {
      id: "player",
      type: "text/html",
      width: "640",
      height: "360",
      src: src,
      frameBorder: "0",
      allowFullScreen: true
    }));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-element-video-player{width:100%}.beyond-element-video-player.youtube{position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden}.beyond-element-video-player.youtube embed,.beyond-element-video-player.youtube iframe,.beyond-element-video-player.youtube object{position:absolute;top:0;left:0;width:100%;height:100%}';
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