var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // connexion réussie
      console.log('signIn ok ');
      
    }
    if (state === "signUp") {
      // inscription réussie
      var userId = Meteor.userId();
      console.log("nouvel utilisateur : "+user);
      
    }
  }
};

var myLogoutFunc = function(){
  FlowRouter.go('/');
};



AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc,
    onLogoutHook: myLogoutFunc,
     texts: {
      title: {
        signIn: "",
        signUp:"Créer un compte"
      }
    }
});

AccountsTemplates.removeField('password');
AccountsTemplates.addFields([
{
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 3,
},
{
    _id: 'nom',
    type: 'text',
    displayName: "Nom",
    required: true
},
{
    _id: 'prenom',
    type: 'text',
    displayName: "Prénom",
    required: true
},
{
   _id : 'avatarId',
   type: 'hidden',
   required: true
}
]
);