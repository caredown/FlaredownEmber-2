import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  set,
  setProperties,
  getProperties,
  $,
  computed,
  isPresent,
  computed: { alias },
  inject: {
    service,
  },
  isBlank,
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

    setLogo(data) {
      set(this, 'logoData', data);
    },

    save() {
      const model = get(this, 'model');
      const logoData = get(this, 'logoData');

      set(this, 'showPreview', false);

      if (logoData) {
        setProperties(model, logoData);
      }

      model.save().then((client) => {
        return get(this, 'router').transitionTo('client.show', get(client, 'id'));
      });
    },
  }
});
