


Meteor.methods({
	toggleAdmin : function(id) {  // pour passer un utilisateur en admin ou l'inverse
		check(id, String);
		//console.log(" toggleAdmin "+id);
		if (Roles.userIsInRole(id, 'admin')) {
			//console.log("suppression role admin pour "+id);
			Roles.removeUsersFromRoles(id, 'admin');
		}
		else {
			Roles.addUsersToRoles(id, 'admin');
			//console.log("ajout role admin pour "+id);
		}
	},
	updateProfil : function(obj) {
		id = Meteor.userId();
		//console.log("updateProfil " + obj.nom) ; 
		//  email : email, password : pwd , avatarId : avatarId , 
		//  nom : nom , prenom : prenom

		Meteor.users.update(id, {$set: { 
										 'profile.nom' : obj.nom ,
		                                 'profile.prenom' : obj.prenom  , 
		                                 'profile.avatarId' : obj.avatarId }  });
		//console.log("obj password ("+obj.password+")");
		if (obj.password != '')
			Accounts.setPassword(id, obj.password, {logout : false});
		
	}
});

