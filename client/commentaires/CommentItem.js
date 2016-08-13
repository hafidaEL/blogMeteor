Template.CommentItem.onCreated(function(){
	this.autorun(() => {
        this.subscribe('mesLikes');
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
  liked : (idComment)=> {
  	var like = Likes.findOne({ typ: "commentaire", userId : Meteor.userId(), ReceiverId : idComment });
  	if (like)
  		return "red-text";
  }
});

Template.CommentItem.events({

'click .fa-heart' : (e) => {
	   if (! Meteor.user() )
	   	return;
	   
		var id = $(e.currentTarget).attr('data-id');
		console.log("id du commentaire : " + id);
		Meteor.call('likesArtComment', id, "commentaire", function(err, result) {
				console.log("retour du like "+result);
		      	if (result !=''){
		      		$(e.currentTarget).addClass(result);
		      	}
		      	else{
		      		$(e.currentTarget).removeClass("red-text");
		      	}
		});
	}

});