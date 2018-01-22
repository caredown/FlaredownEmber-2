import Ember from 'ember';

const {
  get,
  computed,
  Component
} = Ember

export default Component.extend({
  tagName: 'img',
  attributeBindings: 'src',
  classNameBindings: ['logoClassNames'],

  isAdminSubdomain: false,

  logoClassNames: computed('logoClass', 'isAdminSubdomain', function() {
    const isAdminSubdomain = get(this, 'isAdminSubdomain');

    return isAdminSubdomain ? 'admin-logo' : get(this, 'logoClass');
  }),

  src: computed('logoPath', function() {
    return get(this, 'logoPath');
  }),
});
