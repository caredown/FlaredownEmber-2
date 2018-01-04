import Ember from 'ember';

const {
  $,
  get,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service(),
  hasNoSubdomain: alias('clientDispatcher.isEmptySubdomain'),

  store: service(),

  init() {
    this._super(...arguments);

    if(get(this, 'hasNoSubdomain')){
      return;
    } else {
      get(this, 'clientDispatcher').fetchData().then(this._loaded.bind(this));
    }
  },

  _loaded(client) {
    if (typeof Fastboot === 'undefined') {
      this.setClientMeta(client);
    }
  },

  setClientMeta(client) {
    const appName = get(client, 'appName');

    $('#appTitle')[0].text = appName;
    $('#apple-appTitle')[0].content = appName;
    $('#apple-appIcon')[0].href = get(client, 'logoPath');
  }
});
