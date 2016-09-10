Template.SingleArticle.onCreated(function(){
	this.autorun(() => {
		let id = FlowRouter.getParam('id');
		this.subscribe('SingleArticle', id);
		this.subscribe('commentsArticle', id);
		this.subscribe('imageArticle', id);
		this.subscribe('avatars');
	});
});

Template.SingleArticle.onRendered(function() {
	console.log("onRendered SingleArticle");
		let id = FlowRouter.getParam('id');
		Meteor.call('majViewsArticle', id, function(err, result) {
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
	liked : function (idArticle) {
		 var userId = Meteor.userId();
		 var article = Articles.findOne();
		 // ici lecture : affichage du coeur rouge ou pas
		 //console.log("article.likers " + article.likers);
    	 if (userId && !_.include(article.likers, userId))
    	 {
    	 	// console.log("user pas dans les likers ");
    	 	return ""
    	 }
    	 else
    	 {
    	 	// console.log("user dans les likers ");
    	 	return "red-text";
    	 }
  	}
});


Template.SingleArticle.events({
	'click #likesArticle' : (e) => {
		if (! Meteor.user() )
	   	  return;
		var id = $(e.currentTarget).attr('data-id');
		//console.log("id de l'article : " + id);
		Meteor.call('likesArticleComment', id, "article", function(err, result) {
				//console.log("retour du like "+result);
		      	if (result =='suppressionOK') {
		      		$(e.currentTarget).removeClass("red-text");
		      	}
		      	else if (result == 'ajoutOK') {
		      		$(e.currentTarget).addClass("red-text");
		      	}
		});
	}
	
});