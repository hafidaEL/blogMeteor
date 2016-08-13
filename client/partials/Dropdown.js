
Template.Dropdown.onRendered(function(){    
  console.log(' onRenderedDropdown ');
  $(".dropdown-button").dropdown();  
  $(".select-dropdown").material_select();
  $(".button-collapse").sideNav();

});