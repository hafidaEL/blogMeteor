

Template.ArticleItem.helpers({
	extrait : (content) => {
		return content.substr(0, 40);
	},
	vignette : (imageId) => {
		img = Images.findOne({_id : imageId}) ;
		if (img && img.data)
			return Images.findOne({_id : imageId}).data;
	}
});

