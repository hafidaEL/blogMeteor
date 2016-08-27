Meteor.methods({
	likesArticleComment : (id, typ) => {   // likes sur un article ou un commentaire
		check(id, String);
		//console.log("likesArtComment "+id);
		var currentUserId = Meteor.userId();
		if(currentUserId) {
					// On va voir si l'utilisateur a déjà liker l'article ou le commentaire
					if (typ == 'article')
					{
						var article =Articles.findOne( {_id : id});
						if (article.userId == currentUserId){
							if (Meteor.isClient)
								Materialize.toast('Vous ne pouvez pas liker votre article !', 2000);
							throw new Meteor.Error('vous ne pouvez pas liker votre article !');
						}
						if (_.include(article.likers, currentUserId))
						{
							Articles.update( id, {
								$pull: { likers : currentUserId },
								$inc: { nbLikes : -1}
							});
							return "suppressionOK";
						}
						else
						{
							Articles.update( id, {
								$addToSet: { likers : currentUserId },
								$inc: { nbLikes : 1}
							});
							return "ajoutOK";
						}	
					}
					else
					{
						var comment =Comments.findOne( {_id : id});
						if (comment.userId == currentUserId){
							if (Meteor.isClient)
								Materialize.toast('Vous ne pouvez pas liker votre commentaire !', 2000);
							throw new Meteor.Error('vous ne pouvez pas liker votre commentaire !');
						}

						if (_.include(comment.likers, currentUserId))
						{
							Comments.update( id, {
								$pull: { likers : currentUserId },
								$inc: { nbLikes : -1}
							});
							return "suppressionOK";
						}
						else
						{
							Comments.update( id, {
								$addToSet: { likers : currentUserId },
								$inc: { nbLikes : 1}
							});
					        return "ajoutOK";	   		

						}
					}
		}
	}
});