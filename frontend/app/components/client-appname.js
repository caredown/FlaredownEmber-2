import Ember from 'ember';

const {
  get,
  set,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service('client-dispatcher'),

  client: computed('clientDispatcher', function() {
    return get(this, 'clientDispatcher').fetchData().then((client) => set(this, 'client', client));
  }),
});
