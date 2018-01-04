import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  get,
  Route,
  inject: {
    service,
  },
  getProperties,
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  notifications: service(),
  session: service(),

  sessionAuthenticated() {
    get(this, 'session.currentUser').then(currentUser => {
      const { isApproved, isClient } = getProperties(currentUser, 'isApproved', 'isClient');

      if(isApproved && isClient) {
        this.transitionTo('client.show', get(currentUser, 'client.id'));
      } else {

        this._super(...arguments);
      }
    });
  },

  actions: {
    routeToLogin() {
      this.router.transitionTo('login');
    },
  },
});
