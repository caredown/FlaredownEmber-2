import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  $,
  get,
  isEmpty,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service(),
  store: service(),
  i18n: service(),
  defaultAppName: t("clientAccess.defaultAppName"),

  isEmptySubdomain: alias('clientDispatcher.isEmptySubdomain'),

  init() {
    this._super(...arguments);

    if(get(this, 'isEmptySubdomain')){
      this.setClientMeta({});
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
    const appName = get(client, 'appName') || get(this, 'defaultAppName');

    $('#appTitle')[0].text = appName;
    $('#apple-appTitle')[0].content = appName;

    if(!isEmpty(client)) {
      $('#apple-appIcon')[0].href = get(client, 'logoPath');
    }
  }
});
