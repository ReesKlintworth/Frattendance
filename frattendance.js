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
    Meetings.insert({
      date: moment(date).toDate()
    });
  }
});
