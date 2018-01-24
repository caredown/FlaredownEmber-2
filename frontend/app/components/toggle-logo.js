import Ember from 'ember';

const {
  get,
  set,
  Component,
  computed,
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
  isEmptySubdomain: alias('clientDispatcher.isEmptySubdomain'),
  isAdminSubdomain: false,
  adminLogoPath: '/assets/caredown_logo.png',
  defaultLogo: false,

  logoPath: computed('clientDispatcher.logoPath', 'isAdminSubdomain', function() {
    const clientLogo = get(this, 'clientDispatcher.logoPath');
    const isAdminSubdomain = get(this, 'isAdminSubdomain');

    if(isAdminSubdomain) {
      set(this, 'defaultLogo', true);

      return get(this, 'adminLogoPath');
    } else {
      return clientLogo;
    }
  }),
});
