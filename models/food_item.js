var schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON : {
    virtuals : true
  }
};

exports.CreateFoodItemSchema = function() {
  var Mongoose = require('mongoose');

  var ret = new Mongoose.Schema({
    _id : String,
    description : String,
    nutrients : [{
      _id : String,
      units : String,
      tagname : String,
      description: String,
      amountPer100G: Number
    }],
    weights : [{
      amount : Number,
      unit : String,
      grams : Number
    }]
  }, schemaOptions);

  return ret;
};