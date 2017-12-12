import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  get,
  inject: {
    service,
  },
  Component,
  computed,
  computed: { bool },
} = Ember;

export default Component.extend({
  _routing:      service('-routing'),

  classNames: ['step-controls'],
  classNameBindings: ['isChartHidden:flexCenteredContainer'],
  showForCaredown: config.showForCaredown,

  showBack: true,
  linkForward: false,
  backLabel: 'Back',
  forwardLabel: 'Continue',

  stepHasPrev: bool('step.prevId'),

  isChartHidden: computed('showBack', 'showForCaredown', function() {
    return (!get(this, 'showBack') && get(this, 'showForCaredown'));
  }),

  actions: {
    forward() {
      if (!this.get('disabled')) {
        this.get('onForward')();
      }
    },

    backward() {
      if (!this.get('disabled')) {
        this.get('onBackward')();
      }
    },

    discussion() {
      get(this, '_routing').transitionTo('posts');
    },
  },
});
