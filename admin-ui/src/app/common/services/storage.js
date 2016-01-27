angular.module('nnAdminUi')
  .constant('StorageNamespace', 'nnAdminUi')
  .service('storageService', function($log, localStorageService) {
    /**
     * @param {string} key
     * @returns {boolean}
     */
    this.hasValue = function(key) {
      return !!localStorageService.get(key);
    };

    /**
     * @param {string} key
     * @returns {*}
     */
    this.getValue = function(key) {
      return localStorageService.get(key);
    };

    /**
     * @param {string} key
     * @param {*} value
     */
    this.setValue = function(key, value) {
      localStorageService.set(key, value);
    };

    /**
     * @param {string} key
     */
    this.removeValue = function(key) {
      localStorageService.remove(key);
    };
  });
