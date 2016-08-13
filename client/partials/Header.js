Template.Header.events({
	'click #mesArticles' : () => {
		console.log("mesarticles");
		FlowRouter.go('mes-articles');
	},
	'click #commentaires' : () => {
		console.log("commentaires");
		FlowRouter.go('commentaires');
	},
	'click #boutonLogin' : () => {
		Session.set('modal-toggle','open'); // fait apparaitre la modal Box
	},
	'click #boutonLogout' : () => {
		AccountsTemplates.logout();
		Session.set('modal-toggle', '');
	},
	'click #users' : () => {
		FlowRouter.go('users');
	}
});


Template.Header.onRendered(function(){    
  console.log('Header onRendered');
   
});