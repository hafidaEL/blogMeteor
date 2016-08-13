Template.Commentaires.onCreated(function(){
	this.autorun(() => {

		
        this.subscribe('articles');
		var commentsMode = Session.get('commentsMode');
		if (commentsMode == 'all') {
			this.subscribe('comments');
		}
		else if (commentsMode == 'my') {
			this.subscribe('mesCommentaires');
		}
		else if (commentsMode == 'received') {
			//this.subscribe('mesCommentairesLiked');
			//this.subscribe('likesByTyp', 'commentaire');
		}
		else if (commentsMode == 'sent'){
			// this.subscribe('mesLikes');
			this.subscribe('lesCommentairesQueJaiLikes');
		}

		
	});


	Session.setDefault('commentsMode', 'all');
});

Template.Commentaires.helpers({
	commentaires : () => {
		return Comments.find({}, {sort: {createdAt: -1 }});
	},
	nbCommentaires : () => {
		return Comments.find().count();
	},
	isActif : (id) => {
		//console.log("id ="+ id);
		return Session.get('commentsMode') == id ? "active" : "";
	}
});


Template.Commentaires.events({
	'click #all' : (e) => {
		Session.set('commentsMode', 'all');
	},
	'click #my' : (e) => {
		Session.set('commentsMode', 'my');
	},
	'click #received' : (e) =>{
		Session.set('commentsMode', 'received');
	},
	'click #sent' : (e) =>{
		Session.set('commentsMode', 'sent');
	}

});