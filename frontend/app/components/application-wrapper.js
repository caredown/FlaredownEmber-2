import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service(),
  store: service(),

  init() {
    this._super(...arguments);

    get(this, 'clientDispatcher').fetchData().then(this._loaded.bind(this));
  },

  _loaded(client) {
    const appName = get(client, 'appName')

    if (typeof Fastboot === 'undefined') {
      $('title')[0].text = appName;
    }
  },
});
