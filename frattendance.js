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
