Template.nouvelArticle.events({
  'submit form' : (e) => {
  	e.preventDefault();
  		var title = e.target.title.value;
		var contenu = e.target.content.value;
		console.log("lecture imageId");
		var imageId = Session.get("imageId");
  		console.log(title +" contenu : ("+contenu+") imageId " + imageId) ;
		Meteor.call('insertArticle', title, contenu, imageId, function(err, result){
			if (err)
				console.log(err)
			else
				FlowRouter.go('/article/'+result._id);
				//FlowRouter.go('mes-articles');
		});
		e.target.content.value = '';
		e.target.title.value='';
	},
	'change #imgArticle' : (e, template) => {
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
		      Meteor.call('saveImage', name, buffer,function(err, result) {
		      	if (err)
		      		console.log("erreur saveFile : " + err)
		      	else
		      		{
		      			console.log("result._id : " + result._id);
		      			Session.set("imageId",result._id);
		      		}
		      });
	    };
    	reader.readAsDataURL(file);  // base64
	}

});


