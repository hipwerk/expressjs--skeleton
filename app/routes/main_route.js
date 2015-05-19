module.exports = function(app) {
  var root = app.get('root');
  var mainCtrl = require(root+'/app/controllers/main_controller')(app);

  app.get('/', mainCtrl.homePage);
  app.get('/work', mainCtrl.workPage);
};
