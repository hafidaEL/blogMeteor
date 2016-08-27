


Template.nouveauCommentaire.events({
  'submit form' : (e) => {
  		e.preventDefault();
  		var body = e.target.body.value;
		let article_id = FlowRouter.getParam('id');
		//console.log(" commentaire postid : "+article_id);
		Meteor.call('insertCommentaire', article_id, body);
		e.target.body.value = '';
		
	}
});




