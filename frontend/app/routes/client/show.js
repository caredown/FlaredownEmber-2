import Ember from 'ember';
import AuthenticatedRouteMixin from 'flaredown/mixins/authenticated-route-mixin';


const {
  get,
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: '/client/login',

  model(params) {
    return get(this, 'store').findRecord('client', params.client_id, { inlcude: 'users' });
  },
});
