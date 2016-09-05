 if (Articles.find().count() < -333) {
  // creation des index pour eviter les collscan
  console.log("Creation des index !!"); 
   Articles._ensureIndex({"isPublished" : 1}) ; 
   Articles._ensureIndex({"isPublished" : 1, "createdAt" : 1}) ; 
   Articles._ensureIndex({"userId" : 1}) ; 
   Avatars._ensureIndex({"userId" : 1}) ; 
   Comments._ensureIndex({"userId" : 1}) ;
   Comments._ensureIndex({"articleId" : 1}) ;
   Images._ensureIndex({"articleId" : 1}) ; 
   Images._ensureIndex({ "userId" : 1}) ;


// FIXTURES
   console.log("remplissage de la base (fixtures) ") ;
   var now = new Date().getTime();

    //crée deux utilisateurs
   /*var hafidaId = Meteor.users.insert({
     profile: { name: 'Hafida' }
   });*/
   var hafidaId = "y7oqQN2oj7pHw83cY" ;
   var hafida = Meteor.users.findOne(hafidaId);
   var billyId = Meteor.users.insert({
     profile: { name: 'Billy' }
   });
   var billy = Meteor.users.findOne(billyId);

   /*var artId = Articles.insert({
     title: 'Mon article à afficher',
     userId: billy._id,
     author: billy.profile.name,
     publishedAt: new Date(now - 7 * 3600 * 1000),
     nbComments: 2,
     nbLikes: 0,
     isPublished: true,
     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
     createdAt: new Date(now - 10 * 3600 * 1000),
     image: '/nenuphar.jpg',
     likers : [],
     imageId : 'dKNRik4vwWrmvTeRF'
   }); */
   var artId = "LepFFHFaXxBfNNRR8";

   Comments.insert({
     articleId: artId,
     userId: hafida._id,
     author: hafida.profile.name,
     createdAt: new Date(now - 5 * 3600 * 1000),
     body: "C'est un projet intéressant Billy, est-ce-que je peux y participer ?"
   });

   Comments.insert({
     articleId: artId,
     userId: billy._id,
     author: billy.profile.name,
     createdAt: new Date(now - 3 * 3600 * 1000),
     body: 'Bien sûr Hafida !'
   });

 }
