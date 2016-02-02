Template.roster.events({
    'click .delete': function(){
    event.preventDefault();
    var id = event.target.id;
    Meteor.call("deleteMember", id);
  }
});

Template.roster.helpers({
  'active': function(){
    return Members.find({active: true}, {
        sort: [
            ["last", "asc"],
            ["first", "asc"]]
    });
  },
  
  'pledge': function(){
    return Members.find({active: false}, {
        sort: [
            ["last", "asc"],
            ["first", "asc"]]
    });
  }
});