import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  set,
  computed,
  inject: { service },
  Component,
  getProperties,
} = Ember;

export default Component.extend({
  classNames: ['signup-form'],

  i18n: service(),

  headerText: t("clientAccess.signup.header"),
  infoText: t("clientAccess.signup.info"),

  nameLabel: computed('clientAccess', function() {
    return get(this, 'clientAccess')  ? 'Your name' : 'Username';
  }),

  namePlaceholder: computed('clientAccess', function() {
    return get(this, 'clientAccess') ? 'Enter your name' : 'Enter a username';
  }),

  loginRoute: computed('clientAccess', function() {
    return get(this, 'clientAccess') ? 'client.login' : 'login';
  }),

  submitBtnText: computed('clientAccess', function() {
    return get(this, 'clientAccess') ? 'Create account' : 'Signup';
  }),

  actions: {
    onCaptchaResolved(reCaptchaResponse) {
      set(this, 'model.captchaResponse', reCaptchaResponse);
    },

    save() {
      let model = get(this, 'model');
      const clientAccess = get(this, 'clientAccess');

      const { email, password } = getProperties(model, 'email', 'password');

      set(model, 'passwordConfirmation', password);

      if(clientAccess) {
        set(model, 'isClient', true);
      }

      model
        .save()
        .then(() => get(this, 'session').authenticate('authenticator:devise', email, password))
        .catch(() => {
          if(!clientAccess) {
            return get(this, 'gRecaptcha').resetReCaptcha();
          }
        });
    },
  },
});
