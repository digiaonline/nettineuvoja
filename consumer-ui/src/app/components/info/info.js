'use strict';

angular.module('nnConsumerUi')

  .service('InfoService', function($modal) {
    function open(model, language) {
      $modal.open({
        templateUrl: 'components/info/info.html',
        controller: 'InfoCtrl',
        resolve: {
          model: function() {
            return model;
          },
          language: function() {
            return language;
          }
        }
      });
    }

    this.open = open;
  })

  .controller('InfoCtrl', function($scope, $modalInstance, model, language, languageService) {
    $scope.model = model;

    $scope.translate = function(item) {
      return languageService.translate(item, language);
    };

    $scope.close = function() {
      $modalInstance.dismiss('close');
    };
  });
