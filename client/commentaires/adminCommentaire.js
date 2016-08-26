Template.adminCommentaire.onCreated(function(){
	this.autorun( () => {
		// id commentaire courant : Template.currentData()._id 
		if (Session.get('commentsMode') == 'received')
		{
			
		} 

	});


});


Template.adminCommentaire.helpers({
	titreArticle : (articleId) => {
		//console.log("articleId : "+articleId);
		art = Articles.findOne({ _id : articleId }) ;
		if (art)
			return art.title;
	},
	owner : (userId) => {
		//console.log("userId du commentaire : " + userId);
		return Meteor.userId() === userId;
	},

	likers : () => {
		// if (Session.get('commentsMode') == 'received'){
		// 	var likersIds = _.pluck(Likes.find().fetch(),'userId');
		// 	console.log("likersIds "+likersIds);
		// 	u =  Meteor.users.find({_id: {$in : likersIds }});
		// 	console.log( likersIds.length + " likes trouvés. users qui ont likés " + u.count());
		// 	return u;
		// } 

		
	}
});

Template.adminCommentaire.events({

	'click #deleteId' : (e) => {
		var commentId = $(e.currentTarget).attr('data-id');
		Meteor.call('deleteComment', commentId, function(err, result) {
				console.log("retour du deleteComment "+result);
		});
	},
	'click #editId' : (e) => {
		var commentId = $(e.currentTarget).attr('data-id');
		FlowRouter.go('/commentaire/'+commentId+'/edit');
	},
	'click #voir' : (e) => {
		var commentId = $(e.currentTarget).attr('data-id');
		FlowRouter.go('/commentaire/'+commentId);
	}

});