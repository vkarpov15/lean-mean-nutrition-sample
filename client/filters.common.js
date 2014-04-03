var _ = require('underscore');

exports.flattenFactory = function() {
  return function(input, key) {
    var ret = [];
    _.each(input, function(el) {
      ret.push(el[key]);
    });

    return ret;
  };
};

exports.rangeFactory = function() {
  return function(low, high) {
    var ret = [];
    for (var i = low; i < high; ++i) {
      ret.push(i);
    }

    return ret;
  };
};