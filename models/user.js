var schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON : {
    virtuals : true
  }
};

exports.CreateUserSchema = function() {
  var Mongoose = require('mongoose');

  var ret = new Mongoose.Schema({
    _id : String,
    username : String
  }, schemaOptions);

  return ret;
};