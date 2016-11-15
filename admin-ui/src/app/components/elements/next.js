angular.module('nnAdminUi')

  // Controller that connects the necessary services to the next element view.
  .controller('NextElementCtrl', function($scope, COLLAPSED_DEFAULT, elementService, slideService, languageService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.elementService = elementService;
    $scope.model = $scope.data.elements[$scope.data.index];
    $scope.model.style = $scope.model.style || [];
    $scope.isSticky = true;
    $scope.slideOptions = [];
    $scope.languages = [];

    /**
     * @returns {Promise}
     */
    function loadLanguages() {
      return languageService.getLanguages()
        .then(function(languages) {
          $scope.languages = languages;
        });
    }

    if (angular.isString($scope.model.label) && $scope.model.label.length) {
      var label = $scope.model.label;
      $scope.model.label = {fi: label};
    }

    slideService.getOptionsArray()
      .then(function(options) {
        $scope.slideOptions = options;
      });

    loadLanguages()
  })

  // Directive that allows us to re-use the next element.
  .directive('nnNextElement', function() {
    return {
      restrict: 'A',
      controller: 'NextElementCtrl',
      scope: {
        data: '=nnNextElement'
      },
      templateUrl: 'components/elements/next.html'
    };
  });
