angular.module('lodash', [])
  .factory('_', function($window) {
    return $window._;
  });
