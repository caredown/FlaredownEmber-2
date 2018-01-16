import Ember from 'ember';
import AuthenticatedRouteMixin from 'flaredown/mixins/authenticated-route-mixin';
import CheckinByDate from 'flaredown/mixins/checkin-by-date';

const {
  get,
  getProperties,
  Route,
} = Ember;

export default Route.extend(CheckinByDate, AuthenticatedRouteMixin, {
  /*
    REQUIREMENTS:
    If the user hasn't completed the onboarding process
      default route is the last completed onboarding step
    Else
      If the user has already checked-in today
        default route should be start screen of today's check-in
      Else
        default route should be summary screen of today's check-in
  */
  beforeModel(transition) {
    if (typeof FastBoot !== 'undefined') { return; }

    transition.abort();
    if (get(this, 'session.isAuthenticated')) {
      get(this, 'session.currentUser').then(currentUser => {
        const { isApproved, clientPersisted, role } = getProperties(currentUser, 'isApproved', 'clientPersisted', 'role');

        if(role === 'admin') {
          this.transitionTo('client');
        } else if(role === 'client') {
          clientPersisted ? this.transitionTo('client.show', get(currentUser, 'client.id')) : this.transitionTo('client.new');
        } else {
          this.transitionToStartPage(currentUser);
        }
      });
    } else {
      return this._super(...arguments);
    }
  },

  transitionToStartPage(currentUser) {
    get(currentUser, 'profile').then(profile => {
      if (get(profile, 'isOnboarded')) {
        const date = moment(new Date()).format('YYYY-MM-DD');

        this.checkinByDate(date).then(
          () => {
            this.routeToCheckin(date);
          },
          () => {
            this.routeToNewCheckin(date);
          }
        );
      } else {
        this.transitionTo('onboarding', get(profile, 'onboardingStep.stepName'));
      }
    });
  },
});
