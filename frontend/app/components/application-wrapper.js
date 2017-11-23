import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  set,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service(),
  DOMAINS: config.DOMAINS,
  properties: {},

  didInsertElement() {
    const domains = get(this, 'DOMAINS');
    const subdomain = get(this, 'clientDispatcher.caredownSubdomain');

    set(this, 'properties', domains[subdomain]);
  },
});
