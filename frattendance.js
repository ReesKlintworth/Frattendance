Members = new Mongo.Collection("members");
Meetings = new Mongo.Collection("meetings");

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/manage');

Router.route('/login');

Meteor.methods({
  addMember:function(first, last, active){
    Members.insert({
      first: first,
      last: last,
      active: active
    });
  },

  addUser:function(username, email, password){
    Accounts.createUser({
       username: username,
       email: email,
       password: password
    });
  }
});
