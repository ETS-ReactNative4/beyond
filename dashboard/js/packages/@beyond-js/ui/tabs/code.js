define(["exports", "@beyond-js/ui/icon/code", "@beyond-js/ui/ripple/code", "react", "react-dom"], function (_exports2, _code, _code2, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.TabsContent = _exports2.Tabs = _exports2.BeyondTabs = _exports2.BeyondTab = void 0;
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/tabs/code', false, {}, dependencies);
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
  /**************
  beyond-tabs.jsx
  **************/


  class BeyondTabs extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement(TabsContextProvider, this.props, this.props.children);
    }

  }
  /**********
  context.jsx
  **********/


  _exports2.BeyondTabs = BeyondTabs;
  const TabsContext = React.createContext();

  function TabsContextProvider({
    children,
    orientation,
    align,
    className,
    selected
  }) {
    const [active, setSelected] = React.useState(selected);
    React.useEffect(() => {
      setSelected(selected);
    }, [selected]);

    const tabNavigate = index => setSelected(index);

    const data = {
      'children': children,
      'orientation': orientation,
      'tabNavigate': tabNavigate,
      'selected': active,
      'index': selected !== active ? selected : active
    };
    orientation = orientation ? orientation : 'horizontal';
    let cls = 'beyond-tabs beyond-tabs-container ';
    cls += `${orientation === 'horizontal' ? 'beyond-tabs-horizontal' : 'beyond-tabs-vertical'}`;
    if (className) cls += ` ${className}`;
    return /*#__PURE__*/React.createElement(TabsContext.Provider, {
      value: data
    }, /*#__PURE__*/React.createElement("div", {
      className: cls
    }, children));
  }

  const useTabsContext = () => React.useContext(TabsContext);
  /******
  tab.jsx
  ******/


  const BeyondTab = props => {
    const {
      index,
      isActive,
      selected,
      nolink
    } = props;
    let cls = isActive && index === parseInt(selected) ? "beyond-tab tab-active" : "beyond-tab";
    if (props.className) cls += ` ${props.className}`;
    const attrs = { ...props
    };
    delete attrs.children;
    delete attrs.onTab;
    delete attrs.isActive;
    delete attrs.nolink;
    delete attrs.className;
    return /*#__PURE__*/React.createElement("div", _extends({
      className: cls
    }, attrs), props.children, !nolink && /*#__PURE__*/React.createElement(_code2.BeyondWaves, null));
  };
  /***************
  tabs-content.jsx
  ***************/


  _exports2.BeyondTab = BeyondTab;

  class TabsContent extends React.Component {
    render() {
      const {
        children
      } = this.props;
      const content = children.find((content, index) => index === this.context.index);
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-tabs-content"
      }, content);
    }

  }

  _exports2.TabsContent = TabsContent;
  TabsContent.contextType = TabsContext;
  /*******
  tabs.jsx
  *******/

  class Tabs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: true,
        valueSelected: 0
      };
      this.tabNavigate = this.tabNavigate.bind(this);
    }

    tabNavigate(event, callback) {
      const target = event.currentTarget;
      const index = target.dataset.index;
      this.setState({
        'valueSelected': index,
        'active': index !== this.state.valueSelected ? true : !this.state.active
      });
      if (callback) callback(event);
      this.context.tabNavigate(parseInt(index));
    }

    render() {
      const {
        children,
        nolink,
        onTab
      } = this.props;
      const {
        active,
        valueSelected
      } = this.state;
      const output = children.map((tab, index) => {
        const props = {
          'key': index,
          'selected': this.context.selected,
          'isActive': active,
          'index': index,
          'data-index': index
        };
        if (!nolink) props.onClick = this.tabNavigate;else props.nolink = true;
        if (tab.props.onClick) props.onClick = event => this.tabNavigate(event, tab.props.onClick);
        if (tab.type === BeyondTab) return React.cloneElement(tab, props);
        return /*#__PURE__*/React.createElement(BeyondTab, _extends({}, props, {
          key: index
        }), tab);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "beyond-tabs-items"
      }, /*#__PURE__*/React.createElement("div", {
        className: "tabs-container"
      }, output));
    }

  }

  _exports2.Tabs = Tabs;
  Tabs.contextType = TabsContext;
  /**********
  SCSS STYLES
  **********/

  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.beyond-tabs .beyond-tabs-content{position:relative}.beyond-tabs-container{display:flex;height:100%;width:100%;position:relative;flex-direction:column}.beyond-tabs-container.beyond-tabs-vertical .beyond-tabs-items{width:50px;height:100%;position:relative}.beyond-tabs-container.beyond-tabs-vertical .beyond-tabs-items .tabs-container{position:sticky;top:8px}.beyond-tabs-container.beyond-tabs-horizontal .beyond-tabs-items{display:flex;background:#d3d3d3;height:100%}.beyond-tabs-container.beyond-tabs-horizontal .beyond-tabs-items .tabs-container{width:100%;display:flex}.beyond-tabs-container .beyond-tabs-items{z-index:999}.beyond-tabs-container .beyond-tabs-items .beyond-tab{display:flex;align-items:center;justify-content:center;position:relative;padding:15px;flex-grow:1}.beyond-tabs-container .beyond-tabs-items .beyond-tab.tab-active svg{fill:white}.beyond-tabs-container .beyond-tabs-items .beyond-tab svg{margin:auto;cursor:pointer}';
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