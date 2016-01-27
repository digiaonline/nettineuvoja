angular.module('nnAdminUi')
  .config(function($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'components/login/login.html',
      controller: 'LoginCtrl',
      hideWhenAuthenticated: true,
      resolve: {
        authenticate: function(authService) {
          return authService.authenticate();
        }
      }
    });

    $stateProvider.state('logout', {
      url: '/logout',
      controller: function($scope, $state, authService) {
        authService.logout();

        $state.go('login');
      }
    });
  })
  .controller('LoginCtrl', function($scope, $state, _, authService, validateService) {
    $scope.validateService = validateService;

    /**
     * Logs in.
     */
    $scope.login = function() {
      $scope.loading = true;

      authService.login($scope.email, $scope.password)
        .then(function() {
          $state.go('slides');
        })
        .finally(function() {
          $scope.loading = false;
        });
    };

    /**
     * Checks if the login form can be submitted.
     * @return {boolean}
     */
    $scope.canSubmit = function() {
      return validateService.isFormValid($scope.loginForm);
    };
  });
