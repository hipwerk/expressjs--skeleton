var ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var express = require('express');
var config = require('./config/environments/'+ENV.toLowerCase());
var app = express();
var server;
var appStarter;

app.set('env', ENV);
app.set('config', config);
app.set('root', __dirname);

require('./config/express').init(app);

appStarter = function() {
  server = http.createServer(app);
  server.listen(config.port || 3000);
  console.log('%s is running, listening on port: %s, environment: %s', config.app.name, config.port, ENV.toLowerCase());
};

if (!module.parent) {
 appStarter();
}

module.exports = app;
