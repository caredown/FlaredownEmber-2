import Ember from 'ember';
import AuthenticatedRouteMixin from 'flaredown/mixins/authenticated-route-mixin';


const {
  get,
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: '/client/login',

  model() {
    return get(this, 'store').createRecord('client');
  },
});
