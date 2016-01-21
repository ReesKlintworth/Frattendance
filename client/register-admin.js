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