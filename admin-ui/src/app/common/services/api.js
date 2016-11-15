'use strict';

angular.module('nnAdminUi')
  .factory('apiService', function($http, _, utilityService, API_URL, API_VERSION, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET) {
    /**
     * Authenticates a user with the API.
     * @param {object} data
     * @returns {HttpPromise}
     */
    function login(data) {
      return sendRequest({
        method: 'POST',
        url: 'auth/login',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    }

    /**
     * Validates the session for the authenticated user.
     * @returns {HttpPromise}
     */
    function validate() {
      return sendRequest({
        method: 'POST',
        url: 'auth/validate'
      });
    }

    /**
     * Refreshes the session for the authenticated user.
     * @param {object} data
     * @returns {HttpPromise}
     */
    function refresh(data) {
      return sendRequest({
        method: 'POST',
        url: 'auth/refresh',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
     * Returns the OAuth 2 client ID.
     * @return {string}
     */
    function getOAuth2ClientId() {
      return OAUTH2_CLIENT_ID;
    }

    /**
     * Returns the OAuth 2 client secret.
     * @return {string}
     */
    function getOAuth2ClientSecret() {
      return OAUTH2_CLIENT_SECRET;
    }

    /**
     * Returns the URL used for refreshing tokens.
     * @returns {string}
     */
    function getRefreshTokenUrl() {
      return createUrl('auth/refresh');
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
     * Creates an absolute API URL.
     * @param {string} path e.g. '/user/login'
     * @param {string} [version] e.g. 'v1' (defaults to API_VERSION)
     */
    function createUrl(path, version) {
      version = version || API_VERSION;
      return utilityService.ensureTrailingSlash(API_URL) + version + utilityService.ensureLeadingSlash(path);
    }

    return {
      login: login,
      validate: validate,
      refresh: refresh,
      getLanguages: getLanguages,
      getRefreshTokenUrl: getRefreshTokenUrl,
      sendRequest: sendRequest,
      createUrl: createUrl,
      getOAuth2ClientId: getOAuth2ClientId,
      getOAuth2ClientSecret: getOAuth2ClientSecret
    };
  });

