Template.editArticle.onCreated(function(){
	this.autorun(() => {
		let id = FlowRouter.getParam('id');
		this.subscribe('SingleArticle', id);
		this.subscribe('commentsArticle', id);
	});
});


Template.editArticle.events({
  'submit form' : function(e){
  	e.preventDefault();
  		var title = e.target.title.value;
		var contenu = e.target.content.value;

		// console.log("contenu "+contenu);
		let id = FlowRouter.getParam('id');
  		console.log(title +" contenu : ("+contenu+")") ;
		Meteor.call('updateArticle', id, title, contenu, function(err, result){
			if (err) {
				Materialize.toast("erreur lors de la mise à jour de l'article ", 2000);
				console.log(err);
			}
			else
				FlowRouter.go('/article/'+id);
		});
		e.target.content.value = '';
		e.target.title.value='';
	}

});


Template.editArticle.helpers({
	article : () => {
		return Articles.findOne({});
	},
	commentaires : () => {
		return Comments.find({});
	}
});