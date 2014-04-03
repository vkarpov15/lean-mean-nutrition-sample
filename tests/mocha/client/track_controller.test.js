var assert = require('assert');
var TrackController = require('../../../client/track_controller.js').TrackController;
var MockHttp = require('../mocks/http.mock.js').MockHttp;
var moment = require('moment');

describe('TrackController', function() {
  describe('Initialization', function() {
    var trackController;
    var scope;
    var http;

    beforeEach(function(done) {
      scope = {};
      http = MockHttp();
      done();
    });

    it("should initialize date to today with no hours or seconds", function() {
      trackController = new TrackController(scope, http);

      var moment = scope.date;
      assert.equal(new Date().getMonth(), moment.month());
      assert.equal(new Date().getDate(), moment.date());
      assert.equal(0, moment.hours());
      assert.equal(0, moment.minutes());
      assert.equal(0, moment.seconds());
    });

    it("should expose the correct functions to $scope", function() {
      trackController = new TrackController(scope, http);

      assert.ok(!!scope.loadDay);
      assert.ok(!!scope.displayDate);
      assert.ok(!!scope.previousDate);
      assert.ok(!!scope.nextDate);
      assert.ok(!!scope.search);
      assert.ok(!!scope.saveDay);
      assert.ok(!!scope.addFood);
      assert.ok(!!scope.recalculate);
      assert.ok(!!scope.updateUnit);
      assert.ok(!!scope.removeFood);
    });

    it("should load the day on init", function() {
      var today = moment.utc({ hours : 0 }).toISOString();
      http.setResponse('/api/day/' + today, {
        day : {
          username : "vkarpov15",
          foods : [],
          _id : 1
        },
        isNew : false
      });

      trackController = new TrackController(scope, http);

      setTimeout(function() {
        assert.equal(scope.day._id, 1);
      }, 0);
    });

    it("should be able to load previous day", function() {
      var yesterday = moment.utc({ hours : 0 }).add('days', -1).toISOString();
      http.setResponse('/api/day/' + yesterday, {
        day : {
          date : yesterday,
          username : "vkarpov15",
          foods : [],
          _id : 2
        },
        isNew : false
      });

      trackController = new TrackController(scope, http);

      scope.previousDate();
      setTimeout(function() {
        assert.equal(scope.day.date, yesterday);
        assert.equal(scope.day._id, 2);
        assert.equal(scope.date.toISOString(), yesterday);
      }, 0);
    });
  });
});
