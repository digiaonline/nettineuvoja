angular.module('nnConsumerUi')
  .directive('nnPageTitle', function($log, PAGE_TITLE) {
    return {
      restrict: 'A',
      require: '^title',
      template: '{{ pageTitle }}',
      controller: function($scope) {
        $scope.pageTitle = PAGE_TITLE;
      }
    }
  });
