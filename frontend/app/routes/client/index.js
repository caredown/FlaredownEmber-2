import Ember from 'ember';
import AuthenticatedRouteMixin from 'flaredown/mixins/authenticated-route-mixin';

const {
  get,
  Route,
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  page: 1,

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
