import Ember from 'ember';
import Inflector from 'ember-inflector';
import { singularize, pluralize } from 'ember-inflector';

const {
  get,
  computed,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  userCount: alias('model.users.length'),

  actions: {
    onInvite() {
      const model = get(this, 'model');
      const subject = `You\'re invited to a new ${get(model, 'appName')} community!`;
      const body = `You can signup by this link: ${get(this, 'clientUrl')}`;

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
  }
});
