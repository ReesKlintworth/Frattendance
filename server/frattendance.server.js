Meteor.publish("members", function(){
  return Members.find();
});

Meteor.publish("meetings", function(){
  return Meetings.find();
});

Meteor.publish("meetingAttendance", function(){
  return MeetingAttendance.find();
});

Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'rees.klintworth',
    password: 'password',
    passwordReset: true,
    email: 'reesk5150@gmail.com'
  });
}
});
