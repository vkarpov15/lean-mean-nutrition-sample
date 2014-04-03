exports.MockHttp = function() {
  var ret = {};
  var responses = {};

  ret.setResponse = function(path, result) {
    responses[path] = result;
  };

  ret.get = function(path) {
    var successCallback = null;
    var errorCallback = null;
    var promises = {
      success : function(callback) {
        successCallback = callback;
        return promises;
      },
      error : function(callback) {
        errorCallback = callback;
        return promises;
      }
    };

    setTimeout(function() {
      if (responses[path]) {
        successCallback(responses[path]);
      } else {
        errorCallback({ error : "Invalid path" });
      }
    }, 0);
    return promises;
  };

  return ret;
};