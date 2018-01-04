import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  set,
  $,
  inject: {
    service,
  },
  isBlank,
  setProperties,
  getProperties,
  Component,
} = Ember;

export default Component.extend({
  classNames: ['client-form'],

  i18n: service(),

  processedMsessage: null,

  generateSlugName(appName) {
    if(isBlank(appName)) {
      return '';
    } else {
      return appName.replace(/\s+/g, '-').toLowerCase();
    }
  },

  createClient(userId) {
    this.get('store').createRecord('client', {
      name: get(this, 'name'),
      appName: get(this, 'appName'),
      slugName: get(this, 'slugName'),
      themeColor: get(this, 'themeColor'),
      backgroundColor: get(this, 'backgroundColor'),
      userId: userId
    }).save();
  },

  actions: {
    fillSlugName() {
      let slugName = get(this, 'model.slugName');

      if(!slugName) {
        const appName = $('.clientAppName').val();

        slugName = this.generateSlugName(appName);
      }

      set(this, 'slugName', slugName);
    },

    save() {
      let model = get(this, 'model');
      const { email, password } = getProperties(model, 'email', 'password');
      const slugName = get(this, 'slugName');

      set(model, 'passwordConfirmation', password);

      model
        .save()
        .then((user) => this.createClient(get(user, 'id')))
        .then(() => set(this, 'processedMessage', t("clientAccess.signupMessage")));
    },
  }
});
