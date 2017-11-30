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

  logoClassNames: computed('logoClass', function() {
    return get(this, 'logoClass') || '';
  }),

  src: computed('logoPath', function() {
    return get(this, 'logoPath');
  }),
});
