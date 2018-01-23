import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  computed,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  invalidSubText: t("clientAccess.invalidSubdomain"),
  notApprovedText: t("clientAccess.dashboard.wait.grats"),

  textHeader: computed('invalidSubdomain', function() {
    return get(this, 'invalidSubdomain') ? get(this, 'invalidSubText') : get(this, 'notApprovedText');
  }),
});
