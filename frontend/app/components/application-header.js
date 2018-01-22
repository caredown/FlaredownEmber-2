import Ember from 'ember';

const {
  inject: { service },
  Component,
} = Ember;

export default Component.extend({
  i18n: service(),
  isAdminSubdomain: false,
});
