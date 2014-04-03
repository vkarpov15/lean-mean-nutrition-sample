var angular = require('angular');
var router = require('./angular-route.1.2.10.js').addNgRoute(angular);

exports.appModule = angular.module("LeanMEAN", ['ngRoute']);

exports.appModule.filter('flatten', require('./filters.common').flattenFactory);
exports.appModule.filter('range', require('./filters.common').rangeFactory);

exports.appModule.controller('LoginController',
  require('./login_controller.js').LoginController);

exports.appModule.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl : '/html/home.html'
    }).
    when('/track', {
      templateUrl : '/html/track.html',
      controller : require('./track_controller.js').TrackController
    });
});