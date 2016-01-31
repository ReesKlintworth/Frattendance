Template.registerMember.events({
  'submit form': function(){
    event.preventDefault();
    var first = $('[name=firstMember]').val();
    var last = $('[name=lastMember]').val();
    var activeString = $('[name=active]:checked').val();
    var active = activeString === "true" ? true : false
    var previous = $('[name=previous]').is(":checked");
    Meteor.call("addMember", first, last, active, previous);
    $('[name=firstMember]').val('');
    $('[name=lastMember]').val('');
    $('#radio_active').prop('checked', true);
    $('#radio_pledge').removeAttr('checked');
  }
});