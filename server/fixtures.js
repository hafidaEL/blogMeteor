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



 }
