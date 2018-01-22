import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  $,
  get,
  set,
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
  invalidSubdomain: false,

  init() {
    this._super(...arguments);

    if(get(this, 'isEmptySubdomain')){
      this.setClientMeta({});
    } else {
      get(this, 'clientDispatcher').fetchData().then(this._loaded.bind(this), this._notFound.bind(this));
    }
  },

  _loaded(client) {
    if(client) {
      if (typeof Fastboot === 'undefined') {
        this.setClientMeta(client);
      }
    } else {
      set(this, 'invalidSubdomain', true);
    }
  },

  _notFound() {
    const isAdminSubdomain = get(this, 'isEmptySubdomain');

    if(!isAdminSubdomain) {
      set(this, 'invalidSubdomain', true);
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
