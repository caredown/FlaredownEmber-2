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
  showPreview: false,
  fileData: null,

  aspectRatio: 1,
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  cropperContainer: '.cropper-container > img',
  previewClass: '#logo-preview',
  logo: 'img#clientLogo',
  croppedAvatar: null,
  getCroppedCanvas: 'canvas',

  actions: {
    logoSelected(file) {
      const fileData = URL.createObjectURL(file);
      setProperties(this, { showPreview: true, fileData: fileData, file: file });
      const reader = new FileReader();
    },

    getCroppedAvatar() {
      const container = this.$(get(this, 'cropperContainer'));
      const croppedImage = container.cropper('getCroppedCanvas');

      set(this, 'croppedAvatar', croppedImage);
    },

    cancelCropp() {
      const container = this.$(get(this, 'cropperContainer'));
      container.cropper('destroy');

      this.sendAction('onLogoSelected', get(this, 'file'));
    },
  },
});
