import Ember from 'ember';

const {
  get,
  Route,
  inject : { service }
} = Ember;

export default Route.extend({
  clientDispatcher: service('client-dispatcher'),

  model() {
    return get(this, 'clientDispatcher').fetchData();
  },
});
