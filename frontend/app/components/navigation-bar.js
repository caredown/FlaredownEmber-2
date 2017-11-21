import Ember from 'ember';
import CheckinByDate from 'flaredown/mixins/checkin-by-date';
import config from 'flaredown/config/environment';

export default Ember.Component.extend(CheckinByDate, {
  classNames: 'navigation-bar',
  showForCaredown: config.showForCaredown,
});
