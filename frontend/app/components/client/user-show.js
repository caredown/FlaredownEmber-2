import Ember from 'ember';

const {
  get,
  Component,
} = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['flexContainer'],

  actions: {
    onDelete(user) {
      const confirm = window.confirm('Are you sure?');

      if(confirm) {
        this.store.findRecord('user', get(user, 'id'), { backgroundReload: false }).then((user) => {
          user.destroyRecord();
        });
      }
    },
  }
});
