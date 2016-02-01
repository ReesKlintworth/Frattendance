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

Router.route('/manage', {
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    }
    else {
      this.render('login');
    }
  }
});

Router.route('/login');

Router.route('/meeting/:_id', {
  template: 'meeting',
  data: function() {
    var currentMeeting = this.params._id;
    return Meetings.findOne({_id: currentMeeting});
  },
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    }
    else {
      this.render('login');
    }
  }
});

Router.route('/admin/:_id', {
   template: 'admin'
});
