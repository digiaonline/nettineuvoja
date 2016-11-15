'use strict';

angular.module('nnAdminUi')
  .directive('nnFormGroup', function($timeout) {
    return {
      restrict: 'A',
      require: '^form',
      compile: function(tElement, tAttrs, transclude) {
        // Make sure that the element has the form-group class
        if (!tElement.hasClass('form-group')) {
          tElement.addClass('form-group');
        }

        return function(scope, element, attrs, formCtrl) {
          $timeout(function() {
            var inputElement = element.find('[name]');
            var inputName = inputElement.attr('name');

            if (!inputName) {
              throw 'form-group element does not contain an input element with a \'name\' attribute';
            }

            function updateClasses(invalid) {
              element.toggleClass('has-error', invalid);
              element.toggleClass('has-success', !invalid);
            }

            if (!formCtrl[inputName]) {
              throw 'form-group form controller cannot find the input element';
            }

            scope.$watch(function() {
              if (!formCtrl[inputName] || !formCtrl[inputName].$dirty) {
                return null;
              }
              return formCtrl[inputName].$invalid;
            }, function(value) {
              return value !== null && updateClasses(value);
            });
          });
        };
      }
    };
  });
