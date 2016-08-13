


Meteor.methods({
	toggleAdmin : function(id) {  // pour passer un utilisateur en admin ou l'inverse
		check(id, String);
		if (Roles.userIsInRole(id, 'admin')) {
			Roles.removeUsersFromRoles(id, 'admin');
		}
		else {
			Roles.addUsersToRoles(id, 'admin');
		}
	},
	updateProfil : function(obj) {
		id = Meteor.userId();
		console.log("updateProfil " + obj.nom) ; 
		//  email : email, password : pwd , avatarId : avatarId , 
		//  nom : nom , prenom : prenom

		Meteor.users.update(id, {$set: { 'profile.nom' : obj.nom }  });
		console.log("obj password ("+obj.password+")");
		if (obj.password != '')
			Accounts.setPassword(id, obj.password, {logout : false});
		
	}
});

