'use strict';

angular.module('nnConsumerUi')
  .factory('apiService', function($http, Upload, API_URL, API_VERSION) {
    /**
     *
     * @param {string} source
     * @returns {Promise}
     */
    function autocomplete(source) {
      return sendRequest({
        method: 'POST',
        url: createUrl('autocomplete'),
        data: {source: source}
      });
    }

    /**
     * @param {object} message
     * @returns {Promise}
     */
    function sendMail(message) {
      return sendRequest({
        method: 'POST',
        url: createUrl('mail'),
        data: message
      });
    }

    /**
     * @returns {Promise}
     */
    function getSessionId() {
      return sendRequest({
        method: 'GET',
        url: createUrl('kuti/get_session_id')
      });
    }

    /**
     * @param {object} session
     * @returns {Promise}
     */
    function saveSession(session) {
      return sendRequest({
        method: 'POST',
        url: createUrl('kuti/save_session'),
        data: {session: session}
      });
    }

    /**
     * @returns {Promise}
     */
    function getLanguages() {
      return sendRequest({
        method: 'GET',
        url: createUrl('languages')
      });
    }

    /**
     *
     * @param file
     */
    function uploadFile(file) {
      return Upload.upload({
        url: createUrl('files'),
        data: {file: file}
      });
    }

    /**
     *
     * @param config
     * @returns {*}
     */
    function sendRequest(config) {
      if (!config.url) {
        throw new Error('Cannot send request without "url".');
      }

      config.url = config.url.indexOf(API_URL) === -1 ? createUrl(config.url) : config.url;
      config.method = (config.method || 'GET').toUpperCase();

      return $http(config);
    }

    /**
     * Ensures that a string contains a leading slash, and returns it.
     * @param {string} str
     * @returns {string}
     */
    function ensureLeadingSlash(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

      if (str.charAt(0) !== '/') {
        str = '/' + str;
      }

      return str;
    }

    /**
     * Ensures that a string contains a trailing slash, and returns it.
     * @param {string} str
     * @returns {string}
     */
    function ensureTrailingSlash(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

      var lastCharPos = str.length - 1;

      if (str.charAt(lastCharPos) !== '/') {
        str = str + '/';
      }

      return str;
    }

    /**
     * Creates an absolute API URL.
     * @param {string} path e.g. '/user/login'
     * @param {string} [version] e.g. 'v1' (defaults to API_VERSION)
     */
    function createUrl(path, version) {
      version = version || API_VERSION;
      return ensureTrailingSlash(API_URL) + version + ensureLeadingSlash(path);
    }

    return {
      autocomplete: autocomplete,
      sendMail: sendMail,
      getSessionId: getSessionId,
      saveSession: saveSession,
      getLanguages: getLanguages,
      uploadFile: uploadFile
    };
  });

