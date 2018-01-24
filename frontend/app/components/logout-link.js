import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
  }
});
