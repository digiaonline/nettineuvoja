angular.module('nnAdminUi')
  .directive('nnNavbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'components/navbar/navbar.html',
      controller: function($log, $scope, $state, authService) {
        $scope.logout = function() {
          authService.logout();

          $state.go('login');
        };

        $scope.$watch(function() {
          return authService.isAuthenticated();
        }, function(value) {
          $scope.authenticated = value;
        })
      }
    };
  });
