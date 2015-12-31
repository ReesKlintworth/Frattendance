Members = new Mongo.Collection("members");

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/manage');

Router.route('/login');
