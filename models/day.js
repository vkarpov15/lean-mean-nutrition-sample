var schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON : {
    virtuals : true
  }
};

exports.CreateDaySchema = function() {
  var Mongoose = require('mongoose');

  var ret = new Mongoose.Schema({
    date : Date,
    user : String,
    foods : [{
      weights : [{
        amount : Number,
        unit : String,
        grams : Number
      }],
      selectedWeight : {
        amount : Number,
        index : Number,
        grams : Number
      },
      description : String,
      nutrients : [{
        units : String,
        description : String,
        tagname : String,
        amountPer100G : Number
      }]
    }]
  }, schemaOptions);

  ret.index({ user : 1, date : 1 }, { unique : true });

  return ret;
};