Template.CommentItem.onCreated(function(){
	this.autorun(() => {
        // this.subscribe('mesLikes');
	});
});


Template.CommentItem.helpers({
  HeureDate: function (dateTime) {
   // return moment(dateTime).fromNow();
    return moment(dateTime).format('HH:mm DD/MM/YYYY'); 
  },
  commentateurAvatar: function(userId){
  	var avatar = Avatars.findOne({userId : userId}) ;
  	if (avatar)
  	return avatar.data ; 
  },
  liked : function (idComment) {
		 var userId = Meteor.userId();
		 var comment = Comments.findOne({ _id : idComment});
		 //console.log("comment.likers " + comment.likers);
    	 if (userId && !_.include(comment.likers, userId))
    	 {
    	 	//console.log(userId+" pas dans les likers du comment "+comment._id);
    	 	return ""
    	 }
    	 else
    	 {
    	 	//console.log(userId+" dans les likers du comment "+comment._id);
    	 	return "red-text";
    	 }
  	}

});

Template.CommentItem.events({

'click .fa-heart' : (e) => {
	   if (! Meteor.user() )
	   	return;
	   
		var id = $(e.currentTarget).attr('data-id');
		// console.log("id du commentaire : " + id);
		Meteor.call('likesArticleComment', id, "commentaire", function(err, result) {
				// console.log("retour du like "+result);
		      	if (result =='suppressionOK') {
		      		$(e.currentTarget).removeClass("red-text");
		      	}
		      	else if (result == 'ajoutOK') {
		      		$(e.currentTarget).addClass("red-text");
		      	}
		});
	}

});