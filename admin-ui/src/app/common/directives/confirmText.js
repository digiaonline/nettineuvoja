'use strict';

angular.module('nnAdminUi')
  .directive('nnConfirmText', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function(event) {
          return confirm(attrs.nnConfirmText);
        });
      }
    };
  });
