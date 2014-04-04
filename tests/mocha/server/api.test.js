var routes = require('../../../routes/api.js');
var createServerMocks = require('../mocks/server_setup.js').ServerSetup;
var moment = require('moment');
var assert = require('assert');

describe("Day API", function() {
  describe("Save", function() {
    var di, route;
    beforeEach(function(done) {
      di = createServerMocks();
      route = di.inject(routes.day.put);
      done();
    });

    it("should successfully update with a valid date", function() {
      var today = "2014-03-21T00:00:00.000Z";
      var req = {
        params : {
          date : today
        },
        body : {
          foods : []
        },
        user : {
          username : "valeri.karpov"
        }
      };

      var response = null;
      var res = {
        json : function(obj) {
          response = obj;
        }
      };

      route(req, res);
      di.inject(function(Day) {
        assert.equal(1, Day.update.calls.length);
        assert.equal("valeri.karpov", Day.update.calls[0].query.user);
        assert.equal(today,
          Day.update.calls[0].query.date.toISOString());
      });
    });
  });
});