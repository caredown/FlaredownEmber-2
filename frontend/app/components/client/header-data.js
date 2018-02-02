import Ember from 'ember';

const {
  inject: { service },
  setProperties,
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  classNames: ['client-header-data'],

  usersVisible: true,
  appVisible: false,

  actions: {
    showUsers() {
      const tabs = { usersVisible: true, appVisible: false };

      this.sendAction('toggleTabs', tabs);
      setProperties(this, tabs);
    },

    showApp() {
      const tabs = { usersVisible: false, appVisible: true };

      this.sendAction('toggleTabs', tabs);
      setProperties(this, tabs);
    },
  },
});
