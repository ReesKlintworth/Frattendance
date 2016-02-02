Meteor.publish("members", function(){
  return Members.find();
});

Meteor.publish("meetings", function(){
  return Meetings.find();
});

Meteor.publish("meetingAttendance", function(){
  return MeetingAttendance.find();
});

Meteor.publish("users", function(){
   return Meteor.users.find();
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
  addMember:function(first, last, active, previous){
    var memberId = Members.insert({
      first: first,
      last: last,
      active: active
    });

    if (previous) {
        var meetings = Meetings.find().fetch();
        for(i = 0; i < meetings.length; i++) {
            Meteor.call("addMeetingAttendance", memberId, meetings[i]._id);
        }
    }
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
    var member = Members.findOne({_id: memberId});
    MeetingAttendance.insert({
      memberId: memberId,
      meetingId: meetingId,
      attended: false,
      active: member.active
    });
  },

  deleteMeeting:function(meetingId){
    MeetingAttendance.remove({meetingId: meetingId});
    Meetings.remove(meetingId);
  },

  toggleAttended:function(meetingId, memberId){
    var attendance = MeetingAttendance.findOne({$and: [{meetingId: meetingId}, {memberId: memberId}]});
    MeetingAttendance.update(attendance._id, {$set: {attended: !attendance.attended}});
  },
 
  deleteMember:function(id){
      MeetingAttendance.remove({memberId: id});
      Members.remove(id);
  },

  updateDatabase:function(){
    var attendanceList = MeetingAttendance.find().fetch();
    for (i = 0; i < attendanceList.length; i++) {
        var member = Members.findOne({_id: attendanceList[i].memberId});
        MeetingAttendance.update(attendanceList[i]._id, {$set: {active: member.active}});
    }
  },

  toggleActive:function(memberId){
      var member = Members.findOne({_id: memberId});
      Members.update(member._id, {$set: {active: !member.active}});
  }
});
