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
  store: service(),

  DOMAINS: config.DOMAINS,
  properties: {},

  didInsertElement() {
    const store = get(this, 'store');
    const domains = get(this, 'DOMAINS');
    const subdomain = get(this, 'clientDispatcher.caredownSubdomain');
    get(this, 'clientDispatcher.fetchData');

    store.queryRecord('client', { subdomain: subdomain });
  },
});
