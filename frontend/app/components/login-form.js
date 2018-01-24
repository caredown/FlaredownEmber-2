import Ember from 'ember';

const {
  computed: { alias },
  inject: {
    service,
  },
  Component
} = Ember;

export default Component.extend({
  classNames: ['login-form'],
  signupPath: 'signup',

  i18n: service(),
  clientDispatcher: service(),
  isEmptySubdomain: alias('clientDispatcher.isEmptySubdomain'),

  actions: {
    authenticateWithDevise() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.errors);
      });
    },
    authenticateWithFacebook() {
      this.get('session').authenticate('authenticator:facebook').catch((reason) => {
        this.set('errorMessage', reason);
      });
    }
  }

});
