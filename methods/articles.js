Meteor.methods({
	insertArticle : function(title, contenu, imageId) {
		console.log("insertArticle "+title+" "+contenu) ;

		check(title, String);
		check(contenu, String);
		check(imageId, String);
        var currentUserId = Meteor.userId();
        console.log("currentUserID : "+currentUserId);
        if(currentUserId){
			articleId = Articles.insert({
				     title: title,
				     userId: currentUserId,
				     author: Meteor.user().username,
				     nbComments: 0,
				     nbLikes: 0,
				     likers : [],
				     isPublished: false,
				     content: contenu,
				     createdAt: new Date(),
				     imageId : imageId
	   		});
	   		console.log("updating "+imageId+" articleId "+articleId);
	   		Images.update(imageId, { $set : { articleId : articleId }}) ;

			return {
            	_id: articleId
        	};

	   	}
	},
	updateArticle: function(id,title,contenu){
		check(id, String);
		check(title, String);
		check(contenu, String);
		var currentUserId = Meteor.userId();
		if (currentUserId){
			var art = Articles.findOne(id);
			if (art.userId !== currentUserId)
			{
				console.log("erreur user non autorisé "+currentUserId);
				throw new Meteor.Error('Not Authorized !');
			}
			Articles.update(id, { $set : { title : title , contenu : contenu }});

		}
	},
	deleteArticle : function(id){
		check(id, String);
 		var currentUserId = Meteor.userId();
        if(currentUserId){
			Articles.remove(id);
		}

	},
	togglePublishArticle : (id)	=>	{
		check(id, String);
		var art = Articles.findOne(id);
		console.log("id de l'article : " + id);
		Articles.update(id, { $set : { isPublished : !art.isPublished }});
	}

}) ;
