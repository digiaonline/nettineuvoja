angular.module('nnAdminUi')
  .controller('AddSlideModalCtrl', function($scope, $modalInstance, validateService, slideService) {
    $scope.slide = {};

    $scope.save = function() {
      $scope.loading = true;

      slideService.save($scope.slide)
        .then(function() {
          $modalInstance.dismiss();
        })
        .finally(function() {
          $scope.loading = false;
        });
    };

    $scope.close = function() {
      $modalInstance.dismiss();
    };

    $scope.canSubmit = function() {
      return validateService.isFormValid($scope.addForm);
    };
  });
