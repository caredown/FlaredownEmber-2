import DS from 'ember-data';

export default DS.Model.extend({
  //Attributes
  email: DS.attr('string'),
  createdAt: DS.attr('date'),
  isClient: DS.attr('boolean'),
  role: DS.attr('string'),
  isApproved: DS.attr('boolean'),
  clientPersisted: DS.attr('boolean'),

  //Associations
  profile: DS.belongsTo('profile'),
  topicFollowing: DS.belongsTo('topic-following'),
  client: DS.belongsTo('client'),
});
