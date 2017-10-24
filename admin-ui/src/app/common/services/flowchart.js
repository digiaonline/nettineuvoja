angular.module('nnAdminUi')
  .factory('flowchartService', function($rootScope, $http, API_URL) {
    return {
      getFlowchartUrl: function(payload) {
        return $http.post(API_URL + '/v1/diagram', {dsl_text: payload})
          .then(function (res) {
            $rootScope.$broadcast('flowchart.url.received', res.data.data.url);
          })
      }
    };
  });