import Ember from 'ember';
import imageCropper from 'ember-cli-image-cropper/components/image-cropper';

const {
  get,
  set,
  setProperties,
  computed,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default imageCropper.extend({
  tagName: 'div',
  classNames: ['clinet-logo'],
  showPreview: false,
  fileData: null,

  aspectRatio: 1,
  minCropBoxWidth: 256,
  minCropBoxHeight: 256,
  autoCropArea: 1,
  zoomOnWheel: false,
  cropperContainer: '.cropper-container > img',
  previewClass: '#logo-preview',
  logo: 'img#clientLogo',
  croppedImage: null,
  getCroppedCanvas: 'canvas',

  didInsertElement() {
    this._super(...arguments);

    this.$().on('onSaved', () => {
      if(!get(this, 'isDestroyed')) {
        set(this, 'showPreview', false);
        this.$('input[type="file"]').val('');
      }
    });
  },

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const fileBase64 = reader.result;

      this.sendAction('onCrop', {
        logo: fileBase64,
        filename: file.name.split('.')[0],
        filetype: file.type
      });
    };
  },

  actions: {
    logoSelected(file) {
      this.$(get(this, 'cropperContainer')).cropper('destroy');
      const fileData = URL.createObjectURL(file);
      setProperties(this, { showPreview: true, fileData: fileData, file: file });

      this.getBase64(file);
    },

    getCroppedLogo() {
      const container = this.$(get(this, 'cropperContainer'));
      const croppedCanvas = container.cropper('getCroppedCanvas');
      const fileData = croppedCanvas.toDataURL();
      const file = get(this, 'file');

      set(this, 'fileData', fileData);
      container.cropper('destroy');

      this.sendAction('onCrop', {
        logo: fileData,
        filename: file.name.split('.')[0],
        filetype: file.type
      });
    },

    cancelCrop() {
      const file = get(this, 'file');
      const container = this.$(get(this, 'cropperContainer'));

      this.getBase64(file);

      const fileData = URL.createObjectURL(file);
      set(this, 'fileData', fileData);

      container.cropper('destroy');
    },
  },
});
