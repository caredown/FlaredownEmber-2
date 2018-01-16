import Ember from 'ember';
import config from 'flaredown/config/environment';
import { pluralize } from 'ember-inflector';

const {
  get,
  computed,
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['flexContainer', 'alignCenter'],

  i18n: service(),
  baseDomain: config.baseDomain,

  userCount: alias('client.userCount'),

  clientUrl: computed('client.slugName', 'baseDomain', function() {
    const subdomain = get(this, 'client.slugName');

    return `${subdomain}.${get(this, 'baseDomain')}`;
  }),

  actions: {
    save() {
      get(this, 'client').save();
    },
  }
});
