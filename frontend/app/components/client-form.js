import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  set,
  $,
  computed,
  computed: { alias },
  inject: {
    service,
  },
  isBlank,
  setProperties,
  getProperties,
  Component,
} = Ember;

const COLORS =
 [{ name: 'Emerald', code: '#50C878' },
  { name: 'Amethyst', code: '#9966cc' },
  { name: 'Azure', code: '#007fff' },
  { name: 'Custom', code: '' }
 ]

export default Component.extend({
  classNames: ['client-form'],

  i18n: service(),
  session: service(),
  slugName: alias('model.slugName'),
  COLORS,
  waitForApprove: false,

  newHeaderText: t("clientAccess.new.headerText"),
  headerText: computed('model.isApproved', function() {
    return get(this, 'model.isApproved') ? 'Dashboard' : get(this, 'newHeaderText');
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

    colorChanged(color) {

      set(this, 'model.themeColor', get(color, 'code'));
    },

    save() {
      const model = get(this, 'model');
      const appName = $('.clientAppName').val();

      set(model, 'slugName', this.generateSlugName(appName));

      model.save().then((client) => {
        return get(this, 'router').transitionTo('client.show', get(client, 'id'));
      });
    },
  }
});
