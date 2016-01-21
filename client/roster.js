Template.roster.helpers({
  'member': function(){
    return Members.find();
  },

  'isActive': function(){
    return this.active === "true";
  }
});