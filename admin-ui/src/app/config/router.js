angular.module('nnAdminUi')
  .config(function($locationProvider, $urlRouterProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
    $urlRouterProvider.otherwise('/');
  })
  .run(function($log, $rootScope, $state, $location, _, authService, AuthError) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if (authService.isAuthenticated() && toState.hideWhenAuthenticated) {
        event.preventDefault();

        $log.debug('Redirecting to index...');

        $state.go('edit');
      }
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();

      $log.debug('Failed to change state:', error);

      $log.debug(AuthError, error);

      if (_.contains(AuthError, error)) {
        $log.debug('Authentication required. Redirecting to login...');

        $state.go('login');
      }
    });
  });
