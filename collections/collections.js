Articles = new Mongo.Collection('articles');
Comments = new Mongo.Collection('comments');
Images = new Mongo.Collection('images');
Avatars = new Mongo.Collection('avatars');


Meteor.users.deny({
  update: function() {
    return true;
  }
});

