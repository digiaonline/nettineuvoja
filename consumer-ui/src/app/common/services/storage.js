angular.module('nnConsumerUi')
  .service('storageService', function($q, localStorageService) {
    var dfd = $q.defer();

    /**
     * @param {string} key
     * @returns {*}
     */
    function getValue(key) {
      return localStorageService.get(key);
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    function setValue(key, value) {
      dfd.notify(key);
      localStorageService.set(key, value);
    }

    /**
     * @param {string} key
     */
    function removeValue(key) {
      dfd.notify(key);
      localStorageService.remove(key);
    }

    /**
     * @returns {Promise}
     */
    function observeStorage() {
      return dfd.promise;
    }

    this.get = getValue;
    this.set = setValue;
    this.remove = removeValue;
    this.observeStorage = observeStorage;
  });
