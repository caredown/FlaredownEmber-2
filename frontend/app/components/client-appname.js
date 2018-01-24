import Ember from 'ember';

const {
  get,
  set,
  computed,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service('client-dispatcher'),
  isAdminSubdomain: false,
  defaultAppname: alias('clientDispatcher.defaultAppname'),

  client: computed(function() {
    get(this, 'clientDispatcher').fetchData().then(this._loaded.bind(this), this._notFound.bind(this));
  }),

  _loaded(client) {
    if (!(get(this, 'isDestroyed') || get(this, 'isDestroying'))) {
      set(this, 'client', client);
    }
  },

  _notFound() {
    if (!(get(this, 'isDestroyed') || get(this, 'isDestroying'))) {
      set(this, 'invalidSubdomain', true);
    }
  },
});
