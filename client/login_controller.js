exports.LoginController = function($scope, $http, $window) {
  var RELOAD_EVERY_MS = 1000 * 60 * 60;

  $scope.user = {};
  $scope.loggedIn = false;

  $scope.loadUser = function(callback) {
    $http.get('/api/me').
      success(function(data) {
        $scope.user = data.user;
        $scope.loggedIn = data.user ? !!data.user._id : false;
        if (callback) {
          callback($scope.loggedIn);
        }
      });
  };

  $scope.loadUser();

  var loadUserAndTimeout = function() {
    // If user has timed out, send them to Twitter for auth
    $scope.loadUser(function(loggedIn) {
      if (!loggedIn) {
        $window.location.href = '/auth/twitter';
      }
    });

    // Reload user data 
    setTimeout(loadUserAndTimeout, RELOAD_EVERY_MS);
  };

  setTimeout(loadUserAndTimeout, RELOAD_EVERY_MS);
};