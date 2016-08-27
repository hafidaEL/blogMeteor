Template.adminCommentaire.onCreated(function(){
	this.autorun( () => {
		// id commentaire courant : Template.currentData()._id 
		this.subscribe('articleCommentaire', Template.currentData()._id);

		if (Session.get('commentsMode') == 'received') {
			this.subscribe('allUsers');
			this.subscribe('avatars');
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

	receivedMode : () => {
		return Session.get('commentsMode') == 'received';
	},
	likers : function () {

		if (Session.get('commentsMode') == 'received'){
			//console.log("likers : " + this.likers);
			lovers = this.likers; 

			u =  Meteor.users.find({_id: {$in : lovers }});
			// console.log( " users qui ont likés " + u.count() );
			return u;
		}
	},
	avatarLiker : function(id){
  		var avatar = Avatars.findOne({ _id : id}) ;
  		if (avatar)
  			return avatar.data ; 
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