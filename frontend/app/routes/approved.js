import Ember from 'ember';

const {
  get,
  Route,
  inject : { service }
} = Ember;

export default Route.extend({
  ajax: service('ajax'),

  beforeModel(transition) {
    const encryptedId = transition.params.approved.id;

    get(this, 'ajax').request(`/clients/approve/${ encryptedId }`, {
      type: 'GET',
      data: transition.queryParams,
    });
  }
});
