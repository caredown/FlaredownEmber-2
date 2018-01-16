import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import config from 'flaredown/config/environment';

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
  clientDispatcher: service(),

  sessionAuthenticated() {
    this._super(...arguments);

    get(this, 'session.currentUser').then(currentUser => {
      const { isApproved, clientPersisted, role } = getProperties(currentUser, 'isApproved', 'clientPersisted', 'role');

      if(role === 'admin') {
        this.transitionTo('client');
      } else if(role === 'client') {
        clientPersisted ? this.transitionTo('client.show', get(currentUser, 'client.id')) : this.transitionTo('client.new');
      }
    });
  },

  sessionInvalidated() {
    if (!Ember.testing) {
      if (this.get('_isFastBoot')) {
        this.transitionTo(config.rootURL);
      } else {
        const isEmptySubdomain = get(this, 'clientDispatcher.isEmptySubdomain');
        let loginURL = isEmptySubdomain ? config.clientRootURL : config.rootURL

        window.location.replace(loginURL);
      }
    }
  },

  actions: {
    routeToLogin() {
      this.router.transitionTo('login');
    },
  },
});
