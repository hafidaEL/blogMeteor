Meteor.methods({
	likesArtComment : (id, typ) => {   // likes sur un article ou un commentaire
		check(id, String);
		console.log("likesArticle "+id);
		var currentUserId = Meteor.userId();
		if(currentUserId) {
			// On va voir si l'utilisateur a déjà liker l'article ou le commentaire
			if (typ == 'article')
			{
				var art =Articles.findOne( {_id : id});
				if (currentUserId === art.userId)
				{
					throw new Meteor.Error('vous ne pouvez pas liker votre propre article');
				} 
			}
			else
			{
				var comment =Comments.findOne( {_id : id});
				if (currentUserId === comment.userId)
				{
					throw new Meteor.Error('vous ne pouvez pas liker votre propre commentaire');
				}
			}
			like = Likes.findOne({ userId: currentUserId, ReceiverId : id } );
			//console.log("like : "+like);
			if (like != undefined)
			{
				//throw new Meteor.Error('vous avez déjà liké cet element !');
				Likes.remove({ _id : like._id });
				if (typ == 'article')
					Articles.update(id, { $inc : { nbLikes : -1 }})
				else
					Comments.update(id, { $inc : { nbLikes : -1 }})
				return "";
			}
			
			Likes.insert({
					     userId: currentUserId,
					     ReceiverId : id,  // on peut liker un article ou un commentaire 
					     typ : typ         // article ou commentaire
			});
			if (typ == 'article')
				Articles.update(id, { $inc : { nbLikes : 1 }})
			else
				Comments.update(id, { $inc : { nbLikes : 1 }})
			return "red-text";
			}
	}
});