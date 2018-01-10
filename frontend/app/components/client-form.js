import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  set,
  $,
  computed,
  isPresent,
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
  { name: 'Azure', code: '#007fff' }];

export default Component.extend({
  classNames: ['client-form'],
  isCustom: false,

  i18n: service(),
  session: service(),
  slugName: alias('model.slugName'),
  COLORS,
  waitForApprove: false,
  colorCode: null,

  newHeaderText: t("clientAccess.new.headerText"),
  slugName: computed('model.appName', function() {
    return this.generateSlugName(get(this, 'model.appName'));
  }),

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
    invalidateSession() {
      this.get('session').invalidate();
    },

    colorChanged(colorCode) {
      set(this, 'isCustom', false);
      set(this, 'model.themeColor', colorCode);
    },

    onCustom() {
      set(this, 'model.themeColor', '');
      set(this, 'isCustom', true);
    },

    save() {
      const model = get(this, 'model');

      set(model, 'slugName', get(this, 'slugName'));

      model.save().then((client) => {
        return get(this, 'router').transitionTo('client.show', get(client, 'id'));
      });
    },
  }
});
