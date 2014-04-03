
/**
 * Module dependencies.
 */

var api     = require('./routes/api.js'),
    express = require('express'),
    http    = require('http'),
    omni    = require('omni-di'),
    path    = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var di = omni();
require('./dependencies/setup.js').createDependencies(di);
omni.addInjectToFunctionPrototype();

app.get('/', function(FoodItem) {
  return function(req, res) {
    FoodItem.count({}, function(error, count) {
      res.json({ itemsCount : count });
    });
  };
}.inject(di));

// API routes
app.get('/api/day/:date', api.day.get.inject(di));
app.get('/api/food/search/:search', api.searchFood.inject(di));

app.put('/api/day/:date', api.day.put.inject(di));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
