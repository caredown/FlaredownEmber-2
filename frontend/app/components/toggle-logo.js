import Ember from 'ember';

const {
  Component,
  computed: {
    alias,
  },
  inject: {
    service,
  },
} = Ember;

export default Component.extend({
  logoVisiability: service(),
  clientDispatcher: service(),

  showHeaderLogo: alias('logoVisiability.showHeaderLogo'),
  showHeaderPath: alias('logoVisiability.showHeaderPath'),
  logoPath: alias('clientDispatcher.logoPath'),
});
