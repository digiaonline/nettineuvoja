angular.module('nnAdminUi')

  // Service that handles all logic related to video elements.
  .service('videoElementService', function() {
    this.videoServiceOptions = [
      {name: 'youtube', label: 'Youtube'},
      {name: 'dreambroker', label: 'Dream Broker'}
    ];
  })

  // Controller that connects the necessary services to the video element.
  .controller('videoElementCtrl', function($scope, COLLAPSED_DEFAULT, elementService, videoElementService, languageService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.elementService = elementService;
    $scope.service = videoElementService;
    $scope.model = $scope.data.elements[$scope.data.index];
    $scope.model.style = $scope.model.style || [];
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

    if (angular.isString($scope.model.content) && $scope.model.content.length) {
      var content = $scope.model.content;
      $scope.model.content = {fi: content};
    }

    loadLanguages();
  })

  // Directive that allows us to re-use the video element.
  .directive('nnVideoElement', function() {
    return {
      restrict: 'A',
      controller: 'videoElementCtrl',
      scope: {
        data: '=nnVideoElement'
      },
      templateUrl: 'components/elements/video.html'
    };
  });
