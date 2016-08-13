Meteor.methods({
    'saveImage': function(name, buffer){
    	check(name, String);
		check(buffer, String);

		// A faire : verifier la taille du buffer et ne pas sauvegarder si trop gros

    	//console.log("saveFile ... "+name+ " currentUser "+Meteor.userId());
    	var currentUserId = Meteor.userId();
        var imageId = Images.insert({
        	name:name,
        	userId: currentUserId,
        	data:buffer
        });
        console.log("retour de File insert : "+imageId);
		return { _id : imageId };   
    },
    'saveAvatar': function(name, buffer){
    	check(name, String);
		check(buffer, String);
		var currentUserId = Meteor.userId();
		Avatars.remove( {userId : currentUserId });
        var avatarId = Avatars.insert({
        	name:name,
        	data:buffer,
        	userId: currentUserId
        });
        console.log("retour de Avatars insert : "+avatarId);
		return { _id : avatarId };   
    }      
});