Template.SingleArticle.onCreated(function(){
	this.autorun(() => {
		let id = FlowRouter.getParam('id');
		this.subscribe('SingleArticle', id);
		this.subscribe('commentsArticle', id);
		this.subscribe('imageArticle', id);
		this.subscribe('avatars');
		this.subscribe('mesLikes');
	});
});


Template.SingleArticle.helpers({
	article : () => {
		return Articles.findOne({});
	},
	commentaires : () => {
		return Comments.find({});
	},
	image : () => {
		return Images.findOne();
	},
	liked : (idArticle)=> {
	  	var like = Likes.findOne({ typ: "article", userId : Meteor.userId(), ReceiverId : idArticle });
	  	if (like)
	  		return "red-text";
  }
});


Template.SingleArticle.events({
	'click #likesArticle' : (e) => {
		if (! Meteor.user() )
	   	  return;
		var id = $(e.currentTarget).attr('data-id');
		console.log("id de l'article : " + id);
		Meteor.call('likesArtComment', id, "article", function(err, result) {
				console.log("retour du like "+result);
		      	if (result !=''){
		      		$(e.currentTarget).addClass(result);
		      	}
		      	else{
		      		$(e.currentTarget).removeClass("red-text");
		      	}
		});
	}
	
});