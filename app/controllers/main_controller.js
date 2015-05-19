module.exports = function(app) {
  return {
    homePage: function(req, res) {
      res.render('landing', {
        bodyId: 'index'
      });
    },
    workPage: function(req, res) {
      res.render('work', {
        bodyId: 'work'
      });
    }
  };
};
