Template.Users.onCreated(function(){
	this.autorun( () => {
		this.subscribe('allUsers');
	});
});

Template.Users.helpers({
	notMe : function() {
		return ! (this._id == Meteor.userId() );
	},
	users : () => {
		return Meteor.users.find({});
	},
	userEmail : function(){
    return this.emails[0].address;
  	},
	isAdmin : function () { 
		var id = this._id;
		console.log(">> id : "+id);
		return Roles.userIsInRole(id, 'admin') ? "checked" : "";
	},
	dateCreation: (createdAt) => {
    	return moment(createdAt).format('DD/MM/YYYY HH:mm'); 
    }
});

Template.Users.events({
	'click .toggleAdmin' : function(e){
		var id = $(e.currentTarget).attr('data-id');
		console.log("click sur toggle admin "+id);
		Meteor.call('toggleAdmin', id);
	}
})