var toolbar = [
    ['style', ['style', 'bold', 'italic', 'underline', 'strikethrough', 'clear']],
    ['fonts', ['fontsize', 'fontname']],
    ['color', ['color']],
    ['undo', ['undo', 'redo', 'help']],
    ['ckMedia', ['ckImageUploader', 'ckVideoEmbeeder']],
    ['misc', ['link', 'picture', 'table', 'hr', 'codeview', 'fullscreen']],
    ['para', ['ul', 'ol', 'paragraph', 'leftButton', 'centerButton', 'rightButton', 'justifyButton', 'outdentButton', 'indentButton']],
    ['height', ['lineheight']],
];

Template.nouvelArticle.onRendered(function(){
	$(document).ready( function() {
		$('#content').materialnote({
			    toolbar: toolbar,
			    height: 550,
			    minHeight: 100,
			    defaultBackColor: '#e0e0e0'
			}); 
	});
	// en attendant correction bug material Note
	$(".note-editor").find("button").attr("type", "button");

});

Template.nouvelArticle.events({

  // 'submit form' : (e) => {
  	'click #sauvegarder' : (e) => {
  	e.preventDefault();
  		//var title = e.target.title.value;
  		var title = $('#title').val();
  		console.log("nouvelArticle title : "+title);
		//var contenu = e.target.content.value;
		var contenu = $('#content').code();
		//console.log("contenu : "+contenu);
		var imageId = Session.get("imageId");
		if (imageId == undefined || imageId == '')
		{
			Materialize.toast(" Veuillez définir une image pour votre article ", 2000);
			throw new Meteor.Error('image non définie !');
		}
  		// console.log(title +" contenu : ("+contenu+") imageId " + imageId) ;
		Meteor.call('insertArticle', title, contenu, imageId, function(err, result){
			if (err) {
				Materialize.toast(" Erreur lors de l'enregistrement de l'article ", 2000);
				console.log(err);
			}
			else
				FlowRouter.go('/article/'+result._id);
		});
		//e.target.content.value = '';
		e.target.title.value='';
		Session.set("imageId","");
	},
	'change #imgArticle' : (e, template) => {
		var file = e.target.files[0]; // on récupère uniquement 1 seul fichier
		var name = e.target.files[0].name;
	    if (!file) return;
	    if (!file.type.match('image.*')){
	    	Materialize.toast(" Format de fichier non autorisé !!",2000);
	    	console.log(" Format de fichier non autorisé !!");
	    	$("#imgArticle").val("");
	    	return;
	    }
	    if (file.size > 1048576) {
	    	Materialize.toast(" Image trop lourde. ",2000);
	    	$("#imgArticle").val("");
	    	return;
	    }

	    var reader = new FileReader(); 
	    reader.onload=function(fichier){      
		      var buffer=reader.result;
		      $("#vignette").attr("src",buffer);
		      Meteor.call('saveImage', name, buffer,function(err, result) {
		      	if (err) {
		      		Materialize.toast("erreur lors de l'enregistrement de l'image ", 2000);
		      		console.log("erreur saveFile : " + err);
		      	}
		      	else
		      		{
		      			Session.set("imageId",result._id);
		      		}
		      });
	    };
    	reader.readAsDataURL(file);  // base64
	}

});


