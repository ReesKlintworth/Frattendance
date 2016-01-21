Template.home.events({
  'submit form': function(){
    event.preventDefault();
    var newPassword = $('[name=newPassword]').val();
    Meteor.call("resetAdminPassword", newPassword);
    Router.go('home');
  }
});