define(["exports"], function (_exports2) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.ResourceSelectorError = void 0;
  _exports2.getResource = getResource;
  _exports2.hmr = void 0;
  _exports2.imageProcessor = imageProcessor;
  _exports2.resizePicture = void 0;
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/ui/unnamed/media/js', false, {});
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();
  /***********
  JS PROCESSOR
  ***********/

  /********************
  FILE: image\resize.js
  ********************/


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
      let ctxRotate = rotateCanvas.getContext('2d');
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
          'width': height,
          'height': width,
          'orientation': orientation,
          'aja': true
        });
      };

      imgRotate.src = image;
    };
  });
  /***********************
  FILE: image\processor.js
  ***********************/


  _exports2.resizePicture = resizePicture;

  function imageProcessor(pictureURL) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = pictureURL;
    let promise;

    function onload() {
      if (promise) return promise.resolve();
      promise = new Promise(resolve => img.onload = () => resolve());
      return promise;
    }

    this.resize = async function (maxWidth, maxHeight) {
      await onload();
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

      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      let image = canvas.toDataURL('image/jpeg', 0.8);
      return {
        'width': width,
        'height': height,
        'orientation': orientation,
        'src': image
      };
    };

    this.morph = async function (image) {
      let width = img.width;
      let height = img.height;
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      let output = canvas.toDataURL('image/jpeg', 0.8);
      return {
        'width': width,
        'height': height,
        'src': output
      };
    };
  }
  /**********************
  FILE: resource\input.js
  **********************/


  const input = new function () {
    let input, promise;

    function getInputFile() {
      if (input) return input;
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('enctype', 'multipart/form-data');
      form.setAttribute('style', 'display: none');
      input = document.createElement('input');
      input.setAttribute('class', 'file');
      input.setAttribute('name', 'file');
      input.setAttribute('accept', 'image/*');
      input.setAttribute('type', 'file');
      form.appendChild(input);
      document.body.appendChild(form);
      return input;
    }

    const getFile = () => new Promise((resolve, reject) => {
      let orientation;
      const inputFile = getInputFile();

      function onFileSelected() {
        clearTimeout(cancelTimer);
        document.removeEventListener('focus', cancel);
        document.removeEventListener('mousemove', cancel);
        inputFile.removeEventListener('change', onFileSelected);

        if (this.files.length !== 1) {
          return reject(new ResourceSelectorError(ERROR.FILE_SELECTION_CANCELED, 'File selection canceled'));
        }

        const file = this.files[0];
        const reader = new FileReader();

        function processImage(or) {
          if (or) orientation = or; // if (!file.type.match(/image.*/)) {
          //     throw new ResourceSelectorError(ERROR.NOT_A_PICTURE, 'File is not a picture');
          // }

          if (reader.error) console.error('reader error', reader.error); // Clean the file value to detect the change event if user select the same file in the following selection

          inputFile.value = '';
          resolve({
            'url': reader.result,
            'rotate': orientation === 6
          });
        }

        reader.onloadend = () => getOrientation(file, processImage);

        if (file) reader.readAsDataURL(file);
      }
      /**
       * There is no an easy way to detect when user cancel the file dialog.
       */


      let cancelTimer;

      const cancel = () => {
        document.body.removeEventListener('focus', cancel);
        document.body.removeEventListener('mousemove', cancel);
        cancelTimer = setTimeout(() => reject(new ResourceSelectorError(ERROR.FILE_SELECTION_CANCELED, 'File selection canceled')), 300);
      };

      document.body.addEventListener('focus', cancel);
      document.body.addEventListener('mousemove', cancel);
      inputFile.addEventListener('change', onFileSelected);
      inputFile.click();
    });

    this.getFile = function () {
      if (promise) {
        throw new ResourceSelectorError(ERROR.ALREADY_OPENING_FILE, 'Already opening a file');
      }

      promise = getFile();
      promise.then(() => promise = undefined, () => promise = undefined);
      return promise;
    };
  }();
  /***********************
  FILE: resource\camera.js
  ***********************/

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
  /*****************************
  FILE: resource\get-resource.js
  *****************************/

  async function getResource(source, specs) {
    if (navigator.camera) {
      let picture = await camera.getPicture(source, specs);
      window.testPicture = picture;
      return {
        url: picture
      };
    } else return await input.getFile();
  }
  /********************************
  FILE: resource\get-orientation.js
  ********************************/


  const getOrientation = (file, callback) => {
    const reader = new FileReader();

    reader.onload = event => {
      const view = new DataView(event.target.result);
      if (view.getUint16(0, false) !== 0xFFD8) return callback(-2, reader.result);
      let length = view.byteLength,
          offset = 2;

      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;

        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            return callback(-1, reader.result);
          }

          const little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;

          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little), reader.result);
            }
          }
        } else if ((marker & 0xFF00) !== 0xFF00) break;else offset += view.getUint16(offset, false);
      }

      return callback(-1, reader.result);
    };

    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  };
  /****************************
  FILE: resource\errors\enum.js
  ****************************/


  const ERROR = Object.freeze({
    'FILE_SELECTION_CANCELED': '0',
    'ALREADY_OPENING_FILE': '1',
    'NOT_A_PICTURE': '2'
  });
  /*****************************
  FILE: resource\errors\error.js
  *****************************/

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

  _exports2.ResourceSelectorError = ResourceSelectorError;
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