import Ember from 'ember';

const {
  get,
  set,
  computed,
  isPresent,
  inject: { service },
  Component,
} = Ember;

const COLORS =
 [{ name: 'Emerald', code: '#50C878' },
  { name: 'Amethyst', code: '#9966cc' },
  { name: 'Azure', code: '#007fff' }];

export default Component.extend({
  i18n: service(),
  COLORS,
  customColor: null,

  isCustom: computed('model.themeColor', 'COLORS.@each.code', function() {
    const themeColor = get(this, 'model.themeColor');
    const colors = get(this, 'COLORS').map((i) => i.code);

    return get(this, 'model.id') ? !colors.includes(themeColor) : false;
  }),

  customColorValue: computed('model.themeColor', 'isCustom', function() {
    return get(this, 'isCustom') ? get(this, 'model.themeColor') : '';
  }),

  actions: {
    colorChanged(colorCode) {
      set(this, 'isCustom', false);
      set(this, 'customColor', get(this, 'model.themeColor'));
      set(this, 'model.themeColor', colorCode);
    },

    onCustom() {
      const customColor = get(this, 'customColor');

      if(isPresent(customColor)) {
        set(this, 'model.themeColor', customColor);
      }

      set(this, 'isCustom', true);
    },
  }
});
