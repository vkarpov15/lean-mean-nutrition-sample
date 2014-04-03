var TwitterStrategy = require('passport-twitter').Strategy;

exports.setupPassport = function(User) {
  var passport = require('passport');

  var passportHandler = function(token, tokenSecret, profile, done) {
    if (!profile || !profile.id || !profile.username) {
      return done("Profile invalid, required id and username: " +
        JSON.stringify(profile), null);
    }

    User.findOneAndUpdate(
      { _id : profile.id },
      { $set : { username : profile.username } },
      { upsert : true, new : true },
      function(error, result) {
        console.log(JSON.stringify(result));
        done(error, result);
      });
  };

  passport.use(new TwitterStrategy({
    consumerKey: "WuRaW3CnDzZBGzh4vDcrXzoS7",
    consumerSecret: "uUKXdJiRDJu5RIdba8GCmOxZzx5lbOFTbY7PPAu4tkaxVg34ou",
    callbackURL: 'http://localhost:3000/auth/twitter/return'
  },
  passportHandler));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(
    function(id, done) {
      User.findOne({ _id : id }, function(error, user) {
        done(error, user);
      });
    });
};

exports.checkLogin = function() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json(401, { redirect : '/auth/twitter' });
    }
  };
};

exports.logout = function() {
  return function(req, res) {
    req.logout();
    res.redirect('/');
  };
};