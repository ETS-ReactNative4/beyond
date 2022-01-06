define(["exports", "react", "react-dom", "/libraries/plm/cache/indexeddb/code.js"], function (_exports, React, ReactDOM, _code) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Page = Page;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/plm/unnamed/cache/indexeddb/tests/plm/page', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /************
  JSX PROCESSOR
  ************/

  /*******
  view.jsx
  *******/


  function View() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "IndexDB - PLM"));
  }
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: config.js
  **************/


  const getConfig = () => {
    'use strict';

    const CONFIG = Object.freeze({
      'DB': 'plmtest',
      'VERSION': 1
    });
    const lists = {
      'name': 'lists',
      'config': {
        'keyPath': 'id',
        'autoIncrement': true
      },
      'indexes': [['id', 'id', {
        'unique': false
      }]]
    };
    const records = {
      'name': 'records',
      'config': {
        'keyPath': 'id',
        'autoIncrement': true
      },
      'indexes': [['id', 'id', {
        'unique': false
      }]]
    };
    const unpublished = {
      'name': 'unpublished',
      'config': {
        'keyPath': 'id',
        'autoIncrement': true
      },
      'indexes': [['instanceId', 'instanceId', {
        'unique': false
      }]]
    };
    return {
      'name': CONFIG.DB,
      'version': CONFIG.VERSION,
      'stores': [lists, records, unpublished]
    };
  };
  /**************
  FILE: define.js
  **************/


  async function defineDB() {
    const db = await _code.default.create(getConfig());
    let store;

    const save = async (name, data) => {
      store = db.store(name);
      await store.save(data);
    };

    let item = {
      'instanceId': '123456789',
      'item': {
        'id': 1,
        'name': 'Prueba',
        'email': 'prueba@jidadesarrollos.com'
      }
    };
    let item2 = {
      'instanceId': '212121',
      'item': {
        'id': 2,
        'name': 'Otra Prueba',
        'email': 'prueba@jidadesarrollos.com'
      }
    };
    await save('unpublished', item);
    await save('unpublished', item2);
  }
  /************
  FILE: page.js
  ************/


  function Page() {
    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.classList.add('app-indexed-plm-page');
    defineDB();
  }
  /**********
  SCSS STYLES
  **********/


  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}';
});