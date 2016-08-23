Template.Header.onCreated(function(){
	this.autorun( () => {
		this.subscribe('avatarUser', Meteor.userId());
	});

});


Template.Header.helpers({
	avatar : ()=> {
		return Avatars.findOne().data;
	}
});


Template.Header.events({
	'click #mesArticles' : () => {
		console.log("mesarticles");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('mes-articles');
	},
	'click #commentaires' : () => {
		console.log("commentaires");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('commentaires');
	},
	'click #boutonLogin' : () => {
		Session.set('modal-toggle','open'); // fait apparaitre la modal Box
	},
	'click .boutonLogout' : () => {
		$(".button-collapse").sideNav('hide');
		AccountsTemplates.logout();
		Session.set('modal-toggle', '');
	},
	'click #users' : () => {
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('users');
	},
	'click #profil' : () => {
		console.log("profil");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('profil');
	},
	'click #home' : () => {
		console.log("home");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('home');
	}
});
