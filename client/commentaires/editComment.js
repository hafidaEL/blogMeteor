Template.editComment.onCreated(function(){
	this.autorun(() => {
		let id = FlowRouter.getParam('id');
		this.subscribe('SingleComment', id);
	});
});

Template.editComment.helpers({
	commentaire : () => {
		return Comments.findOne({});
	}
});

Template.editComment.events({
	'submit form' : (e) => {
		e.preventDefault();
		var body = e.target.body.value;
		let id = FlowRouter.getParam('id');
		Meteor.call('updateComment', id, body, function(err, result){
			if (err) {
				Materialize.toast("erreur lors de la mise à jour du commentaire ", 2000);
				console.log(err);
			}
			else
				FlowRouter.go('/commentaire/'+id);
		});
	}
});
