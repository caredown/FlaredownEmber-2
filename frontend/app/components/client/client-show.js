import Ember from 'ember';
import config from 'flaredown/config/environment';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),

  baseDomain: config.baseDomain,

  gratsText: t("clientAccess.dashboard.wait.grats"),
  btnValue: t("clientAccess.dashboard.wait.btnValue"),

  clientUrl: computed('model.slugName', 'baseDomain', function() {
    const subdomain = get(this, 'model.slugName');

    return `${subdomain}.${get(this, 'baseDomain')}`;
  }),
});
