// Les publications


Meteor.publish('articles', function(options){
	 check(options , 
	 	{
	 		limit : Number
	 	});

	return Articles.find({isPublished : true}, { sort: {createdAt : -1}, limit : options.limit });
});

// on publie toutes les images
Meteor.publish('images', function(){
	return Images.find();
});

// on publie tous les avatars
Meteor.publish('avatars', function(){
	return Avatars.find();
});


// un article donné
Meteor.publish('SingleArticle', function(id){
	check(id,String);
	return Articles.find({_id: id});
});


// les commentaires d'un article donné 
Meteor.publish('commentsArticle', function(artId){
	check(artId,String);
	return Comments.find({articleId: artId});
});

// Tous les commentaires
Meteor.publish('comments', function(){
	return Comments.find();
});

// Mes commentaires
Meteor.publish('myComments', function(){
	return Comments.find({ userId : this.userId });
});

// etant donné un id de commentaire, renvoit le commentaire et l'article associé
Meteor.publish('SingleComment', function(id){
	check(id,String);
	comment = Comments.findOne({_id: id});
	// console.log("comment.articleId : " + comment.articleId);
	// a = Articles.find({ _id : comment.articleId }) ;
	// console.log("article.count : " + a.count());
	return [Comments.find({_id: id}), Articles.find({ _id : comment.articleId })];
});

// etant donné un id de commentaire, renvoit l'article associé
Meteor.publish('articleCommentaire', function(id){
	check(id,String);
	comment = Comments.findOne({_id: id});
	return Articles.find({ _id : comment.articleId });
});


// l'image de fond associée à 1 article
Meteor.publish('imageArticle', function(artId){
	check(artId,String);
	return Images.find({articleId: artId});
});

Meteor.publish('mesArticles', function(){
	return Articles.find({ userId : this.userId });
});

Meteor.publish('mesImages', function(){
	return Images.find({ userId : this.userId });
});

Meteor.publish('allUsers', function() {
	//if (Roles.userIsInRole(this.userId, 'admin')) {
		return Meteor.users.find({} , {fields: { services : false}});
	    // return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
	//}
	
});

// on publie les informations du profil connecté
Meteor.publish('SingleUser', function() {
	return Meteor.users.find({ userId : this.userId });
});

// avatar d'un utilisateur donné
Meteor.publish('avatarUser', function(id){
	return Avatars.find({ userId : id });
});

// J'aime reçus :
// Mes commentaires qui ont été liké
Meteor.publish('myCommentsLiked', function(){
	comments = Comments.find({ userId : this.userId, nbLikes: { $gt : 0} });
	return comments ;
});

// j'aime postés :
// Commentaires que j'ai liké ==> commentaires qui ont dans leur liker : moi

Meteor.publish('commentsLikedByMe', function(){
	comments = Comments.find({ likers : this.userId });
	//console.log("j aime postés :"+comments.count());
	return comments ;
});

