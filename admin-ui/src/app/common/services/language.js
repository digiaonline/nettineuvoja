angular.module('nnAdminUi')
  .factory('languageService', function($q, apiService) {
    var _languages = [];

    /**
     * @returns {Promise}
     */
    function getLanguages() {
      var dfd = $q.defer();

      if (!_languages.length) {
        apiService.getLanguages()
          .then(function(response) {
            _languages = response.data;
            dfd.resolve(_languages);
          })
      } else {
        dfd.resolve(_languages);
      }

      return dfd.promise;
    }

    return {
      getLanguages: getLanguages
    };
  });
