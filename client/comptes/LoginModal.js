Template.LoginModal.onCreated(function(){

	$("#avatar").hide();

});

Template.LoginModal.onRendered(function(){
	this.autorun(() => {

		state = AccountsTemplates.getState();
		if (state == "signIn"){
			$("#avatar").hide();
			$("#at-btn").html("CONNEXION");
		}
		else
		{
			$("#avatar").show();
			$("#at-btn").html("ENREGISTRER");
		}
	});
});

Template.LoginModal.events({
	'click .close-login' : () => {
		Session.set('modal-toggle', '');  // fait disparaitre la modal Box
	},
	'change #avatar' : (e) => {
		//console.log("avatar ici !!!");

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
		      	if (err){
		      		Materialize.toast("erreur lors de la sauvegarde de l'avatar ",2000);
		      		console.log("erreur saveAvatar : " + err);
		      	}
		      	else
		      		{
		      			//console.log("result._id : " + result._id);
		      			$("#at-field-avatarId").val(result._id);
		      		}
		      });
	    };
    	reader.readAsDataURL(file);  // base64


	},
});