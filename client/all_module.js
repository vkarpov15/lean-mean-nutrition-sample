var angular = require('angular');
var router = require('./angular-route.1.2.10.js').addNgRoute(angular);

exports.appModule = angular.module("LeanMEAN", ['ngRoute']);

exports.appModule.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl : '/html/home.html'
    }).
    when('/track', {
      templateUrl : '/html/track.html'
    });
});