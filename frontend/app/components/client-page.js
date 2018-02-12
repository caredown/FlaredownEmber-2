import Ember from 'ember';

const {
  get,
  computed,
  inject: { service },
  setProperties,
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),

  usersVisible: true,
  appVisible: false,

  userIsAdmin: computed('session.currentUser.role', function() {
    return get(this, 'session.currentUser.role') === 'admin';
  }),

  actions: {
    toggleClientTabs(tabs) {
      setProperties(this, tabs);
    },
  },
});
