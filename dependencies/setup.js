exports.createDependencies = function(di) {
  var Mongoose = require('mongoose');

  var db = Mongoose.createConnection(
    'localhost',
    'leanmean',
    27017);

  var mongodb = require('mongodb');
  var conn;
  mongodb.connect("mongodb://localhost:27017/leanmean", function(error, db) {
    conn = db;
  });

  di.assemble([
    [
      {
        name : "fs",
        obj : require('fs')
      },
      {
        name : "FoodItem",
        factory : function() {
          var schema = require('../models/food_item.js').CreateFoodItemSchema();
          return db.model('nutrition', schema, 'nutrition');
        }
      },
      {
        name : "Day",
        factory : function() {
          var schema = require('../models/day.js').CreateDaySchema();
          return db.model('days', schema);
        }
      },
      {
        name : "foodItem",
        factory : function() {
          return {
            connection : function() { return conn.collection('nutrition'); }
          };
        }
      },
      {
        name : "User",
        factory : function() {
          var schema = require('../models/user.js').CreateUserSchema();
          return db.model('users', schema);
        }
      }
    ]
  ]);
};