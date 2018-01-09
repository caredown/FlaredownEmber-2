import Ember from 'ember';
import config from 'flaredown/config/environment';
import { translationMacro as t } from "ember-i18n";

const {
  get,
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  classNames: ["centered", "waitApproval"],

  i18n: service(),
  backToCaredownLink: config.caredownLink,

  gratsText: t("clientAccess.dashboard.wait.grats"),
  btnValue: t("clientAccess.dashboard.wait.btnValue"),

  actions: {
    toCaredown() {
      if (typeof FastBoot === 'undefined') {
        window.location.replace(get(this, 'backToCaredownLink'));
      }
    },
  },
});
