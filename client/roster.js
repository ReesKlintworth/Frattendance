Template.roster.events({
    'click .delete': function(){
    event.preventDefault();
    var id = event.target.id;
    Meteor.call("deleteMember", id);
  }
});

Template.roster.helpers({
  'member': function(){
    return Members.find({}, {
        sort: [
            ["active", "desc"],
            ["last", "asc"],
            ["first", "asc"]]
    });
  },

  'isActive': function(){
    return this.active === "true";
  }
});