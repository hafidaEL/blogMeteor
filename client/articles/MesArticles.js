
// on pourrait sécuriser en testant si user est bien admin
// if ( Roles.userIsInRole(Meteor.userId(), 'admin') ) ..... 

Template.MesArticles.onCreated(function(){
	this.autorun(() => {
		this.subscribe('mesArticles');
		this.subscribe('mesImages');
	});
});

Template.MesArticles.helpers({
	mesArticles : () => {
		return Articles.find({} , {sort: {createdAt: -1 }});
	}
});

Template.MesArticles.events({

	'click #nouvelArticle' : ()=> {
		FlowRouter.go('nouvelArticle');
	}

})