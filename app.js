
/**
 * Module dependencies.
 */

var api           = require('./routes/api.js'),
    authenticate  = require('./routes/authenticate.js'),
    express       = require('express'),
    http          = require('http'),
    omni          = require('omni-di'),
    passport      = require('passport'),
    path          = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
// Order is important! express.session and passport must be after cookieParser
// but before app.router!
app.use(express.session({
  secret: "This is a secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var di = omni();
require('./dependencies/setup.js').createDependencies(di);
omni.addInjectToFunctionPrototype();

authenticate.setupPassport.inject(di);
var checkLogin = authenticate.checkLogin.inject(di);

app.get('/', api.index.inject(di));

// API routes
app.get('/api/day/:date', checkLogin, api.day.get.inject(di));
app.get('/api/food/search/:search', api.searchFood.inject(di));
app.get('/api/me', api.user.get.inject(di));

app.put('/api/day/:date', checkLogin, api.day.put.inject(di));

// Authentication
app.get('/logout', authenticate.logout.inject(di));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/return', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
