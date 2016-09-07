FlowRouter.route('/', {
  name: 'home',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'Articles'});
  } 
});


FlowRouter.route('/profil', {
  name: 'profil',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'Profil'});
  } 
});



FlowRouter.route('/article/:id', {
  name: 'article',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'SingleArticle'});
  } 
});

FlowRouter.route('/article/:id/edit', {
  name: 'articleEdit',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'editArticle'});
  } 
});



FlowRouter.route('/commentaires', {
  name: 'commentaires',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Commentaires'});
  } 
});

FlowRouter.route('/commentaire/:id', {
  name: 'commentaire',
  action() {
    BlazeLayout.render('MainLayout', {main: 'SingleComment'});
  } 
});

FlowRouter.route('/commentaire/:id/edit', {
  name: 'commentEdit',
  action() {
    BlazeLayout.render('MainLayout', {main: 'editComment'});
  } 
});

// ADMIN ROUTES

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin'
});


adminRoutes.route('/users', {
   name: 'users',
    action() {
      BlazeLayout.render('MainLayout', {main: 'Users'});
  } 
});

adminRoutes.route('/mes-articles', {
  name: 'mes-articles',
  action() {
    BlazeLayout.render('MainLayout', {main: 'MesArticles'});
  } 
});



adminRoutes.route('/nouvelArticle', {
  name: 'nouvelArticle',
  action() {
    BlazeLayout.render('MainLayout', {main: 'nouvelArticle'});
  } 
});
