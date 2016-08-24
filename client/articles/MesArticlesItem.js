
Template.MesArticlesItem.events({
	'click #pencil' : (e) => {
	 	id = $(e.currentTarget).attr('data-id');
	 	FlowRouter.go('/article/'+id+'/edit');
	},
	'click #trash' : (e) => {
  		id = $(e.currentTarget).attr('data-id');
		Meteor.call('deleteArticle', id);
	},
	'click .inputPublish' : (e) => {
  		id = $(e.currentTarget).attr('data-id');
		Meteor.call('togglePublishArticle', id);
	}
});

Template.MesArticlesItem.helpers({
	checked : (isPublished) => {
		return isPublished ? "checked" : "";
	},
	vignette : 	(imageId) => {
		console.log("recherche vignette "+imageId);
		image = Images.findOne({ _id : imageId })
		if (image != undefined)
			return image.data;
		return "/nenuphar.png";
	}
});