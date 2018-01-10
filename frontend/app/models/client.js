import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  appName: attr('string'),
  slugName: attr('string'),
  themeColor: attr('string'),
  backgroundColor: attr('string'),
  logo: attr('string'),
  termOfService: attr('raw'),
  privacyPolicy: attr('raw'),
  userId: attr('string'),
  approved: attr('boolean'),

  users: hasMany('user', { async: false }),
});
