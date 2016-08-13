

Template.ArticleItem.helpers({
	extrait : (content) => {
		return content.substr(0, 40);
	},
	vignette : (imageId) => {
		return Images.findOne({_id : imageId}).data;
	}
});

