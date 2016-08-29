Meteor.methods({
    'saveImage': function(name, buffer){
    	check(name, String);
		check(buffer, String);

    	//console.log("saveFile ... "+name+ " currentUser "+Meteor.userId());
    	var currentUserId = Meteor.userId();
        if(currentUserId) {
            var imageId = Images.insert({
            	name:name,
            	userId: currentUserId,
            	data:buffer
            });
            // console.log("retour de File insert : "+imageId);
		  return { _id : imageId };   
        }
    },
    'saveAvatar': function(name, buffer){
        console.log("saveAvatar ...") ; 
    	check(name, String);
		check(buffer, String);
		var currentUserId = Meteor.userId();
        var avatarId;
        if(currentUserId) {
    		Avatars.remove( {userId : currentUserId });
            avatarId = Avatars.insert({
                name:name,
                data:buffer,
                userId: currentUserId
            });
        }
        else
            avatarId = Avatars.insert({
                name:name,
                data:buffer 
            });

        console.log("avatarId : "+avatarId);
    	return { _id : avatarId };  
         
    }      
});