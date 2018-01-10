import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const {
  computed: { alias },
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),

  gratsText: t("clientAccess.dashboard.wait.grats"),
  btnValue: t("clientAccess.dashboard.wait.btnValue"),

  users: alias('model.users'),
});
