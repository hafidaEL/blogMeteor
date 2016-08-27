Template.Dropdown.onCreated(function(){
	this.autorun( () => {
		this.subscribe('SingleUser');
	});

});

Template.Dropdown.onRendered(function(){    
  //console.log(' onRenderedDropdown ');
  $(".dropdown-button").dropdown();  
  $(".select-dropdown").material_select();
  $(".button-collapse").sideNav();

});

Template.Dropdown.helpers({
	user : () => {
		return Meteor.users.findOne({});
	},
	email : ()=> {
		return Meteor.users.findOne().emails[0].address;
	}
});
