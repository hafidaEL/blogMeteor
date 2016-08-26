Template.Profil.onCreated(function(){
	this.autorun(() => {
		this.subscribe('SingleUser'),
		this.subscribe('avatarUser', Meteor.userId());
	});
});

Template.Profil.helpers({
	user : () => {
		return Meteor.users.findOne({});
	},
	email : ()=> {
		return Meteor.users.findOne().emails[0].address;
	},
	avatar : ()=> {
		return Avatars.findOne().data;
	}
});



Template.Profil.events({
  'submit form' : (e) => {
  		e.preventDefault();
  		var email = e.target.email.value;
  		var pwd = e.target.pwd.value;
  		var new_pwd = e.target.new_pwd.value;
  		var nom = e.target.nom.value;
  		var prenom = e.target.prenom.value;
  		var avatarId = e.target.avatarId.value;
		//var avatarId = Session.get("avatarId");
		if (pwd != new_pwd) {
			alert("mot de passe différents !!");
			return;
		}
		var objet = { email : email, password : pwd , avatarId : avatarId , nom : nom , prenom : prenom };

		Meteor.call('updateProfil', objet , function(err, result){
			if (err)
				console.log("updateProfil erreur : "+err)
			else
				FlowRouter.go('/');
		});
		
	},
	'change #avatar' : (e) => {
		var file = e.target.files[0]; // on récupère uniquement 1 seul fichier
		var name = e.target.files[0].name;
	    if (!file) return;
	    if (!file.type.match('image.*')){
	    	alert("format de fichier non autorisé");
	    	return;
	    }
	    var reader = new FileReader(); 
	    reader.onload=function(fichier){      
		      var buffer=reader.result;
		      $("#vignette").attr("src",buffer);
		      Meteor.call('saveAvatar', name, buffer,function(err, result) {
		      	if (err)
		      		console.log("erreur saveAvatar : " + err)
		      	else
		      		{
		      			console.log("result._id : " + result._id);
		      			//Session.set("avatarId",result._id);
		      			$("#avatarId").val(result._id);
		      		}
		      });
	    };
    	reader.readAsDataURL(file);  // base64
	}

});