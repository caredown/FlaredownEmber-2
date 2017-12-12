import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notifications-form', 'Integration | Component | notifications form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{notifications-form}}`);
  let notifyPostsText = "Email me when someone responds to my posts";
  let result = this.$().text().trim();
  const match = result.match(notifyPostsText);

  if (match) {
    assert.equal(match[0], notifyPostsText);
  }

  // Template block usage:
  this.render(hbs`
    {{#notifications-form}}
      template block text
    {{/notifications-form}}
  `);

  assert.equal(this.$().text().trim(), result);
});
