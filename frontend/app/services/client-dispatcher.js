import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  inject: { service },
  Service,
  setProperties,
  RSVP: { resolve }
} = Ember;

export default Service.extend({
  store: service('store'),

  logoPath: null,
  appName: null,

  showForCaredown: config.showForCaredown,
  DOMAINS: config.DOMAINS,
  caredownSubdomain: computed('location.host', function() {
    if (typeof location !== 'undefined') {
      return location.host.split('.')[0];
    }
  }),

  isEmptySubdomain: computed('caredownSubdomain', function() {
    const subdomain = get(this, 'caredownSubdomain');

    return !!(subdomain == 'stg' || subdomain == 'caredown')
  }),

  fetchData() {
    const store = get(this, 'store');
    const subdomain = get(this, 'caredownSubdomain');
    const storedClient = get(store.peekAll('client').filterBy('slugName', subdomain), 'firstObject');

    if(storedClient) {
      return resolve(storedClient);
    } else {
      return store.queryRecord('client', { subdomain }).then((client) => {
        if (client) {
          return setProperties(this, { logoPath: get(client, 'logo'), appName: get(client, 'appName') });
        } else {
          return {};
        }
      });
    }
  }
});
