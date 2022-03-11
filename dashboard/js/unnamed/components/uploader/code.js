define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.JidaUploader = JidaUploader;
  _exports2.resizePicture = _exports2.hmr = _exports2.camera = _exports2.ResourceSelectorError = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/unnamed/components/uploader/code', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /**************
  FILE: camera.js
  **************/


  const camera = new function () {
    const camera = navigator.camera;
    if (!camera) return;
    const PictureSourceType = camera.PictureSourceType;

    this.getPicture = (source, specs) => new Promise((resolve, reject) => {
      specs = specs ? specs : {};
      const targetWidth = specs.targetWidth ? specs.targetWidth : 800;
      const targetHeight = specs.targetHeight ? specs.targetHeight : 800;
      const quality = specs.quality ? specs.quality : 50;
      const encoding = specs.encoding ? specs.encoding : 'JPEG';

      function onCamera(uri) {
        if (uri) resolve(uri);else reject(new ResourceSelectorError(ERROR.FILE_SELECTION_CANCELED, 'File selection canceled'));
      }

      function onError() {
        reject(new ResourceSelectorError(ERROR.FILE_SELECTION_CANCELED, 'File selection canceled'));
      }

      source = source.toUpperCase();
      source = source === 'CAMERA' ? 'CAMERA' : 'PHOTOLIBRARY';
      source = PictureSourceType[source];
      camera.getPicture(onCamera, onError, {
        quality: quality,
        allowEdit: true,
        sourceType: source,
        correctOrientation: true,
        targetWidth: targetWidth,
        targetHeight: targetHeight,
        encodingType: camera.EncodingType[encoding],
        destinationType: camera.DestinationType.FILE_URI
      });
    });
  }();
  /*******************
  FILE: draganddrop.js
  *******************/

  _exports2.camera = camera;

  class DragAndDropUploader {
    constructor(parent, files, specs) {
      this.parent = parent;
      this.files = files;
      this.onDragOver = this.onDragOver.bind(this);
      this.onDrop = this.onDrop.bind(this);
    }

    onDrop(event) {
      event.preventDefault();
      const {
        dataTransfer
      } = event;

      if (!dataTransfer.items.length) {
        return;
      }

      const files = [];

      for (let i = 0; i < dataTransfer.items.length; ++i) {
        files.push(dataTransfer.items[i].getAsFile());
      }

      this.files.getFiles(files);
    }

    onDragOver(event) {
      event.preventDefault();
    }
    /**
     * Add the drag & drop events to the control
     * @param {HTMLInputElement} selector
     */


    add(selector) {
      selector.ondrop = this.onDrop;
      selector.ondragover = this.onDragOver;
    }

  }
  /*******************
  FILE: errors\enum.js
  *******************/


  const ERROR = Object.freeze({
    'FILE_SELECTION_CANCELED': '0',
    'ALREADY_OPENING_FILE': '1',
    'NOT_A_PICTURE': '2'
  });
  /********************
  FILE: errors\error.js
  ********************/

  class ResourceSelectorError extends Error {
    constructor(code, message) {
      super();
      Object.defineProperty(this, 'code', {
        'get': () => code
      });
      Object.defineProperty(this, 'message', {
        'get': () => message
      });
    }

  }
  /*************
  FILE: files.js
  *************/


  _exports2.ResourceSelectorError = ResourceSelectorError;

  function UploadFiles(parent, specs) {
    this._loaded = 0;
    this._events = new Events({
      bind: this
    });
    this._specs = specs;
    this._type = specs.type ? specs.type : 'any';
    this.regExp = /[^\w\d.]/g;
    this._errors = [];

    this.clean = () => {
      files = new Map();
      this._loaded = 0;
    };

    const loadEndEvents = [];
    let files = new Map();
    Object.defineProperty(this, 'items', {
      get: () => files
    });
    Object.defineProperty(this, 'loadendEvents', {
      get: () => items
    });
    const FILE_TYPE = Object.freeze({
      document: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/pdf'],
      image: ['image/png', 'image/jpeg', 'image/gif'],
      json: ['application/json'],
      zip: ['application/x-zip-compressed']
    });

    this._onload = event => {
      event.target.removeEventListener('load', this._onload);

      if (this._specs.onload && typeof this._specs.onload === 'function') {
        this._specs.onload(event);
      }
    };

    Array.prototype.unique = function () {
      var a = this.concat();

      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) a.splice(j--, 1);
        }
      }

      return a;
    };
    /**
     * Se ejecuta cuando es validada la carga de uno de los archivos.
     *
     * Cuando verifica que los archivos cargados concuerdan con los seleccionados confirma
     * un evento de cambio
     * @param event
     * @param file
     * @private
     */


    this._onloadend = (event, file) => {
      this._loaded = this._loaded + 1;
      if (this._loaded === files.size) this._events.trigger('loadend');
      const name = file.name.replace(this.regExp, '');
      file = files.get(name);
      file.src = event.target.result;
      files.set(name, file);
      loadEndEvents.push(event);
      event.target.removeEventListener('onloadend', this._onloadend);
      parent.events.trigger('file.loaded');

      if (this._specs.onloadend && typeof this._specs.onloadend === 'function') {
        this._specs.onload(event);
      }
    };

    this._onerror = event => console.error(4, event);

    this.validate = file => {
      const isValid = !!FILE_TYPE[this._type].find(item => item === file.type);

      if (!isValid) {
        this._errors.push(file.name.replace(this.regExp, ''));
      }

      return isValid;
    };
    /**
     * Read a file  to be loaded
     *
     * @param file
     * @returns {Promise<void>}
     * @private
     */


    this._readFile = async file => {
      if (this._type !== 'any') {
        const isValid = await this.validate(file);

        if (!isValid) {
          this._events.trigger('error');

          return;
        }
      }

      const reader = new FileReader();

      reader.onload = event => this._onload(event);

      reader.onloadend = event => this._onloadend(event, file);

      reader.onerror = event => this._onerror(event);

      reader.readAsDataURL(file);
    };

    this._validateLoad = () => {
      if (this._loaded === files.size) {}
    };
    /**
     * Is fire when the input[type=file] change his value.
     *
     * @param event
     * @returns {Promise<void>}
     */


    this.getFiles = async fileList => {
      for (let i = 0; i < fileList.length; ++i) {
        const file = fileList[i];
        files.set(file.name.replace(this.regExp, ''), file);
        await this._readFile(file);
      }
    };

    this.onChangeInput = event => {
      this.clean();
      const target = event.currentTarget;
      this._total = target.files.length;
      this._loaded = 0;
      this.getFiles(target.files);
    };

    Object.defineProperty(this, 'entries', {
      get: () => files
    });
    Object.defineProperty(this, 'total', {
      get: () => this._loaded
    });
  }
  /********************
  FILE: mobile-files.js
  ********************/


  function MobileFiles(specs) {
    this._loaded = 0;
    let files = new Map();
    let base64;
    const events = new Events({
      'bind': this
    });
    this._events = events;
    this._specs = specs;
    this._errors = [];

    this.clean = () => {
      files = new Map();
      this._loaded = 0;
    };

    this.getFiles = async data => {
      this.clean();
      base64 = data.url;

      this._events.trigger('loading');

      const [dir, filename] = data.name.split('com.jidadesarrollos.bovino/cache/');
      files.set(filename, data.url);

      this._events.trigger('loadend');
    };

    Object.defineProperty(this, 'base64', {
      'get': () => base64
    });
    Object.defineProperty(this, 'entries', {
      'get': () => files
    });
    Object.defineProperty(this, 'total', {
      'get': () => files.size
    });
  }
  /**************
  FILE: mobile.js
  **************/

  /**
   * Funcionamiento para integrar objeto con plugin de carga de fotos en phonegap.
   * @TODO: revisar, cerrar, probar.
   * @param parent
   * @constructor
   */


  function MobileUploader(parent) {
    const onClick = async event => {
      let picture = await camera.getPicture('camera');
      const data = {
        url: picture,
        name: picture
      };

      try {
        const specs = {
          maxWidth: 2048,
          maxHeight: 2048
        };
        const resize = await resizePicture(data.url, specs);
        data.url = resize.src;
        data.width = resize.width;
        data.heigth = resize.height;
        data.type = 'image/jpg';
        await mobileFiles.getFiles(data);
      } catch (e) {
        console.error('Error process image: ', e);
      }
    };

    parent.mobile = async btn => {
      if (!(btn && navigator.camera)) return;
      btn.addEventListener('click', onClick);
    };
  }
  /**************
  FILE: resize.js
  **************/


  const resizePicture = (uri, specs) => new Promise(resolve => {
    specs = specs ? specs : {};
    const maxWidth = specs.maxWidth ? specs.maxWidth : 800;
    const maxHeight = specs.maxHeight ? specs.maxHeight : maxWidth / (4 / 3);
    const quality = specs.quality ? specs.quality : 0.8;
    const img = new Image();
    img.src = uri;

    img.onload = function () {
      let width = img.width;
      let height = img.height;
      let orientation;

      if (width < height) {
        orientation = 'portrait';

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      } else {
        orientation = 'landscape';

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      let image = canvas.toDataURL('image/jpeg', quality);

      if (!specs.rotate) {
        resolve({
          'src': image,
          'width': width,
          'height': height,
          'orientation': orientation
        });
      }

      const rotateCanvas = document.createElement('canvas');
      let ctxRotate = rotateCanvas.getContext("2d");
      rotateCanvas.height = width;
      rotateCanvas.width = height;
      const imgRotate = new Image();

      imgRotate.onload = () => {
        ctxRotate.translate(rotateCanvas.width / 2, rotateCanvas.height / 2);
        ctxRotate.rotate(Math.PI / 2);
        ctxRotate.drawImage(imgRotate, -imgRotate.width / 2, -imgRotate.height / 2);
        ctxRotate.rotate(-Math.PI / 2);
        ctxRotate.translate(-imgRotate.width / 2, -imgRotate.height / 2);
        const imageRotated = rotateCanvas.toDataURL('image/jpg', 1);
        resolve({
          'src': imageRotated,
          'width': width,
          'height': height,
          'orientation': orientation,
          'aja': true
        });
      };

      imgRotate.src = image;
    };
  });
  /****************
  FILE: uploader.js
  ****************/


  _exports2.resizePicture = resizePicture;

  function JidaUploader(specs) {
    const events = new Events({
      bind: this
    });
    Object.defineProperty(this, 'events', {
      get: () => events
    });
    let control;
    const fileInput = document.createElement('input');

    const openDialog = () => fileInput.click();

    const filesLoaded = () => events.trigger('loadend');

    const pictureLoaded = () => events.trigger('pictureLoaded');

    const pictureLoading = () => events.trigger('pictureLoading');

    const getErrors = () => this.errors = files._errors;
    /**
     * Adds de click and change events into the input file
     */


    const addListener = () => {
      if (!control) return;
      control.addEventListener('click', openDialog);
      fileInput.addEventListener('change', files.onChangeInput);
    };

    new MobileUploader(this);
    /**
     * Manager of the files
     * @type {UploadFiles}
     */

    const files = new UploadFiles(this, specs);
    Object.defineProperty(this, 'files', {
      get: () => files
    });
    files.bind('error', getErrors);
    files.bind('loadend', filesLoaded);
    const ddController = new DragAndDropUploader(this, files, specs);

    this.addDragAndDrop = selector => {
      ddController.add(selector);
    };

    this.create = btn => {
      btn.after(fileInput);
      control = btn;
      addListener();
    };

    this.clean = async () => {
      await files.clean();
      await mobileFiles.clean();
    };

    const setAttributes = specs => {
      if (!specs) specs = {};
      let attrs = Object.assign({
        type: 'file',
        style: 'display:none',
        name: 'input_upload'
      }, specs);

      for (let prop in attrs) fileInput.setAttribute(prop, attrs[prop]);
    };

    setAttributes(specs && specs.input);
    const mobileFiles = new MobileFiles(specs);
    Object.defineProperty(this, 'mobileFiles', {
      get: () => mobileFiles
    }); //mobileFiles.bind('error', getErrors);

    mobileFiles.bind('loadend', pictureLoaded);
    mobileFiles.bind('loading', pictureLoading);

    this.publish = async (additionalParams = {}) => {
      const form = new FormData(); //const collection = isCamera ? mobileFiles : files;

      const collection = files;
      const name = collection.total > 1 ? `${specs.name}` : specs.name;
      collection.entries.forEach(item => form.append(name, item));
      const xhr = new XHRLoader();
      const params = Object.assign(specs.params ? specs.params : {}, additionalParams);

      for (let param in params) {
        if (!params.hasOwnProperty(param)) continue;
        form.append(param, specs.params[param]);
      }

      const response = await xhr.upload(form, specs.url);
      return response.json();
    };
  }
  /***********
  FILE: xhr.js
  ***********/


  function XHRLoader() {
    let promise, uploaded, progress, error;
    Object.defineProperty(this, 'uploading', {
      get: () => !!promise
    });
    Object.defineProperty(this, 'uploaded', {
      get: () => !!uploaded
    });
    Object.defineProperty(this, 'progress', {
      get: () => progress
    });
    Object.defineProperty(this, 'error', {
      get: () => error
    });
    const events = new Events({
      bind: this
    });

    const onProgress = event => {
      let percent;

      if (event.lengthComputable) {
        percent = Math.round(event.loaded * 100 / event.total);
        percent = parseInt(percent);
        progress = percent;
      }

      events.trigger('change');
    };

    const onCompleted = event => {
      uploaded = true;
      promise.resolve();
      events.trigger('change');
      setTimeout(function () {
        ts = Date.now();
        promise = undefined;
        events.trigger('change');
      }, 100);
    };

    const onError = event => {
      console.error('Error uploading picture', event);
      error = true;
      promise.reject();
      events.trigger('change');
    };

    const onAbort = () => {
      promise.resolve(false);
      events.trigger('change');
    };

    this.upload = async (data, url) => {
      try {
        const specs = {
          method: 'post',
          body: data
        };
        return fetch(url, specs);
      } catch (e) {
        console.error('error', e);
      }
    };

    this.abort = () => xhr ? xhr.abort() : null;
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