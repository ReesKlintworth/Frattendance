Template.register.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=first]').val();
    var last = $('[name=last]').val();
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
