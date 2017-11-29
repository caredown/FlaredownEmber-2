import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  inject: { service },
  Service,
  RSVP: { resolve }
} = Ember;

export default Service.extend({
  store: service('store'),

  showForCaredown: config.showForCaredown,
  DOMAINS: config.DOMAINS,
  caredownSubdomain: computed('location.host', function() {
    if (typeof location !== 'undefined') {
      return location.host.split('.')[0];
    }
  }),

  logoPath: computed('caredownSubdomain', function() {
    const caredownSubdomain = get(this, 'caredownSubdomain');
    const logoName = get(this, `DOMAINS.${caredownSubdomain}.logo`);

    return logoName && `/assets/clients/${logoName}`;
  }),

  fetchData() {
    const store = get(this, 'store');
    const subdomain = get(this, 'caredownSubdomain');
    const storedClient = get(store.peekAll('client').filterBy('slugName', subdomain), 'firstObject');

    if(storedClient) {
      return resolve(storedClient);
    } else {
      return store.queryRecord('client', { subdomain });
    }
  }
});
