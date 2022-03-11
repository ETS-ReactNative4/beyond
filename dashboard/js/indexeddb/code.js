define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.hmr = _exports2.BeyondDB = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/indexeddb/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /************
  FILE: base.js
  ************/


  function BeyondDBBase(parent) {
    const events = new Events({
      'bind': parent
    });

    this.triggerChange = (event = 'change') => events.trigger(event);

    const databases = new Map();
    Object.defineProperty(this, 'databases', {
      'get': () => databases
    });
  }
  /*************************
  FILE: database\database.js
  *************************/


  function Database(name) {
    Object.defineProperty(this, 'name', {
      get: () => name
    });
    let version;
    Object.defineProperty(this, 'version', {
      get: () => version
    });
    let db;
    Object.defineProperty(this, 'db', {
      get: () => db
    });
    const stores = new Map();
    Object.defineProperty(this, 'stores', {
      get: () => stores
    });

    this.delete = () => window.indexedDB.deleteDatabase(name);
    /**
     *
     * @param {object}config . The configuration of the database.
     * @param {string} config.name The name of the database
     * @param {number} config.version The version of the database
     * @param {array} config.stores Array of stores to be created.
     * @param {object} config.stores[index] Object with the store configuration
     * @param {object} config.stores[index].name Store name
     * @param {object} config.stores[index].config  Optional specs to store definition. keypath, autoIncremental
     * @param {array} config.stores[index].indexes List of index of the store to be created, each position
     * must be an array with the same values of `IDBObjectStore.createIndex` method: indexName, keyPath, objectParameters
     *
     * @returns {Promise<*>}
     */


    this.create = async config => {
      name = config.name;
      version = config.version;
      let request = window.indexedDB.open(name, version);
      const promise = new PendingPromise();

      const onError = e => {
        console.error('IndexDB could not connect to database', e);
        promise.reject();
      };

      const onSuccess = () => {
        if (!request) promise.reject();
        db = request.result;
        const storeNames = [...db.objectStoreNames];
        storeNames.map(name => stores.set(name, new DBStore(this, name)));
        promise.resolve(this);
      };

      request.onerror = onError;
      request.onsuccess = onSuccess;

      request.onupgradeneeded = async event => {
        //TODO: si la version cambia, debe validarse la estructura de datos previa y respaldarla.
        if (!Array.isArray(config.stores)) {
          throw Error('the property store must be an array');
        }

        if (!db) db = event.target.result;

        for (const store of config.stores) {
          if (!store.hasOwnProperty('name') || typeof store.name !== 'string') {
            throw Error('Name of store must be a string');
          }

          const obj = new DBStore(this);
          await obj.create(store);
          stores.set(store.name, obj);
        }

        const transaction = event.target.transaction;

        transaction.oncomplete = () => {
          promise.resolve(this);
        };
      };

      return promise;
    };

    this.store = name => {
      if (!stores.has(name)) {
        throw Error('the request store does not exists');
      }

      return stores.get(name);
    };

    let promise;

    this.open = () => {
      let promise = new PendingPromise();
      const database = window.indexedDB.open(name);

      database.onsuccess = () => {
        promise.resolve(this);
        promise = undefined;
      };

      return promise;
    };

    this.get = dbName => {
      if (promise) return promise;
      dbName = !dbName ? name : dbName;
      if (!dbName) throw Error("The name of the Database to connect is necessary");
      if (db) db = undefined;
      promise = new PendingPromise();
      const database = window.indexedDB.open(dbName);
      let exists = true;

      database.onupgradeneeded = () => exists = false;

      database.onsuccess = async event => {
        if (!exists) {
          await indexedDB.deleteDatabase(dbName);
          promise.resolve(this);
          promise = undefined;
          return;
        }

        db = event.target.result;
        name = dbName;
        version = db.version;
        const storeNames = [...db.objectStoreNames];
        storeNames.map(name => stores.set(name, new DBStore(this, name)));
        promise.resolve(this);
        promise = undefined;
      };

      return promise;
    };
  }
  /*************
  FILE: index.js
  *************/


  function DBManager() {
    const base = new BeyondDBBase(this);
    if (!window.indexedDB) console.warn('IndexedDB is not available');

    this.create = async config => {
      const db = new Database();
      base.databases.set(config.name, db);
      return db.create(config);
    };

    this.get = async name => {
      if (base.databases.has(name)) return base.databases.get(name);
      const database = new Database();
      const db = await database.get(name);
      if (db) base.databases.set(name, db);
      return db;
    };

    window._db = this;

    this.delete = async name => {
      const promise = new PendingPromise();
      if (base.databases.has(name)) base.databases.delete(name);
      const req = indexedDB.open(name);
      let existed = true;

      req.onsuccess = async () => {
        req.result.close();

        if (existed) {
          await indexedDB.deleteDatabase(name);
          promise.resolve();
        }
      };

      req.onupgradeneeded = () => existed = false;

      return promise;
    };
  }

  const BeyondDB = new DBManager();
  /**********************
  FILE: store\by-index.js
  **********************/

  _exports2.BeyondDB = BeyondDB;

  function byIndex(parent) {
    /**
     * Metodo para consultar la informacion de un store segun un indice previamente definido
     * Esta consulta se puede limitar gracias al limit y el offset para no devolver TODOS los items de un store que
     * cumplan con la condicion del indice
     * @param indexName
     * @param indexValue
     * @param limit
     * @param offset
     * @returns {Promise<unknown>}
     */
    async function get(indexName, indexValue, limit, offset = 0) {
      const db = await parent.db;
      let promise = Promise.pending();
      const query = db.transaction(parent.name, 'readwrite');

      query.onerror = event => console.error(event);

      const store = query.objectStore(parent.name); //TODO @jida agregar validacion cuando el indice nmo esta definido

      const index = store.index(indexName);
      const response = index.getAll(indexValue);

      response.onsuccess = event => {
        const entries = limit ? event.target.result.splice(offset, limit + 1) : event.target.result;
        promise.resolve(entries);
      };

      response.onerror = () => promise.reject();

      return promise;
    }

    parent.getByIndex = get;
  }
  /********************
  FILE: store\delete.js
  ********************/


  function deleteItem(parent) {
    async function remove(item) {
      const db = await parent.db;
      let promise = new PendingPromise();
      const query = db.transaction(parent.name, 'readwrite');

      query.onerror = event => console.error(event);

      const store = query.objectStore(parent.name);
      const response = store.delete(item);

      response.onsuccess = event => {
        promise.resolve();
        promise = undefined;
      };

      response.onerror = () => promise.reject();

      return promise;
    }

    parent.delete = remove;
  }
  /*********************
  FILE: store\get-all.js
  *********************/


  function getAll(parent) {
    parent.getAll = async () => {
      let entries = [];
      await parent.load();
      const {
        object
      } = parent;
      const db = await parent.db;
      const query = db.transaction(parent.name);
      let store = query.objectStore(parent.name);

      query.oncomplete = event => {};

      query.onerror = event => console.error(event);

      let promise = new PendingPromise();

      if ('getAll' in object) {
        store.getAll().onsuccess = event => {
          entries = event.target.result;
          promise.resolve(entries);
          promise = undefined;
        };

        return promise;
      }

      store.openCursor().onsuccess = event => {
        const cursor = event.target.result;

        if (!cursor) {
          promise.resolve(entries);
          promise = undefined;
          return;
        }

        entries.push(cursor.value);
        cursor.continue();
      };

      return promise;
    };
  }
  /*****************
  FILE: store\get.js
  *****************/


  function getItem(parent) {
    async function get(item) {
      const db = await parent.db;
      let promise = new PendingPromise();
      const query = db.transaction(parent.name);

      query.onerror = event => console.error(event);

      const store = query.objectStore(parent.name);
      const response = store.get(item);

      response.onsuccess = event => {
        promise.resolve(response.result);
        promise = undefined;
      };

      response.onerror = () => promise.reject();

      return promise;
    }

    parent.get = get;
  }
  /****************
  FILE: store\in.js
  ****************/


  function getAllIn(parent) {
    const promises = new Map();
    /**
     * Funcion para obtener la informacion de un conjunto de valores correspondientes al mismo campo como un WHERE field IN (value1, value2,..., valueN)
     * @param ids
     * @param index
     * @param specs
     * @returns {Promise<Array>}
     */

    parent.getAllIn = async (ids, index, specs) => {
      let entries = [];
      const key = `${parent.name}.${index}`;

      if (promises.has(key)) {
        return promises.get(key);
      }

      await parent.load();
      const db = await parent.db;
      const query = db.transaction(parent.name);
      let store = query.objectStore(parent.name);

      query.oncomplete = event => {};

      query.onerror = event => console.error(event);

      let promise = Promise.pending();
      promises.set(key, promise);

      store.openCursor().onsuccess = event => {
        const cursor = event.target.result;

        if (!cursor) {
          promise.resolve(entries);
          promises.delete(key);
          promise = undefined;
          return;
        }

        if (cursor.value[index] && ids.find(item => item === cursor.value[index])) entries.push(cursor.value);
        cursor.continue();
      };

      return promise;
    };
  }
  /******************
  FILE: store\save.js
  ******************/


  function saveItem(parent) {
    async function save(data) {
      const db = await parent.db;
      if (!Array.isArray(data)) data = [data];
      let promise = new PendingPromise();
      const query = db.transaction(parent.name, 'readwrite');

      query.onerror = event => console.error(event);

      const store = query.objectStore(parent.name);
      let total = 1;

      const onSuccessAll = event => {
        if (total !== data.length) total++;else {
          promise.resolve();
          promise = undefined;
        }
      };

      for (let item in data) {
        if (!data.hasOwnProperty(item)) return;

        try {
          let request = store.put(data[item]);
          request.onsuccess = onSuccessAll;
        } catch (exc) {
          console.error(exc);
          console.error(data, item, data[0]);
        }
      }

      return promise;
    }

    parent.save = save;
  }
  /*******************
  FILE: store\store.js
  *******************/

  /**
   *
   * @param {object} database Database object
   * @param {string} name Name of the Store to read/write
   * @constructor
   */


  function DBStore(database, name) {
    Object.defineProperty(this, 'name', {
      'get': () => name
    });
    let object;
    Object.defineProperty(this, 'object', {
      'get': () => object
    });
    Object.defineProperty(this, 'db', {
      'get': async () => {
        await database.open();
        return database.db;
      }
    });
    let pk;
    Object.defineProperty(this, 'pk', {
      'get': () => pk
    });

    this.create = async store => {
      const specs = store.config ? store.config : undefined;
      /**
       * The db object is used directly when the store is created because this method
       * is used only when the onupgradeneeded method is called.
       * In the other methods is necessary to call the database.get method to open a new
       * connection as a good practice.
       * @type {IDBDatabase}
       */

      const db = database.db;
      name = store.name;
      if (specs && specs.keyPath) pk = specs.keyPath;

      if (db.objectStoreNames.contains(store.name)) {
        /**
         * TODO: @Julio. add logic to migrate data
         */
        db.deleteObjectStore(store.name);
      }

      object = specs ? db.createObjectStore(store.name, specs) : db.createObjectStore(store.name);

      if (store.hasOwnProperty('indexes') && Array.isArray(store.indexes)) {
        for (const index of store.indexes) {
          object.createIndex(index[0], index[1], index[2]);
        }
      }
    };

    const load = async () => {
      await database.open();
      const db = database.db;
      object = db.transaction(name).objectStore(name);
    };

    this.load = load;
    getAll(this);
    deleteItem(this);
    saveItem(this);
    getItem(this);
    if (name) load();
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