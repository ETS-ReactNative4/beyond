define(["exports", "@beyond-js/kernel/core/ts"], function (_exports2, dependency_0) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.tables = _exports2.realtime = _exports2.hmr = _exports2.auth = _exports2.TableSpecs = _exports2.NotSet = _exports2.ListUpdateFilterReport = _exports2.ItemsProperty = _exports2.ItemSpecs = _exports2.ItemSelectorProperty = _exports2.ItemProperty = _exports2.Item = _exports2.DataSource = _exports2.ConditionOperand = _exports2.CollectionSpecs = _exports2.CollectionProperty = _exports2.Collection = void 0;
  const dependencies = new Map();
  dependencies.set('@beyond-js/kernel/core/ts', dependency_0);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/plm/core/ts', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const modules = new Map();
  /***************************
  INTERNAL MODULE: ./auth/auth
  ***************************/

  modules.set('./auth/auth', {
    hash: 2495452891,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.auth = void 0;

      var _sessions = require("./sessions");
      /*bundle*/


      const auth = new class {
        #sessions = new _sessions.Sessions();

        get sessions() {
          return this.#sessions;
        }

        set(sessionName, accessToken) {
          if (!this.#sessions.has(sessionName)) {
            throw new Error(`Session "${sessionName}" is not registered`);
          }

          const session = this.#sessions.get(sessionName);
          session.accessToken = accessToken;
        }

      }();
      exports.auth = auth;
    }
  });
  /***************************************
  INTERNAL MODULE: ./auth/get-access-token
  ***************************************/

  modules.set('./auth/get-access-token', {
    hash: 3814648084,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getAccessToken = getAccessToken;

      var _auth = require("./auth");
      /**
       * Gets the session object from the session name
       *
       * @param session {string} The plm session name
       */


      async function getAccessToken(session) {
        if (!session) throw new Error('Session not set');
        const errors = Object.freeze({
          'NOT_LOGGED_IN': () => new Error(`User is not logged in on session "${session}"`)
        });
        if (!_auth.auth.sessions.has(session)) throw errors.NOT_LOGGED_IN();

        let s = _auth.auth.sessions.get(session);

        if (!s) throw errors.NOT_LOGGED_IN();
        const accessToken = s.accessToken;
        if (!accessToken) throw errors.NOT_LOGGED_IN();
        return accessToken;
      }
    }
  });
  /******************************
  INTERNAL MODULE: ./auth/session
  ******************************/

  modules.set('./auth/session', {
    hash: 1207406251,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PLMSession = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      class PLMSession extends _ts.Events {
        #name;

        get name() {
          return this.#name;
        }

        constructor(name) {
          super();
          this.#name = name;
        }

        #accessToken;

        get accessToken() {
          return this.#accessToken;
        }

        set accessToken(value) {
          this.#accessToken = value;
          this.trigger('change');
        }

      }

      exports.PLMSession = PLMSession;
    }
  });
  /*******************************
  INTERNAL MODULE: ./auth/sessions
  *******************************/

  modules.set('./auth/sessions', {
    hash: 642400809,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Sessions = void 0;

      var _session = require("./session");

      class Sessions extends Map {
        register(name) {
          if (!name) throw new Error('Parameter name not set');
          if (super.has(name)) throw new Error(`Session "${name}" already registered`);
          const session = new _session.PLMSession(name);
          super.set(name, session);
          return session;
        }

        unregister(name) {
          if (!name) throw new Error('Parameter name not set');
          if (!super.has(name)) throw new Error(`Session "${name}" is not registered`);
          super.delete(name);
        }

      }

      exports.Sessions = Sessions;
    }
  });
  /***************************
  INTERNAL MODULE: ./constants
  ***************************/

  modules.set('./constants', {
    hash: 1333982119,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.NotSet = exports.DataSource = void 0;
      /*bundle*/

      const NotSet = {};
      exports.NotSet = NotSet;
      /*bundle*/

      var DataSource;
      exports.DataSource = DataSource;

      (function (DataSource) {
        DataSource[DataSource["NotLoaded"] = 0] = "NotLoaded";
        DataSource[DataSource["Cache"] = 1] = "Cache";
        DataSource[DataSource["Server"] = 2] = "Server";
      })(DataSource || (exports.DataSource = DataSource = {}));
    }
  });
  /************************************************
  INTERNAL MODULE: ./elements/collection/collection
  ************************************************/

  modules.set('./elements/collection/collection', {
    hash: 199874439,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Collection = void 0;

      var _element = require("../element");

      var _collection = require("../../tree/collection");

      var _counters = require("./counters/counters");

      var _items = require("./items/items");

      var _item = require("../item/item");

      var _tree = require("./tree");
      /*bundle*/


      class Collection extends _element.Element {
        get is() {
          return 'collection';
        }

        #Item;

        get Item() {
          return this.#Item;
        }

        #list;

        get list() {
          return this.#list;
        }

        #counters = new _counters.CollectionCounters(this);

        get counters() {
          return this.#counters;
        }

        #items = new _items.CollectionItems(this);

        get items() {
          return this.#items.items;
        }

        #tree = new _tree.Tree(this);

        get tree() {
          return this.#tree;
        }
        /**
         * Loads the collection bringing the data from the local store cache
         *
         * @returns {Promise<void>}
         */


        async load(tree = true) {
          await this.#list.load();
          if (!this.loaded || !tree) return;
          const promises = [];
          promises.push(this.#items.load(tree));
          promises.push(this.#counters.load());
          await Promise.all(promises);
        }
        /**
         * Fetch the collection bringing the data from the server
         *
         * @param {boolean} tree Fetches the tree or only the current node
         * @returns {Promise<void>}
         */


        async fetch(tree = true) {
          await this.#list.fetch();
          if (!tree) return;
          const promises = [];
          promises.push(this.#items.fetch(tree));
          promises.push(this.#counters.fetch());
          await Promise.all(promises);
        }
        /**
         * Loads or fetch data only if not data is already available
         *
         * @param {boolean} tree Fills the tree or only the current node
         * @returns {Promise<void>}
         */


        async fill(tree = true) {
          if (!this.landed) {
            await this.load(false);
            !this.landed && (await this.fetch(false));
          } // Continue with tree loading


          if (!tree || this.tree.landed) return;
          const promises = [];
          promises.push(this.#items.fill(tree));
          promises.push(this.#counters.fill());
          await Promise.all(promises);
        }

        constructor(table, DItem, specs) {
          super(table);
          if (!table || typeof table !== 'string') throw new Error('Parameter table is invalid');
          if (!(DItem.prototype instanceof _item.Item)) throw new Error('Parameter item is invalid');
          this.#Item = DItem;
          specs = specs ? specs : {};
          super.node = specs.node ? specs.node : new _collection.CollectionNode(table, specs.tree); // Gets the list data access

          const attributes = {};
          this.#list = this.table.lists.get(specs.filter, this.node.order, attributes, specs.session);
          super.data = this.#list;
          this.#items.activate();
        }

        destroy() {
          super.destroy(); // The list is not longer being used by this item

          this.#list.release();
          this.#items.destroy();
        }

      }

      exports.Collection = Collection;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./elements/collection/counters/counter
  ******************************************************/

  modules.set('./elements/collection/counters/counter', {
    hash: 1792567981,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionCounter = void 0;

      var _filter = require("../../../tables/data/filter/filter");

      class CollectionCounter {
        #collection;
        #name;
        #counter;

        get value() {
          return this.#counter;
        }

        constructor(collection, name, conditions) {
          this.#collection = collection;
          this.#name = name;
          const {
            table
          } = collection;
          conditions = conditions ? conditions.concat(collection.list.filter.specs) : collection.list.filter.specs;
          const filter = new _filter.Filter(table, conditions);
          this.#counter = table.counters.get(filter.specs, collection.list.attributes, collection.session);
        }

        load = async () => await this.#counter.load();
        fetch = async () => await this.#counter.fetch();
        #triggerChange = () => this.#collection.node.trigger('change');

        activate() {
          this.#counter.on('change', this.#triggerChange);
        }

        deactivate() {
          this.#counter.off('change', this.#triggerChange);
        }

      }

      exports.CollectionCounter = CollectionCounter;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./elements/collection/counters/counters
  *******************************************************/

  modules.set('./elements/collection/counters/counters', {
    hash: 2686580010,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionCounters = void 0;

      var _counter = require("./counter");

      class CollectionCounters extends Map {
        #collection;

        constructor(collection) {
          super();
          this.#collection = collection;
        }

        register(name, conditions) {
          const {
            node
          } = this.#collection;
          if (!node.counters.has(name)) return;
          this.set(name, new _counter.CollectionCounter(this.#collection, name, conditions));
        }

        async load() {
          const promises = [];
          [...this.values()].forEach(counter => promises.push(counter.load()));
          await Promise.all(promises);
        }

        async fetch() {
          const promises = [];
          [...this.values()].forEach(counter => promises.push(counter.fetch()));
          await Promise.all(promises);
        }

        async fill() {
          const promises = [];
          [...this.values()].forEach(counter => !counter.value === undefined && promises.push(counter.fetch()));
          await Promise.all(promises);
        }

      }

      exports.CollectionCounters = CollectionCounters;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./elements/collection/items/items
  *************************************************/

  modules.set('./elements/collection/items/items', {
    hash: 3680212401,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionItems = void 0;

      class CollectionItems {
        #collection;
        #map;
        #items = [];

        get items() {
          return this.#items;
        }

        constructor(collection) {
          this.#collection = collection;
        }

        #triggerChange = () => {
          this.#collection.node.trigger('change');
        };
        update = () => {
          if (!this.#collection.list.landed) return;
          this.#items = [];
          const updated = new Map();
          const ordered = this.#collection.list.records.values;

          for (const id of ordered) {
            let item;
            const key = id.unpublished ? `local.${id.localId}` : `published.${id.pk}`;

            if (this.#map && this.#map.has(key)) {
              item = this.#map.get(key);
            } else if (id.unpublished) {
              const Item = this.#collection.Item;
              item = new Item({
                node: this.#collection.node.items,
                localId: id.localId
              });
              item.on('change', this.#triggerChange);
            } else {
              item = new this.#collection.Item({
                node: this.#collection.node.items,
                pk: id.pk
              });
              item.on('change', this.#triggerChange);
            }

            updated.set(key, item);
            this.#items.push(item);
          } // Destroy unused items


          this.#map && this.#map.forEach((item, key) => {
            if (updated.has(key)) return;
            item.off('change', this.#triggerChange);
            item.destroy();
          });
          this.#map = updated;
        };

        async load(tree = true) {
          const promises = [];
          [...this.#map.values()].forEach(item => promises.push(item.load(tree)));
          await Promise.all(promises);
        }

        async fetch(tree = true) {
          const promises = [];
          [...this.#map.values()].forEach(item => promises.push(item.fetch(tree)));
          await Promise.all(promises);
        }

        async fill(tree = true) {
          const promises = [];
          this.#map.forEach(item => promises.push(item.fill(tree)));
          await Promise.all(promises);
        }

        activate() {
          this.#collection.list.on('updated', this.update);
          this.update();
        }

        destroy() {
          this.#collection.list.off('updated', this.update);
        }

      }

      exports.CollectionItems = CollectionItems;
    }
  });
  /******************************************
  INTERNAL MODULE: ./elements/collection/tree
  ******************************************/

  modules.set('./elements/collection/tree', {
    hash: 3980109007,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Tree = void 0;

      class Tree {
        #collection;

        constructor(collection) {
          this.#collection = collection;
        }

        get landed() {
          const collection = this.#collection;
          if (!collection.landed) return false;

          for (const item of collection.items) {
            if (!item.tree.landed) return false;
          }

          return true;
        }

      }

      exports.Tree = Tree;
    }
  });
  /**********************************
  INTERNAL MODULE: ./elements/element
  **********************************/

  modules.set('./elements/element', {
    hash: 2829845709,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Element = void 0;

      var _tables = require("../tables/tables");

      var _realtime = require("./realtime");

      class Element {
        on = (event, listener, priority) => this.#node.on(event, listener, priority);
        bind = (event, listener, priority) => this.#node.on(event, listener, priority);
        off = (event, listener) => this.#node.off(event, listener);
        unbind = (event, listener) => this.#node.off(event, listener);
        #realtime;
        #node;

        get node() {
          return this.#node;
        }

        set node(value) {
          if (this.#node) throw new Error('Property "node" already set');
          this.#node = value;
        }

        get active() {
          return this.node.active;
        }

        set active(value) {
          this.node.active = value;
        }

        #triggerChange = () => this.#node.trigger('change');
        #data;

        get data() {
          return this.#data;
        }

        set data(value) {
          if (this.#data) throw new Error('Property "data" already set');
          this.#data = value;
          this.#data.on('change', this.#triggerChange);
          this.#realtime = new _realtime.Realtime(this);
        }

        get session() {
          return this.#node.session;
        }

        #table;

        get table() {
          return this.#table;
        }

        get loaded() {
          return this.#data.loaded;
        }

        get fetching() {
          return this.#data.fetching;
        }

        get fetched() {
          return this.#data.fetched;
        }

        get landed() {
          return this.#data.landed;
        }

        async restore() {
          await this.fetch(false);
          await this.fill();
        }

        constructor(table) {
          if (!table || typeof table !== 'string') throw new Error('Parameter table is invalid');
          if (!_tables.tables.has(table)) throw new Error(`Table "${table}" is not registered`);
          this.#table = _tables.tables.get(table);
        }

        destroy() {
          this.#data && this.#data.off('change', this.#triggerChange);
          this.#realtime.destroy();
        }

      }

      exports.Element = Element;
    }
  });
  /********************************************
  INTERNAL MODULE: ./elements/item/fields/field
  ********************************************/

  modules.set('./elements/item/fields/field', {
    hash: 3159573088,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemField = void 0;

      var _constants = require("../../../constants");

      class ItemField {
        #item;
        #name;

        constructor(item, name) {
          this.#item = item;
          this.#name = name;
        }

        get assigned() {
          return this.#item.record.fields.get(this.#name).assigned;
        }

        get value() {
          const value = this.#item.record.fields.get(this.#name).value;
          return value === _constants.NotSet ? undefined : value;
        }

        set value(value) {
          this.#item.record.fields.get(this.#name).value = value;
          this.#item.node.trigger('change');
        }

      }

      exports.ItemField = ItemField;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./elements/item/fields/fields
  *********************************************/

  modules.set('./elements/item/fields/fields', {
    hash: 2163016256,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemFields = void 0;

      var _field = require("./field");

      class ItemFields extends Map {
        constructor(item) {
          super();
          const {
            fields
          } = item.table;

          for (const name of fields) {
            this.set(name, new _field.ItemField(item, name));
          }
        }

      }

      exports.ItemFields = ItemFields;
    }
  });
  /************************************
  INTERNAL MODULE: ./elements/item/item
  ************************************/

  modules.set('./elements/item/item', {
    hash: 1738494106,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Item = void 0;

      var _element = require("../element");

      var _item = require("../../tree/item");

      var _properties = require("./properties/properties");

      var _fields = require("./fields/fields");

      var _tree = require("./tree");
      /*bundle*/


      class Item extends _element.Element {
        get is() {
          return 'item';
        }

        #record;

        get record() {
          return this.#record;
        }

        get version() {
          return this.#record.version;
        }

        #fields;

        get fields() {
          return this.#fields;
        }

        #properties;

        get properties() {
          return this.#properties;
        }

        get loaded() {
          return this.#record.loaded;
        }

        get fetched() {
          return this.#record.fetched;
        }

        get fetching() {
          return this.#record.fetching;
        }

        get found() {
          return this.#record.found;
        }

        #tree = new _tree.Tree(this);

        get tree() {
          return this.#tree;
        }

        async load(tree = true) {
          await this.#record.load();
          if (!tree) return;
          this.loaded && (await this.#properties.load());
        }

        async fetch(tree = true) {
          await this.#record.fetch();
          if (!tree) return;
          this.landed && (await this.#properties.fetch());
        }
        /**
         * Loads or fetch data only if not data is already available
         *
         * @param {boolean} tree Fills the tree or only the current node
         * @returns {Promise<void>}
         */


        async fill(tree = true) {
          if (!this.landed) {
            await this.load(false);
            !this.loaded && (await this.fetch(false));
          } // Continue with tree loading


          if (!tree || this.tree.landed) return;
          await this.#properties.fill();
        }

        constructor(table, specs) {
          super(table);
          if (!table || typeof table !== 'string') throw new Error('Parameter table is invalid');
          specs = specs ? specs : {};
          super.node = specs.node ? specs.node : new _item.ItemNode(table, specs.tree); // Get the record data access

          let identifier;

          if (specs.identifier) {
            identifier = specs.identifier;
          } else if (specs.localId) {
            identifier = {
              localId: specs.localId
            };
          } else if (specs.pk) {
            const pk = this.table.indices.primary.fields[0];
            identifier = {};
            identifier[pk] = specs.pk;
          }

          this.#record = this.table.records.get(identifier, specs.session);
          super.data = this.#record;
          this.#fields = new _fields.ItemFields(this);
          this.#properties = new _properties.Properties(this);
          this.#record.on('updated', () => this.#properties.update());
          this.#record.landed && this.properties.update();
        }

        destroy() {
          // The record is not longer being used by this item
          this.#record.off('updated', this.#properties.update);
          super.destroy();
          this.#record.release();
        }

      }

      exports.Item = Item;
    }
  });
  /************************************************************
  INTERNAL MODULE: ./elements/item/properties/collection/filter
  ************************************************************/

  modules.set('./elements/item/properties/collection/filter', {
    hash: 3183572785,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionPropertyFilter = void 0;

      var _filter = require("../../../../tables/data/filter/filter");
      /**
       * The collection property filter generator
       */


      class CollectionPropertyFilter {
        #node;
        #parentItem;
        #value;

        get value() {
          return this.#value;
        }

        #valid = false;

        get valid() {
          return this.#valid;
        }

        #spec;
        /**
         * CollectionPropertyFilter Constructor
         *
         * @param {Item} item
         * @param {ItemNode} node
         */

        constructor(item, node) {
          this.#parentItem = item;
          this.#node = node;
          this.#spec = this.#node.property.filterSpec;
        }
        /**
         * Generates the identifier of the item to be created
         */


        update() {
          this.#valid = false;
          this.#value = undefined;
          const filter = [];

          for (const field of this.#spec) {
            if (field.hasOwnProperty('value')) {
              filter.push({
                field: field.field,
                value: field.value,
                operand: _filter.ConditionOperand.Equal
              });
              continue;
            }

            const source = field.source;
            if (!this.#parentItem.fields.has(source)) throw new Error(`Filter of property "${this.#node.property.name}" is invalid. ` + `Source "${source}" not found`);
            let parentItemField = this.#parentItem.fields.get(source);
            if (!parentItemField.assigned) return;
            let value = parentItemField.value;
            value = typeof field.transform === 'function' ? field.transform(this.#parentItem, value) : value;
            if (!value) return;
            filter.push({
              field: field.field,
              value: value,
              operand: _filter.ConditionOperand.Equal
            });
          }

          this.#valid = true;
          this.#value = filter;
        }

      }

      exports.CollectionPropertyFilter = CollectionPropertyFilter;
    }
  });
  /**************************************************************
  INTERNAL MODULE: ./elements/item/properties/collection/property
  **************************************************************/

  modules.set('./elements/item/properties/collection/property', {
    hash: 3041225316,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionProperty = void 0;

      var _filter = require("./filter");

      var _compareObjects = require("../../../../tables/data/factory/compare-objects");

      var _tree = require("./tree");
      /*bundle*/


      class CollectionProperty {
        get is() {
          return 'collection';
        }

        #parentItem;
        #node;

        get node() {
          return this.#node;
        }

        tree = new _tree.Tree(this);
        #value;

        get value() {
          return this.#value;
        }

        #lastFilter;
        #filter;

        get filter() {
          return this.#filter;
        }

        constructor(parentItem, node) {
          this.#parentItem = parentItem;
          this.#node = node;
          this.#filter = new _filter.CollectionPropertyFilter(parentItem, node);
        }

        update() {
          this.#filter.update();

          if (!this.#filter.valid) {
            this.#value && this.#value.destroy();
            this.#value = undefined;
            this.#lastFilter = undefined;
            return;
          }

          const filter = this.#filter.value; // Check if the identifier has changed

          if (this.#lastFilter && _compareObjects.CompareObjects.compare(this.#lastFilter, filter)) {
            return this.#value;
          }

          this.#lastFilter = filter;
          this.#value && this.#value.destroy();
          const tableProperty = this.#node.property;
          this.#value = new tableProperty.Collection({
            node: this.node,
            filter: filter
          });
          return this.#value;
        }

        load = () => this.#value && this.#value.load();
        fetch = () => this.#value && this.#value.fetch();
        fill = async () => this.#value && this.#value.fill();
        destroy = () => this.#value && this.#value.destroy();
      }

      exports.CollectionProperty = CollectionProperty;
    }
  });
  /**********************************************************
  INTERNAL MODULE: ./elements/item/properties/collection/tree
  **********************************************************/

  modules.set('./elements/item/properties/collection/tree', {
    hash: 476448367,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Tree = void 0;

      class Tree {
        #property;

        constructor(property) {
          this.#property = property;
        }

        get landed() {
          const collection = this.#property.value;
          return collection ? collection.tree.landed : true;
        }

      }

      exports.Tree = Tree;
    }
  });
  /*****************************************************************
  INTERNAL MODULE: ./elements/item/properties/item-selector/property
  *****************************************************************/

  modules.set('./elements/item/properties/item-selector/property', {
    hash: 171229117,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemSelectorProperty = void 0;

      var _compareObjects = require("../../../../tables/data/factory/compare-objects");

      var _tree = require("./tree");
      /*bundle*/


      class ItemSelectorProperty {
        get is() {
          return 'item-selector';
        }

        #parentItem;
        #node;

        get node() {
          return this.#node;
        }

        tree = new _tree.Tree(this);
        #value;

        get value() {
          return this.#value;
        }

        #lastIdentifier;
        #identifier;

        get identifier() {
          return this.#identifier;
        }

        constructor(parentItem, node) {
          this.#parentItem = parentItem;
          this.#node = node;
        }

        update() {
          const tableProperty = this.#node.property;
          const {
            Item,
            identifier,
            table
          } = tableProperty.selector(this.#parentItem); // Check if the table is registered in the tree

          if (!this.node.tables.has(table)) return; // Check if value should be changed or not

          if (this.#value && this.#value.constructor === Item && this.#lastIdentifier && _compareObjects.CompareObjects.compare(this.#lastIdentifier, identifier)) {
            return this.#value;
          }

          this.#lastIdentifier = identifier;
          this.#value && this.#value.destroy();
          this.#value = new Item({
            node: this.node.tables.get(table),
            identifier: identifier
          });
          return this.#value;
        }

        load = async (tree = true) => this.#value && (await this.#value.load(tree));
        fetch = async (tree = true) => this.#value && (await this.#value.fetch(tree));
        fill = async (tree = true) => this.#value && (await this.#value.fill(tree));
        destroy = () => this.#value && this.#value.destroy();
      }

      exports.ItemSelectorProperty = ItemSelectorProperty;
    }
  });
  /*************************************************************
  INTERNAL MODULE: ./elements/item/properties/item-selector/tree
  *************************************************************/

  modules.set('./elements/item/properties/item-selector/tree', {
    hash: 3729187936,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Tree = void 0;

      class Tree {
        #property;

        constructor(property) {
          this.#property = property;
        }

        get landed() {
          const item = this.#property.value;
          return item ? item.tree.landed : true;
        }

      }

      exports.Tree = Tree;
    }
  });
  /**********************************************************
  INTERNAL MODULE: ./elements/item/properties/item/identifier
  **********************************************************/

  modules.set('./elements/item/properties/item/identifier', {
    hash: 1191197271,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemPropertyIdentifier = void 0;

      class ItemPropertyIdentifier {
        #node;
        #parentItem;
        #value;

        get value() {
          return this.#value;
        }

        #valid = false;

        get valid() {
          return this.#valid;
        }

        #spec;
        /**
         * ItemPropertyIdentifier Constructor
         *
         * @param {Item} item
         * @param {ItemNode} node
         */

        constructor(item, node) {
          this.#parentItem = item;
          this.#node = node;
          this.#spec = this.#node.property.identifierSpec;
        }
        /**
         * Generates the identifier of the item to be created
         */


        update() {
          this.#valid = false;
          this.#value = undefined;
          const identifier = {};

          for (const field of this.#spec) {
            if (field.hasOwnProperty('value')) {
              identifier[field.field] = field.value;
              continue;
            }

            const source = field.source;
            if (!this.#parentItem.fields.has(source)) throw new Error(`Identifier of property "${this.#node.property.name}" is invalid. ` + `Source "${source}" not found`);
            let parentItemField = this.#parentItem.fields.get(source);
            if (!parentItemField.assigned) return;
            let value = parentItemField.value;
            value = typeof field.transform === 'function' ? field.transform(this.#parentItem, value) : value;
            if (!value) return;
            identifier[field.field] = value;
          }

          this.#valid = true;
          this.#value = identifier;
        }

      }

      exports.ItemPropertyIdentifier = ItemPropertyIdentifier;
    }
  });
  /********************************************************
  INTERNAL MODULE: ./elements/item/properties/item/property
  ********************************************************/

  modules.set('./elements/item/properties/item/property', {
    hash: 1833209030,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemProperty = void 0;

      var _identifier = require("./identifier");

      var _compareObjects = require("../../../../tables/data/factory/compare-objects");

      var _tree = require("./tree");
      /*bundle*/


      class ItemProperty {
        get is() {
          return 'item';
        }

        #parentItem;
        #node;

        get node() {
          return this.#node;
        }

        tree = new _tree.Tree(this);
        #value;

        get value() {
          return this.#value;
        }

        #lastIdentifier;
        #identifier;

        get identifier() {
          return this.#identifier;
        }

        constructor(parentItem, node) {
          this.#parentItem = parentItem;
          this.#node = node;
          this.#identifier = new _identifier.ItemPropertyIdentifier(parentItem, node);
        }

        update() {
          this.#identifier.update();

          if (!this.#identifier.valid) {
            this.#value && this.#value.destroy();
            this.#value = undefined;
            this.#lastIdentifier = undefined;
            return;
          }

          const identifier = this.#identifier.value; // Check if the identifier has changed

          if (this.#lastIdentifier && _compareObjects.CompareObjects.compare(this.#lastIdentifier, identifier)) {
            //TODO: agregar comentario para caso de uso, en actualizacion de Item
            return this.#value;
          }

          this.#lastIdentifier = identifier;
          this.#value && this.#value.destroy();
          const tableProperty = this.#node.property;
          this.#value = new tableProperty.Item({
            node: this.node,
            identifier: identifier
          });
          return this.#value;
        }

        load = async (tree = true) => this.#value && (await this.#value.load(tree));
        fetch = async (tree = true) => this.#value && (await this.#value.fetch(tree));
        fill = async (tree = true) => this.#value && (await this.#value.fill(tree));
        destroy = () => this.#value && this.#value.destroy();
      }

      exports.ItemProperty = ItemProperty;
    }
  });
  /****************************************************
  INTERNAL MODULE: ./elements/item/properties/item/tree
  ****************************************************/

  modules.set('./elements/item/properties/item/tree', {
    hash: 2961426029,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Tree = void 0;

      class Tree {
        #property;

        constructor(property) {
          this.#property = property;
        }

        get landed() {
          const item = this.#property.value;
          return item ? item.tree.landed : true;
        }

      }

      exports.Tree = Tree;
    }
  });
  /*********************************************************
  INTERNAL MODULE: ./elements/item/properties/items/property
  *********************************************************/

  modules.set('./elements/item/properties/items/property', {
    hash: 2467694982,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemsProperty = void 0;

      var _tree = require("./tree");
      /*bundle*/


      class ItemsProperty extends Map {
        get is() {
          return 'items';
        }

        #parentItem;
        #node;

        get node() {
          return this.#node;
        }

        tree = new _tree.Tree(this);

        constructor(parentItem, node) {
          super();
          this.#parentItem = parentItem;
          this.#node = node;
        }

        update() {
          const {
            record
          } = this.#parentItem;
          const tableProperty = this.#node.property;
          if (!record.fields.has(tableProperty.identifier.source)) return;
          const source = record.fields.get(tableProperty.identifier.source);
          if (!source.assigned) return;
          const values = source.value;
          if (!(values instanceof Array)) return;

          for (const identifierValue of values) {
            if (this.has(identifierValue)) continue;
            const identifier = {};
            identifier[tableProperty.identifier.field] = identifierValue;
            this.set(identifierValue, new tableProperty.Items({
              node: this.node.items,
              identifier: identifier
            }));
          } // Remove items that now are not in the collection


          const marked = [];

          for (const id of this.keys()) !values.includes(id) && marked.push(id);

          for (const id of marked) {
            const item = this.get(id);
            item.destroy();
            this.delete(id);
          }

          return this;
        }

        push(value) {
          const {
            record
          } = this.#parentItem;
          const tableProperty = this.#node.property;
          if (!record.fields.has(tableProperty.identifier.source)) throw new Error(`Field "${tableProperty.identifier.source}" has not been declared`);
          const field = record.fields.get(tableProperty.identifier.source);
          let values = field.assigned ? field.value : [];
          if (values.includes(value)) return;
          values.push(value);
          field.memory = values;
          this.update();
        }

        delete(id) {
          const {
            record
          } = this.#parentItem;
          const tableProperty = this.#node.property;
          if (!record.fields.has(tableProperty.identifier.source)) throw new Error(`Field "${tableProperty.identifier.source}" has not been declared`);
          const field = record.fields.get(tableProperty.identifier.source);
          let values = field.value;
          if (!(values instanceof Array)) return false; // Nothing to delete

          field.memory = values.filter(value => value !== id);
          this.update();
          return true;
        }

        async load(tree = true) {
          const promises = [];
          this.forEach(item => promises.push(item.load(tree)));
          await Promise.all(promises);
        }

        async fetch(tree = true) {
          const promises = [];
          this.forEach(item => promises.push(item.fetch(tree)));
          await Promise.all(promises);
        }

        async fill(tree = true) {
          const promises = [];
          this.forEach(item => promises.push(item.fill(tree)));
          await Promise.all(promises);
        }

        destroy() {
          this.forEach(item => item.destroy());
          this.clear();
        }

      }

      exports.ItemsProperty = ItemsProperty;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./elements/item/properties/items/tree
  *****************************************************/

  modules.set('./elements/item/properties/items/tree', {
    hash: 1066763736,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Tree = void 0;

      class Tree {
        #property;

        constructor(property) {
          this.#property = property;
        }

        get landed() {
          for (const item of this.#property.values()) {
            if (!item.tree.landed) return false;
          }

          return true;
        }

      }

      exports.Tree = Tree;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./elements/item/properties/properties
  *****************************************************/

  modules.set('./elements/item/properties/properties', {
    hash: 3553928775,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Properties = void 0;

      var _property = require("./item/property");

      var _property2 = require("./items/property");

      var _property3 = require("./item-selector/property");

      var _property4 = require("./collection/property");

      class Properties extends Map {
        constructor(item) {
          super();
          const {
            properties
          } = item.node;

          for (const [name, node] of properties) {
            switch (node.is) {
              case 'item':
                this.set(name, new _property.ItemProperty(item, node));
                break;

              case 'item-selector':
                this.set(name, new _property3.ItemSelectorProperty(item, node));
                break;

              case 'collection':
                this.set(name, new _property4.CollectionProperty(item, node));
                break;

              case 'items':
                this.set(name, new _property2.ItemsProperty(item, node));
                break;

              default:
                console.warn(`node of type "${node.is}" is not currently supported`, item, name, node);
            }
          }
        }

        async load(tree = true) {
          const promises = [];
          this.forEach(property => {
            property.update();
            promises.push(property.load(tree));
          });
          await Promise.all(promises);
        }

        async fetch(tree = true) {
          const promises = [];
          this.forEach(property => {
            property.update();
            promises.push(property.fetch(tree));
          });
          await Promise.all(promises);
        }

        async fill(tree = true) {
          const promises = [];
          this.forEach(property => {
            property.update();
            promises.push(property.fill(tree));
          });
          await Promise.all(promises);
        }

        update = () => this.forEach(property => property.update());
      }

      exports.Properties = Properties;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./elements/item/properties/property
  ***************************************************/

  modules.set('./elements/item/properties/property', {
    hash: 2546207792,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }
  });
  /************************************
  INTERNAL MODULE: ./elements/item/tree
  ************************************/

  modules.set('./elements/item/tree', {
    hash: 30503873,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Tree = void 0;

      class Tree {
        #item;

        constructor(item) {
          this.#item = item;
        }

        get landed() {
          const item = this.#item;
          if (!item.landed) return false;

          for (const property of item.properties.values()) {
            if (!property.tree.landed) return false;
          }

          return true;
        }

      }

      exports.Tree = Tree;
    }
  });
  /***********************************
  INTERNAL MODULE: ./elements/realtime
  ***********************************/

  modules.set('./elements/realtime', {
    hash: 2022675178,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Realtime = void 0;

      class Realtime {
        #element;
        #update = () => {
          this.#element.active && this.#element.fetch(false).then(() => this.#element.fill()).catch(exc => {
            console.error(exc.stack);
            console.error(`Collection fill error on realtime event.\n\n`);
          });
        };

        constructor(element) {
          this.#element = element;
          this.#element.data.on('invalidated', this.#update);
        }

        destroy() {
          this.#element.data.off('invalidated', this.#update);
        }

      }

      exports.Realtime = Realtime;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./tables/data/counter/counter
  *********************************************/

  modules.set('./tables/data/counter/counter', {
    hash: 1520738300,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CounterData = void 0;

      var _product = require("../factory/product");

      var _filter = require("../filter/filter");

      var _fetch = require("./fetch");

      var _localStore = require("./local-store");

      class CounterData extends _product.Product {
        #filter;

        get filter() {
          return this.#filter;
        }

        #attributes;

        get attributes() {
          return this.#attributes;
        }

        #value = {
          value: undefined
        };

        get value() {
          return this.#value.value;
        } // The local store, properties and methods


        #localStore = new _localStore.CounterLocalStore(this);

        get localStore() {
          return this.#localStore;
        }

        get loaded() {
          return this.#localStore.loaded;
        }

        async load() {
          let stored;

          try {
            stored = await this.#localStore.load();
          } catch (exc) {
            console.error(`Error loading counter from cache`, exc.stack);
            return;
          }

          if (stored === undefined) return;

          if (typeof stored !== 'number') {
            console.warn('Invalid counter data cache', this, stored);
          } else {
            this.#value.value = stored;
            this.trigger('change');
          }
        } // The fetch manager, properties and methods


        #fetch = new _fetch.CounterFetch(this, this.#value);

        get fetching() {
          return this.#fetch.fetching;
        }

        get fetched() {
          return this.#fetch.fetched;
        }

        async fetch() {
          await this.#fetch.fetch();
        }

        constructor(manager, key, instanceId, filterSpecs, attributes, session) {
          super(manager, key, instanceId, session);
          this.#filter = new _filter.Filter(this.table, filterSpecs);
          this.#attributes = attributes;
        }

      }

      exports.CounterData = CounterData;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./tables/data/counter/fetch
  *******************************************/

  modules.set('./tables/data/counter/fetch', {
    hash: 2851854299,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CounterFetch = void 0;

      class CounterFetch {
        #counter;
        #value;

        constructor(counter, value) {
          this.#counter = counter;
          this.#value = value;
        }

        #fetching = false;

        get fetching() {
          return this.#fetching;
        }

        #fetched = false;

        get fetched() {
          return this.#fetched;
        }

        async fetch() {
          const {
            table
          } = this.#counter; // Fetch from server

          this.#fetching = true;
          this.#counter.trigger('change');
          const attributes = {};
          this.#value.value = await table.queries.counter(this.#counter.filter.specs, attributes);
          this.#fetching = false;
          this.#fetched = true;
          this.#counter.trigger('change');
        }

      }

      exports.CounterFetch = CounterFetch;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./tables/data/counter/local-store
  *************************************************/

  modules.set('./tables/data/counter/local-store', {
    hash: 1873218828,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CounterLocalStore = void 0;

      class CounterLocalStore {
        #counter;
        #loaded = false;

        get loaded() {
          return this.#loaded;
        }

        #accessed = false;

        async load() {
          const {
            table,
            filter
          } = this.#counter;
          const attributes = {};
          const stored = await table.localDB.counters.load(filter.specs, attributes);
          this.#accessed = true;
          this.#loaded = !!stored;
          return stored;
        }

        constructor(counter) {
          this.#counter = counter;
        }

      }

      exports.CounterLocalStore = CounterLocalStore;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./tables/data/counter/manager
  *********************************************/

  modules.set('./tables/data/counter/manager', {
    hash: 2047409176,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CountersManager = void 0;

      var _counter = require("./counter");

      var _factory = require("../factory/factory");

      class CountersManager extends _factory.Factory {
        create(key, instanceId, filter, attributes, session) {
          return new _counter.CounterData(this, key, instanceId, filter, attributes, session);
        }

        get(filter, attributes, session) {
          return super.get(...arguments);
        }

      }

      exports.CountersManager = CountersManager;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./tables/data/factory/compare-objects
  *****************************************************/

  modules.set('./tables/data/factory/compare-objects', {
    hash: 2669127418,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CompareObjects = void 0;

      class CompareObjects {
        static generate(...any) {
          let args = [...arguments];
          args = args.map(argument => {
            if (typeof argument === 'object') {
              let ordered = Object.entries(argument);
              ordered = ordered.sort((e0, e1) => e0[0] > e1[0] ? -1 : 1);
              return ordered;
            } else {
              return argument;
            }
          });
          return JSON.stringify(args);
        }

        static compare(i1, i2) {
          return this.generate(i1) === this.generate(i2);
        }

      }

      exports.CompareObjects = CompareObjects;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./tables/data/factory/factory
  *********************************************/

  modules.set('./tables/data/factory/factory', {
    hash: 156948480,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Factory = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _compareObjects = require("./compare-objects");

      class Factory extends _ts.Events {
        #table;

        get table() {
          return this.#table;
        }

        constructor(table) {
          super();
          this.#table = table;
        }

        #instanceId = 0;
        #keys = new Map();
        #instances = new Map();

        has(...any) {
          return this.#keys.has(_compareObjects.CompareObjects.generate(...arguments));
        } // The count of consumers that are holding a product
        // Used destroy a product only when there are no consumers using it
        // The key of the map is the product instanceId


        #counters = new Map();

        get(...any) {
          const key = _compareObjects.CompareObjects.generate(...arguments);

          const instanceId = this.#keys.has(key) ? this.#keys.get(key) : this.#instanceId++;
          this.hold(instanceId);
          if (this.#instances.has(instanceId)) return this.#instances.get(instanceId);
          const product = this.create(key, instanceId, ...arguments);
          this.#keys.set(key, instanceId);
          this.#instances.set(instanceId, product);
          return product;
        }

        hold(instanceId) {
          let count = this.#counters.has(instanceId) ? this.#counters.get(instanceId) + 1 : 1;
          this.#counters.set(instanceId, count);
        }
        /**
         * Release a product from being consumed. Many consumers can hold the same product, so only destroy it
         * when no consumers are holding it
         *
         * @param {number} instanceId The instance id of the product
         * @returns {Product} Returns the product only if it has been destroyed
         */


        release(instanceId) {
          if (!this.#counters.has(instanceId)) {
            throw new Error(`Instance id "${instanceId}" is not registered`);
          }

          const count = this.#counters.get(instanceId) - 1;

          if (count) {
            this.#counters.set(instanceId, count);
            return;
          }

          const product = this.#instances.get(instanceId);
          this.#keys.delete(product.key);
          this.#instances.delete(instanceId);
          this.#counters.delete(instanceId);
          product.destroy();
          return product;
        }

      }

      exports.Factory = Factory;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./tables/data/factory/product
  *********************************************/

  modules.set('./tables/data/factory/product', {
    hash: 3204950323,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Product = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      class Product extends _ts.Events {
        #manager;

        get manager() {
          return this.#manager;
        }

        get table() {
          return this.#manager.table;
        } // The key generated by CompareObjects.generate(filter, attributes, session)


        #key;

        get key() {
          return this.#key;
        } // The auto-numeric instance id generated by the manager


        #instanceId;

        get instanceId() {
          return this.#instanceId;
        }

        #session;

        get session() {
          return this.#session;
        }

        hold() {
          this.#manager.hold(this.#instanceId);
        }

        release() {
          this.#manager.release(this.#instanceId);
        }

        get landed() {
          return this.loaded || this.fetched;
        }
        /**
         * Product Constructor
         * @param {Factory<*>} manager The manager of the product (instance of a factory)
         * @param {string} key The key generated by CompareObjects.generate(filter, attributes, session)
         * @param {number} instanceId The auto-numeric instance id generated by the manager
         * @param {string} session The session name
         * @protected
         */


        constructor(manager, key, instanceId, session) {
          super();
          this.#manager = manager;
          this.#key = key;
          this.#instanceId = instanceId;
          this.#session = session;
        }

      }

      exports.Product = Product;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./tables/data/filter/filter
  *******************************************/

  modules.set('./tables/data/filter/filter', {
    hash: 1271509135,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Filter = exports.ConditionOperand = void 0;
      /*bundle*/

      var ConditionOperand;
      exports.ConditionOperand = ConditionOperand;

      (function (ConditionOperand) {
        ConditionOperand[ConditionOperand["Equal"] = 0] = "Equal";
        ConditionOperand[ConditionOperand["Greater"] = 1] = "Greater";
        ConditionOperand[ConditionOperand["GreaterOrEqual"] = 2] = "GreaterOrEqual";
        ConditionOperand[ConditionOperand["Lower"] = 3] = "Lower";
        ConditionOperand[ConditionOperand["LowerOrEqual"] = 4] = "LowerOrEqual";
      })(ConditionOperand || (exports.ConditionOperand = ConditionOperand = {}));

      class Filter {
        #table;

        get table() {
          return this.#table;
        }

        #specs;

        get specs() {
          return this.#specs;
        }

        #fields = new Set();

        get fields() {
          return new Set(this.#fields);
        }

        #validate = () => {
          if (!this.#specs) return true;

          if (!(this.#specs instanceof Array)) {
            throw new Error('Invalid filter specification');
          }

          for (const condition of this.#specs) {
            if (!condition || typeof condition !== 'object') {
              console.error('Filter condition', condition);
              throw new Error('At least one of the conditions of the filter is invalid');
            }

            const {
              field,
              operand,
              value
            } = condition;
            this.#fields.add(field);

            if (!field || typeof field !== 'string') {
              throw new Error(`Condition field attribute "${field}" is invalid`);
            }

            const co = ConditionOperand;
            const operands = [co.Equal, co.Greater, co.GreaterOrEqual, co.Lower, co.LowerOrEqual];

            if (!operand && operand !== 0 || !operands.includes(operand)) {
              throw new Error(`Condition operand "${operand}" is invalid`);
            }

            if (!value) {
              throw new Error(`Condition value "${value}" is invalid`);
            }
          }
        };
        /**
         * Checks if the record should be included in the list or not
         * @param {RecordData} record
         */

        applies(record) {
          return false;
        }

        constructor(table, specs) {
          this.#table = table;
          this.#specs = specs;
          this.#validate();
        }

      }

      exports.Filter = Filter;
    }
  });
  /*****************************************
  INTERNAL MODULE: ./tables/data/lists/fetch
  *****************************************/

  modules.set('./tables/data/lists/fetch', {
    hash: 2768079759,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListFetch = void 0;

      class ListFetch {
        #list;

        constructor(list) {
          this.#list = list;
        }

        #fetching = false;

        get fetching() {
          return this.#fetching;
        }

        #fetched = false;

        get fetched() {
          return this.#fetched;
        }

        async fetch() {
          const {
            table
          } = this.#list; // Fetch from server

          this.#fetching = true;
          this.#list.trigger('change');
          const attributes = {};
          const response = await table.queries.list(this.#list.filter.specs, attributes);

          if (!response) {
            this.#fetching = false;
            this.#fetched = true;
            this.#list.trigger('change');
            return;
          }

          this.#list.records.overwrite(response);
          this.#fetching = false;
          this.#fetched = true;
          this.#list.trigger('change');
          this.#list.trigger('updated');
        }

      }

      exports.ListFetch = ListFetch;
    }
  });
  /****************************************
  INTERNAL MODULE: ./tables/data/lists/list
  ****************************************/

  modules.set('./tables/data/lists/list', {
    hash: 1922560968,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListData = void 0;

      var _product = require("../factory/product");

      var _filter = require("../filter/filter");

      var _fetch = require("./fetch");

      var _localStore = require("./local-store");

      var _records = require("./records");

      var _order = require("./order");

      class ListData extends _product.Product {
        #filter;

        get filter() {
          return this.#filter;
        }

        #order;

        get order() {
          return this.#order;
        }

        #attributes;

        get attributes() {
          return this.#attributes;
        }

        #invalidated = false; // For realtime notifications to indicate that the list has changed

        invalidate() {
          this.#invalidated = true;
          this.trigger('invalidated');
        }

        #records = new _records.ListRecords(this);

        get records() {
          return this.#records;
        } // The local store, properties and methods


        #localStore = new _localStore.ListLocalStore(this);

        get localStore() {
          return this.#localStore;
        }

        get loaded() {
          return this.#localStore.loaded;
        }

        async load() {
          let stored;

          try {
            stored = await this.#localStore.load();
          } catch (exc) {
            console.error(`Error loading list from cache`, exc.stack);
            return;
          }

          if (stored === undefined) return;

          if (!(stored instanceof Array)) {
            console.warn('Invalid list data cache', this);
          } else {
            stored && this.#records.overwrite(stored);
            this.trigger('change');
            this.trigger('updated');
          }
        } // The fetch manager, properties and methods


        #fetch = new _fetch.ListFetch(this);

        get fetching() {
          return this.#fetch.fetching;
        }

        get fetched() {
          return this.#fetch.fetched;
        }

        async fetch() {
          await this.#fetch.fetch();
        }
        /**
         * ListData Constructor
         * @param {ListsManager} manager The manager of the list (instance of a factory)
         * @param {string} key The key generated by CompareObjects.generate(filter, attributes, session)
         * @param {number} instanceId The auto-numeric instance id generated by the manager
         * @param {FilterSpecs} filterSpecs The filter specification
         * @param {OrderSpecs} orderSpecs The order specification
         * @param {ListAttributes} attributes The attributes of the list
         * @param {string} session The session name
         */


        constructor(manager, key, instanceId, filterSpecs, orderSpecs, attributes, session) {
          super(manager, key, instanceId, session);
          this.#filter = new _filter.Filter(this.table, filterSpecs);
          this.#order = new _order.Order(this.table, orderSpecs);
          this.#attributes = attributes;
        }

        destroy() {
          this.#records.destroy();
        }

      }

      exports.ListData = ListData;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./tables/data/lists/local-store
  ***********************************************/

  modules.set('./tables/data/lists/local-store', {
    hash: 250894529,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListLocalStore = void 0;

      class ListLocalStore {
        #list;
        #loaded = false;

        get loaded() {
          return this.#loaded;
        }

        #accessed = false;

        async load() {
          const {
            table,
            filter
          } = this.#list;
          const attributes = {};
          const stored = await table.localDB.lists.load(filter.specs, attributes);
          this.#accessed = true;
          this.#loaded = !!stored;
          return stored?.data;
        }

        constructor(list) {
          this.#list = list;
        }

      }

      exports.ListLocalStore = ListLocalStore;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./tables/data/lists/manager/manager
  ***************************************************/

  modules.set('./tables/data/lists/manager/manager', {
    hash: 585864089,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListsManager = void 0;

      var _list = require("../list");

      var _factory = require("../../factory/factory");

      var _registries = require("./registries/registries");

      var _realtime = require("./realtime/realtime");

      class ListsManager extends _factory.Factory {
        #registries = new _registries.Registries(this);

        get registries() {
          return this.#registries;
        }

        #realtime = new _realtime.Realtime(this);

        get realtime() {
          return this.#realtime;
        }

        create(key, instanceId, filter, order, attributes, session) {
          return new _list.ListData(this, key, instanceId, filter, order, attributes, session);
        }

        get(filter, order, attributes, session) {
          const list = super.get(filter, order, attributes, session);
          this.#registries.informListCreated(list);
          return list;
        }

        release(instanceId) {
          const list = super.release(instanceId);
          if (!list) return;
          this.#registries.informListDestroyed(list);
          return list;
        }

      }

      exports.ListsManager = ListsManager;
    }
  });
  /*************************************************************
  INTERNAL MODULE: ./tables/data/lists/manager/realtime/realtime
  *************************************************************/

  modules.set('./tables/data/lists/manager/realtime/realtime', {
    hash: 2873257050,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Realtime = void 0;

      var _reports = require("./reports");

      class Realtime {
        #reports;

        get reports() {
          return this.#reports;
        }

        constructor(manager) {
          this.#reports = new _reports.Reports(manager);
        }

      }

      exports.Realtime = Realtime;
    }
  });
  /************************************************************
  INTERNAL MODULE: ./tables/data/lists/manager/realtime/reports
  ************************************************************/

  modules.set('./tables/data/lists/manager/realtime/reports', {
    hash: 4249643312,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Reports = void 0;

      var _filter = require("../../../filter/filter");

      class Reports {
        #manager;

        constructor(manager) {
          this.#manager = manager;
        }
        /**
         * Check if the filter specified in the realtime event fits the filter of the manager
         *
         * @param {ListUpdateFilterReport} realtimeFilter The filter received by the realtime event
         * @param {FilterSpecs} managerFilter The filter being checked
         * @returns {boolean}
         */


        #checkFilter = (realtimeFilter, managerFilter) => {
          for (const condition of managerFilter) {
            if (!realtimeFilter.hasOwnProperty(condition.field)) continue;

            switch (condition.operand) {
              case _filter.ConditionOperand.Equal:
                if (realtimeFilter[condition.field] !== condition.value) return false;
                break;

              case _filter.ConditionOperand.Greater:
                if (realtimeFilter[condition.field] <= condition.value) return false;
                break;

              case _filter.ConditionOperand.GreaterOrEqual:
                if (realtimeFilter[condition.field] < condition.value) return false;
                break;

              case _filter.ConditionOperand.Lower:
                if (realtimeFilter[condition.field] >= condition.value) return false;
                break;

              case _filter.ConditionOperand.LowerOrEqual:
                if (realtimeFilter[condition.field] > condition.value) return false;
                break;
            }
          }

          return true;
        };

        update(filter) {
          for (const entry of this.#manager.registries.filters.values()) {
            if (filter && entry.filter.specs && !this.#checkFilter(filter, entry.filter.specs)) return;
            entry.lists.forEach(list => list.landed && list.invalidate());
          }
        }

      }

      exports.Reports = Reports;
    }
  });
  /*************************************************************
  INTERNAL MODULE: ./tables/data/lists/manager/registries/filter
  *************************************************************/

  modules.set('./tables/data/lists/manager/registries/filter', {
    hash: 2522735486,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RegistryByFilter = void 0;

      var _compareObjects = require("../../../factory/compare-objects");

      class RegistryByFilter extends Map {
        informListCreated(list) {
          const key = _compareObjects.CompareObjects.generate(list.filter.specs);

          const registry = this.has(key) ? this.get(key) : {
            filter: list.filter,
            lists: []
          };
          registry.lists.push(list);
          this.set(key, registry);
        }

        informListDestroyed(list) {
          const key = _compareObjects.CompareObjects.generate(list.filter.specs);

          if (!this.has(key)) {
            console.error('List filter is not in the registry of filters', list);
            return;
          }

          const registry = this.get(key);

          if (!registry.lists.includes(list)) {
            console.error('List filter is not in the registry of filters', list);
            return;
          }

          registry.lists.slice(registry.lists.indexOf(list), 1);
        }

      }

      exports.RegistryByFilter = RegistryByFilter;
    }
  });
  /*****************************************************************
  INTERNAL MODULE: ./tables/data/lists/manager/registries/registries
  *****************************************************************/

  modules.set('./tables/data/lists/manager/registries/registries', {
    hash: 1636734906,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Registries = void 0;

      var _filter = require("./filter");

      class Registries {
        #manager;
        #registries;

        constructor(manager) {
          this.#manager = manager;
          this.#registries = new Map();
          this.#registries.set('filters', new _filter.RegistryByFilter());
        }

        get filters() {
          return this.#registries.get('filters');
        }

        informListCreated(list) {
          this.#registries.forEach(registry => registry.informListCreated(list));
        }

        informListDestroyed(list) {
          this.#registries.forEach(registry => registry.informListDestroyed(list));
        }

      }

      exports.Registries = Registries;
    }
  });
  /*****************************************
  INTERNAL MODULE: ./tables/data/lists/order
  *****************************************/

  modules.set('./tables/data/lists/order', {
    hash: 4054939735,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Order = void 0;

      class Order {
        #table;

        get table() {
          return this.#table;
        }

        #specs;

        get specs() {
          return this.#specs;
        }

        #validate = () => {
          if (!this.#specs) return true;

          if (!(this.#specs instanceof Array)) {
            throw new Error('Invalid order specification');
          }

          for (const field of this.#specs) {
            if (!field || typeof field !== 'object') {
              console.error('Order field', field);
              throw new Error('At least one of the fields of the order is invalid');
            }

            if (!field.field || typeof field.field !== 'string') {
              throw new Error(`Field attribute "${field}" of the order specification is invalid`);
            }
          }
        };

        constructor(table, specs) {
          this.#table = table;
          this.#specs = specs;
          this.#validate();
        }

      }

      exports.Order = Order;
    }
  });
  /*******************************************
  INTERNAL MODULE: ./tables/data/lists/records
  *******************************************/

  modules.set('./tables/data/lists/records', {
    hash: 1169534636,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListRecords = void 0;

      class ListRecords {
        #list;

        get list() {
          return this.#list;
        } // Keeps a list of records sorted by the filter criteria


        #ordered = [];

        get values() {
          return this.#ordered.slice();
        }
        /**
         * ListRecords Constructor
         * @param {ListRecords} list
         */


        constructor(list) {
          this.#list = list;
          this.#list.table.records.on('modified', this.#admission);
        }

        #delete = (unpublished, id) => {
          for (let index = this.#ordered.length - 1; index >= 0; index--) {
            const value = this.#ordered[index];
            if (!value.unpublished !== !!unpublished) continue;
            if (value.unpublished && value.localId !== id || !value.unpublished && value.pk !== id) continue;
            this.#ordered.splice(index, 1);
          }
        };
        #sort = (unpublished, id) => {
          // TODO: sort algorithm should be added here
          const value = {
            unpublished: unpublished
          };
          value[unpublished ? 'localId' : 'pk'] = id;
          this.#ordered.push(value);
        };
        /**
         * Checks if the record should be included in the list or not
         * @param {RecordData} record
         * @param {string} field The name of the field that has changed
         */

        #admission = (record, field) => {
          if (field && !this.#list.filter.fields.has(field)) {
            // The change is in a field that is not part of the filter
            return;
          }

          const applies = this.#list.filter.applies(record);
          const id = record.persisted ? record.pk.value : record.localId;
          applies ? this.#sort(record.persisted, id) : this.#delete(record.persisted, id);
        };

        destroy() {
          this.#list.manager.off('modified', this.#admission);
        }

        overwrite(values) {
          this.#ordered = [];
          values.forEach(id => this.#ordered.push({
            unpublished: false,
            pk: id
          }));
        }

      }

      exports.ListRecords = ListRecords;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./tables/data/realtime/realtime
  ***********************************************/

  modules.set('./tables/data/realtime/realtime', {
    hash: 3629346848,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.realtime = void 0;

      var _reports = require("./reports/reports");
      /*bundle*/


      const realtime = new class {
        #reports = new _reports.Reports();

        get reports() {
          return this.#reports;
        }

      }();
      exports.realtime = realtime;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./tables/data/realtime/reports/list
  ***************************************************/

  modules.set('./tables/data/realtime/reports/list', {
    hash: 3728706255,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListReport = void 0;

      var _tables = require("../../../tables");

      class ListReport {
        update(tableName, filter) {
          if (!_tables.tables.has(tableName)) {
            console.error(`Realtime list update notification arrived with an invalid table specification "${tableName}"`);
            return;
          }

          const table = _tables.tables.get(tableName);

          table.lists.realtime.reports.update(filter);
        }

      }

      exports.ListReport = ListReport;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./tables/data/realtime/reports/record
  *****************************************************/

  modules.set('./tables/data/realtime/reports/record', {
    hash: 2510156693,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordReport = void 0;

      var _tables = require("../../../tables");

      class RecordReport {
        #checkTable = tableName => {
          if (!_tables.tables.has(tableName)) {
            console.error('Realtime record update notification arrived with ' + `an invalid table specification "${tableName}"`);
            return false;
          }

          return true;
        };

        insert(tableName, id) {
          console.log('record insert reported', tableName, id);
        }

        delete(tableName, id) {
          console.log('record deleted reported', tableName, id);
        }

        update(tableName, pk, field, value) {
          if (!this.#checkTable(tableName)) return;

          const table = _tables.tables.get(tableName);

          table.records.realtime.reports.update(pk, field, value);
        }

      }

      exports.RecordReport = RecordReport;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./tables/data/realtime/reports/reports
  ******************************************************/

  modules.set('./tables/data/realtime/reports/reports', {
    hash: 107636444,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Reports = void 0;

      var _record = require("./record");

      var _list = require("./list");

      class Reports {
        #list = new _list.ListReport();

        get list() {
          return this.#list;
        }

        #record = new _record.RecordReport();

        get record() {
          return this.#record;
        }

      }

      exports.Reports = Reports;
    }
  });
  /**************************************************
  INTERNAL MODULE: ./tables/data/records/data/factory
  **************************************************/

  modules.set('./tables/data/records/data/factory', {
    hash: 3526622083,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordsDataFactory = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _record = require("./record");

      var _compareObjects = require("../../factory/compare-objects");

      var _unpublished = require("./unpublished");

      class RecordsDataFactory extends _ts.Events {
        #table;

        get table() {
          return this.#table;
        }

        #identifiers = new Map();
        #unpublished = new _unpublished.UnpublishedRecords(this);

        get unpublished() {
          return this.#unpublished;
        }

        constructor(table) {
          super();
          this.#table = table;
        }

        #wrappedFactory;

        set wrappedFactory(value) {
          this.#wrappedFactory = value;
        }

        get(identifier, session) {
          const key = _compareObjects.CompareObjects.generate(identifier, session);

          if (this.#identifiers.has(key)) {
            return this.#identifiers.get(key);
          }

          const record = new _record.RecordData(this, identifier, session);
          this.#identifiers.set(key, record);
          return record;
        }
        /**
         * This method is called by the wrapped record.
         * When an identifier is not longer used (no consumers are holding the identifier),
         * then the wrapped record is destroyed, and this method is called.
         * It is required to check if there still are other identifiers using this record before destroying it.
         *
         * @param {RecordIdentifier} identifier
         * @param {string} session
         */


        release(identifier, session) {
          const key = _compareObjects.CompareObjects.generate(identifier, session);

          if (!this.#identifiers.has(key)) {
            throw new Error(`Identifier "${key}" session "${session}" is not registered in the factory`);
          }

          const record = this.#identifiers.get(key); // Check if there are identifiers consuming this record

          for (const identifier of record.identifiers) {
            if (this.#wrappedFactory.has(identifier, session)) {
              return;
            }
          } // At this point, none of the record identifiers are being consumed


          this.#identifiers.delete(key);
          record.destroy();
        }

        create = session => this.#unpublished.create(session);
        getUnpublished = localId => this.#unpublished.getUnpublished(localId);
      }

      exports.RecordsDataFactory = RecordsDataFactory;
    }
  });
  /**************************************************
  INTERNAL MODULE: ./tables/data/records/data/fetcher
  **************************************************/

  modules.set('./tables/data/records/data/fetcher', {
    hash: 461408940,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordFetcher = void 0;

      class RecordFetcher {
        #record;
        #version;

        constructor(record, version) {
          this.#record = record;
          this.#version = version;
        }

        #fetching = false;

        get fetching() {
          return this.#fetching;
        }

        #fetched = false;

        get fetched() {
          return this.#fetched;
        }

        async fetch() {
          // Avoid to request the fetch action twice to the server
          if (this.#fetching) return;
          const {
            table
          } = this.#record;

          const done = data => {
            this.#fetched = true;
            this.#record.fields.setter.values(data.data);
            this.#version.value = data.version;
            this.#record.trigger('change');
            this.#record.trigger('updated');
            return true;
          }; // Check if data is already loaded in memory cache


          const memory = table.localDB.records.memory.load(this.#record);

          if (memory && Date.now() - memory.savedTime < 1000) {
            return done(memory);
          } // Fetch from server


          this.#fetching = true;
          this.#record.trigger('change');
          const fields = {};
          let count = 0;

          for (const [name, field] of this.#record.fields) {
            if (!field.assigned) continue;
            fields[name] = field.value;
            count++;
          }

          const attributes = {};

          if (count === 0) {
            console.warn('None of the fields of the record being fetched is set', this.#record);
            return;
          }

          const response = await table.queries.data(fields, attributes);

          if (!response) {
            this.#fetching = false;
            this.#fetched = true;
            return false;
          }

          this.#fetching = false;
          return done(response);
        }

      }

      exports.RecordFetcher = RecordFetcher;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./tables/data/records/data/fields/field
  *******************************************************/

  modules.set('./tables/data/records/data/fields/field', {
    hash: 2081975081,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Field = void 0;

      var _published = require("./sources/published");

      var _memory = require("./sources/memory");

      var _constants = require("../../../../../constants");

      class Field {
        #name;

        get name() {
          return this.#name;
        }

        #record;

        get record() {
          return this.#record;
        }

        #memory = new _memory.MemoryFieldSource(this);

        get memory() {
          return this.#memory;
        }

        #published = new _published.PublishedFieldSource(this);

        get published() {
          return this.#published;
        }
        /**
         * Field Constructor
         *
         * @param name {string} The name of the field
         * @param record {object} The Record instance
         */


        constructor(name, record) {
          this.#name = name;
          this.#record = record;
        }

        get value() {
          // If memory value is assigned return it first
          if (this.#memory.assigned) {
            return this.#memory.value;
          } // If record is loaded or fetched, then return the published value


          if (this.#record.landed) {
            return this.#published.value;
          } // Check if the field is set in the initial identifier


          const initialIdentifier = this.#record.identifiers.initial;

          if (initialIdentifier.hasOwnProperty(this.#name)) {
            return initialIdentifier[this.#name];
          } // Field value is not set


          return _constants.NotSet;
        }
        /**
         * true if any of the sources (memory or published) has a value different than [NotSet, undefined] or
         * true is returned if the initial identifier is set for this field
         * @returns {boolean}
         */


        get assigned() {
          const record = this.#record;

          if (!record.landed) {
            const initialIdentifier = record.identifiers.initial;

            if (initialIdentifier.hasOwnProperty(this.#name)) {
              return true;
            }
          }

          return this.#memory.assigned || this.#published.assigned;
        }

        get unpublished() {
          return this.#memory !== _constants.NotSet && this.#memory !== this.#published;
        }

        discard = () => this.#memory.discard();
      }

      exports.Field = Field;
    }
  });
  /********************************************************
  INTERNAL MODULE: ./tables/data/records/data/fields/fields
  ********************************************************/

  modules.set('./tables/data/records/data/fields/fields', {
    hash: 1590311372,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Fields = void 0;

      var _field = require("./field");

      var _setter = require("./setter");
      /**
       * The record fields
       */


      class Fields extends Map {
        #record;

        get record() {
          return this.#record;
        }

        #setter;

        get setter() {
          return this.#setter;
        }

        constructor(record) {
          super();
          this.#record = record;
          this.#setter = new _setter.FieldsSetter(record);
          const fields = record.table.fields;

          for (let name of fields) {
            const field = new _field.Field(name, this.#record);
            this.set(name, field);
          }
        }
        /**
         * If any of the fields have a published value assigned, it means that the
         * record is already back-end persisted
         * @returns {boolean}
         */


        get persisted() {
          for (const field of this.values()) {
            if (field.published.assigned) return true;
          }

          return false;
        }
        /**
         * Returns an object with the key-value of the unpublished fields
         */


        unpublished() {
          const fields = new Map();
          this.forEach((field, name) => field.unpublished && fields.set(name, field));
          return fields;
        }

        discard = () => this.forEach(field => field.discard());
      }

      exports.Fields = Fields;
    }
  });
  /********************************************************
  INTERNAL MODULE: ./tables/data/records/data/fields/setter
  ********************************************************/

  modules.set('./tables/data/records/data/fields/setter', {
    hash: 1387037198,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.FieldsSetter = void 0;

      class FieldsSetter {
        #record;

        constructor(record) {
          this.#record = record;
        }

        values(values) {
          const record = this.#record; // Check if primary key received is valid

          const pk = record.table.indices.primary.fields[0];

          if (!values.hasOwnProperty(pk)) {
            console.error(`Data received on record fetch is invalid. Primary key not received.`, values, this);
            return;
          }

          for (const identifier of record.identifiers) {
            if (!identifier.hasOwnProperty(pk)) continue;

            if (identifier[pk] !== values[pk]) {
              console.error(`Data received on record fetch is invalid. Primary key received is invalid.`, values, this);
              return;
            }

            break;
          } // Set fields with the received values


          const data = new Map(Object.entries(values));

          for (const [name, value] of data) {
            const {
              fields
            } = record;

            if (!fields.has(name)) {
              console.warn(`Field "${name}" is not defined on table "${record.table.name}", ` + `but it was received on fetch response.\n\n`, data, '\n', this);
              continue;
            }

            const field = fields.get(name);
            field.published.overwrite(value);
          }
        }

      }

      exports.FieldsSetter = FieldsSetter;
    }
  });
  /****************************************************************
  INTERNAL MODULE: ./tables/data/records/data/fields/sources/memory
  ****************************************************************/

  modules.set('./tables/data/records/data/fields/sources/memory', {
    hash: 1124919465,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.MemoryFieldSource = void 0;

      var _source = require("./source");

      class MemoryFieldSource extends _source.FieldSource {
        constructor(field) {
          super(field);
        }

      }

      exports.MemoryFieldSource = MemoryFieldSource;
    }
  });
  /*******************************************************************
  INTERNAL MODULE: ./tables/data/records/data/fields/sources/published
  *******************************************************************/

  modules.set('./tables/data/records/data/fields/sources/published', {
    hash: 1639330156,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PublishedFieldSource = void 0;

      var _source = require("./source");

      class PublishedFieldSource extends _source.FieldSource {
        constructor(field) {
          super(field, {
            modifiable: false
          });
        }

      }

      exports.PublishedFieldSource = PublishedFieldSource;
    }
  });
  /****************************************************************
  INTERNAL MODULE: ./tables/data/records/data/fields/sources/source
  ****************************************************************/

  modules.set('./tables/data/records/data/fields/sources/source', {
    hash: 3270809056,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.FieldSource = void 0;

      var _constants = require("../../../../../../constants");
      /**
       * FieldSource instances are the memory and published properties of each record field
       */


      class FieldSource {
        #field;

        get field() {
          return this.#field;
        }

        #specs;
        #value;

        get value() {
          return this.#value;
        }

        set value(value) {
          if (!this.#specs.modifiable) {
            throw new Error('Field source should only be modified internally by plm');
          } // Avoid to modify the value if the field is present in the initial identifier
          // and the record is not still persisted


          const {
            record
          } = this.#field;

          if (!record.persisted) {
            const initialIdentifier = record.identifiers.initial;

            if (initialIdentifier.hasOwnProperty(this.#field.name)) {
              throw new Error(`Value of field "${this.#field.name}" cannot be set as ` + `it is a field present in the initial identifier`);
            }
          } // Primary key cannot be set nor modified


          const pk = record.table.indices.primary.fields[0];

          if (this.#field.name === pk) {
            throw new Error(`Primary key field "${pk}" cannot be set nor modified`);
          }

          this.#value = value;
          record.trigger('change');
        }

        get assigned() {
          return ![_constants.NotSet, undefined].includes(this.value);
        }

        constructor(field, specs) {
          specs = specs ? specs : {};
          specs.modifiable = !!specs.modifiable;
          this.#field = field;
          this.#specs = specs;
        }
        /**
         * Set the value of the field directly, without triggering events nor making any validation,
         * it is used internally by plm, .. consumers should not use it
         */


        overwrite(value) {
          this.#value = value;
        }

        discard() {
          this.value = _constants.NotSet;
        }

      }

      exports.FieldSource = FieldSource;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./tables/data/records/data/identifiers
  ******************************************************/

  modules.set('./tables/data/records/data/identifiers', {
    hash: 1512918363,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordIdentifiers = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _compareObjects = require("../../factory/compare-objects");

      var _constants = require("../../../../constants");

      class RecordIdentifiers extends _ts.Events {
        #record; // The initial identifier when the record was created by the manager
        // and the record is still not loaded

        #initial;

        get initial() {
          return this.#initial;
        }

        #indices; // Identifiers by index name

        #identifiers = new Map();

        get size() {
          return this.#identifiers.size;
        }

        #errors = [];

        errors() {
          return this.#errors;
        }

        get(indexName) {
          return this.#identifiers.get(indexName);
        }
        /**
         * RecordIdentifiers Constructor
         *
         * @param {RecordData} record
         * @param {RecordIdentifier} initial The initial identifier when the record was created by the manager
         */


        constructor(record, initial) {
          super();
          this.#initial = initial;
          this.#record = record;
          this.#indices = record.table.indices;
          if (!initial || initial.localId) return;
          const index = this.getIndex(initial); // console.log('index ', index, initial, this.#identifiers, this.#indices, this)

          if (!index) {
            console.error('Identifier:', initial);
            throw new Error('Identifier does not match any of the indices of the table');
          }

          this.#identifiers.set(index.name, initial);
        }

        get primaryKeyFieldValue() {
          const pk = this.#indices.primary;
          const field = pk.fields[0];
          return this.#initial && this.#initial.hasOwnProperty(field) ? this.#initial[field] : this.#record.fields.get(field).value;
        }
        /**
         * Finds the index that fits an identifier
         *
         * @param {RecordIdentifier} identifier
         * @returns {Index | undefined}
         */


        getIndex = identifier => {
          for (const index of this.#indices.values()) {
            if (!index.primary && !index.unique) continue;
            const found = index.fields.reduce((found, field) => found && identifier.hasOwnProperty(field), true);
            if (found) return index;
          }
        };
        /**
         * Returns an identifier according to the fields of an index
         *
         * @param {string} indexName
         * @returns {RecordIdentifier | undefined}
         */

        createIdentifierFromIndex(indexName) {
          if (!this.#indices.has(indexName)) {
            throw new Error(`Index "${indexName}" is not registered`);
          }

          const index = this.#indices.get(indexName);

          if (!index.primary && !index.unique) {
            throw new Error(`Index "${indexName}" must be primary or unique to identify the record`);
          }

          if (!this.#record.loaded) {
            throw new Error(`Cannot create the identifier as the record is not loaded`);
          }

          const output = {};

          for (const fieldName of index.fields) {
            const value = this.#record.fields.get(fieldName).value;

            if (index.primary && [undefined, _constants.NotSet].includes(value)) {
              this.#errors.push(`Record violates the index "${indexName}" ` + `as the field "${fieldName}" has an undefined value`);
              return;
            }

            output[fieldName] = value;
          }

          return output;
        }
        /**
         * Updates the identifiers according to the values of the fields of the record
         */


        update() {
          const updated = new Map();
          const table = this.#record.table;
          const previous = this.#identifiers;

          for (const index of table.indices.values()) {
            const identifier = this.createIdentifierFromIndex(index.name);
            updated.set(index.name, identifier);
          } // Check if some of the identifiers changed


          let changed = false;

          for (const [name, identifier] of updated.entries()) {
            if (!this.#identifiers.has(name)) {
              changed = true;
              break;
            }

            if (!_compareObjects.CompareObjects.compare(identifier, this.#identifiers.get(name))) {
              changed = true;
              break;
            }
          }

          this.#identifiers = updated;

          if (changed) {
            this.trigger('change', this.#record, previous);
          }
        }

        forEach = callback => this.#identifiers.forEach(callback);

        *[Symbol.iterator]() {
          for (const identifier of this.#identifiers.values()) {
            yield identifier;
          }
        }

      }

      exports.RecordIdentifiers = RecordIdentifiers;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./tables/data/records/data/loader
  *************************************************/

  modules.set('./tables/data/records/data/loader', {
    hash: 1254370587,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordLoader = void 0;

      class RecordLoader {
        #record;
        #version;

        constructor(record, version) {
          this.#record = record;
          this.#version = version;
        }

        #loaded = false;

        get loaded() {
          return this.#loaded;
        }

        #searched = false;

        get searched() {
          return this.#searched;
        }

        async load() {
          const {
            table
          } = this.#record;
          const index = table.indices.primary;
          const pk = index.fields[0];
          const pkField = this.#record.fields.get(pk);
          if (!pkField.assigned) throw new Error(`Primary key field "${pk}" not assigned`);
          const fields = {};
          fields[pk] = pkField.value;
          const value = await table.localDB.records.load(index.name, fields);
          this.#searched = true;
          if (!value || !value.version || !value.data) return false;
          this.#record.fields.setter.values(value.data);
          this.#version.value = value.version;
          this.#loaded = true;
          this.#record.trigger('change');
          this.#record.trigger('updated');
          return true;
        }

      }

      exports.RecordLoader = RecordLoader;
    }
  });
  /*************************************************
  INTERNAL MODULE: ./tables/data/records/data/record
  *************************************************/

  modules.set('./tables/data/records/data/record', {
    hash: 1434966283,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordData = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _fields = require("./fields/fields");

      var _identifiers = require("./identifiers");

      var _loader = require("./loader");

      var _fetcher = require("./fetcher");

      var _uuid = require("../../uuid");

      class RecordData extends _ts.Events {
        #manager;

        get manager() {
          return this.#manager;
        }

        get table() {
          return this.#manager.table;
        }

        #fields;

        get fields() {
          return this.#fields;
        }

        #identifiers;

        get identifiers() {
          return this.#identifiers;
        }

        #localId;

        get localId() {
          return this.#localId;
        }

        #version = {};

        get version() {
          return this.#version.value;
        } // The local store, properties and methods


        #loader = new _loader.RecordLoader(this, this.#version);

        get loader() {
          return this.#loader;
        }

        get loaded() {
          return this.#loader.loaded;
        }

        async load() {
          if (this.#destroyed) throw new Error('Record is destroyed');
          this.#found = await this.#loader.load();
        } // The fetch manager, properties and methods


        #fetcher = new _fetcher.RecordFetcher(this, this.#version);

        get fetching() {
          return this.#fetcher.fetching;
        }

        get fetched() {
          return this.#fetcher.fetched;
        }

        get landed() {
          return this.loaded || this.fetched;
        }

        #found = false;

        get found() {
          return this.#found;
        }

        async fetch() {
          if (this.#destroyed) throw new Error('Record is destroyed');
          this.#found = await this.#fetcher.fetch();
        }
        /**
         * The record is expected to be back-end persisted when:
         *   . At least an identifier is set, example: if it was created a user with
         *   an identifier by its "nickname" = "..". In this case it is expected that the record
         *   was instantiated to be loaded
         *   . When the primary key is set
         * @returns {boolean}
         */


        get persisted() {
          if (this.#identifiers.size) return true;
          const pk = this.table.indices.primary.fields[0];
          return this.#fields.get(pk).assigned;
        }
        /**
         * Returns the primary key field
         * @returns {*} the value
         */


        get pk() {
          const pk = this.table.indices.primary.fields[0];
          return this.#fields.get(pk);
        }

        #invalidated = false; // For realtime notifications to indicate that the list has changed

        invalidate() {
          this.#invalidated = true;
          this.trigger('invalidated');
        }
        /**
         * RecordData Constructor
         * @param {RecordsDataFactory} manager
         * @param {string | RecordIdentifier} identifier Can be the localId (string)
         * or the initial identifier (RecordIdentifier)
         * @param {string} session
         */


        constructor(manager, identifier, session) {
          super();
          this.#manager = manager; // If the initial identifier is not set, then it is a locally created record

          if (typeof identifier === 'string') this.#localId = (0, _uuid.createUUID)();
          const initialIdentifier = typeof identifier === 'object' ? identifier : undefined;
          this.#identifiers = new _identifiers.RecordIdentifiers(this, initialIdentifier);
          this.#fields = new _fields.Fields(this);
        }

        #destroyed = false;

        destroy() {
          if (this.#destroyed) {
            throw new Error('Record already destroyed');
          }

          this.#destroyed = true;
          super.destroy();
        }

      }

      exports.RecordData = RecordData;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./tables/data/records/data/unpublished
  ******************************************************/

  modules.set('./tables/data/records/data/unpublished', {
    hash: 1550269948,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.UnpublishedRecords = void 0;

      var _record = require("./record");

      class UnpublishedRecords {
        #recordsDataFactory;

        constructor(recordsDataFactory) {
          this.#recordsDataFactory = recordsDataFactory;
        }

        #records = new Map();

        create(session) {
          const record = new _record.RecordData(this.#recordsDataFactory, undefined, session);
          this.#records.set(record.localId, record);
          return record;
        }

        getUnpublished(localId) {
          if (this.#records.has(localId)) return this.#records.get(localId);
          const record = new _record.RecordData(this.#recordsDataFactory, localId);
          this.#records.set(record.localId, record);
          return record;
        }

      }

      exports.UnpublishedRecords = UnpublishedRecords;
    }
  });
  /*********************************************
  INTERNAL MODULE: ./tables/data/records/manager
  *********************************************/

  modules.set('./tables/data/records/manager', {
    hash: 3803602193,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.RecordsManager = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _factory = require("./data/factory");

      var _factory2 = require("./wrapped/factory");

      var _realtime = require("./realtime/realtime");

      class RecordsManager extends _ts.Events {
        #recordsDataFactory;

        get recordsDataFactory() {
          return this.#recordsDataFactory;
        }

        #wrappedFactory;
        #table;

        get table() {
          return this.#table;
        }

        get unpublished() {
          return this.#recordsDataFactory.unpublished;
        }

        #realtime = new _realtime.Realtime(this);

        get realtime() {
          return this.#realtime;
        }

        constructor(table) {
          super();
          this.#table = table;
          this.#recordsDataFactory = new _factory.RecordsDataFactory(table);
          this.#wrappedFactory = new _factory2.WrappedFactory(table, this.#recordsDataFactory);
          this.#recordsDataFactory.wrappedFactory = this.#wrappedFactory;
        }

        get(identifier, session) {
          return this.#wrappedFactory.get(identifier, session);
        }

        create(session) {
          return this.#recordsDataFactory.create(session);
        }

        getUnpublished(localId) {
          return this.#recordsDataFactory.getUnpublished(localId);
        }

      }

      exports.RecordsManager = RecordsManager;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./tables/data/records/realtime/realtime
  *******************************************************/

  modules.set('./tables/data/records/realtime/realtime', {
    hash: 3868646380,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Realtime = void 0;

      var _reports = require("./reports");

      class Realtime {
        #reports;

        get reports() {
          return this.#reports;
        }

        constructor(manager) {
          this.#reports = new _reports.Reports(manager);
        }

      }

      exports.Realtime = Realtime;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./tables/data/records/realtime/reports
  ******************************************************/

  modules.set('./tables/data/records/realtime/reports', {
    hash: 2951830057,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Reports = void 0;

      class Reports {
        #manager;

        constructor(manager) {
          this.#manager = manager;
        }

        update(pk, field, value) {
          const {
            table
          } = this.#manager;
          const pkName = table.indices.primary.fields[0];
          const identifier = {};
          identifier[pkName] = pk;
          const session = undefined;
          const record = this.#manager.recordsDataFactory.get(identifier, session);

          if (record.landed) {
            if (!field) {
              record.invalidate();
              return;
            } // Check if field exists in the record


            if (!record.fields.has(field)) {
              console.warn(`Record field realtime is invalid. Field "${field}" not found on table "${table.name}"`);
              return;
            }

            record.fields.get(field).published.overwrite(value);
            record.trigger('change');
          }

          this.#manager.recordsDataFactory.release(identifier, session);
        }

      }

      exports.Reports = Reports;
    }
  });
  /*****************************************************
  INTERNAL MODULE: ./tables/data/records/wrapped/factory
  *****************************************************/

  modules.set('./tables/data/records/wrapped/factory', {
    hash: 3965804558,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.WrappedFactory = void 0;

      var _factory = require("../../factory/factory");

      var _record = require("./record");

      class WrappedFactory extends _factory.Factory {
        #recordsDataFactory;

        get recordsDataFactory() {
          return this.#recordsDataFactory;
        }

        constructor(table, recordsDataFactory) {
          super(table);
          this.#recordsDataFactory = recordsDataFactory;
        }

        create(key, instanceId, identifier, session) {
          return new _record.WrappedRecord(this, key, instanceId, identifier, session);
        }

        get(identifier, session) {
          return super.get(identifier, session);
        }

      }

      exports.WrappedFactory = WrappedFactory;
    }
  });
  /**********************************************************
  INTERNAL MODULE: ./tables/data/records/wrapped/fields/field
  **********************************************************/

  modules.set('./tables/data/records/wrapped/fields/field', {
    hash: 3140957279,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.WrappedRecordField = void 0;

      class WrappedRecordField {
        #name;
        #wrappedRecord;

        get assigned() {
          return this.#wrappedRecord.record.fields.get(this.#name).assigned;
        }

        get value() {
          return this.#wrappedRecord.record.fields.get(this.#name).value;
        }

        get unpublished() {
          return this.#wrappedRecord.record.fields.get(this.#name).unpublished;
        }

        set value(value) {
          this.#wrappedRecord.record.fields.get(this.#name).memory.value = value;
        }

        constructor(name, wrappedRecord) {
          this.#name = name;
          this.#wrappedRecord = wrappedRecord;
        }

      }

      exports.WrappedRecordField = WrappedRecordField;
    }
  });
  /***********************************************************
  INTERNAL MODULE: ./tables/data/records/wrapped/fields/fields
  ***********************************************************/

  modules.set('./tables/data/records/wrapped/fields/fields', {
    hash: 2527122907,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.WrappedRecordFields = void 0;

      var _field = require("./field");

      class WrappedRecordFields extends Map {
        constructor(wrappedRecord) {
          super();
          const {
            fields
          } = wrappedRecord.manager.table;

          for (const name of fields) {
            this.set(name, new _field.WrappedRecordField(name, wrappedRecord));
          }
        }

      }

      exports.WrappedRecordFields = WrappedRecordFields;
    }
  });
  /****************************************************
  INTERNAL MODULE: ./tables/data/records/wrapped/record
  ****************************************************/

  modules.set('./tables/data/records/wrapped/record', {
    hash: 538147968,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.WrappedRecord = void 0;

      var _product = require("../../factory/product");

      var _fields = require("./fields/fields");

      class WrappedRecord extends _product.Product {
        #identifier;

        get identifier() {
          return this.#identifier;
        }

        #session;

        get session() {
          return this.#session;
        }

        #destroyed = false;

        get destroyed() {
          return this.#destroyed;
        }

        #record;

        get record() {
          return this.#record;
        }

        get version() {
          return this.#record.version;
        }

        #fields;

        get fields() {
          return this.#fields;
        }

        get loaded() {
          return this.#record.loaded;
        }

        get fetched() {
          return this.#record.fetched;
        }

        get fetching() {
          return this.#record.fetching;
        }

        get found() {
          return this.#record.found;
        }

        load = () => this.#record.load();
        fetch = () => this.#record.fetch();
        #triggerChange = () => this.trigger('change');
        #triggerUpdated = () => this.trigger('updated');
        #triggerInvalidated = () => this.trigger('invalidated');
        #bind = () => {
          this.#record.on('change', this.#triggerChange);
          this.#record.on('updated', this.#triggerUpdated);
          this.#record.on('invalidated', this.#triggerInvalidated);
        };
        #unbind = () => {
          if (!this.#record) return;
          this.#record.off('change', this.#triggerChange);
          this.#record.off('updated', this.#triggerUpdated);
          this.#record.off('invalidated', this.#triggerInvalidated);
        };
        #update = record => {
          this.#unbind();
          this.#record = record;
          this.#bind();
          this.trigger('change');
        };

        constructor(manager, key, instanceId, identifier, session) {
          super(manager, key, instanceId, session);
          this.#identifier = identifier;
          this.#session = session;
          const {
            recordsDataFactory
          } = manager;
          recordsDataFactory.on(`identifier.${key}.record.changed`, this.#update);
          const record = recordsDataFactory.get(identifier, session);
          this.#update(record);
          this.#fields = new _fields.WrappedRecordFields(this);
        }

        destroy() {
          if (this.#destroyed) {
            throw new Error('FactorizedRecord already destroyed');
          }

          this.#destroyed = true;
          const {
            recordsDataFactory
          } = this.manager;
          recordsDataFactory.off('change', this.#update);
          super.destroy();
          this.#record.manager.release(this.#identifier, this.#session);
        }

      }

      exports.WrappedRecord = WrappedRecord;
    }
  });
  /**********************************
  INTERNAL MODULE: ./tables/data/uuid
  **********************************/

  modules.set('./tables/data/uuid', {
    hash: 3597707760,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.createUUID = createUUID;

      function createUUID() {
        let dt = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
      }
    }
  });
  /**************************************
  INTERNAL MODULE: ./tables/indices/index
  **************************************/

  modules.set('./tables/indices/index', {
    hash: 118857724,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Index = void 0;
      /**
       * Index of the table
       */

      class Index {
        #name;

        get name() {
          return this.#name;
        }

        #specs;

        get primary() {
          return this.#specs.primary;
        }

        get unique() {
          return this.#specs.unique;
        }

        get fields() {
          return this.#specs.fields;
        }

        get batches() {
          return this.#specs.batches;
        }
        /**
         * Index Constructor
         *
         * @param name {string} The name of the index
         * @param specs {IndexSpecs} The index specification
         */


        constructor(name, specs) {
          if (!(specs.fields instanceof Array) || !specs.fields.length) throw new Error(`Fields specification of index "${name}" is invalid`);
          if (specs.fields.length !== 1 && specs.primary) throw new Error(`Primary key must have only one field on index "${name}"`);
          if (specs.batches && typeof specs.batches !== 'object') throw new Error(`Batches specification is invalid on index "${name}"`);
          specs.batches = specs.batches ? specs.batches : {};

          if (!specs.batches && specs.primary) {
            specs.batches = {};
            specs.batches[specs.fields[0]] = ['data'];
          }

          this.#name = name;
          this.#specs = specs;
        }
        /**
         * Check if the index is suitable to be queried by the specified parameters
         *
         * @param {Record<string, string | number>} fields The fields to be used by the request
         * @param {string} action The action to be executed (tu, data, list, count)
         * @returns {boolean}
         */


        suitable(action, fields) {
          if (!Object.keys(fields).length) throw new Error('Parameter fields does not set any properties'); // "data" action only can use the primary key or a unique index

          if (action === 'data' && !this.primary && !this.unique) return false; // "list" and "count" actions cannot use the primary key index

          if (['list', 'count'].includes(action) && this.primary) return false;
          let count = 0;

          for (const field of this.fields) {
            if (!fields.hasOwnProperty(field)) {
              // All the fields must be set on the "data" action,
              // as all the fields are require to uniquely identify the record being queried
              if (['tu', 'data'].includes(action)) return false; // An index can be used on "list" and "count" actions
              // when not all the fields are specified, only if:
              // 1. There is at least one field that applies to the filter
              // 2. There are no other filters specified in the parameters that are used by the index

              return count === Object.keys(fields).length;
            }

            count++;
          } // Do not use the index if more fields than the required were specified


          return count === Object.keys(fields).length;
        }

      }

      exports.Index = Index;
    }
  });
  /****************************************
  INTERNAL MODULE: ./tables/indices/indices
  ****************************************/

  modules.set('./tables/indices/indices', {
    hash: 4208019504,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Indices = void 0;

      var _index = require("./index");
      /**
       * The indices collection
       */


      class Indices extends Map {
        // The primary index, .. a table can only have one primary index
        #primary;

        get primary() {
          return this.#primary;
        }
        /**
         * Indices collection Constructor
         * @param table {object} The table that contains the indices
         * @param specs {object} The indices specification
         */


        constructor(table, specs) {
          super();

          if (!specs) {
            throw new Error(`Table "${table.name}" does not define its indices. ` + `At least its primary key must be defined`);
          }

          for (const [indexName, indexSpecs] of Object.entries(specs)) {
            this.set(indexName, new _index.Index(indexName, indexSpecs));
          }

          this.#primary = [...this.values()].find(index => index.primary);
          if (!this.#primary) throw new Error(`Table "${table.name}" does not define a primary key`);
        }
        /**
         * Select an index to be used to query by the specified fields
         *
         * @param {string} action The action (data, list, count)
         * @param {Record<string, any>} fields The fields of the request
         * @returns {Index | undefined}
         */


        select(action, fields) {
          if (typeof fields !== 'object') throw new Error('Invalid parameter');

          for (let index of this.values()) {
            // Filter the fields to only leave the required by the index, otherwise it will not work
            const filtered = Object.fromEntries(Object.entries(fields).filter(([name]) => index.fields.includes(name)));
            if (Object.entries(filtered).length !== index.fields.length) continue; // Find a suitable index

            if (index.suitable(action, filtered)) return index;
          }
        }

      }

      exports.Indices = Indices;
    }
  });
  /*********************************************************
  INTERNAL MODULE: ./tables/local-database/counters/counters
  *********************************************************/

  modules.set('./tables/local-database/counters/counters', {
    hash: 3506280268,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LocalDBCounters = void 0;

      var _memory = require("./memory");

      var _ts = require("@beyond-js/kernel/core/ts");

      var _compareObjects = require("../../data/factory/compare-objects");

      class LocalDBCounters {
        #db;
        #memory = new _memory.MemoryLocalDBCounters();

        get memory() {
          return this.#memory;
        }

        constructor(db) {
          this.#db = db;
        }

        #generateKey = (filter, attributes) => {
          filter = filter ? filter : []; // Order the filter by field to assure that the generated key be unique

          filter = filter.sort((c1, c2) => c1.field > c2.field ? -1 : 1);
          return _compareObjects.CompareObjects.generate(filter, attributes);
        };
        #save = (key, value) => {
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['counters'], 'readwrite');
          const store = transaction.objectStore('counters');
          let rq;

          try {
            rq = store.put({
              key: key,
              value: value,
              savedTime: Date.now()
            });
          } catch (exc) {
            promise.reject(exc);
            return promise;
          }

          rq.onerror = event => {
            promise.reject(event.target.result);
          };

          rq.onsuccess = () => {
            promise.resolve(true);
          };

          return promise;
        };

        async save(filter, attributes, data) {
          // Save in memory cache first, the data must be available immediately as other
          // nodes in the tree that request the data could require it
          const key = this.#generateKey(filter, attributes);
          this.#memory.set(key, data);
          await this.#db.prepare();
          return await this.#save(key, data);
        }

        #load = key => {
          if (this.#memory.has(key)) return Promise.resolve(this.#memory.get(key));
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['counters'], 'readonly');
          const store = transaction.objectStore('counters');
          let rq;

          try {
            rq = store.get(key);
          } catch (exc) {
            promise.reject(exc);
            return promise;
          }

          rq.onerror = event => promise.reject(event.target.result);

          rq.onsuccess = event => {
            const output = event.target.result;
            promise.resolve(output ? output.value : undefined);
          };

          return promise;
        };

        async load(filter, attributes) {
          await this.#db.prepare();
          const key = this.#generateKey(filter, attributes);
          return await this.#load(key);
        }

      }

      exports.LocalDBCounters = LocalDBCounters;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./tables/local-database/counters/memory
  *******************************************************/

  modules.set('./tables/local-database/counters/memory', {
    hash: 447541486,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.MemoryLocalDBCounters = void 0;

      class MemoryLocalDBCounters extends Map {}

      exports.MemoryLocalDBCounters = MemoryLocalDBCounters;
    }
  });
  /***************************************************
  INTERNAL MODULE: ./tables/local-database/lists/lists
  ***************************************************/

  modules.set('./tables/local-database/lists/lists', {
    hash: 128161166,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LocalDBLists = void 0;

      var _memory = require("./memory");

      var _ts = require("@beyond-js/kernel/core/ts");

      var _compareObjects = require("../../data/factory/compare-objects");

      class LocalDBLists {
        #db;
        #memory = new _memory.MemoryLocalDBLists();

        get memory() {
          return this.#memory;
        }

        constructor(db) {
          this.#db = db;
        }

        #generateKey = (filter, attributes) => {
          filter = filter ? filter : []; // Order the filter by field to assure that the generated key be unique

          filter = filter.sort((c1, c2) => c1.field > c2.field ? -1 : 1);
          return _compareObjects.CompareObjects.generate(filter, attributes);
        };
        #save = value => {
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['lists'], 'readwrite');
          const store = transaction.objectStore('lists');
          let rq;

          try {
            rq = store.put(value);
          } catch (exc) {
            promise.reject(exc);
            return promise;
          }

          rq.onerror = event => {
            promise.reject(event.target.result);
          };

          rq.onsuccess = () => {
            promise.resolve(true);
          };

          return promise;
        };

        async save(filter, attributes, data) {
          const key = this.#generateKey(filter, attributes);
          const value = {
            key: key,
            data: data,
            savedTime: Date.now()
          }; // Save in memory cache first, the data must be available immediately as other
          // nodes in the tree that request the data could require it

          this.#memory.set(key, value);
          if (!this.#db.table.cache.enabled) return;
          await this.#db.prepare();
          return await this.#save(value);
        }

        #load = key => {
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['lists'], 'readonly');
          const store = transaction.objectStore('lists');
          let rq;

          try {
            rq = store.get(key);
          } catch (exc) {
            promise.reject(exc);
            return promise;
          }

          rq.onerror = event => promise.reject(event.target.result);

          rq.onsuccess = event => {
            const value = event.target.result;
            value && this.#memory.set(key, value);
            promise.resolve(value);
          };

          return promise;
        };

        async load(filter, attributes) {
          const key = this.#generateKey(filter, attributes);
          if (this.#memory.has(key)) return this.#memory.get(key);
          if (!this.#db.table.cache.enabled) return;
          await this.#db.prepare();
          return await this.#load(key);
        }

      }

      exports.LocalDBLists = LocalDBLists;
    }
  });
  /****************************************************
  INTERNAL MODULE: ./tables/local-database/lists/memory
  ****************************************************/

  modules.set('./tables/local-database/lists/memory', {
    hash: 1311343063,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.MemoryLocalDBLists = void 0;

      class MemoryLocalDBLists extends Map {}

      exports.MemoryLocalDBLists = MemoryLocalDBLists;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./tables/local-database/local-database
  ******************************************************/

  modules.set('./tables/local-database/local-database', {
    hash: 1877598121,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LocalDB = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _records = require("./records/records");

      var _lists = require("./lists/lists");

      var _unpublished = require("./records/unpublished");

      var _counters = require("./counters/counters");

      class LocalDB {
        #table;

        get table() {
          return this.#table;
        }

        #db;

        get db() {
          return this.#db;
        }

        #records = new _records.LocalDBRecords(this);

        get records() {
          return this.#records;
        }

        #unpublished = new _unpublished.LocalDBUnpublished(this);

        get unpublished() {
          return this.#unpublished;
        }

        #lists = new _lists.LocalDBLists(this);

        get lists() {
          return this.#lists;
        }

        #counters = new _counters.LocalDBCounters(this);

        get counters() {
          return this.#counters;
        }

        #error = false;

        get error() {
          return this.#error;
        }

        #prepared;

        prepare() {
          if (!this.#table.cache.enabled) return Promise.resolve();
          if (this.#prepared) return this.#prepared;
          this.#prepared = new _ts.PendingPromise();
          const table = this.#table;
          const name = `plm-table:${table.name}`;
          const version = table.version;
          const request = indexedDB.open(name, version);

          request.onerror = error => {
            this.#error = true;
            this.#prepared.reject(error.target.result);
          };

          request.onupgradeneeded = event => {
            const db = event.target.result;
            const records = db.createObjectStore('records', {
              keyPath: [`data.${table.indices.primary.fields[0]}`, 'accessToken']
            }); // Create the indices of the records object store

            for (const index of table.indices.values()) {
              if (!index.unique) continue;
              const keyPath = index.fields.map(field => `data.${field}`);
              keyPath.push('accessToken');
              records.createIndex(index.name, keyPath, {
                unique: true
              });
            }

            db.createObjectStore('unpublished', {
              keyPath: 'localId'
            });
            db.createObjectStore('lists', {
              keyPath: 'key'
            });
            db.createObjectStore('counters', {
              keyPath: 'key'
            });
            this.#db = db;
          };

          request.onsuccess = event => {
            this.#db = this.#db ? this.#db : event.target.result;
            this.#prepared.resolve();
          };

          return this.#prepared;
        }

        constructor(table) {
          this.#table = table;
        }

      }

      exports.LocalDB = LocalDB;
    }
  });
  /******************************************************
  INTERNAL MODULE: ./tables/local-database/records/memory
  ******************************************************/

  modules.set('./tables/local-database/records/memory', {
    hash: 628666919,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.MemoryLocalDBRecords = void 0;

      var _compareObjects = require("../../data/factory/compare-objects");

      class MemoryLocalDBRecords extends Map {
        generateKey = (pk, accessToken) => {
          return _compareObjects.CompareObjects.generate(pk, accessToken);
        };

        exists(pk, accessToken) {
          const key = this.generateKey(pk, accessToken);
          return super.has(key);
        }

        load(record, accessToken) {
          const pk = record.pk;
          if (!pk.assigned) return;
          const key = this.generateKey(pk.value, accessToken);
          if (!this.has(key)) return;
          return this.get(key);
        }

        save(pk, accessToken, value) {
          const key = this.generateKey(pk, accessToken);
          super.set(key, value);
        }

        remove(pk, accessToken) {
          const key = this.generateKey(pk, accessToken);
          super.delete(key);
        }

      }

      exports.MemoryLocalDBRecords = MemoryLocalDBRecords;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./tables/local-database/records/records
  *******************************************************/

  modules.set('./tables/local-database/records/records', {
    hash: 1001634314,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LocalDBRecords = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _memory = require("./memory");

      class LocalDBRecords {
        #db;
        #memory = new _memory.MemoryLocalDBRecords();

        get memory() {
          return this.#memory;
        }

        constructor(db) {
          this.#db = db;
        }

        #save = value => {
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['records'], 'readwrite');
          const store = transaction.objectStore('records');
          let rq;

          try {
            rq = store.put(value);
          } catch (exc) {
            promise.reject(exc);
            return promise;
          }

          rq.onerror = event => {
            promise.reject(event.target.result);
          };

          rq.onsuccess = () => {
            promise.resolve(true);
          };

          return promise;
        };

        async save(data, version, accessToken) {
          const pk = this.#db.table.indices.primary.fields[0];

          if (!data.hasOwnProperty(pk)) {
            throw new Error(`Cannot save record to the local database as its pk "${pk}" is not assigned`);
          }

          const value = {
            data: data,
            version: version,
            accessToken: accessToken ? accessToken : '',
            savedTime: Date.now()
          }; // Save in memory cache first, the data must be available immediately as other
          // nodes in the tree that request the data could require it

          this.#memory.save(data[pk], accessToken, value);
          if (!this.#db.table.cache.enabled) return;
          await this.#db.prepare();
          return await this.#save(value);
        }

        #remove = () => {
          //TODO remove on indexedDB
          return true;
        };

        async remove(data, accessToken) {
          const pk = this.#db.table.indices.primary.fields[0];

          if (!data.hasOwnProperty(pk)) {
            throw new Error(`Cannot remove record to the local database as its pk "${pk}"`);
          } // Remove in memory cache first, the data must be available immediately as other
          // nodes in the tree that request the data could require it


          this.#memory.remove(data[pk], accessToken);
          if (!this.#db.table.cache.enabled) return;
          await this.#db.prepare();
          return await this.#remove();
        }

        #load = (index, fields, accessToken) => {
          const pkField = this.#db.table.indices.primary.fields[0];
          const pk = fields.hasOwnProperty(pkField) ? fields[pkField] : undefined;

          if (index.primary && !pk) {
            throw new Error(`Primary key field "${pkField}" not specified`);
          }

          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['records'], 'readonly');
          const store = transaction.objectStore('records');
          accessToken = accessToken ? accessToken : '';
          let rq;

          if (index.primary) {
            rq = store.get([pk, accessToken]);
          } else {
            const indexStore = store.index(index.name);

            if (!indexStore) {
              throw new Error(`Index ${index.name} doesn't exist`);
            }

            const values = index.fields.map(field => {
              if (!fields.hasOwnProperty(field)) {
                throw new Error(`Field "${field}" is required to query by index "${index.name}"`);
              }

              return fields[field];
            });
            rq = indexStore.get(values);
          }

          rq.onerror = event => promise.reject(event.target.result);

          rq.onsuccess = event => promise.resolve(event.target.result);

          return promise;
        };

        async load(indexName, fields, accessToken) {
          const {
            table
          } = this.#db;
          const {
            indices
          } = table;

          if (!indices.has(indexName)) {
            throw new Error(`Index "${indexName}" not found on table "${table.name}"`);
          }

          const index = indices.get(indexName); // Check if record is in memory cache

          if (index.primary) {
            const pkField = this.#db.table.indices.primary.fields[0];
            const pk = fields.hasOwnProperty(pkField) ? fields[pkField] : undefined;
            const key = this.#memory.generateKey(pk, accessToken);
            if (pk && this.#memory.has(key)) return Promise.resolve(this.#memory.get(key));
          }

          if (!this.#db.table.cache.enabled) return;
          await this.#db.prepare();
          return await this.#load(index, fields, accessToken);
        }

      }

      exports.LocalDBRecords = LocalDBRecords;
    }
  });
  /***********************************************************
  INTERNAL MODULE: ./tables/local-database/records/unpublished
  ***********************************************************/

  modules.set('./tables/local-database/records/unpublished', {
    hash: 3016430800,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.LocalDBUnpublished = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      class LocalDBUnpublished {
        #db;

        constructor(db) {
          this.#db = db;
        }

        #save = (localId, data) => {
          if (!localId || !data) throw new Error('Invalid parameters');
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['unpublished'], 'readwrite');
          const store = transaction.objectStore('unpublished');
          const rq = store.put(data);

          rq.onerror = event => promise.reject(event.target.result);

          rq.onsuccess = () => promise.resolve();

          return promise;
        };

        async save(localId, data) {
          await this.#db.prepare();
          return await this.#save(localId, data);
        }

        #load = localId => {
          const promise = new _ts.PendingPromise();
          const transaction = this.#db.db.transaction(['unpublished'], 'readonly');
          const store = transaction.objectStore('unpublished');
          let rq = store.get(localId);

          rq.onerror = event => {
            promise.reject(event.target.result);
          };

          rq.onsuccess = event => {
            const output = event.target.result;
            output && delete output.key;
            promise.resolve(output);
          };

          return promise;
        };

        async load(localId) {
          await this.#db.prepare();
          return await this.#load(localId);
        }

      }

      exports.LocalDBUnpublished = LocalDBUnpublished;
    }
  });
  /**********************************************
  INTERNAL MODULE: ./tables/properties/properties
  **********************************************/

  modules.set('./tables/properties/properties', {
    hash: 3016071899,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Properties = void 0;

      var _item = require("./types/item");

      var _items = require("./types/items");

      var _collection = require("./types/collection");

      var _itemSelector = require("./types/item-selector");
      /**
       * The properties of the table / item
       */


      class Properties extends Map {
        #table;

        get table() {
          return this.#table;
        }
        /**
         * Properties constructor
         * @param table {Table} The table
         * @param specs {object} The properties specification
         */


        constructor(table, specs) {
          super();
          this.#table = table;
          specs = specs ? specs : {};
          if (typeof specs !== 'object') throw new Error(`Invalid properties specification`);
          Object.keys(specs).forEach(name => this.register(name, specs[name]));
        }

        register(name, specs) {
          let property;

          if (specs.Item) {
            property = new _item.ItemProperty(this.#table, name, specs);
          } else if (specs.selector) {
            property = new _itemSelector.ItemSelectorProperty(this.#table, name, specs);
          } else if (specs.Items) {
            property = new _items.ItemsProperty(this.#table, name, specs);
          } else if (specs.Collection) {
            property = new _collection.CollectionProperty(this.#table, name, specs);
          } else {
            console.error('Property specs:', specs);
            throw new Error(`Property "${name}" not recognized`);
          }

          super.set(name, property);
          return this;
        }

        validate() {
          this.forEach(property => property.validate());
          return true;
        }

      }

      exports.Properties = Properties;
    }
  });
  /********************************************
  INTERNAL MODULE: ./tables/properties/property
  ********************************************/

  modules.set('./tables/properties/property', {
    hash: 792239610,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Property = void 0;
      /**
       * A property of the table / item
       */

      class Property {
        #parentTable;

        get parentTable() {
          return this.#parentTable;
        }

        #specs;

        get specs() {
          return this.#specs;
        }

        #name;

        get name() {
          return this.#name;
        }

        #readonly;

        get readonly() {
          return this.#readonly;
        }

        #immutable;

        get immutable() {
          return this.#immutable;
        }
        /**
         * Property constructor
         *
         * @param {Table} parentTable The table where the property resides
         * @param {string} name The property name
         * @param {PropertySpecs} specs The property specification
         */


        constructor(parentTable, name, specs) {
          if (!parentTable || !name || !specs) throw new Error('Invalid parameters');
          this.#parentTable = parentTable;
          this.#name = name;
          this.#readonly = typeof specs.readonly !== 'boolean' ? false : specs.readonly;
          this.#immutable = !!specs.immutable;
          this.#specs = specs;
        }

      }

      exports.Property = Property;
    }
  });
  /****************************************************
  INTERNAL MODULE: ./tables/properties/types/collection
  ****************************************************/

  modules.set('./tables/properties/types/collection', {
    hash: 1481966213,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionProperty = void 0;

      var _property = require("../property");

      class CollectionProperty extends _property.Property {
        get type() {
          return 'collection';
        }

        #table;

        get table() {
          return this.#table;
        }

        #Collection;

        get Collection() {
          return this.#Collection;
        }

        #filterSpec;

        get filterSpec() {
          return this.#filterSpec;
        }

        constructor(parentTable, name, specs) {
          super(parentTable, name, specs);
          this.#table = specs.table;
          this.#Collection = specs.Collection;
          this.#filterSpec = specs.filter;
        }

        validate() {
          // TODO: Add property validations
          return true;
        }

      }

      exports.CollectionProperty = CollectionProperty;
    }
  });
  /*******************************************************
  INTERNAL MODULE: ./tables/properties/types/item-selector
  *******************************************************/

  modules.set('./tables/properties/types/item-selector', {
    hash: 1649674982,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemSelectorProperty = void 0;

      var _property = require("../property");

      class ItemSelectorProperty extends _property.Property {
        get type() {
          return 'item-selector';
        }

        #selector;

        get selector() {
          return this.#selector;
        }

        #tables;

        get tables() {
          return this.#tables;
        }

        constructor(parentTable, name, specs) {
          super(parentTable, name, specs);
          this.#tables = specs.tables;
          this.#selector = specs.selector;
        }

        validate() {
          // TODO: Add property validations
          return true;
        }

      }

      exports.ItemSelectorProperty = ItemSelectorProperty;
    }
  });
  /**********************************************
  INTERNAL MODULE: ./tables/properties/types/item
  **********************************************/

  modules.set('./tables/properties/types/item', {
    hash: 2288763140,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemProperty = void 0;

      var _property = require("../property");

      class ItemProperty extends _property.Property {
        get type() {
          return 'item';
        }

        #table;

        get table() {
          return this.#table;
        }

        #Item;

        get Item() {
          return this.#Item;
        }

        #identifierSpec;

        get identifierSpec() {
          return this.#identifierSpec;
        }

        constructor(parentTable, name, specs) {
          super(parentTable, name, specs);
          this.#table = specs.table;
          this.#Item = specs.Item;
          this.#identifierSpec = specs.identifier;
        }

        validate() {
          // TODO: Add property validations
          return true;
        }

      }

      exports.ItemProperty = ItemProperty;
    }
  });
  /***********************************************
  INTERNAL MODULE: ./tables/properties/types/items
  ***********************************************/

  modules.set('./tables/properties/types/items', {
    hash: 937206479,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemsProperty = void 0;

      var _property = require("../property");

      class ItemsProperty extends _property.Property {
        get type() {
          return 'items';
        }

        #table;

        get table() {
          return this.#table;
        }

        #Items;

        get Items() {
          return this.#Items;
        }

        #identifier;

        get identifier() {
          return this.#identifier;
        }

        constructor(parentTable, name, specs) {
          super(parentTable, name, specs);
          this.#table = specs.table;
          this.#Items = specs.Items;
          this.#identifier = specs.identifier;
        }

        validate() {
          const {
            source,
            field
          } = this.#identifier;

          if (!this.parentTable.fields.includes(source)) {
            throw new Error(`Property "${this.name}" of table "${this.parentTable.name}" has an invalid source.`);
          }

          const tables = require('../../tables');

          const relatedTable = tables.get(this.#table);

          if (!relatedTable.fields.includes(field)) {
            throw new Error(`Property "${this.name}" of table "${this.parentTable.name}" has an invalid "field" value.`);
          }

          return true;
        }

      }

      exports.ItemsProperty = ItemsProperty;
    }
  });
  /********************************************
  INTERNAL MODULE: ./tables/queries/batch/batch
  ********************************************/

  modules.set('./tables/queries/batch/batch', {
    hash: 674774478,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Batch = void 0;

      var _request = require("./request");

      class Batch {
        #specs;
        #queue = [];
        #requests = new Map();

        get queueLength() {
          return this.#queue.length;
        }
        /**
         * Batch constructor
         * @param {BatchSpecs} specs
         */


        constructor(specs) {
          specs.max = specs.max ? specs.max : 30;
          this.#specs = specs;
        }

        #timer;
        /**
         * Push a new request
         *
         * @param {REQUEST} value
         * @returns {Promise<RESPONSE>}
         */

        exec(value) {
          if (!value) throw new Error('Invalid parameters, value must be set');
          const rq = new _request.BatchRequest(value);
          this.#queue.push(rq);
          this.#requests.set(rq.id, rq);
          clearTimeout(this.#timer);
          setTimeout(() => this.#execute(), 0);
          return rq.promise;
        }
        /**
         * Processes the pending requests
         */


        #execute = () => {
          // Nothing more to be processed
          if (!this.#queue.length) return;
          const requests = this.#queue.splice(0, this.#specs.max);
          const params = requests.map(rq => [rq.id, rq.value]);
          const {
            module,
            action
          } = this.#specs;
          /**
           * TODO 1:
           * Definir que la respuesta pueda ser una matriz o un mapa
           * para que en el servicio sea mas simple manejar el armado de la respuesta
           * pero que pueda recibir las 2 estructuras
           *
           * TODO 2: finally esta incluido a partir de ES2018 validar lo que implica ese cambio
           */

          module.execute(action, params).then(response => {
            const responses = new Map(response); // const responses = Array.isArray(response) ? new Map(response) : response;

            for (const rq of requests) {
              this.#requests.delete(rq.id);
              rq.promise.resolve(responses.get(rq.id));
            }
          }).catch(error => {
            for (const rq of requests) {
              this.#requests.delete(rq.id);
              rq.promise.reject(error);
            }
          }).finally(() => {
            this.#execute();
          });
        };
      }

      exports.Batch = Batch;
    }
  });
  /**********************************************
  INTERNAL MODULE: ./tables/queries/batch/request
  **********************************************/

  modules.set('./tables/queries/batch/request', {
    hash: 3368031555,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BatchRequest = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      let id = 0;

      class BatchRequest {
        #id = id++;

        get id() {
          return `${this.#id}`;
        }

        #value;

        get value() {
          return this.#value;
        }

        #promise = new _ts.PendingPromise();

        get promise() {
          return this.#promise;
        }

        constructor(value) {
          this.#value = value;
        }

      }

      exports.BatchRequest = BatchRequest;
    }
  });
  /****************************************
  INTERNAL MODULE: ./tables/queries/counter
  ****************************************/

  modules.set('./tables/queries/counter', {
    hash: 2188437533,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CounterQuery = void 0;

      var _batch = require("./batch/batch");

      class CounterQuery {
        #table;
        #batch;

        constructor(table) {
          this.#table = table;
          this.#batch = new _batch.Batch({
            module: table.module,
            action: table.batch.actions.count,
            max: table.batch.max
          });
        }

        async exec(filter, attributes) {
          let fields = {};
          filter = filter ? filter : [];
          let count = 0;
          filter.map(condition => {
            count++;
            fields[condition.field] = condition.value;
          });
          const index = count ? this.#table.indices.select('count', fields) : undefined;

          if (count && !index) {
            const message = `No index found in table "${this.#table.name}" ` + `that can be used to solve a "count" this request`;
            console.error(message, filter, fields);
            throw new Error(message);
          }

          const request = {
            action: 'counter',
            attributes: attributes
          };
          count && Object.assign(request, {
            index: index.name,
            filter: filter
          });
          const response = await this.#batch.exec(request);

          if (typeof response !== 'number') {
            console.error(`Invalid response received on query "counter" to table "${this.#table.name}"`, request, response);
            return;
          }

          this.#table.localDB.counters.save(filter, attributes, response).catch(error => console.error(`Error saving counter of table "${this.#table.name}" to local storage`, error, request, response));
          return response;
        }

      }

      exports.CounterQuery = CounterQuery;
    }
  });
  /*************************************
  INTERNAL MODULE: ./tables/queries/data
  *************************************/

  modules.set('./tables/queries/data', {
    hash: 109746743,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DataQuery = void 0;

      var _batch = require("./batch/batch");

      class DataQuery {
        #table;
        #batch;

        constructor(table) {
          this.#table = table;
          this.#batch = new _batch.Batch({
            module: table.module,
            action: table.batch.actions.data,
            max: table.batch.max
          });
        }

        async exec(fields, attributes) {
          attributes = attributes ? attributes : {};
          const index = this.#table.indices.select('data', fields);

          if (!index) {
            const message = `No index found in table "${this.#table.name}" ` + `that can be used to solve a "data" request.\n\n`;
            console.error(message, fields);
            throw new Error(message);
          }

          let cached = await this.#table.localDB.records.load(index.name, fields, attributes.accessToken);
          const version = cached ? cached.version : undefined;
          const request = {
            action: 'data',
            index: index.name,
            version: version,
            fields: fields,
            attributes: attributes
          };
          const response = await this.#batch.exec(request); //Item not found

          if (response === undefined || response === null) {
            if (cached) {
              //Delete to cache
              this.#table.localDB.records.remove(cached, attributes.accessToken).catch(error => console.error(`Error removing record of table "${this.#table.name}" to local storage.\n\n`, error, '\n', cached));
            }

            return;
          }

          if (typeof response !== 'object') {
            console.warn(`Response received was not an object on query "data" to table "${this.#table.name}".\n\n`, request, '\n', response);
            return;
          }

          response.version = response.version ? response.version : response.tu;

          if (typeof response.data !== 'object' || typeof response.version !== 'number') {
            console.warn(`Invalid response received on query "data" to table "${this.#table.name}".\n\n`, request, '\n', response);
            return;
          } // Verify that the version of the received record is newer


          if (version && version >= response.version) {
            console.warn('The record version of the received fetch is not improved.\n' + `Cached version was "${version}" and the record received version is "${response.version}"`);
          } // Save to cache


          this.#table.localDB.records.save(response.data, response.version, attributes.accessToken).catch(error => console.error(`Error saving record of table "${this.#table.name}" to local storage.\n\n`, error, '\n', request, '\n', response.data));
          return response;
        }

      }

      exports.DataQuery = DataQuery;
    }
  });
  /*************************************
  INTERNAL MODULE: ./tables/queries/list
  *************************************/

  modules.set('./tables/queries/list', {
    hash: 1194419818,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ListQuery = void 0;

      var _batch = require("./batch/batch");

      class ListQuery {
        #table;
        #batch;

        constructor(table) {
          this.#table = table;
          this.#batch = new _batch.Batch({
            module: table.module,
            action: table.batch.actions.list,
            max: table.batch.max
          });
        }
        /**
         * Returns the cached version of the list as an object where the key is the primary key of the record,
         * and the value is its version
         *
         * @param {FilterSpecs} filter
         * @param {ListAttributes} attributes
         * @returns {Record<string, number>}
         */


        #cached = async (filter, attributes) => {
          let output = {};
          let cached = await this.#table.localDB.lists.load(filter, attributes);

          if (cached && !(cached.data instanceof Array)) {
            console.warn('Cache of list is invalid.', '\n', cached);
            cached = undefined;
          }

          if (!cached) return;
          const records = cached.data;

          for (const record of records) {
            const index = this.#table.indices.primary;
            const pk = index.fields[0];
            const fields = {};
            fields[pk] = record;
            let cached = await this.#table.localDB.records.load(index.name, fields, attributes.accessToken);

            if (cached) {
              output[record] = cached.version;
            }
          }

          return output;
        };
        /**
         * Creates a ListQueryRequest
         *
         * @param {FilterSpecs} filter
         * @param {ListAttributes} attributes
         * @returns {ListQueryRequest}
         */

        #request = async (filter, attributes) => {
          const cached = await this.#cached(filter, attributes);
          const fields = {};
          filter = filter ? filter : [];
          let count = 0;
          filter.map(condition => {
            count++;
            fields[condition.field] = condition.value;
          });
          const index = count ? this.#table.indices.select('list', fields) : undefined;

          if (count && !index) {
            const message = `No index found in table "${this.#table.name}" ` + `that can be used to solve a "list" request.\n\n`;
            console.error(message, filter, '\n', fields);
            throw new Error(message);
          }

          const request = {
            action: 'list',
            attributes: attributes,
            cached: cached
          };
          count && Object.assign(request, {
            index: index.name,
            filter: filter
          });
          return request;
        };
        /**
         * Executes a list query
         *
         * @param {FilterSpecs} filter
         * @param {ListAttributes} attributes
         * @returns {Promise<(string | number)[]>}
         */

        async exec(filter, attributes) {
          const request = await this.#request(filter, attributes);
          const response = await this.#batch.exec(request);

          if (!(response instanceof Array)) {
            console.error(`Invalid response received on query "list" to table "${this.#table.name}".\n\n`, request, '\n', response);
            return [];
          } // Save to the local database the list and the records data


          const listIds = [];

          for (const record of response) {
            if (!record.uptodate) {
              const pk = this.#table.indices.primary.fields[0];

              if (!record.data.hasOwnProperty(pk)) {
                console.error(`Error on "list" query. Record of table "${this.#table.name}" ` + `does not have its primary key field "${pk}".\n\n`, request, record);
                continue;
              } // Verify that the version of the received record is newer


              record.version = record.version ? record.version : record.tu;
              const {
                cached
              } = request;
              const version = cached && cached.hasOwnProperty(record.data[pk]) ? cached[record.data[pk]] : 0;

              if (version && version >= record.version) {
                console.warn('The record version of the received fetch is not improved.\n' + `Cached version was "${version}" and the record received version is "${record.version}"`);
              }

              listIds.push(record.data[pk]);
            } else {
              listIds.push(record.pk);
            }

            this.#table.localDB.records.save(record.data, record.version, attributes.accessToken).catch(error => console.error(`Error saving record of table "${this.#table.name}" to local storage.\n\n`, error, '\n', request, '\n', record));
          }

          this.#table.localDB.lists.save(filter, attributes, listIds).catch(error => console.error(`Error saving list of table "${this.#table.name}" to local storage.\n\n`, error, '\n', request, '\n', listIds));
          return listIds;
        }

      }

      exports.ListQuery = ListQuery;
    }
  });
  /****************************************
  INTERNAL MODULE: ./tables/queries/queries
  ****************************************/

  modules.set('./tables/queries/queries', {
    hash: 1132816002,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Queries = void 0;

      var _data = require("./data");

      var _list = require("./list");

      var _counter = require("./counter");

      class Queries {
        #data;
        #list;
        #counter;

        constructor(table) {
          this.#data = new _data.DataQuery(table);
          this.#list = new _list.ListQuery(table);
          this.#counter = new _counter.CounterQuery(table);
        }

        async data(fields, attributes) {
          return this.#data.exec(fields, attributes);
        }

        async list(filter, attributes) {
          return this.#list.exec(filter, attributes);
        }

        async counter(filter, attributes) {
          return this.#counter.exec(filter, attributes);
        }

      }

      exports.Queries = Queries;
    }
  });
  /******************************
  INTERNAL MODULE: ./tables/table
  ******************************/

  modules.set('./tables/table', {
    hash: 1647223119,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Table = void 0;

      var _properties = require("./properties/properties");

      var _indices = require("./indices/indices");

      var _localDatabase = require("./local-database/local-database");

      var _queries = require("./queries/queries");

      var _manager = require("./data/lists/manager/manager");

      var _manager2 = require("./data/records/manager");

      var _manager3 = require("./data/counter/manager");
      /**
       * Table data access
       *
       * @param name {string} The table name
       * @param specs {object} The table specification
       * @constructor
       */


      class Table {
        #name;
        #specs;

        get name() {
          return this.#name;
        }

        get version() {
          return this.#specs.version;
        }

        get cache() {
          return this.#specs.cache;
        }

        get module() {
          return this.#specs.module;
        }

        get batch() {
          return this.#specs.batch;
        }

        get fields() {
          return this.#specs.fields.slice();
        }

        #properties;

        get properties() {
          return this.#properties;
        }

        #indices;

        get indices() {
          return this.#indices;
        }

        #localDB = new _localDatabase.LocalDB(this);

        get localDB() {
          return this.#localDB;
        }

        #records = new _manager2.RecordsManager(this);

        get records() {
          return this.#records;
        }

        #lists = new _manager.ListsManager(this);

        get lists() {
          return this.#lists;
        }

        #counters = new _manager3.CountersManager(this);

        get counters() {
          return this.#counters;
        }

        #queries;

        get queries() {
          return this.#queries;
        }

        constructor(name, specs) {
          if (typeof specs.module !== 'object') throw new Error(`Invalid module specification on table "${name}"`);
          if (specs.version && typeof specs.version !== 'number') throw new Error('Invalid table version specification');
          if (!(specs.fields instanceof Array)) throw new Error(`Invalid fields specification on table "${name}"`);
          if (specs.properties && typeof specs.properties !== 'object') throw new Error(`Invalid properties specification on table "${name}"`);
          if (typeof specs.batch !== 'object' || typeof specs.batch.actions !== 'object') throw new Error(`Invalid batch specification on table "${name}"`);
          if (specs.indices && typeof specs.indices !== 'object') throw new Error(`Invalid indices specification on table "${name}"`);
          if (typeof name !== 'string' || !name) throw new Error('Invalid table name parameter');
          specs.version = specs.version ? specs.version : 1;
          this.#name = name;
          this.#specs = specs;

          if (!['boolean', 'object', 'undefined'].includes(typeof this.#specs.cache)) {
            console.warn(`Invalid cache specification on table "${name}"`, specs);
          }

          this.#specs.cache === undefined ? this.#specs.cache = {
            enabled: false
          } : null;
          typeof this.#specs.cache === 'boolean' ? this.#specs.cache = {
            enabled: this.#specs.cache
          } : null;
          typeof this.#specs.cache === 'object' && !this.#specs.cache.hasOwnProperty('limit') ? this.#specs.cache.limit = 30 : null;
          this.#indices = new _indices.Indices(this, specs.indices);
          this.#properties = new _properties.Properties(this, specs.properties);
          this.#queries = new _queries.Queries(this);
          this.#localDB.prepare().catch(exc => console.error(exc.stack));
        }

        validate() {
          this.#properties.validate();
          return true;
        }

      }

      exports.Table = Table;
    }
  });
  /*******************************
  INTERNAL MODULE: ./tables/tables
  *******************************/

  modules.set('./tables/tables', {
    hash: 3857649849,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.tables = exports.Tables = void 0;

      var _table = require("./table");

      class Tables extends Map {
        register(name, specs) {
          if (this.has(name)) throw new Error(`Table ${name} is already registered`);
          const table = new _table.Table(name, specs);
          super.set(name, table);
          return table;
        }

        validate() {
          this.forEach(table => table.validate());
          return true;
        }

      }

      exports.Tables = Tables;
      /*bundle*/

      const tables = new Tables();
      exports.tables = tables;
    }
  });
  /*********************************
  INTERNAL MODULE: ./tree/collection
  *********************************/

  modules.set('./tree/collection', {
    hash: 2038126333,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollectionNode = void 0;

      var _node = require("./node");

      var _item = require("./item");

      class CollectionNode extends _node.Node {
        get is() {
          return 'collection';
        }

        #view;

        get view() {
          return this.#view;
        }

        #limit;

        get limit() {
          return this.#limit;
        }

        #items;

        get items() {
          return this.#items;
        }

        #order;

        get order() {
          return this.#order;
        }

        #counters = new Set();

        get counters() {
          return this.#counters;
        }

        constructor(table, specs, parent, property) {
          super(table, specs, parent, property);
          specs = specs ? specs : {};
          if (typeof specs !== 'object') throw new Error('Invalid parameters');
          if (specs.counters && !(specs.counters instanceof Array)) throw new Error('Invalid counters specification');
          this.#counters = new Set(specs.counters);
          this.#items = new _item.ItemNode(table, {
            properties: specs.properties
          }, parent);
          this.#view = specs.view;
          this.#limit = specs.limit;
          this.#order = specs.order;
        }

      }

      exports.CollectionNode = CollectionNode;
    }
  });
  /************************************
  INTERNAL MODULE: ./tree/item-selector
  ************************************/

  modules.set('./tree/item-selector', {
    hash: 321000369,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemSelectorNode = void 0;

      var _node = require("./node");

      class ItemSelectorNode extends _node.Node {
        get is() {
          return 'item-selector';
        }

        #tables = new Map();

        get tables() {
          return this.#tables;
        }

        #property;

        get property() {
          return this.#property;
        }

        constructor(table, specs, parent, property) {
          super(table, specs, parent, property);
          this.#property = property;
          if (typeof specs !== 'object') throw new Error('Invalid parameters');

          for (const [table, children] of Object.entries(specs)) {
            if (!property.tables.includes(table)) {
              throw new Error(`Table "${table}" is not registered`);
            }

            const CItemNode = require('./item').ItemNode;

            this.#tables.set(table, new CItemNode(table, children, this, property));
          }
        }

      }

      exports.ItemSelectorNode = ItemSelectorNode;
    }
  });
  /***************************
  INTERNAL MODULE: ./tree/item
  ***************************/

  modules.set('./tree/item', {
    hash: 2904687249,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemNode = void 0;

      var _node = require("./node");

      var _properties = require("./properties");

      class ItemNode extends _node.Node {
        get is() {
          return 'item';
        }

        #specs;

        get specs() {
          return this.#specs;
        }

        #properties;

        get properties() {
          return this.#properties;
        }

        constructor(table, specs, parent, property) {
          super(table, specs, parent, property);
          specs = specs ? specs : {};
          if (typeof specs !== 'object') throw new Error('Invalid parameters');
          this.#specs = specs;
          this.#properties = new _properties.Properties(this.table);
          this.#properties.register(specs.properties, this);
        }

      }

      exports.ItemNode = ItemNode;
    }
  });
  /****************************
  INTERNAL MODULE: ./tree/items
  ****************************/

  modules.set('./tree/items', {
    hash: 3754893300,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ItemsNode = void 0;

      var _node = require("./node");

      var _item = require("./item");

      class ItemsNode extends _node.Node {
        get is() {
          return 'items';
        }

        #items;

        get items() {
          return this.#items;
        }

        constructor(table, specs, parent, property) {
          super(table, specs, parent, property);
          if (typeof specs !== 'object') throw new Error('Invalid parameters');
          this.#items = new _item.ItemNode(table, {
            properties: specs.properties
          }, parent, property);
        }

      }

      exports.ItemsNode = ItemsNode;
    }
  });
  /***************************
  INTERNAL MODULE: ./tree/node
  ***************************/

  modules.set('./tree/node', {
    hash: 2502482559,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Node = void 0;

      var _ts = require("@beyond-js/kernel/core/ts");

      var _tables = require("../tables/tables");

      class Node extends _ts.Events {
        #property;

        get property() {
          return this.#property;
        }

        #table;

        get table() {
          return this.#table;
        }

        #session;

        get session() {
          return this.#session;
        }

        #root;

        get root() {
          return this.#root;
        }

        #parent;

        get parent() {
          return this.#parent;
        }

        #active = true;

        get active() {
          return this.#parent ? this.#parent.active : this.#active;
        }

        set active(value) {
          if (this.#parent) {
            throw new Error('.active property can only be set to the root of the tree');
          }

          this.#active = value;
        }
        /**
         * The Node Constructor
         * @param {string} table The table name
         * @param {NodeSpecs} specs The node specification
         * @param {Node} parent The parent node in the tree
         * @param {Property} property The table property.
         * Undefined when the node is created from the item or the collection instead of being created by the tree
         */


        constructor(table, specs, parent, property) {
          super();
          if (property && typeof property !== 'object') throw new Error('Invalid "property" parameter');
          this.#property = property;
          if (!table) throw new Error('Parameter "table" is required');
          if (!_tables.tables.has(table)) throw new Error(`Table "${table}" is not registered`);
          this.#table = _tables.tables.get(table);
          specs = specs ? specs : {};
          this.#session = specs.session ? specs.session : parent ? parent.session : undefined;
          this.#parent = parent;
          this.#root = parent ? parent.root : this;
        }

        #timer;

        trigger(event, ...rest) {
          if (!this.#active) return;

          if (this.#parent) {
            event === 'change' && this.root.trigger(event, ...rest);
            return super.trigger(event, ...arguments); // async events return a promise
          } else {
            if (event !== 'change') return super.trigger(event, ...rest);
            if (this.#timer) return;
            this.#timer = window.setTimeout(() => {
              this.#timer = undefined;
              super.trigger(event, ...rest);
            }, 0);
          }
        }

      }

      exports.Node = Node;
    }
  });
  /*********************************
  INTERNAL MODULE: ./tree/properties
  *********************************/

  modules.set('./tree/properties', {
    hash: 2822505680,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Properties = void 0;

      class Properties extends Map {
        #table;

        constructor(table) {
          super();
          this.#table = table;
        }

        register(properties, parent) {
          if (!properties) return;

          for (let [name, specs] of Object.entries(properties)) {
            if (!this.#table.properties.has(name)) {
              console.warn(`Property "${name}" of table "${this.#table.name}" is not registered`);
              continue;
            }

            if (typeof specs === 'boolean' && !specs) continue;
            specs = typeof specs === 'boolean' ? {} : specs;
            const property = this.#table.properties.get(name);
            let table;

            switch (property.type) {
              case 'item-selector':
                const CItemSelectorNode = require('./item-selector').ItemSelectorNode;

                this.set(name, new CItemSelectorNode(this.#table.name, specs, parent, property));
                break;

              case 'item':
                table = property.table;

                const CItemNode = require('./item').ItemNode;

                this.set(name, new CItemNode(table, specs, parent, property));
                break;

              case 'collection':
                table = property.table;

                const CCollectionNode = require('./collection').CollectionNode;

                this.set(name, new CCollectionNode(table, specs, parent, property));
                break;

              case 'items':
                table = property.table;

                const CItemsNode = require('./items').ItemsNode;

                this.set(name, new CItemsNode(table, specs, parent, property));
                break;

              default:
                throw new Error(`Property "${name}" has an invalid type "${property.type}"`);
            }
          }
        }

      }

      exports.Properties = Properties;
    }
  });
  /****************************
  INTERNAL MODULE: ./tree/specs
  ****************************/

  modules.set('./tree/specs', {
    hash: 3754493840,
    creator: function (require, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }
  }); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {
    _exports.auth = require('./auth/auth').auth;
    _exports.NotSet = require('./constants').NotSet;
    _exports.DataSource = require('./constants').DataSource;
    _exports.CollectionSpecs = require('./elements/collection/collection').CollectionSpecs;
    _exports.Collection = require('./elements/collection/collection').Collection;
    _exports.ItemSpecs = require('./elements/item/item').ItemSpecs;
    _exports.Item = require('./elements/item/item').Item;
    _exports.CollectionProperty = require('./elements/item/properties/collection/property').CollectionProperty;
    _exports.ItemSelectorProperty = require('./elements/item/properties/item-selector/property').ItemSelectorProperty;
    _exports.ItemProperty = require('./elements/item/properties/item/property').ItemProperty;
    _exports.ItemsProperty = require('./elements/item/properties/items/property').ItemsProperty;
    _exports.ConditionOperand = require('./tables/data/filter/filter').ConditionOperand;
    _exports.realtime = require('./tables/data/realtime/realtime').realtime;
    _exports.ListUpdateFilterReport = require('./tables/data/realtime/reports/list').ListUpdateFilterReport;
    _exports.TableSpecs = require('./tables/table').TableSpecs;
    _exports.tables = require('./tables/tables').tables;
  };

  let auth, NotSet, DataSource, CollectionSpecs, Collection, ItemSpecs, Item, CollectionProperty, ItemSelectorProperty, ItemProperty, ItemsProperty, ConditionOperand, realtime, ListUpdateFilterReport, TableSpecs, tables; // Module exports

  _exports2.tables = tables;
  _exports2.TableSpecs = TableSpecs;
  _exports2.ListUpdateFilterReport = ListUpdateFilterReport;
  _exports2.realtime = realtime;
  _exports2.ConditionOperand = ConditionOperand;
  _exports2.ItemsProperty = ItemsProperty;
  _exports2.ItemProperty = ItemProperty;
  _exports2.ItemSelectorProperty = ItemSelectorProperty;
  _exports2.CollectionProperty = CollectionProperty;
  _exports2.Item = Item;
  _exports2.ItemSpecs = ItemSpecs;
  _exports2.Collection = Collection;
  _exports2.CollectionSpecs = CollectionSpecs;
  _exports2.DataSource = DataSource;
  _exports2.NotSet = NotSet;
  _exports2.auth = auth;

  __pkg.exports.process = function (require) {
    _exports2.auth = auth = require('./auth/auth').auth;
    _exports2.NotSet = NotSet = require('./constants').NotSet;
    _exports2.DataSource = DataSource = require('./constants').DataSource;
    _exports2.CollectionSpecs = CollectionSpecs = require('./elements/collection/collection').CollectionSpecs;
    _exports2.Collection = Collection = require('./elements/collection/collection').Collection;
    _exports2.ItemSpecs = ItemSpecs = require('./elements/item/item').ItemSpecs;
    _exports2.Item = Item = require('./elements/item/item').Item;
    _exports2.CollectionProperty = CollectionProperty = require('./elements/item/properties/collection/property').CollectionProperty;
    _exports2.ItemSelectorProperty = ItemSelectorProperty = require('./elements/item/properties/item-selector/property').ItemSelectorProperty;
    _exports2.ItemProperty = ItemProperty = require('./elements/item/properties/item/property').ItemProperty;
    _exports2.ItemsProperty = ItemsProperty = require('./elements/item/properties/items/property').ItemsProperty;
    _exports2.ConditionOperand = ConditionOperand = require('./tables/data/filter/filter').ConditionOperand;
    _exports2.realtime = realtime = require('./tables/data/realtime/realtime').realtime;
    _exports2.ListUpdateFilterReport = ListUpdateFilterReport = require('./tables/data/realtime/reports/list').ListUpdateFilterReport;
    _exports2.TableSpecs = TableSpecs = require('./tables/table').TableSpecs;
    _exports2.tables = tables = require('./tables/tables').tables;
  };

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});