Template.SingleComment.onCreated(function(){
	this.autorun(() => {
		let id = FlowRouter.getParam('id');
		this.subscribe('SingleComment', id);
	});
});

Template.SingleComment.helpers({
	commentaire : () => {
		return Comments.findOne({});
	},
	HeureDate: function (dateTime) {
    	return moment(dateTime).format('HH:mm DD/MM/YYYY'); 
  }
});



