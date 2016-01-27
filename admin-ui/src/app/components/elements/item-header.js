angular.module('nnAdminUi')

  // Directive that allows us to re-use the item header element.
  .directive('nnItemHeader', function() {
    return {
      templateUrl: 'components/elements/item-header.html',
      transclude: true,
      link: function(scope, element) {
        element.addClass('panel-heading');
      }
    };
  });
