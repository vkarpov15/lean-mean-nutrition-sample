exports.MockDay = function() {
  var ret = {};

  ret.update = function(query, update, opts, callback) {
    ret.update.calls.push({
      query : query,
      update : update,
      opts : opts,
      callback : callback
    });
  };
  ret.update.calls = [];

  return ret;
}