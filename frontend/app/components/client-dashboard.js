import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  set,
  computed: { alias },
  inject: {
    service,
  },
  Component,
} = Ember;

export default Component.extend({
  classNames: ['client-form'],

  i18n: service(),
  session: service(),
  slugName: alias('model.slugName'),

  generateSlugName(appName) {
    if(isBlank(appName)) {
      return '';
    } else {
      return appName.replace(/\s+/g, '-').toLowerCase();
    }
  },

  actions: {
    onAppNameChanged() {
      const appName = $('.clientAppName').val();

      set(this, 'slugName', this.generateSlugName(appName));
    },

    invalidateSession() {
      this.get('session').invalidate();
    },

    save() {
      const model = get(this, 'model');
      set(model, 'slugName', get(this, 'slugName'));

      model.save();
    },
  }
});
