Template.Users.onCreated(function(){
	this.autorun( () => {
		this.subscribe('allUsers');
	});

});

Template.Users.helpers({
	users : () => {
		return Meteor.users.find();
	},
	userEmail: function() {
		return this.emails[0].address;
	},
	isAdmin : function() {
		// si on avait mis Roles.userIsInRole(this.userId, 'admin') ça aurait mis true tout le temps (car admin)
		return Roles.userIsInRole(this._id, 'admin') ? 'admin' : '' ;
	},
	dateCreation: function () {
    	return moment(this.createdAt).format('DD/MM/YYYY HH:mm'); 
    },
    editMode : function() {
    	// classe pour tout le tableau
    	return Session.get('currentUser') ? 'edit-mode' : '';
    },
    currentEdit: function() {   
    	// celui qu'on est en train d'éditer 
    	let user = Session.get('currentUser') ;
    	return user._id === this._id; 
    },
    userId : function() {
    	return Meteor.userId() ; 
    }
});

Template.Users.events({
	'click .user_id' : function() {
		Session.set('currentUser',this);
	},
	'click .toggle-admin' : function(){
		Meteor.call('toggleAdmin', this._id);
	},
	'click .close-edit-mode' : function() {
		Session.set('currentUser',null);
	}
})