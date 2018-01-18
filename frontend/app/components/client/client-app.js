import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  set,
  setProperties,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  baseDomain: config.baseDomain,
  showPreview: false,

  clientUrl: computed('model.slugName', 'baseDomain', function() {
    const subdomain = get(this, 'model.slugName');

    return `${subdomain}.${get(this, 'baseDomain')}`;
  }),

  actions: {
    setLogo(data) {
      set(this, 'logoData', data);
    },

    save() {
      const model = get(this, 'model');
      const logoData = get(this, 'logoData');

      set(this, 'showPreview', false);

      if (logoData) {
        setProperties(model, logoData);
      }

      model.save().finally(() => {
        this.$('.clinet-logo').trigger('onSaved');
      });
    },
  }
});
