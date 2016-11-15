angular.module('nnAdminUi')

  .service('optionItemService', function() {
    function getLabel(model) {
      return 'Option';
    }

    function getName(model) {
      return model.name;
    }

    this.getLabel = getLabel;
    this.getName = getName;
  })

  // Controller that connects the necessary services to the option item view.
  .controller('OptionItemCtrl', function($scope, $log, COLLAPSED_DEFAULT, optionItemService, itemService, languageService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.itemService = itemService;
    $scope.service = optionItemService;
    $scope.model = $scope.data.items[$scope.data.index] || {};
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

    loadLanguages();
  })

  // Directive that allows us to re-use the option item element.
  .directive('nnOptionItem', function() {
    return {
      restrict: 'A',
      controller: 'OptionItemCtrl',
      scope: {
        data: '=nnOptionItem'
      },
      templateUrl: 'components/elements/option-item.html'
    };
  });
