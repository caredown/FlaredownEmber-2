import Ember from 'ember';
import AuthenticatedRouteMixin from 'flaredown/mixins/authenticated-route-mixin';

const {
  get,
  getProperties,
  Route,
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: '/client/login',

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  page: 1,

  beforeModel(){
    this._super(...arguments);

    if(get(this, 'session.isAuthenticated')) {
      return get(this, 'session.currentUser').then(currentUser => {
        const { clientPersisted, role } = getProperties(currentUser, 'clientPersisted', 'role');

        if(role === 'admin') {
          this.transitionTo('client');
        } else if(role === 'client') {
          clientPersisted ? this.transitionTo('client.show', get(currentUser, 'client.id')) : this.transitionTo('client.new');
        } else {
          this.get('session').invalidate();
        }
      });
    }
  },

  model(params) {
    return this.store.query('client', { page: params.page }).then((response) => {
      return {
        clients: response,
        meta: get(response, 'meta')
      };
    });
  },

  setupController(controller, { clients, meta }) {
    this._super(controller, clients);

    controller.set('meta', meta);
  },

  actions: {
    onPrev() {
      let page = get(this, 'page');

      if(page > 1) {
        this.decrementProperty('page', 1);
      }

      this.transitionTo('client.index',{ queryParams:{ page: page }})
    },

    onNext() {
      this.transitionTo('client.index',{ queryParams:{ page: this.incrementProperty('page', 1) }})
    },
  },
});
