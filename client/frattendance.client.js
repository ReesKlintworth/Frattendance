Meteor.subscribe("members");
Meteor.subscribe("meetings");

Template.registerAdmin.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=firstAdmin]').val();
    var last = $('[name=lastAdmin]').val();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var username = (first + "." + last).toLowerCase();
    Meteor.call("addUser", username, email, password);
  }
});

Template.registerMember.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=firstMember]').val();
    var last = $('[name=lastMember]').val();
    var active = $('[name=active]:checked').val();
    Meteor.call("addMember", first, last, active);
  }
});

Template.createMeeting.events({
  'submit form': function(){
    event.preventDefault();
    var date = $('[name=date]').val();
    Meteor.call("addMeeting", date);
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
    return Meetings.find();
  },

  'formattedDate': function(){
    return moment(this.date).format("MMMM Do, YYYY");
  }
});
