angular.module('nnAdminUi')
  .service('errorService', function($log, $injector, $filter) {
    this.renderError = function(data) {
      $injector.get('notificationService').error({
        message: $filter('translate')(data.message),
        delay: 10000
      });
    };
  })
  .factory('errorInterceptor', function($log, $q, DEBUG, errorService, _) {
    return {
      responseError: function(response) {
        if (_.contains([400, 403, 422], response.status)) {
          errorService.renderError(response.data);
        }

        return $q.reject(response);
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
  });
