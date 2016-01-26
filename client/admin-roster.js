Template.adminRoster.helpers({
    'admin': function(){
        return Meteor.users.find();
    }
});