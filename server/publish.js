// Les publications

Meteor.publish('articles', function(){
	return Articles.find({isPublished : true});
	// return Articles.find({limit: 4});
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
Meteor.publish('mesCommentaires', function(){
	return Comments.find({ userId : this.userId });
});

// un commentaire donné
Meteor.publish('SingleComment', function(id){
	check(id,String);

	comment = Comments.findOne({_id: id});
	console.log("comment.articleId : " + comment.articleId);
	a = Articles.find({ _id : comment.articleId }) ;
	console.log("article.count : " + a.count());
	return [Comments.find({_id: id}), Articles.find({ _id : comment.articleId })];
});

// Mes commentaires qui ont été liké
Meteor.publish('mesCommentairesLiked', function(){
	comments = Comments.find({ userId : this.userId, nbLikes: { $gt : 0} });
	console.log("mes comments likés :"+comments.count());
	return comments ;
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

// on publie la liste uniquement aux admins
Meteor.publish('allUsers', function() {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return Meteor.users.find({});
	    // return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
	}
	
});

// on publie les informations du profil connecté
Meteor.publish('SingleUser', function() {
	return Meteor.users.find({ userId : this.userId });
});

// on publie les notifications personnalisé pour chaque admin
Meteor.publish('notifications', function() {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return Notifications.find({userId : this.userId });
	}
});

// avatar d'un utilisateur donné
Meteor.publish('avatarUser', function(id){
	return Avatars.find({ userId : id });
});

// On publie les likes de l'utilisateur connecté
Meteor.publish('mesLikes', function() {
	return Likes.find({ userId : this.userId });
});

// On publie les likes par typ  
Meteor.publish('likesByTyp', function(typ) {
	return Likes.find({ typ: typ });
});

// la liste des utilisateurs qui ont liké un commentaire donné
// Meteor.publish('likersComment', function(commentId) {
// 	check(commentId,String);
// 	l = Likes.find({typ: 'commentaire', ReceiverId:commentId }, {fields: { userId:true }}) ;
// 	console.log("publication de "+l.count() + " likes pour le comment "+commentId);
// 	return l;
// });

// Meteor.publish('lesCommentairesQueJaiLikes', function() {
// 	var commentIds = _.pluck(Likes.find({ typ: 'commentaire', userId : this.userId },{fields: { ReceiverId:true }}).fetch(),'ReceiverId');
// 	console.log(" commentIds : "+ commentIds);
// 	return Comments.find({ _id : {$in : commentIds }}) ; 

// });

