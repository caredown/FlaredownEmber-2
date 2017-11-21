import Ember from 'ember';
import CheckinByDate from 'flaredown/mixins/checkin-by-date';
import config from 'flaredown/config/environment';

const {
  get,
  computed,
  computed: { alias },
  Component,
  inject: {
    service,
  },
} = Ember;

export default Component.extend(CheckinByDate, {
  classNames: ['bottom-nav'],

  notifications: service(),

  showForCaredown: config.showForCaredown,

  isCheckinPath: computed('router.url', function() {
    return get(this, 'router.url').split('/')[1] === 'checkin';
  }),

  checkinNavClass: computed('isCheckinPath', function() {
    return `bottom-link ${get(this, 'isCheckinPath') ? 'active' : ''}`;
  }),
});
