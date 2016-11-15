angular.module('nnAdminUi')
  .service('debugService', function($log, $injector) {
    this.renderException = function(data) {
      return $injector.get('$modal').open({
        templateUrl: 'components/debug/modal.html',
        controller: 'DebugCtrl',
        resolve: {
          data: function() {
            return data;
          }
        }
      });
    };
  })
  .controller('DebugCtrl', function($log, $scope, data, $modalInstance) {
    $scope.data = data;

    $scope.close = function() {
      $modalInstance.dismiss();
    };
  })
  .factory('exceptionInterceptor', function($log, $q, DEBUG, debugService) {
    return {
      responseError: function(response) {
        if (DEBUG && response.status === 500) {
          debugService.renderException(response.data);
        }

        return $q.reject(response);
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('exceptionInterceptor');
  });
