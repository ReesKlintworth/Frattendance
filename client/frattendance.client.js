Meteor.subscribe("members");
Meteor.subscribe("meetings");
Meteor.subscribe("meetingAttendance");

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

Template.navItems.events({
  'click #logout': function(){
    event.preventDefault();
    Meteor.logout();
  }
});

Template.navItems.helpers({
   activeIfTemplateIs: function(template) {
       var currentRoute = Router.current();
       return currentRoute && template.toLowerCase() === currentRoute.lookupTemplate().toLowerCase() ? 'active' : '';
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
    return moment.utc(this.date).format("MMMM Do, YYYY");
  }
});