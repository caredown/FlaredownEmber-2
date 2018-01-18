import Ember from 'ember';
import config from 'flaredown/config/environment';

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
  baseDomain: config.baseDomain,

  clientUrl: computed('model.slugName', 'baseDomain', function() {
    const subdomain = get(this, 'model.slugName');

    return `${subdomain}.${get(this, 'baseDomain')}`;
  }),

  actions: {
    onInvite() {
      const model = get(this, 'model');
      const subject = `You\'re invited to a new ${get(model, 'appName')} community!`;
      const body = `You can signup by this link: ${get(this, 'clientUrl')}`;

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
  }
});
