Template.Header.onCreated(function(){
	this.autorun( () => {
		this.subscribe('avatarUser', Meteor.userId());
	});
	$('li').each(function(){
	    this.onclick = function() {}
	});							
	$('#profil').onclick = function() {} ;
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
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('mes-articles');
	},
	'click #commentaires' : () => {
		//console.log("commentaires");
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
		//console.log("profil");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('profil');
	},
	'click #home' : () => {
		//console.log("home");
		$(".button-collapse").sideNav('hide');
		FlowRouter.go('home');
	}
});
