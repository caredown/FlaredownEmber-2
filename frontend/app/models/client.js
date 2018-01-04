import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  email: attr('string'),
  name: attr('string'),
  appName: attr('string'),
  slugName: attr('string'),
  themeColor: attr('string'),
  backgroundColor: attr('string'),
  logo: attr('string'),
  termOfService: attr('raw'),
  privacyPolicy: attr('raw'),
});
