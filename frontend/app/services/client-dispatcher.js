import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  inject: { service },
  Service,
  setProperties,
  RSVP: { Promise }
} = Ember;

export default Service.extend({
  store: service('store'),

  logoPath: null,
  appName: null,
  defaultAppname: 'Caredown',

  showForCaredown: config.showForCaredown,

  caredownSubdomain: computed(function() {
    if (typeof location !== 'undefined') {
      return location.host.split('.')[0];
    }
  }),

  isEmptySubdomain: computed('caredownSubdomain', function() {
    const subdomain = get(this, 'caredownSubdomain');

    return subdomain === 'admin';
  }),

  fetchData() {
    const store = get(this, 'store');
    const subdomain = get(this, 'caredownSubdomain');
    const storedClient = get(store.peekAll('client').filterBy('slugName', subdomain), 'firstObject');

    return new Promise((resolve, reject) => {
      if(storedClient) {
        resolve(storedClient);
      } else {
        store.queryRecord('client', { subdomain }).then((client) => {
          if (client) {
            setProperties(this, { logoPath: get(client, 'logo'), appName: get(client, 'appName') });
            resolve(client);
          } else {
            reject();
          }
        }, reject);
      }
    });
  }
});
