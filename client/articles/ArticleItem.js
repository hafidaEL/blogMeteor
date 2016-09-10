Template.ArticleItem.onRendered(function(){    
  console.log(' onRenderedArticleItem ');
  $('.tooltipped').tooltip({delay: 50});
});

Template.ArticleItem.helpers({
	extrait : (content) => {
		return (content.substr(0, 30) + "...");
	},
	vignette : (imageId) => {
		img = Images.findOne({_id : imageId}) ;
		if (img && img.data)
			return Images.findOne({_id : imageId}).data;
	}
});

