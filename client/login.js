Template.login.events({
  'submit form': function(){
    event.preventDefault();
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(username, password);
    Router.go('home');
  }
});