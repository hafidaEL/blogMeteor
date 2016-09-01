Template.Articles.onCreated(function(){
	Session.setDefault('limit',6);
	this.autorun(() => {
		this.subscribe('articles', {limit : Session.get('limit') });
		this.subscribe('images');
	});
});

Template.Articles.helpers({
	articles : () => {
		return Articles.find();
	}
});

Template.Articles.events({
	'click #voirPlus' : (e) => {
	 	Session.set('limit', Session.get('limit') + 10 );  // +10 à chaque clic
	}
});


