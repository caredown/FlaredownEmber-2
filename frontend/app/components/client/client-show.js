import Ember from 'ember';
import config from 'flaredown/config/environment';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  setProperties,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),

  baseDomain: config.baseDomain,
  usersVisible: true,
  appVisible: false,

  gratsText: t("clientAccess.dashboard.wait.grats"),
  btnValue: t("clientAccess.dashboard.wait.btnValue"),

  clientUrl: computed('model.slugName', 'baseDomain', function() {
    const subdomain = get(this, 'model.slugName');

    return `${subdomain}.${get(this, 'baseDomain')}`;
  }),

  actions: {
    showUsers() {
      setProperties(this, { usersVisible: true, appVisible: false });
    },
    showApp() {
      setProperties(this, { usersVisible: false, appVisible: true });
    },
  },
});
