import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  Service,
} = Ember;

export default Service.extend({
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
});
