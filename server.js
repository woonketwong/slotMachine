/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var app = express();
var flash = require("connect-flash");
var uristring;
var port = process.env.PORT || 5000;

// log process.env.NODE_ENV
console.log("****************************");
console.log("* Current ENV:", app.get('env'));
console.log("****************************");

app.configure(function () {
  app.set('views', __dirname + '/');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(express.methodOverride());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname)));
});

  app.set('view engine', 'ejs');
  // app.engine('html', require('ejs').renderFile);

//if in development, use error handler
if (' development' == app.get(' env')){ 
  app.use( express.errorHandler()); 
}

app.use(function(err, req, res, next){
  console.log("ERROR:",err);
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

app.get('/', function(req, res) {
  res.render("index");
});

app.listen(port, function(){
  console.log("Listening on " + port);
});