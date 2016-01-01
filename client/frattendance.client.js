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

    Accounts.createUser({
       username: username,
       email: email,
       password: password
    });
  }
});

Template.registerMember.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=firstMember]').val();
    var last = $('[name=lastMember]').val();
    Meteor.call("addMember", first, last);
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
  }
});
