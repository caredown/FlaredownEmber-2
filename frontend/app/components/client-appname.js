import Ember from 'ember';

const {
  get,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  clientDispatcher: service('client-dispatcher'),

  client: computed('clientDispatcher', function() {
    return get(this, 'clientDispatcher').fetchData();
  }),
});
