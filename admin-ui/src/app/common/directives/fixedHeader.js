'use strict';

angular.module('nnAdminUi')
  .directive('nnFixedHeader', function() {
    return {
      restrict: 'A',
      scope: {
        offset: '=nnFixedHeader'
      },
      link: function(scope, element, attrs) {
        if (!scope.offset) {
          scope.offset = 0;
        }
        element.affix({
          offset: {
            top: function() {
              return (this.top = element.offset().top + scope.offset);
            }
          }
        });
      }
    };
  });
