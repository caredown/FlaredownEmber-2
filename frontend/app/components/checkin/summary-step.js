import Ember from 'ember';
import config from 'flaredown/config/environment';

const {
  computed: { alias },
  Component
} = Ember;

export default Component.extend({

  model: alias('parentView.model'),
  checkin: alias('model.checkin'),
  showForCaredown: config.showForCaredown,

  actions: {
    completeStep() {
      this.get('onStepCompleted')();
    },
    goBack() {
      this.get('onGoBack')();
    }
  }

});
