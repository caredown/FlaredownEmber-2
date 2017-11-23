import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  inject: { service },
  Service,
} = Ember;

export default Service.extend({
  store: service(),

  showForCaredown: config.showForCaredown,
  DOMAINS: config.DOMAINS,
  caredownHostArray: typeof location !== 'undefined' && location.host.split('.'),

  caredownSubdomain: computed('caredownHostArray', function() {
    return get(this, 'caredownHostArray.firstObject');
  }),

  logoPath: computed('caredownSubdomain', function() {
    const caredownSubdomain = get(this, 'caredownSubdomain');
    const logoName = get(this, `DOMAINS.${caredownSubdomain}.logo`);

    return logoName && `/assets/clients/${logoName}`;
  }),

  fetchData() {
    console.log('Fetch client Data!');
    const clientName = get(this, 'caredownSubdomain');

    get(this, 'store').queryRecord('client', { subdomain: clientName });
  }
});
