Meteor.subscribe("members");
Meteor.subscribe("meetings");
Meteor.subscribe("meetingAttendance");

Template.registerAdmin.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=firstAdmin]').val();
    var last = $('[name=lastAdmin]').val();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var username = (first + "." + last).toLowerCase();
    Meteor.call("addUser", username, email, password);
    $('[name=firstAdmin]').val('');
    $('[name=lastAdmin]').val('');
    $('[name=email]').val('');
    $('[name=password]').val('');
  }
});

Template.registerMember.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=firstMember]').val();
    var last = $('[name=lastMember]').val();
    var active = $('[name=active]:checked').val();
    Meteor.call("addMember", first, last, active);
    $('[name=firstMember]').val('');
    $('[name=lastMember]').val('');
    $('#radio_active').prop('checked', true);
    $('#radio_pledge').removeAttr('checked');
  }
});

Template.createMeeting.events({
  'submit form': function(){
    event.preventDefault();
    var date = $('[name=date]').val();
    Meteor.call("addMeeting", date);
    $('[name=date]').val('mm/dd/yyyy');
  }
});

Template.navigation.events({
  'click .logout': function(){
    event.preventDefault();
    Meteor.logout();
    Router.go('home');
  }
});

Template.login.events({
  'submit form': function(){
    event.preventDefault();
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(username, password);
    Router.go('home');
  }
});


Template.roster.helpers({
  'member': function(){
    return Members.find();
  },

  'isActive': function(){
    return this.active === "true";
  }
});

Template.meetingList.helpers({
  'meeting': function(){
    return Meetings.find({}, {sort: {date: 1}});
  },

  'formattedDate': function(){
    return moment(this.date).format("MMMM Do, YYYY");
  }
});

Template.meeting.helpers({
  'member': function(){
    var members = MeetingAttendance.find({meetingId: this._id}).fetch();
    var memberIds = [];
    for(i = 0; i < members.length; i++) {
      memberIds.push(members[i].memberId);
    }
    return Members.find({ _id: {$in: memberIds}});
  },

  'buttonColor': function(parentContext){
    var attendance = MeetingAttendance.findOne({$and: [{meetingId: parentContext._id}, {memberId: this._id}]});
    return attendance.attended ? "attended member" : "absent member";
  },

  'id': function(parentContext){
    return parentContext._id + ":" + this._id;
  }
});

Template.meeting.events({
  'click .member': function(){
    event.preventDefault();
    var id = event.target.id;
    var ids = id.split(":");
    Meteor.call("toggleAttended", ids[0], ids[1]);
  }
});

Template.home.events({
  'submit form': function(){
    event.preventDefault();
    var newPassword = $('[name=newPassword]').val();
    Meteor.call("resetAdminPassword", newPassword);
    Router.go('home');
  }
});

Template.registerHelper("currentUserReady", function(){
  var currentUser = Meteor.userId();
  var userInfo = Meteor.users.findOne({_id: currentUser});
  return currentUser && userInfo.profile.passwordReset == false;
});

Template.registerHelper("currentUserResetPassword", function(){
  var currentUser = Meteor.userId();
  var userInfo = Meteor.users.findOne({_id: currentUser});
  return currentUser && userInfo.profile.passwordReset == true;
});
