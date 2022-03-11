define(["exports", "react", "react-dom"], function (_exports2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.BeyondPopover = BeyondPopover;
  _exports2.BeyondPopper = BeyondPopper;
  _exports2.hmr = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/popover/code', false, {}, dependencies);
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
  FILE: control.js
  ***************/

  class Control {
    _events;
    _popper;

    get popper() {
      return this._popper;
    }

    _ready;

    get ready() {
      return this._ready;
    }

    constructor() {
      this._events = new Events({
        bind: this
      });
      this.load();
    }

    async load() {
      const url = `/libraries/beyond-ui/libs/popper/static/vendor/popper.min.js`;

      require(['@popperjs/core'], popper => {
        this._popper = popper;
        this._ready = true;

        this._events.trigger('change');
      });
    }

  }
  /**********
  popover.jsx
  **********/


  function BeyondPopover({
    children,
    target,
    className,
    options = {},
    placement = 'bottom'
  }) {
    const button = new React.useRef();
    const content = new React.useRef();
    const [ready, setReady] = React.useState();
    const [instance, setinstance] = React.useState();
    const [opened, setOpened] = React.useState(false);

    const close = () => {
      document.removeEventListener('click', close);
      content.current.removeAttribute('data-show');
      setOpened(false);
    };

    let control;

    const onOpen = () => {
      content.current.setAttribute('data-show', '');
      document.addEventListener('click', close);
      setOpened(true);
      instance?.update();
    };

    const toggle = event => {
      event.preventDefault();
      event.stopPropagation();
      const isOpened = opened;
      setOpened(!isOpened);
      isOpened ? close() : onOpen();
    };

    const hideEvents = ['mouseleave', 'blur'];
    React.useEffect(() => {
      control = new Control();

      const onChange = () => {
        setReady(control.ready);

        if (control.ready) {
          control.unbind('change', onChange);
          const specs = Object.assign({
            placement: placement
          }, options);
          setinstance(control.popper.createPopper(button.current, content.current, specs));
          content.current.addEventListener('blur', close);
          hideEvents.forEach(event => content.current.addEventListener(event, close));
        }
      };

      control.bind('change', onChange);
      if (control.ready) onChange();
      return () => {
        control.unbind('change', onChange);
        button?.current?.removeEventListener('blur', close);
        button?.current?.removeEventListener('mouseleave', close);
      };
    }, [opened]);

    if (!target) {
      throw Error('The target element must be a valid html element or react component');
    }

    if (!ready) return null;
    const cls = className ? `beyond-popover__content ${className}` : 'beyond-popover__content';
    const clsSpan = `beyond-popover__target ${opened ? ' target--opened' : ''}`;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: clsSpan,
      ref: button,
      onClick: toggle
    }, target, /*#__PURE__*/React.createElement("div", {
      className: "popover__container"
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      ref: content
    }, children))));
  }
  /*********
  popper.jsx
  *********/


  function BeyondPopper({
    opened,
    children,
    target,
    className,
    options = {},
    placement = 'bottom'
  }) {
    const button = new React.useRef();
    const content = new React.useRef();
    const [ready, setReady] = React.useState();
    const [instance, setinstance] = React.useState();

    const close = () => {
      document.removeEventListener('click', close);
      content.current.removeAttribute('data-show');
      setOpened(false);
    };

    let control;

    const onOpen = () => {
      content.current.setAttribute('data-show', '');
      document.addEventListener('click', close);
      setOpened(true);
      instance?.update();
    };

    const hideEvents = ['mouseleave', 'blur'];
    React.useState(() => {
      if (!content?.current) return;
      opened ? onOpen() : close();
    }, [opened]);
    React.useEffect(() => {
      control = new Control();

      const onChange = () => {
        setReady(control.ready);

        if (control.ready) {
          control.unbind('change', onChange);
          const specs = Object.assign({
            placement: placement
          }, options);
          setinstance(control.popper.createPopper(button.current, content.current, specs));
          content.current.addEventListener('blur', close);
          hideEvents.forEach(event => content.current.addEventListener(event, close));
        }
      };

      control.bind('change', onChange);
      if (control.ready) onChange();
      return () => {
        button.current.removeEventListener('blur', close);
        button.current.removeEventListener('mouseleave', close);
      };
    }, [opened]);

    if (!target) {
      throw Error('The target element must be a valid html element or react component');
    }

    if (!ready) return null;
    const cls = className ? `beyond-popover__content ${className}` : 'beyond-popover__content';
    return /*#__PURE__*/React.createElement("div", {
      className: "popover__container"
    }, /*#__PURE__*/React.createElement("div", {
      className: cls,
      ref: content
    }, children));
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-popover__content{display:none;background:#121f36;color:#fff}.beyond-popover__content[data-show]{display:grid;position:absolute;top:0;left:0}.beyond-popover__content .popover__container{position:relative}';
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