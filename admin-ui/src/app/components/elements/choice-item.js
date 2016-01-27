angular.module('nnAdminUi')

  // Controller that connects the necessary services to the choice item view.
  .controller('ChoiceItemCtrl', function($scope, $log, COLLAPSED_DEFAULT, itemService, slideService, choiceElementService, infoService, languageService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.itemService = itemService;
    $scope.infoService = infoService;
    $scope.service = choiceElementService;
    $scope.model = $scope.data.items[$scope.data.index];
    $scope.model.info = infoService.normalize($scope.model.info);
    $scope.languages = [];
    $scope.slideOptions = [];

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

    angular.forEach(['title', 'content'], function(prop) {
      if (angular.isString($scope.model.info[prop]) && $scope.model.info[prop].length) {
        var value = $scope.model.info[prop];
        $scope.model[prop] = {fi: value};
      }
    });

    slideService.getOptionsArray()
      .then(function(options) {
        $scope.slideOptions = options;
      });

    loadLanguages();
  })

  // Directive that allows us to re-use the choice item element.
  .directive('nnChoiceItem', function() {
    return {
      restrict: 'A',
      controller: 'ChoiceItemCtrl',
      scope: {
        data: '=nnChoiceItem'
      },
      templateUrl: 'components/elements/choice-item.html'
    };
  });
