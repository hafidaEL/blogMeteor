//ici SERVEUR

// tous ceux qui s'inscrivent sont des utilisateurs

var postSignUp = function(userId, info) {
  //console.log("userId :"+userId);

  Roles.addUsersToRoles(userId, ['utilisateur']);
  Avatars.update(info.profile.avatarId, { $set : { userId : userId } });
}



AccountsTemplates.configure({
    postSignUpHook: postSignUp
});

