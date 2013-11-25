
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mydmv = require('./routes/myDMV');
var http = require('http');
var path = require('path');
var app = express();
// Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
 
 
// enable CORS!
app.use(enableCORS);
//--------------

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

 







app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/myDMV', mydmv.home);
app.get('/Search', mydmv.home);



http.createServer(app).listen(app.get('port'), function(){
	
  console.log('Express server listening on port ' + app.get('port'));
});
