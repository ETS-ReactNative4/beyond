define(["exports", "@beyond-js/ui/image/code", "@beyond-js/ui/swiper/code", "@beyond-js/ui/video-player/code", "@beyond-js/ui/icon/code", "react", "react-dom"], function (_exports2, _code, _code2, _code3, _code4, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.Actions = Actions;
  _exports2.BeyondPublication = BeyondPublication;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/publication/code', false, {}, dependencies);
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

  /***************
  FILE: actions.js
  ***************/

  function Actions(parent, controller) {
    'use strict';

    let properties = {};

    function getSessionQueryString() {
      const {
        session,
        sessionKey,
        applicationId
      } = properties;
      return session === 'remote' ? `?session=${session}&sessionKey=${sessionKey}&applicationId=${applicationId}` : '';
    }

    parent.navigate = event => {
      event.preventDefault();
      event.stopPropagation();
      let url = event.currentTarget.dataset.url;
      beyond.navigate(`${url}${properties.graphId}`);
    };

    parent.like = event => {
      event.preventDefault();
      event.stopPropagation();
      let like = controller.graph.like;
      if (like.publishing || like.searching || like.removing) return;

      if (like.id) {
        like.remove();
      } else {
        like.publish();
        follow(event);
      }
    };

    function follow(event) {
      event.preventDefault();
      event.stopPropagation();
      let follow = controller.graph.follow;

      if (follow.id || follow.publishing || follow.searching || follow.removing) {
        return;
      }

      follow.publish();
    }

    parent.unFollow = event => {
      event.preventDefault();
      event.stopPropagation();
      let follow = controller.graph.follow;

      if (!follow.id || follow.publishing || follow.searching || follow.removing) {
        return;
      }

      follow.remove();
      controller.overlay.close();
      beyond.showMessage('Has dejado se seguir esta publicación.');
    };

    parent.openComments = event => {
      event.stopPropagation();
      let qs = getSessionQueryString();
      beyond.navigate(`/comments/${event.currentTarget.dataset.id}${qs}`);
    };

    parent.updater = () => controller.triggerChange();

    parent.goToPost = event => {
      event.preventDefault();
      let url = event.currentTarget.dataset.link;
      window.open(url, '_system');
    };
  }
  /*********************
  FILE: friendly-time.js
  *********************/

  /*
   * Returns a string with the corresponding formatted time
   * @param int $timestamp timestamp to be parsed
   * @return string
   */


  window.friendlyTime = function (timestamp, specs) {
    if (!timestamp) return '';
    if (!specs) specs = {};
    let fullDate = new Date(timestamp * 1000);
    let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    let dateObject = {
      'seconds': fullDate.getSeconds(),
      'minutes': fullDate.getMinutes(),
      'hours': fullDate.getHours(),
      'day': fullDate.getUTCDate(),
      'month': months[fullDate.getMonth()],
      'year': fullDate.getFullYear()
    };
    let currentDate = new Date();
    currentDate = {
      'seconds': currentDate.getSeconds(),
      'minutes': currentDate.getMinutes(),
      'hours': currentDate.getHours(),
      'day': currentDate.getUTCDate(),
      'month': months[currentDate.getMonth()],
      'year': currentDate.getFullYear()
    }; // Hour and minutes for same day

    let minutes = dateObject.minutes.toString();
    minutes = minutes.length === 1 ? minutes = '0' + minutes : minutes;
    let text = dateObject.hours + ':' + minutes; // Day and month (textual) for diff day/month from same year

    if (dateObject.year === currentDate.year && (dateObject.day !== currentDate.day || dateObject.month !== currentDate.month)) {
      text = dateObject.day + ' ' + dateObject.month + (specs.forceHour ? ', ' + text : ' ');
    } // Day, month and year for older years


    if (dateObject.year !== currentDate.year) {
      text = dateObject.day + ' ' + dateObject.month + ' ' + dateObject.year;
    }

    return text;
  };
  /*********************
  FILE: image-actions.js
  *********************/


  function ImageActions(parent) {
    'use strict';

    let heightOutput;

    const getDimensions = () => {
      let d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0];
      heightOutput = window.innerHeight || e.clientHeight || g.clientHeight;
    };

    parent.setDimensions = event => {
      getDimensions();
      let img = event.currentTarget;
      const MAX_WIDTH = document.documentElement.offsetWidth;
      ;
      const MAX_HEIGHT = heightOutput >= 600 ? 560 : 500;
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (width > height) {
        height = height * MAX_WIDTH / width;
        width = width < MAX_WIDTH ? width : MAX_WIDTH;
      } else if (width < height) {
        width = width > MAX_WIDTH ? MAX_WIDTH : width * MAX_HEIGHT / height;
        height = img.naturalHeight / img.naturalWidth * width;
        if (height > MAX_HEIGHT) height = MAX_HEIGHT;
      } else if (width > MAX_WIDTH) {
        width = height = MAX_WIDTH;
      }

      img.height = height;
      img.width = width;
    };
  }
  /*************************
  beyond-publication-old.jsx
  *************************/


  class TrashBeyondPublication extends React.Component {
    constructor(props) {
      super(props);
      this.image = React.createRef();
      this.actions = {};
      new Actions(this.actions);
      new ImageActions(this.actions);
    }

    componentDidMount() {
      if (!this.image.current) return;
      this.image.current.addEventListener('load', this.actions.setDimensions);
    }

    componentDidUpdate() {
      if (!this.image.current) return;
      this.image.current.addEventListener('load', this.actions.setDimensions);
    }

    componentWillUnmount() {
      if (!this.image.current) return;
      this.image.current.removeEventListener('load', this.actions.setDimensions);
    }

    render() {
      const {
        graph,
        actions,
        TOTAL_COMMENTS,
        ogEntities
      } = this.props;
      let owner = graph.owner;
      let output;
      let entityName = graph.entity ? graph.entity.name : undefined;

      if (graph.loaded && ogEntities.includes(entityName)) {
        if (entityName === 'youtubevideo') {
          output = /*#__PURE__*/React.createElement(OpenGraphYoutube, {
            openGraph: graph,
            actions: actions
          });
        } else {
          output = /*#__PURE__*/React.createElement(OpenGraph, {
            openGraph: graph,
            actions: actions
          });
        }
      }

      const time = friendlyTime(graph.timeCreated);
      return /*#__PURE__*/React.createElement("div", {
        className: "content-scroll"
      }, /*#__PURE__*/React.createElement("article", {
        className: "col-wrapper left post-view"
      }, graph.picture && graph.picture.uploaded && /*#__PURE__*/React.createElement(_code.BeyondImage, {
        className: "img-post",
        innerRef: this.image,
        graphSrc: graph.picture.url,
        size: '800x600'
      }), /*#__PURE__*/React.createElement("div", {
        className: "article-card"
      }, /*#__PURE__*/React.createElement(Icons, {
        logged: false,
        graph: graph,
        actions: actions
      }), owner.loaded ? /*#__PURE__*/React.createElement("div", {
        className: "content-post"
      }, /*#__PURE__*/React.createElement("span", {
        className: "name"
      }, `${owner.name} ${owner.lastname} `), /*#__PURE__*/React.createElement("p", {
        className: "description"
      }, graph.description, /*#__PURE__*/React.createElement("span", {
        className: "asset-date"
      }, time))) : /*#__PURE__*/React.createElement("div", {
        className: "content-post"
      }, /*#__PURE__*/React.createElement("div", {
        className: "owner-preload"
      }), /*#__PURE__*/React.createElement("div", {
        className: "text-preload"
      }))), output), /*#__PURE__*/React.createElement("div", {
        className: "col-wrapper right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "comments-wrapper"
      }, /*#__PURE__*/React.createElement(Comments, {
        item: graph,
        actions: actions,
        TOTAL_COMMENTS: TOTAL_COMMENTS
      }))));
    }

  }
  /*********************
  beyond-publication.jsx
  *********************/


  function BeyondPublication({
    asset,
    iconsConfig
  }) {
    const time = friendlyTime(asset.time);
    return /*#__PURE__*/React.createElement("article", {
      className: "beyond-publication"
    }, asset.picture && /*#__PURE__*/React.createElement(_code.BeyondImage, {
      className: "img-post",
      size: '800x600',
      graphSrc: asset.picture.url,
      src: asset.picture.src
    }), /*#__PURE__*/React.createElement(Icons, {
      config: iconsConfig
    }), /*#__PURE__*/React.createElement("div", {
      className: "article-card"
    }, asset.loaded ? /*#__PURE__*/React.createElement("div", {
      className: "content-post"
    }, /*#__PURE__*/React.createElement("span", {
      className: "name"
    }, `${asset.owner.name} ${asset.owner.lastname} `), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, asset.description, /*#__PURE__*/React.createElement("span", {
      className: "asset-date"
    }, time))) : /*#__PURE__*/React.createElement("div", {
      className: "content-post"
    }, /*#__PURE__*/React.createElement("div", {
      className: "owner-preload"
    }), /*#__PURE__*/React.createElement("div", {
      className: "text-preload"
    }))));
  }
  /********
  icons.jsx
  ********/


  function Icons({
    config
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-header"
    }, /*#__PURE__*/React.createElement("section", {
      className: "icons"
    }, config && config.icons && config.icons.map(icon => /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(_code4.BeyondIconButton, {
      icon: icon.icon,
      onClick: icon.onClick
    }), icon.text))));
  }
  /********************
  open-graph-source.jsx
  ********************/


  function OpenGraphSource({
    openGraph,
    actions
  }) {
    let source;
    let icon;
    let cls;

    if (openGraph.entity.name === 'ogtwitter') {
      source = 'Ir a Twitter';
      icon = 'twitter';
      cls = 'twitter';
    } else if (openGraph.entity.name === 'ogfacebook') {
      source = 'Ir a Facebook';
      icon = 'facebook';
      cls = 'facebook';
    } else if (openGraph.entity.name === 'oginstagram') {
      source = 'Ir a Instagram';
      icon = 'instagram-new';
      cls = 'instagram';
    } else if (openGraph.entity.name === 'youtubevideo') {
      source = 'Ver en Youtube';
      icon = 'youtube';
      cls = 'youtube';
    } else if (openGraph.entity.name === 'oglink') {
      source = 'Ir a Website';
      icon = 'link';
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "open-graph-source",
      "data-link": openGraph.src,
      onClick: actions.goToPost
    }, /*#__PURE__*/React.createElement(_code4.BeyondIcon, {
      icon: icon,
      className: cls
    }), source);
  }
  /*********************
  open-graph-youtube.jsx
  *********************/


  class OpenGraphYoutube extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      'use strict';

      let {
        openGraph,
        actions
      } = this.props;
      let media = openGraph.media ? JSON.parse(openGraph.media) : undefined;
      return /*#__PURE__*/React.createElement("div", {
        className: "open-graph-item item-video-panel",
        onClick: actions.openContent
      }, /*#__PURE__*/React.createElement(_code3.BeyondVideoPlayer, {
        id: "jwvideo",
        type: "youtube",
        "video-id": media.video.id
      }));
    }

  }
  /*************
  open-graph.jsx
  *************/


  class OpenGraph extends React.Component {
    constructor(props) {
      super(props);
      this.actions = this.props.actions;
      this.image = React.createRef();
      new ImageActions(this.actions);
    }

    componentDidMount() {
      if (!this.image.current) return;
      const node = ReactDOM.findDOMNode(this.image.current);
      if (!node.querySelector('#img')) return;
      node.querySelector('#img').addEventListener('load', this.actions.setDimensions);
    }

    componentDidUpdate() {
      if (!this.image.current) return;
      const node = ReactDOM.findDOMNode(this.image.current);
      if (!node.querySelector('#img')) return;
      node.querySelector('#img').addEventListener('load', this.actions.setDimensions);
    }

    componentWillUnmount() {
      if (!this.image.current) return;
      const node = ReactDOM.findDOMNode(this.image.current);
      if (!node.querySelector('#img')) return;
      node.querySelector('#img').removeEventListener('load', this.actions.setDimensions);
    }

    render() {
      let {
        actions,
        openGraph
      } = this.props;
      let cls = 'open-graph-item';
      let media = openGraph.media ? JSON.parse(openGraph.media) : undefined;
      let imageUrl = media && media.images.length > 0 ? media.images[0].url : undefined;
      let video = media && media.video ? media.video : undefined;
      let output;

      if (openGraph.entity !== 'oglink') {
        if (media && media.images.length > 1) {
          output = /*#__PURE__*/React.createElement(_code2.BeyondSwiperSlider, {
            entries: media.images,
            analyze: true
          });
        } else {
          output = /*#__PURE__*/React.createElement(_code.BeyondImage, {
            ref: this.image,
            className: "horizontal",
            src: imageUrl,
            onClick: actions.openContent
          });
        }

        !imageUrl || !video ? cls += ' with-media' : '';
        cls += video ? ' item-video-panel' : '';
        video ? output = /*#__PURE__*/React.createElement(_code3.BeyondVideoPlayer, {
          id: "jwvideo",
          url: video.url,
          poster: video.image,
          "video-id": "video-id",
          type: "html"
        }) : output;
      }

      if (openGraph.entity === 'oglink') cls += ' no-media';
      return /*#__PURE__*/React.createElement("div", {
        className: cls
      }, output, /*#__PURE__*/React.createElement(OpenGraphSource, {
        openGraph: openGraph,
        actions: actions
      }), /*#__PURE__*/React.createElement("section", {
        className: "card-content",
        onClick: actions.openContent
      }, /*#__PURE__*/React.createElement("span", {
        className: "name"
      }, " ", openGraph.name), /*#__PURE__*/React.createElement("span", {
        className: "description"
      }, " ", openGraph.description)));
    }

  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-publication .article-card{background:var(--beyond-element-primary-background-color)}.beyond-publication .article-card .content-post{padding:0 15px 15px;letter-spacing:.5px}.beyond-publication .article-card .content-post .name{font-weight:700;color:var(--beyond-element-primary-text-color)}.beyond-publication .article-card .content-post img{max-width:100%;max-height:300px}.beyond-publication .article-card .content-post .owner-preload{width:140px;background:var(--beyond-gray-lighter-color);height:14px;border-radius:5px;display:inline-block;position:relative;top:5px}.beyond-publication .article-card .content-post .text-preload{width:100%;background:var(--beyond-gray-lighter-color);height:42px;border-radius:5px;display:block;position:relative;top:5px}.beyond-publication .article-card .content-post .description{color:var(--beyond-element-primary-text-color);margin:0}.beyond-publication .article-card .content-post .description .asset-date{color:var(--beyond-element-secondary-text-color);margin-left:5px;display:inline-block}@media (min-width:550px){.beyond-publication .article-card .content-icons .left{text-align:left;display:grid;grid-template-columns:80px 80px 80px}}@media (max-width:820px){.beyond-publication .article-card{box-shadow:0 5px 10px -5px var(--beyond-gray-dark-color)}}#graphs-contents-view-page .comments-wrapper{height:100%}#graphs-contents-view-page .comments-wrapper .comments-container{padding:0 0 15px;-webkit-box-shadow:0 2px 6px -1px rgba(0,0,0,.4);box-shadow:0 2px 6px -1px rgba(0,0,0,.4);background-color:var(--beyond-element-secondary-background-color)}#graphs-contents-view-page .comments-wrapper .comments-container.no-comments{height:100%;display:flex;flex-direction:column;box-shadow:none}#graphs-contents-view-page .comments-wrapper .comments-container .graphs-comments-item .comment{padding:0 3px 0 15px}#graphs-contents-view-page .comments-wrapper .comments-container .graphs-comments-item:last-child .media-body{border-bottom:none}#graphs-contents-view-page .comments-wrapper .comments-container .footer-post-comments{text-align:center;font-weight:700;border-top:1px solid var(--beyond-primary-light-color);background:var(--beyond-background-variant-color);padding:15px 0}#graphs-contents-view-page .comments-wrapper .comments-container .footer-post-comments .total-comments{color:var(--beyond-element-secondary-text-color);font-weight:400}#graphs-contents-view-page .comments-wrapper .comments-container .footer-post-comments .title{display:flex;justify-content:center;align-items:center;color:var(--beyond-gray-darker-color)}#graphs-contents-view-page .comments-wrapper .comments-container .footer-post-comments .title .chat-icon{fill:var(--beyond-element-secondary-text-color);width:25px;position:relative;margin-right:3px;top:0}@media (min-width:770px){#graphs-contents-view-page .comments-wrapper{position:absolute;width:100%;left:0;bottom:0;top:0;overflow-y:auto;margin-bottom:0;border:none}}.beyond-publication .content-header{padding:10px 7px 0;font-size:14px}.beyond-publication .content-header .icons .favorite.updating{opacity:.7}.beyond-publication .content-header .icons .favorite span{position:relative;top:-5px}.beyond-publication .content-header .icons button{color:var(--beyond-element-secondary-text-color);height:34px;width:34px;padding:7px}.beyond-publication .content-header .icons button.right{float:right}#graphs-contents-view-page .post-view .graphs-element-image.graphs-element-image-error,#graphs-contents-view-page .post-view .graphs-element-image.graphs-element-image-preload{background:var(--beyond-gray-lighter-color);padding-top:56.25%}#graphs-contents-view-page{position:absolute;top:0;left:0;bottom:0;right:0;overflow:hidden}#graphs-contents-view-page main{position:absolute;top:50px;left:0;bottom:0;right:0;height:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}#graphs-contents-view-page .content{position:absolute;top:0;left:0;bottom:0;right:0;overflow:hidden}#graphs-contents-view-page .content .graphs-comments-send{position:absolute;right:0;bottom:50px;left:0}#graphs-contents-view-page .content .content-scroll{position:absolute;top:0;left:0;bottom:100px;right:0;overflow-y:auto;background-color:var(--beyond-element-primary-background-color);display:grid;grid-template-rows:auto 1fr}#graphs-contents-view-page .content .content-scroll .col-wrapper .container{width:100%}#graphs-contents-view-page .content .content-scroll .col-wrapper.left{top:0;left:0}@media (max-width:768px){#graphs-contents-view-page .content .content-scroll .col-wrapper{width:100%}}@media (min-width:820px){#graphs-contents-view-page{bottom:0}#graphs-contents-view-page main{background:var(--beyond-element-primary-background-color)}#graphs-contents-view-page main .content .graphs-comments-send{position:absolute;right:0;left:50%}#graphs-contents-view-page main .content .content-scroll .col-wrapper{position:absolute;width:50%;height:100%;overflow-y:auto;overflow-x:hidden;bottom:0}#graphs-contents-view-page main .content .content-scroll .col-wrapper.right{left:50%;top:0;overflow:hidden;background:var(--beyond-gray-lighter-color)}}#graphs-contents-view-page .open-graph-item .card-content{padding:12px 15px 15px}#graphs-contents-view-page .open-graph-item .card-content .description,#graphs-contents-view-page .open-graph-item .card-content .name{color:var(--beyond-element-primary-text-color)}#graphs-contents-view-page .open-graph-item .card-content .name{font-weight:bolder;font-size:14px;letter-spacing:.5px}#graphs-contents-view-page .open-graph-item .card-content .description{font-weight:400;font-size:13px;letter-spacing:.4px}#graphs-contents-view-page .open-graph-source{display:grid;grid-template-columns:auto 1fr;grid-column-gap:10px;padding:15px;border-top:1px solid;border-bottom:1px solid;font-weight:700;background:var(--beyond-element-primary-background-color)}#graphs-contents-view-page .open-graph-source span{margin-top:3px}#graphs-contents-view-page .open-graph-source .twitter{color:#08a0e9}#graphs-contents-view-page .open-graph-source .facebook{color:#3b5998}#graphs-contents-view-page .open-graph-source .instagram{color:#dd2a7b}#graphs-contents-view-page .open-graph-source .youtube{color:#e62117}';
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