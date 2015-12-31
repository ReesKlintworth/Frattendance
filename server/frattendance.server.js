Meteor.Meteor.publish("members", function(){
  return Members.find();
});

Meteor.startup(function () {
  // code to run on server at startup
});
