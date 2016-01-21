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