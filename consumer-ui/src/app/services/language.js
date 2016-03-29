angular.module('nnConsumerUi')
  .factory('languageService', function($q, apiService) {
    var _languages = [];
    var _defaultLanguage = 'fi';

    /**
     * @returns {array}
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

    /**
     * @param {object} item
     * @param {string} language
     * @returns {string}
     */
    function translate(item, language) {
      if (angular.isUndefined(item)) {
        return undefined;
      }

      if (angular.isDefined(item[language])) {
        return item[language];
      }

      return item[_defaultLanguage] || undefined;
    }

    return {
      getLanguages: getLanguages,
      translate: translate
    };
  });
