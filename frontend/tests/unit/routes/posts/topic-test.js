import { moduleFor, test } from 'ember-qunit';

moduleFor('route:posts/topic', 'Unit | Route | posts/topic', {
  // Specify the other units that are required for this test.
  needs: ['service:router-scroll', 'service:route-history', 'service:session', 'service:ajax', 'service:notifications', 'service:logo-visiability']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
