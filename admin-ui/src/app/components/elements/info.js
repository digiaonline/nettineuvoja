angular.module('nnAdminUi')

  .service('infoService', function($modal) {
    function open(model) {
      $modal.open({
        size: 'lg',
        templateUrl: 'components/elements/info.html',
        controller: 'InfoCtrl',
        resolve: {
          model: function() {
            return model || {};
          }
        }
      });
    }

    function normalize(model) {
      model = angular.isDefined(model) && !angular.isArray(model) ? model : {};

      angular.forEach(['title', 'content'], function(prop) {
        if (angular.isString(model[prop]) && model[prop].length) {
          var value = model[prop];
          model[prop] = {fi: value};
        }
      });

      return model;
    }

    this.open = open;
    this.normalize = normalize;
  })

  .controller('InfoCtrl', function($scope, $modalInstance, model, languageService) {
    $scope.model = model;
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

    $scope.close = function() {
      $modalInstance.dismiss('close');
    };

    loadLanguages();
  });
