import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  baseDomain: config.baseDomain,

  clientUrl: computed('model.slugName', 'baseDomain', function() {
    const subdomain = get(this, 'model.slugName');

    return `${subdomain}.${get(this, 'baseDomain')}`;
  }),

  actions: {
    save() {
      get(this, 'model').save();
    },
  }
});
