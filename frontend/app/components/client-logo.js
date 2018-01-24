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

  defaultLogo: false,

  logoClassNames: computed('logoClass', 'defaultLogo', function() {
    const defaultLogo = get(this, 'defaultLogo');

    return defaultLogo ? 'admin-logo' : get(this, 'logoClass');
  }),

  src: computed('logoPath', function() {
    return get(this, 'logoPath');
  }),
});
