Template.roster.events({
    'click .delete': function(){
    event.preventDefault();
    var id = event.target.id;
    Meteor.call("deleteMember", id);
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