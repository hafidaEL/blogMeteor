Template.Commentaires.onCreated(function(){
	this.autorun(() => {

		var commentsMode = Session.get('commentsMode');
		if (commentsMode == 'all') {
			this.subscribe('comments');
		}
		else if (commentsMode == 'my') {
			this.subscribe('myComments');
		}
		else if (commentsMode == 'received') {
			this.subscribe('myCommentsLiked'); // J'aime reçus
		}
		else if (commentsMode == 'sent'){
			this.subscribe('commentsLikedByMe'); // J'aime postés
		}
	});

	Session.setDefault('commentsMode', 'all');
	
});

Template.Commentaires.helpers({
	commentaires : () => {
		return Comments.find({}, {sort: {createdAt: -1 }});
	},
	isActif : (id) => {
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