import Ember from 'ember';

const {
  get,
  computed,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  page: 1,
  loadingUsers: false,
  userCount: alias('model.userCount'),

  users: computed('page', function() {
    const page = get(this, 'page');
    return get(this, 'store').query('user', { client_id: get(this, 'model.id'), page: page });
  }),

  actions: {
    onInvite() {
      const model = get(this, 'model');
      const subject = `You\'re invited to a new ${get(model, 'appName')} community!`;
      const body = `You can signup by this link: ${get(this, 'clientUrl')}`;

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },

    onPrev() {
      this.decrementProperty('page', 1);
    },

    onNext() {
      this.incrementProperty('page', 1);
    },
  }
});
