angular.module('nnAdminUi')

  .service('noticeItemService', function() {
    function getLabel(model) {
      return 'Notice';
    }

    function getName(model) {
      return model.keyword;
    }

    function normalize(model) {
      return angular.isDefined(model) && angular.isArray(model) ? model : [];
    }

    this.getLabel = getLabel;
    this.getName = getName;
    this.normalize = normalize;
  })

  // Controller that connects the necessary services to the notice item view.
  .controller('NoticeItemCtrl', function($scope, $log, COLLAPSED_DEFAULT, noticeItemService, itemService, languageService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.itemService = itemService;
    $scope.service = noticeItemService;
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

    angular.forEach(['title', 'body'], function(prop) {
      if (angular.isString($scope.model[prop]) && $scope.model[prop].length) {
        var value = $scope.model[prop];
        $scope.model[prop] = {fi: value};
      }
    });

    loadLanguages();
  })

  // Directive that allows us to re-use the notice item element.
  .directive('nnNoticeItem', function() {
    return {
      restrict: 'A',
      controller: 'NoticeItemCtrl',
      scope: {
        data: '=nnNoticeItem'
      },
      templateUrl: 'components/elements/notice-item.html'
    };
  });
