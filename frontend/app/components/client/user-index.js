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
  users: alias('model.users'),

  actions: {
    onInvite() {
      const model = get(this, 'model');
      const subject = `You\'re invited to a new ${get(model, 'appName')} community!`;
      const body = `You can signup by this link: ${get(this, 'clientUrl')}`;

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
  }
});
