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
    email: 'reesk5150@gmail.com',
    profile: {
      passwordReset: true
    }
  });
}
});

Meteor.methods({
  addMember:function(first, last, active){
    Members.insert({
      first: first,
      last: last,
      active: active
    });
  },

  addUser:function(username, email, password){
    Accounts.createUser({
       username: username,
       email: email,
       password: password,
       profile: {
         passwordReset: true
       }
    });
  },

  resetAdminPassword:function(newPassword){
    var currentUser = Meteor.userId();
    Accounts.setPassword(currentUser, newPassword, {logout: false});
    Meteor.users.update({_id: currentUser}, {$set: {"profile.passwordReset": false}});
  },

  addMeeting:function(date){
    var meetingId = Meetings.insert({
      date: moment(date).toDate()
    });

    var members = Members.find().fetch();
    for(i = 0; i < members.length; i++) {
      Meteor.call("addMeetingAttendance", members[i]._id, meetingId);
    }
  },

  addMeetingAttendance:function(memberId, meetingId){
    MeetingAttendance.insert({
      memberId: memberId,
      meetingId: meetingId,
      attended: false
    });
  },

  deleteMeeting:function(meetingId){
    MeetingAttendance.remove({meetingId: meetingId});
    Meetings.remove(meetingId);
  },

  toggleAttended:function(meetingId, memberId){
    var attendance = MeetingAttendance.findOne({$and: [{meetingId: meetingId}, {memberId: memberId}]});
    MeetingAttendance.update(attendance._id, {$set: {attended: !attendance.attended}});
  }
});
