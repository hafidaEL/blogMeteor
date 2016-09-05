Template.Header.onCreated(function(){
	this.autorun( () => {
		this.subscribe('avatarUser', Meteor.userId());
	});
	
});



Template.Header.helpers({
	avatar : ()=> {
		var av = Avatars.findOne();
		if (av)
			return av.data;
	}
});


Template.Header.events({
	'click #mesArticles' : () => {
		//console.log("mesarticles");
		FlowRouter.go('mes-articles');
	},
	'click #commentaires' : () => {
		//console.log("commentaires");
		FlowRouter.go('commentaires');
	},
	'click #boutonLogin' : () => {
		state = AccountsTemplates.getState();
		if (state == "signIn"){
			$("#avatar").hide();
		}
		Session.set('modal-toggle','open'); // fait apparaitre la modal Box
	},
	'click .boutonLogout' : () => {
		AccountsTemplates.logout();
		Session.set('modal-toggle', '');
	},
	'click #users' : () => {
		FlowRouter.go('users');
	},
	'click #profil' : () => {
		console.log("profil");
		FlowRouter.go('profil');
	},
	'click #home' : () => {
		//console.log("home");
		FlowRouter.go('home');
	}
});
