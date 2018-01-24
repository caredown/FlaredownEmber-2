import Ember from 'ember';

const {
  get,
  set,
  computed,
  computed: { alias, isBlank },
  inject: {
    service,
  },
  $,
  Component,
} = Ember;

export default Component.extend({
  classNames: ['client-dashboard'],

  i18n: service(),
  session: service(),
  slugName: alias('model.slugName'),

  userIsAdmin: computed('session.currentUser.role', function() {
    return get(this, 'session.currentUser.role') === 'admin';
  }),

  generateSlugName(appName) {
    if(isBlank(appName)) {
      return '';
    } else {
      return appName.replace(/\s+/g, '-').toLowerCase();
    }
  },

  actions: {
    onAppNameChanged() {
      const appName = $('.clientAppName').val();

      set(this, 'slugName', this.generateSlugName(appName));
    },

    invalidateSession() {
      this.get('session').invalidate();
    },

    save() {
      const model = get(this, 'model');
      set(model, 'slugName', get(this, 'slugName'));

      model.save();
    },
  }
});
