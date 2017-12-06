import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  Route,
  inject: {
    service,
  },
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  notifications: service(),
  session: service(),

  actions: {
    routeToLogin() {
      this.router.transitionTo('login');
    },
  },
});
