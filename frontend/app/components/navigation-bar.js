import Ember from 'ember';
import CheckinByDate from 'flaredown/mixins/checkin-by-date';

const {
  computed: { alias },
  inject: {
    service,
  },
  Component
} = Ember;

export default Component.extend(CheckinByDate, {
  classNames: 'navigation-bar',
  clientDispatcher: service(),
  logoPath: alias('clientDispatcher.logoPath'),
});
