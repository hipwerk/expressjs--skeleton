var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static')
var swig = require('swig');
var swigExtras = require('swig-extras');

module.exports.init = function(app) {
  var env = app.get('env');
  var root = app.get('root');
  var config = app.get('config');
  var baseUrl = config.baseUrl;

  if (config.env.trustProxy) {
    app.enable('trust proxy');
  }

  swigExtras.useFilter(swig, 'truncate');
  app.engine('html', swig.renderFile);
  app.set('views', root + '/app/views');
  app.set('view engine', 'html');
  if (env === 'production') {
    swig.setDefaults({ cache: true });
  } else {
    swig.setDefaults({ cache: false });
  }
  app.set('swig', swig);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.disable('x-powered-by');

  switch(env) {
    case 'production':
    case 'staging':
    case 'test':
    case 'development':
    default:
     app.use(session({
       secret: 'Az1cu5aITANLujoUN4VUGxopwTFs5f6o',
       key: 'skey.sid',
       resave: false,
       saveUninitialized: true
     }));
  }

  app.use(function(req, res, next) {
    res.locals.baseUrl = baseUrl;
    next();
  });
  app.use(cookieParser());

  ['main'].forEach(function(route) {
    require('../app/routes/' + route + '_route')(app);
  });

  if (config.env.serverStatic) {
    app.use(serveStatic(path.join(root, 'public')));
  }
};
