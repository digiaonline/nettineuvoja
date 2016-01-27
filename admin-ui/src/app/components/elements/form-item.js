angular.module('nnAdminUi')

  // Controller that connects the necessary services to the form item view.
  .controller('FormItemCtrl', function($scope, COLLAPSED_DEFAULT, itemService, slideService, formElementService, noticeItemService, infoService, languageService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.itemService = itemService;
    $scope.infoService = infoService;
    $scope.slideService = slideService;
    $scope.service = formElementService;
    $scope.model = $scope.data.items[$scope.data.index];
    $scope.model.notices = noticeItemService.normalize($scope.model.notices);
    $scope.model.info = infoService.normalize($scope.model.info);
    $scope.model.items = itemService.normalize($scope.model.items);
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

    angular.forEach(['label', 'placeholder', 'empty'], function(prop) {
      if (angular.isString($scope.model[prop]) && $scope.model[prop].length) {
        var value = $scope.model[prop];
        $scope.model[prop] = {fi: value};
      }
    });

    loadLanguages();
  })

  // Directive that allows us to re-use the form item element.
  .directive('nnFormItem', function() {
    return {
      restrict: 'A',
      controller: 'FormItemCtrl',
      scope: {
        data: '=nnFormItem'
      },
      templateUrl: 'components/elements/form-item.html'
    };
  });
