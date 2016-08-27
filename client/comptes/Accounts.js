var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // connexion réussie
      // console.log('signIn ok ');
      
    }
    if (state === "signUp") {
      // inscription réussie
      // var userId = Meteor.userId();
      // console.log('signup ok ');
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
        signUp: ""
      },
      signInLink_pre: "si vous avez déjà un compte : ",
      signInLink_link: "connexion",
      signInLink_suff: "",
      signUpLink_pre: "créer un compte",
      signUpLink_link: "inscription",
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