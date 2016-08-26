


Meteor.methods({
	insertCommentaire : function(articleId, body) {
		check(articleId, String);
		check(body, String);
        var currentUserId = Meteor.userId();
       
        if(currentUserId){

			var article = Articles.findOne(articleId);
			    if (!article)
			      throw new Meteor.Error('commentaireInvalide', 'article inconnu');

			console.log("l'auteur du commentaire : " + Meteor.user().profile.prenom);
			// On ajoute le commentaire
			commentaireId = Comments.insert({
					 articleId: articleId,
				     userId: currentUserId,
				     author: Meteor.user().profile.prenom + " " + Meteor.user().profile.nom,
				     body : body,
				     nbLikes: 0,
				     likers : [],
				     createdAt: new Date()   
	   		});
	   		// mise à jour du nb de commentaires dans l'article
	   		Articles.update(articleId, {$inc: {nbComments: 1}});

	   		// Pour éviter de se prévenir soit même
	   		if (currentUserId !== article.userId){
		   		// Créer une notification pour l'auteur de l'article qu'un commentaire a été écrit
		   		Notifications.insert({
					userId : article.userId, //auteur de l'article celui qui reçoit la notification
					commentateur : Meteor.user().profile.prenom,
					commentaireId : commentaireId,
					articleId : articleId,
					read : false
				});	
		   	}
	   	}
	},
	deleteComment : (commentId) => {
		check(commentId, String);
		var currentUserId = Meteor.userId();
		if(currentUserId) {
			var c = Comments.findOne(commentId);
			var articleId = c.articleId;
			Comments.remove({ _id : commentId});
			// mise à jour du nb de commentaires dans l'article 
	   		Articles.update(articleId, {$inc: {nbComments: -1}});
		}
	},
	updateComment : (commentId, body) => {
		check(commentId, String);
		check(body, String);
		var c = Comments.findOne(commentId);
		var userId = c.userId;
		var currentUserId = Meteor.userId();
		if(currentUserId === userId) {
	   		Comments.update(commentId , {$set: {body: body}});
		}
	}
});


