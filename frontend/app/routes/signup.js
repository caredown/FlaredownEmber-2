import Ember from 'ember';
import UnauthenticatedRouteMixin from 'flaredown/mixins/unauthenticated-route-mixin';

const {
  get,
  inject: { service },
  Route,
} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  clientDispatcher: service(),

  model() {
    return this.store.createRecord('registration');
  },

  activate() {
    const isAdminSubdomain = get(this, 'clientDispatcher.isEmptySubdomain');

    if (isAdminSubdomain) {
      this.transitionTo('client.signup');
    }
  },
});
