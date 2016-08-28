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
	'click,touchstart #mesArticles' : () => {
		//console.log("mesarticles");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('mes-articles');
	},
	'click,touchstart #commentaires' : () => {
		//console.log("commentaires");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('commentaires');
	},
	'click,touchstart #boutonLogin' : () => {
		Session.set('modal-toggle','open'); // fait apparaitre la modal Box
	},
	'click,touchstart .boutonLogout' : () => {
		$(".button-collapse").sideNav('hide');
		AccountsTemplates.logout();
		Session.set('modal-toggle', '');
	},
	'click,touchstart #users' : () => {
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('users');
	},
	'click,touchstart #profil' : () => {
		//console.log("profil");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('profil');
	},
	'click,touchstart #home' : () => {
		//console.log("home");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('home');
	}
});
