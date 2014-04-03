var omni = require('omni-di');

exports.ServerSetup = function() {
  var di = omni();

  di.assemble([
    [
      { name : 'Day', factory : require('./day.mock.js').MockDay }
    ]
  ]);

  return di;
};