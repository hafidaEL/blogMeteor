Template.Commentaires.onCreated(function(){
	this.autorun(() => {

		
        this.subscribe('articles');
		var commentsMode = Session.get('commentsMode');
		if (commentsMode == 'all') {
			this.subscribe('comments');
		}
		else if (commentsMode == 'my') {
			this.subscribe('comments');   // à cause des compteurs on filtre pas ici, mais dans le helper
			//this.subscribe('mesCommentaires');
		}
		else if (commentsMode == 'received') {
			this.subscribe('myCommentsLiked');
		}
		else if (commentsMode == 'sent'){
			this.subscribe('commentsLikedByMe');
		}

		
	});

	Session.setDefault('commentsMode', 'all');
	
});

Template.Commentaires.helpers({
	commentaires : () => {
		if (Session.get('commentsMode') == 'my') {
			return Comments.find({ userId : Meteor.userId() }, {sort: {createdAt: -1 }});
		}
		return Comments.find({}, {sort: {createdAt: -1 }});
	},
	nbCommentaires : () => {
		return Comments.find().count();
	},
	nbMesCommentaires : () => {
		return Comments.find({ userId : Meteor.userId() }).count();
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