Template.SideBarMobile.onCreated(function(){
	this.autorun( () => {
		this.subscribe('SingleUser');
		this.subscribe('avatarUser', Meteor.userId());
	});

});


Template.SideBarMobile.helpers({
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

