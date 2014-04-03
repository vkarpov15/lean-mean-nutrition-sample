var moment = require('moment');
var calculations = require('../common/calculations.js');

exports.TrackController = function($scope, $http) {
  $scope.date = moment.utc({ hour : 0 });

  $scope.dayLoading = false;
  $scope.day = null;
  $scope.isNew = true;
  $scope.computed = {};
  $scope.loadDay = function(setLocation) {
    $scope.dateLoading = true;
    $http.get('/api/day/' + $scope.date.toISOString()).
      success(function(data) {
        $scope.dayLoading = false;
        $scope.day = data.day;
        $scope.isNew = data.isNew;
        $scope.recalculate();
      }).
      error(function(data) {
        $scope.dayLoading = false;
      });
  }

  $scope.displayDate = function() {
    return $scope.date.format('MMMM D, YYYY');
  };

  $scope.previousDate = function() {
    $scope.date = $scope.date.add('days', -1);
    $scope.loadDay();
  };

  $scope.nextDate = function() {
    $scope.date = $scope.date.add('days', 1);
    $scope.loadDay();
  };

  $scope.searchResults = [];
  $scope.searchLoading = false;
  $scope.search = function(search) {
    $scope.searchLoading = true;
    $http.get('/api/food/search/' + encodeURIComponent(search)).
      success(function(data) {
        $scope.searchLoading = false;
        $scope.searchResults = data;
      }).
      error(function(data) {
        $scope.searchLoading = false;
        console.log(JSON.stringify(data));
      });
  };

  $scope.saving = false;
  $scope.saveDay = function() {
    $scope.saving = true;
    $http.put('/api/day/' + $scope.date.toISOString(), $scope.day).
      success(function(data) {
        $scope.saving = false;
        console.log("Saved");
      }).
      error(function(data) {
        $scope.saving = false;
        console.log("Failed");
      });
  };

  $scope.addFood = function(result) {
    $scope.isNew = false;
    $scope.day.foods = $scope.day.foods || [];
    var selectedWeight = result.weights && result.weights.length > 0 ?
      {
        amount : result.weights[0].amount,
        index : 0,
        grams : result.weights[0].grams
      } :
      { amount : 1, index : 0, grams : 100, unit : 'serving (100g)' };

    $scope.day.foods.push({
      weights : result.weights || [selectedWeight],
      selectedWeight : selectedWeight,
      description : result.description,
      nutrients : result.nutrients
    });

    $scope.recalculate();
  };

  $scope.recalculate = function() {
    $scope.computed = calculations.computeUINutrientsForDay($scope.day);
  };

  $scope.updateUnit = function(food) {
    food.selectedWeight.grams =
      food.weights[food.selectedWeight.index].grams *
      food.selectedWeight.amount / food.weights[food.selectedWeight.index].amount;
  
    $scope.recalculate();
  };

  $scope.removeFood = function(index) {
    $scope.day.foods.splice(index, 1);
    $scope.recalculate();
  }

  $scope.loadDay();
};
