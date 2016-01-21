Template.createMeeting.events({
  'submit form': function(){
    event.preventDefault();
    var date = $('[name=date]').val();
    Meteor.call("addMeeting", date);
    $('[name=date]').val('mm/dd/yyyy');
  }
});