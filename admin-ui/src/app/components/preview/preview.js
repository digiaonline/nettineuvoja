angular.module('nnAdminUi')

// Services that handles all logic related to the preview modal.
  .service('previewService', function($modal) {
    function open(model) {
      if (!model.url.length) {
        return;
      }

      $modal.open({
        size: 'lg',
        templateUrl: 'components/preview/preview.html',
        controller: 'PreviewCtrl',
        resolve: {
          model: function() {
            return model;
          }
        }
      });
    }

    this.open = open;
  })

  // Controller that connects the necessary services to to the preview modal.
  .controller('PreviewCtrl', function($scope, $modalInstance, model) {
    $scope.model = model;
    $scope.zoomActive = false;

    /**
     * Toggle between small and full size flowchart image
     */
    $scope.zoom = function() {
      $scope.zoomActive = !$scope.zoomActive;
    };

    /**
     * Closes the modal.
     */
    function close() {
      $modalInstance.dismiss('close');
    }

    $scope.close = close;
  });
