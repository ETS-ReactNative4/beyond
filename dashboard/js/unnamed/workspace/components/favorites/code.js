define(["exports", "@beyond-js/dashboard-lib/models/js", "@beyond-js/ui/modal/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/models/code", "@beyond-js/dashboard/ds-contexts/code", "@beyond-js/dashboard/workspace-tree/code", "react", "react-dom"], function (_exports2, _js, _code, _code2, _code3, _code4, _code5, _code6, _code7, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.AsideFavorites = AsideFavorites;
  _exports2.hmr = _exports2.FavoritesModel = _exports2.FavoritesFactory = _exports2.FavoriteChildren = void 0;
  //models
  //beyond-ui
  //CONTEXT
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/workspace/components/favorites/code', false, {}, dependencies);
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
  aside.jsx
  ********/


  function AsideFavorites() {
    const {
      workspace: {
        application: {
          favorites
        }
      }
    } = (0, _code6.useDSWorkspaceContext)();
    const [totalFavorites, setTotalFavorites] = React.useState(favorites?.items.size);
    const [renamed, setRenamed] = React.useState(favorites?.items.size);
    const {
      texts
    } = (0, _code6.useDSAsideContext)();
    (0, _code4.useBinder)([favorites], () => setTotalFavorites(favorites.items.size));
    (0, _code4.useBinder)([favorites], () => setRenamed(performance.now()), 'favorite.renamed');

    if (!favorites.items.size) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ds__aside__detail"
      }, /*#__PURE__*/React.createElement("div", {
        className: "alert alert-info"
      }, /*#__PURE__*/React.createElement("h3", null, texts.favorites.empty.title), /*#__PURE__*/React.createElement("span", null, texts.favorites.empty.description)));
    }

    const items = [...favorites.items.values()];
    const output = items.map((item, key) => /*#__PURE__*/React.createElement(_code7.DSTree, {
      key: key,
      object: item,
      title: item.name,
      tree: item.tree
    }));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-aside__header"
    }, /*#__PURE__*/React.createElement("h3", null, texts?.favorites?.title)), /*#__PURE__*/React.createElement("div", null, output));
  }
  /**************
  rename-form.jsx
  **************/


  function FavoritesRenameForm({
    object,
    closeModal
  }) {
    let {
      texts: {
        favorites: texts
      }
    } = (0, _code7.useDSTreeContext)();
    const [fetching, setFetching] = React.useState();
    const [name, setName] = React.useState(object.name);
    const props = {};
    if (!name) props.disabled = true;

    const onSave = async event => {
      event.stopPropagation();
      event.preventDefault();
      setFetching(true);
      await object.rename(name);
      window.setTimeout(() => {
        setFetching(false);
        closeModal(true);
      }, 300);
    };

    const onClick = event => event.stopPropagation();

    const handleName = event => {
      event.stopPropagation();
      setName(event.currentTarget.value);
    };

    return /*#__PURE__*/React.createElement(_code.BeyondModal, {
      show: true,
      className: "xs ds-modal ds-modal__favorites"
    }, /*#__PURE__*/React.createElement("header", {
      onClick: onClick,
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.title))), /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: onSave
    }, /*#__PURE__*/React.createElement(_code3.BeyondInput, {
      autoComplete: "off",
      name: "name",
      value: name,
      required: true,
      onChange: handleName
    }), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code3.BeyondButton, _extends({}, props, {
      onClick: onSave,
      className: "primary"
    }), fetching ? /*#__PURE__*/React.createElement(_code2.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : texts.actions.save)))));
  }
  /***********
  JS PROCESSOR
  ***********/

  /*************
  FILE: model.js
  *************/


  class FavoritesModel extends _js.ReactiveModel {
    _tree;

    get tree() {
      return this._tree;
    }

    _items = new Map();

    get items() {
      return this._items;
    }

    _application;

    get application() {
      return this._application;
    }

    _moduleManager;

    get moduleManager() {
      return this._moduleManager;
    }

    get total() {
      return this.items.size;
    }

    _ready;

    get ready() {
      return this._ready;
    }

    _promise;

    constructor(application) {
      super();
      this._application = application;
      this._moduleManager = application.moduleManager;

      this.onRename = () => this.triggerEvent('favorite.renamed');

      this._check();
    }
    /**
     * Realizes the query to IndexedDb and generates the Favorites List instances
     * @returns {Promise<void>}
     * @private
     */


    async _check() {
      this._promise = new PendingPromise();
      await _code5.DSModel.initialise();
      const favorites = await _code5.DSModel.db.store('favorites');
      this._db = favorites;
      const items = await favorites.getAll();
      items.forEach(item => {
        /**
         * item.tree property is the data saved in indexedDB
         * TODO: @julio check the name
         * @type {FavoritesList}
         */
        if (this.items.has(item.id)) return this.items.get(item.id);
        const specs = {
          name: item.name,
          id: item.id,
          tree: item.tree
        };
        const instance = new FavoritesList(this, this._moduleManager, specs);

        const onLoad = () => {
          this.triggerEvent('loaded');
          this.items.set(instance.id, instance);
          instance.unbind('favorites.loaded', onLoad);
        };

        instance.bind('favorites.loaded', onLoad);
        instance.bind('favorite.renamed', this.onRename);
        this.items.set(instance.id, instance);
        return instance;
      });
      this.triggerEvent();
      this._ready = true;
    }

    async add(name, specs) {
      try {
        const identifier = name.replace(/ /g, '-').toLowerCase();
        const favorite = this.items.has(name) ? this.items.get(name) : new FavoritesList(this, this._moduleManager, {
          name: name,
          id: identifier
        });
        await favorite.add(specs);
        this.items.set(favorite.id, favorite);
        favorite.bind('favorite.renamed', this.onRename);
        this.triggerEvent();
      } catch (e) {
        console.error(103, e);
      }
    }

    async remove(id) {
      if (!this.items.has(id)) return;
      this.items.delete(id);

      this._db.delete(id);

      this.triggerEvent();
    }

    isFavorite = pathname => {
      return !![...this.items.values()].find(item => item.items.find(item => item.pathname === pathname));
    };
  }
  /****************
  FILE: children.js
  ****************/


  _exports2.FavoritesModel = FavoritesModel;

  class FavoriteChildren extends _js.ReactiveModel {
    _bundle;

    get bundle() {
      return this._bundle;
    }

    _processor;

    get processor() {
      return this._processor;
    }

    _module;

    get module() {
      return this._module;
    }

    _type;

    get type() {
      return this._type;
    }

    _item;

    get item() {
      return this._item;
    }

    _name;

    get name() {
      return this._name;
    }

    _id;

    get id() {
      return this._id;
    }

    _pathname;

    get pathname() {
      return this._pathname;
    }

    _label;

    get label() {
      return this._label;
    }

    constructor(type, item) {
      super();
      const {
        bundle,
        label,
        pathname,
        module,
        processor,
        source
      } = item;
      this._type = type;
      this._processor = processor;
      this._bundle = bundle;
      this._module = module;
      this._source = source;
      this._pathname = pathname;
      this._label = label;
      this._item = ['processor', 'module', 'bundle'].includes(type) ? this[type] : source;
      this._id = this.item.id;
      this._name = this.getName();
    }

    getName() {
      if (this.type === 'module') return this.item.pathname;
      return this.source ? `${module.name}${source.relative.dirname ? `${source.relative.dirname}/` : ''}/${source.relative.file}` : this.item.name;
    }

  }
  /***************
  FILE: factory.js
  ***************/

  /**
   * Beyond manages favorites by application
   *
   * The Factory objects generates a new Factory Model for each application instanced
   */


  _exports2.FavoriteChildren = FavoriteChildren;

  class Factory extends _js.ReactiveModel {
    _items = new Map();

    get items() {
      return this._items;
    }

    get(id, application) {
      if (this.items.has(id)) return this.items.get(id);
      const item = new FavoritesModel(application);
      this.items.set(id, item);
      return item;
    }

  }

  ;
  const FavoritesFactory = new Factory();
  /*****************
  FILE: list-base.js
  *****************/

  _exports2.FavoritesFactory = FavoritesFactory;

  class FavoritesListBase extends _js.ReactiveModel {
    _name;

    get name() {
      return this._name;
    }

    _id;

    get id() {
      return this._id;
    }

    _type;

    get type() {
      return this._type;
    }

    _items = [];

    get items() {
      return this._items;
    }

    _pathname;

    get pathname() {
      return this._pathname;
    }

    _path;

    get path() {
      return this._path;
    }

    _container;

    get container() {
      return this._container;
    }
    /**
     * Manager of the application modules.
     *
     * @private
     */


    _moduleManager;

    get moduleManager() {
      return this._moduleManager;
    }

    _parent;

    get parent() {
      return this._parent;
    }

    get length() {
      return this.items?.length ?? 0;
    }

    _bundleName;

    get bundleName() {
      return this._bundleName;
    }

    _processorName;

    get processorName() {
      return this._processorName;
    }

    _folder;

    get folder() {
      return this._folder;
    }

    _item;

    get item() {
      return this._item;
    }

    _tree;

    get tree() {
      return this._tree;
    }

    get store() {
      return this._store;
    }

    _processor;

    get processor() {
      return this._processor;
    }

    _bundle;

    get bundle() {
      return this._bundle;
    }

    _module;

    get module() {
      return this._module;
    }

    _application;

    get application() {
      return this._application;
    }

    _storedTree = new Map();
    _ready;

    get ready() {
      return this._ready;
    }

    _types = new Set();

    get types() {
      return this._types;
    }

    _idsByType = new Map();

    get idsByType() {
      return this._idsByType;
    }

  }
  /************
  FILE: list.js
  ************/


  class FavoritesList extends FavoritesListBase {
    /**
     *
     * @param parent {FavoritesManager}
     * @param moduleManager {ModuleModel}
     * @param name {string} Name of the favorites item.
     * @param id {string} Identifier
     * @param tree
     */
    constructor(parent, moduleManager, {
      name,
      id,
      tree
    }) {
      super();
      this._parent = parent;
      this._moduleManager = moduleManager;
      this._name = name;
      this._application = parent.application;
      this._id = id;
      this._now = performance.now();
      this._store = _code5.DSModel.db.store('favorites');
      this.rename = this.rename.bind(this);
      this._createTree = this._createTree.bind(this);
      if (tree) this._loadItems(tree);
    }

    async _loadItems(tree) {
      const promises = [];
      this._storedTree = tree;
      tree.forEach(item => promises.push(this.add(item, true)));
      if (!promises.length) this._createTree();
      Promise.all(promises).then(this._createTree);
    }

    _createTree() {
      this._tree = _code7.TreeFactory.get('favorites', [this.application, this, this.items]);
      this._ready = true;
      this.triggerEvent('favorites.loaded');
      this.triggerEvent();
    }
    /**
     * Loads the ModuleModel by id passed
     * @param moduleId
     * @returns {Promise<ModuleModel>}
     * @private
     */


    async _loadModule(moduleId) {
      const module = await this._moduleManager.load(moduleId);
      this._container = module;
      return module;
    }
    /**
     * Registers the itemId
     * The idsByType is used externally to check if an element is saved as a favorite and can mark it on the ui
     *
     * @param type
     * @param id
     */


    registerId(type, id) {
      if (!this._idsByType.has(type)) this._idsByType.set(type, new Set());

      const item = this._idsByType.get(type);

      this._idsByType.set(type, item.add(id));
    }
    /**
     * Instances a new FavoriteChildren object and returns it.
     *
     * Register the children's type, add the item in the items array and calls the registerId method
     * @param type
     * @param specs
     * @returns {*}
     */


    getChildren(type, item) {
      this.types.add(type);
      const element = new FavoriteChildren(type, item);
      this.items.push(element);
      this.registerId(type, element.item.id); //TODO: @julio check if is required triggerEvent

      this.triggerEvent();
      return element;
    }

    async loadTemplate() {
      const promise = new PendingPromise();
      let {
        application: {
          template
        }
      } = this.application;

      const onChange = () => {
        if (!template || !template?.tree?.landed) return promise;
        promise.resolve();
      };

      this.application.bind('change', onChange);
      onChange();
      return promise;
    }

    async _loadTemplateItem(item) {
      let {
        application: {
          id: applicationId,
          template
        }
      } = this.application;
      await this.loadTemplate();

      if (item.type === 'processor') {
        return;
      }

      let collection = template.application;

      if (item.source?.type === 'processor') {
        const name = `${applicationId}//${item.source.processor}`;
        collection = template.processors.get(name);
      }

      const finder = i => {
        return item.source.dirname === i.dirname && i.filename === item.source.filename;
      };

      const source = collection.sources.items.find(finder);

      if (!source) {
        console.warn("the template file does not exists", item);
        return;
      }

      const backup = Object.assign({}, item, source);
      item.source = source;
      Object.keys(item).forEach(prop => this._set(prop, item[prop]));
      return this.getChildren('template', item);
    }
    /**
     * Load the favorite item
     *
     * Checks the properties of the element passed and loads the necessary objects
     * to instance the item correctly and returns a FavoriteChildren instance.
     * @param item
     * @returns {Promise<FavoriteItem>}
     * TODO: CHECK
     */


    async loadItem(item) {
      //source
      const {
        type
      } = item;
      const itemToLoad = Object.assign({}, item);
      /**
       * Originally the _loadTemplateItem was saving the item by itself
       * but this logic causes error, the next save call was after the 150 line.
       *  Was moved to here and was removed the save call into the _loadTemplateItem
       *  @todo: julio check.
       */

      this.save(item);
      if (type === 'template') return this._loadTemplateItem(itemToLoad);

      try {
        const module = await this._loadModule(item.module.id);
        /**
         * TODO: @julio check it.
         * @type {*}
         */

        itemToLoad.module = module.module;
        if (type === 'module') return this.getChildren(type, itemToLoad);
        const {
          bundle
        } = module.bundles.get(item.bundle.name);
        itemToLoad.bundle = bundle;

        if (type !== 'bundle') {
          const processor = bundle.processors.get(item.processor.name);
          itemToLoad.processor = processor;
          itemToLoad.source = type === 'source' && processor.sources.items.find(s => s.id === item.source.id);
        }

        return this.getChildren(type, itemToLoad);
      } catch (e) {
        console.error(e);
      }
    }
    /**
     * Add a new children item
     * @param newItem
     * @param loading Is only passed when the favorites are loading from indexedDB
     * @returns {Promise<void>}
     */


    async add(newItem, loading = false) {
      const item = await this.loadItem(newItem);
      if (loading) return;

      if (!this.tree) {
        this._createTree();

        this.triggerEvent();
        return;
      }

      this.tree.update([item]);
      this.triggerEvent();
    }
    /**
     * Saves the element passed in indexedDB
     * @param item
     * @returns {Promise<void>}
     */


    async save(item) {
      if (item) this._storedTree.set(item.pathname, item);
      this.store.save({
        id: this.id,
        name: this.name,
        tree: this._storedTree
      });
      this.triggerEvent();
    }

    delete() {
      this.parent.remove(this.id);
    }

    rename(value) {
      this._name = value;
      this.save();
      this.triggerEvent('favorite.renamed');
    }

    removeItem(pathname) {
      if (!this._storedTree.has(pathname)) return;

      this._storedTree.delete(pathname);

      this.save();
      this.parent.triggerEvent();
    }

  }

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