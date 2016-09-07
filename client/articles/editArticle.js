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

Template.editArticle.onCreated(function(){
	this.autorun(() => {
		let id = FlowRouter.getParam('id');
		this.subscribe('SingleArticle', id);
		this.subscribe('commentsArticle', id);
	});
});

Template.editArticle.onRendered(function(){
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

Template.editArticle.events({
 // 'submit form' : function(e){
 	'click #sauvegarder' : (e) => {
  	e.preventDefault();
  // 		var title = e.target.title.value;
		// var contenu = e.target.content.value;
		var title = $('#title').val();
		var contenu = $('#content').code();  // get

		// console.log("contenu "+contenu);
		let id = FlowRouter.getParam('id');
  		console.log(title +" contenu : ("+contenu+")") ;
		Meteor.call('updateArticle', id, title, contenu, function(err, result){
			if (err) {
				Materialize.toast("erreur lors de la mise à jour de l'article ", 2000);
				console.log(err);
			}
			else
				FlowRouter.go('/article/'+id);
		});
		//e.target.content.value = '';
		e.target.title.value='';
	}

});


Template.editArticle.helpers({
	article : () => {
		return Articles.findOne({});
	},
	commentaires : () => {
		return Comments.find({});
	},
	renvoieContent : () => {
		var	a = Articles.findOne({}) ;
		if (a) {
			// gruge vu que materialNote veut pas comprendre 
			$('#content').code(a.content);  // set
			return ;
		}
	}
});