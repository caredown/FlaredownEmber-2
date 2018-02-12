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
 [{ name: 'Turquoise', code: '#1abc9c' },
  { name: 'Emerald', code: '#2ecc71' },
  { name: 'Peter River', code: '#3498db' },
  { name: 'Amethyst', code: '#9b59b6' },
  { name: 'Sun Flower', code: '#f1c40f' },
  { name: 'Carrot', code: '#e67e22' },
  { name: 'Alizarin', code: '#e74c3c' },
  { name: 'Wet Asphalt', code: '#34495e' }];

export default Component.extend({
  i18n: service(),

  classNames: ['colorList'],

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
