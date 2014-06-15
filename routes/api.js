var moment = require('moment');

exports.index = function(fs) {
  var content = fs.readFileSync('./public/html/index.html');
  return function(req, res) {
    res.set('Content-Type', 'text/html');
    res.send(content);
  };
};

exports.user = {
  get : function() {
    return function(req, res) {
      res.json({ user : req.user });
    };
  }
};

exports.day = {
  get : function(Day) {
    return function(req, res) {
      var username = req.user.username;
      var date = moment.utc(req.params.date);
      if (!date.isValid()) {
        return res.json(400, { error : "Invalid date" });
      }

      Day.findOne({ user : username, date : date.toDate() }, function(error, day) {
        if (error) {
          res.json(500, { error : error });
        } else if (!day) {
          res.json({
            day : new Day({ date : date, username : username, foods : [] }),
            isNew : true
          });
        } else {
          res.json({ day : day, isNew : false });
        }
      });
    };
  },
  put : function(Day) {
    return function(req, res) {
      var username = req.user.username;
      var date = moment.utc(req.params.date);
      if (!date.isValid()) {
        return res.json(400, { error : "Invalid date" });
      }

      Day.update(
        { user : username, date : date.toDate() },
        { $set : { foods : req.body.foods } },
        { upsert : true },
        function(error, result) {
          if (error) {
            res.json(500, { error : error });
          } else {
            res.json({ success : true });
          }
        });
    }
  }
}

/* Mongoose >= 3.8.9 supports text search */
exports.searchFood = function(FoodItem) {
  return function(req, res) {
    var search = req.params.search;

    FoodItem.
      find(
        { $text : { $search : search } },
        { score : { $meta: "textScore" } }
      ).
      sort({ score: { $meta : "textScore" } }).
      limit(10).
      exec(function(error, foodItems) {
        if (error) {
          res.json(500, { error : error });
        } else {
          res.json(foodItems);
        }
      });
  }
};