import Ember from 'ember';

const {
  get,
  Component,
  computed,
  computed: {
    alias,
  },
  inject: {
    service,
  },
  isEmpty,
} = Ember;

export default Component.extend({
  logoVisiability: service(),
  clientDispatcher: service(),

  showHeaderLogo: alias('logoVisiability.showHeaderLogo'),
  showHeaderPath: alias('logoVisiability.showHeaderPath'),
  isEmptySubdomain: alias('clientDispatcher.isEmptySubdomain'),
  adminLogoPath: '/assets/caredown_logo.png',

  logoPath: computed('clientDispatcher.logoPath', function() {
    const clientLogo = get(this, 'clientDispatcher.logoPath');

    return isEmpty(clientLogo) ? get(this, 'adminLogoPath') : clientLogo;
  }),
});
