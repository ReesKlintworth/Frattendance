Meteor.Meteor.publish("members", function(){
  return Members.find();
});

Meteor.publish("meetings", function(){
  return Meetings.find();
});

Meteor.startup(function () {
  // code to run on server at startup
});
