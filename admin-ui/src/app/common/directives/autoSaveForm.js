'use strict';

angular.module('nnAdminUi')
  .directive('nnAutoSaveForm', function($timeout) {
    return {
      restrict: 'A',
      require: '^form',
      scope: {
        callback: '=nnAutoSaveForm',
        delay: '=nnAutoSaveDelay'
      },
      link: function(scope, element, attrs, ctrl) {
        var timeout = null;
        scope.$watch(function() {
          if (ctrl.$dirty && ctrl.$valid) {
            if (timeout) {
              $timeout.cancel(timeout);
            }
            timeout = $timeout(function() {
              if (angular.isFunction(scope.callback)) {
                scope.callback();
                ctrl.$setPristine();
              }
            }, scope.delay || 1000);
          }
        });
      }
    };
  });
