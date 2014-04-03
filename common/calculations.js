var _ = require('underscore');

exports.computeUINutrientsPer100G = function(nutrients) {
  var computed = {
    calories : 0,
    omega3 : 0,
    omega6 : 0,
    carbs : 0
  };

  _.each(nutrients, function(nutrient) {
    if (nutrient.tagname === "ENERC_KCAL") {
      computed.calories += nutrient.amountPer100G;
    } else if (nutrient.description.indexOf('n-3') != -1) {
      computed.omega3 += nutrient.amountPer100G;
    } else if (nutrient.description.indexOf('n-6') != -1) {
      computed.omega6 += nutrient.amountPer100G;
    } else if (nutrient.tagname === "CHOCDF") {
      computed.carbs += nutrient.amountPer100G;
    }
  });

  return computed;
};

exports.computeUINutrientsForDay = function(day) {
  var computed = {
    calories : 0,
    omega3 : 0,
    omega6 : 0,
    carbs : 0
  };

  _.each(day.foods, function(food) {
    var ret = exports.computeUINutrientsPer100G(food.nutrients);
    _.each(ret, function(value, key) {
      var selectedAmount = food.selectedWeight.amount;
      var originalAmount = food.weights[food.selectedWeight.index].amount;
      var gramsPerServing = food.selectedWeight.grams
      computed[key] +=
        value * (selectedAmount / originalAmount) * (gramsPerServing / 100);
    });
  });

  return computed;
};