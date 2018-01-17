import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('client-form', 'Integration | Component | client form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });



  this.render(hbs`{{client-form}}`);
  let response = this.$().text().trim().replace(/\s{2,}/g,' ');
  let text = "App name (maximum 30 characters) Company name (used in the Terms of Service) Color Emerald Amethyst Azure Custom Logo";

  // debugger;

  assert.equal(response, text);

  // Template block usage:
  this.render(hbs`
    {{#client-form}}
      template block text
    {{/client-form}}
  `);

  assert.equal(response, text);
});
