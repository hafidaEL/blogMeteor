


Template.nouveauCommentaire.events({
  'submit form' : (e) => {
  		e.preventDefault();
  		var body = e.target.body.value;
		var article_id = FlowRouter.getParam('id');
		//console.log(" commentaire postid : "+article_id);
		if (body == "") {
			Materialize.toast("Erreur : commentaire vide", 2000);
			return;
		}
		Meteor.call('insertCommentaire', article_id, body);
		e.target.body.value = '';
		
	}
});




