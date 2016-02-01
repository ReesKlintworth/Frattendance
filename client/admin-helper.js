Template.admin.events({
    'click #update': function(){
        event.preventDefault();
        Meteor.call("updateDatabase");
    },
});