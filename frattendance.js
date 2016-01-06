Members = new Mongo.Collection("members");
Meetings = new Mongo.Collection("meetings");
MeetingAttendance = new Mongo.Collection("meetingAttendance");

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/manage');

Router.route('/login');

Router.route('/meeting/:_id', {
  template: 'meeting',
  data: function() {
    var currentMeeting = this.params._id;
    return Meetings.findOne({_id: currentMeeting});
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
       password: password
    });
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
  }
});
