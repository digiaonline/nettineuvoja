angular.module('nnAdminUi')
  .constant('AuthEvent', {
    'USER_LOGIN': 'user_login',
    'USER_LOGOUT': 'user_logout',
    'USER_SAVED': 'auth_user_saved',
    'USER_REMOVED': 'auth_user_removed'
  })
  .constant('AuthError', {
    'ACCESS_DENIED': 'access_denied'
  })
  .factory('AuthTokenBag', function() {
    /**
     * @param {string} accessToken
     * @param {string} refreshToken
     * @constructor
     */
    var AuthTokenBag = function(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    };

    /**
     * @returns {string}
     */
    AuthTokenBag.prototype.getAccessToken = function() {
      return this.accessToken;
    };

    /**
     * @returns {string}
     */
    AuthTokenBag.prototype.getRefreshToken = function() {
      return this.refreshToken;
    };

    /**
     * @returns {object}
     */
    AuthTokenBag.prototype.serialize = function() {
      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      };
    };

    return AuthTokenBag;
  })
  .factory('authService', function($log, $rootScope, $q, $http, $httpParamSerializer, _, apiService, storageService, userService, AuthTokenBag, AuthEvent, AuthError) {
    var STORAGE_KEY = {
      USER: 'user',
      TOKENS: 'tokens'
    };

    // Flag for whether or not the user is authenticated.
    var _authenticated = false;

    /**
     * Authenticates a user.
     * @param {string} username
     * @param {string} password
     * @return {Promise}
     */
    function login(username, password) {
      var dfd = $q.defer();

      var data = $httpParamSerializer({
        grant_type: 'password',
        client_id: apiService.getOAuth2ClientId(),
        client_secret: apiService.getOAuth2ClientSecret(),
        username: username,
        password: password
      });

      apiService.login(data)
        .then(function(response) {
          var tokens = _tryGetTokens(response);

          _saveTokens(tokens.serialize());

          userService.runAction('me')
            .then(function(response) {
              _authenticated = true;

              $rootScope.$broadcast(AuthEvent.USER_LOGIN, response);

              var user = response.data;

              _saveUser(user);

              $log.debug('User authenticated:', user);

              dfd.resolve(response);
            }, function(error) {
              $log.debug('Failed to fetch user:', error);

              _removeTokens();

              dfd.reject(error);
            });
        }, function(error) {
          $log.debug('Failed to authenticate user:', error);

          dfd.reject(error);
        });

      return dfd.promise;
    }

    /**
     * Auto-authenticates a user with an auth token.
     * @return {Promise}
     */
    function authenticate() {
      var dfd = $q.defer();

      if (!isAuthenticated() && hasAccessToken()) {
        apiService.validate()
          .then(function(response) {
            _authenticated = true;

            $rootScope.$broadcast(AuthEvent.USER_LOGIN, response);

            dfd.resolve(response);
          }, function() {
            logout();

            dfd.reject(AuthError.ACCESS_DENIED);
          });
      } else {
        dfd.resolve();
      }

      return dfd.promise;
    }

    /**
     * Refreshes an access token.
     * @return {Promise}
     */
    function refresh() {
      var dfd = $q.defer();

      var data = $httpParamSerializer({
        refresh_token: _getRefreshToken(),
        client_id: apiService.getOAuth2ClientId(),
        client_secret: apiService.getOAuth2ClientSecret(),
        grant_type: 'refresh_token'
      });

      apiService.refresh(data)
        .then(function(response) {
          var tokens = _tryGetTokens(response);

          _saveTokens(tokens.serialize());

          dfd.resolve(tokens.getAccessToken());
        }, function(error) {
          $log.debug('Failed to refresh access token:', error);

          dfd.reject(error);
        });

      return dfd.promise;
    }

    /**
     * Logs out the authenticated user.
     */
    function logout() {
      _authenticated = false;

      _removeTokens();
      _removeUser();

      $log.debug('User logged out successfully.');

      $rootScope.$broadcast(AuthEvent.USER_LOGOUT);
    }

    /**
     * Attempts to auto-login and checks if the user is authenticated.
     * Use as a state resolve condition when requiring authentication.
     * @return {Promise}
     */
    function ensureAuthenticated() {
      var dfd = $q.defer();

      authenticate()
        .finally(function() {
          if (isAuthenticated()) {
            dfd.resolve();
          } else {
            dfd.reject(AuthError.ACCESS_DENIED);
          }
        });

      return dfd.promise;
    }

    /**
     * Returns saved profile meta data.
     * @return {Object}
     */
    function getUser() {
      return storageService.getValue(STORAGE_KEY.USER);
    }

    /**
     * Returns the logged in users id.
     * @returns {string}
     */
    function getId() {
      var user = getUser();
      return user ? _.get(user, 'id') : null;
    }

    /**
     * Checks if a user is authenticated.
     * @return {boolean}
     */
    function isAuthenticated() {
      return _authenticated;
    }

    /**
     * Saves user profile meta data.
     * @param {Object} user
     */
    function _saveUser(user) {
      storageService.setValue(STORAGE_KEY.USER, user);

      $rootScope.$broadcast(AuthEvent.USER_SAVED);
    }

    /**
     * Deletes user profile meta data.
     */
    function _removeUser() {
      storageService.removeValue(STORAGE_KEY.USER);

      $rootScope.$broadcast(AuthEvent.USER_REMOVED);
    }

    /**
     * Returns the access token from the given response or throws an error.
     * @param {object} response
     * @returns {string}
     */
    function _tryGetTokens(response) {
      var accessToken = _.get(response, 'data.access_token');
      var refreshToken = _.get(response, 'data.refresh_token');

      if (!accessToken) {
        throw new Error('Response does not contain an access token.');
      }

      if (!refreshToken) {
        throw new Error('Response does not contain a refresh token.');
      }

      return new AuthTokenBag(accessToken, refreshToken);
    }

    /**
     * Stores OAuth2 tokens.
     * @param {object} tokens
     */
    function _saveTokens(tokens) {
      storageService.setValue(STORAGE_KEY.TOKENS, tokens);

      $log.debug('Auth tokens stored:', tokens);
    }

    /**
     * Deletes stored OAuth2 tokens.
     */
    function _removeTokens() {
      storageService.removeValue(STORAGE_KEY.TOKENS);

      $log.debug('Auth tokens removed.');
    }

    /**
     * Returns a stored auth token.
     * @return {AuthTokenBag}
     */
    function getTokens() {
      var tokens = storageService.getValue(STORAGE_KEY.TOKENS);
      return tokens ? new AuthTokenBag(tokens.accessToken, tokens.refreshToken) : null;
    }

    /**
     * Returns a stored auth token.
     * @return {string}
     */
    function getAccessToken() {
      var tokens = getTokens();
      return tokens ? tokens.getAccessToken() : null;
    }

    /**
     * Checks if an access token has been stored.
     * @return {boolean}
     */
    function hasAccessToken() {
      return getAccessToken() !== null;
    }

    /**
     * Returns a stored refresh token.
     * @return {string}
     */
    function _getRefreshToken() {
      var tokens = getTokens();
      return tokens ? tokens.getRefreshToken() : null;
    }

    /**
     * Checks if a refresh token has been stored.
     * @return {boolean}
     */
    function hasRefreshToken() {
      return _getRefreshToken() !== null;
    }

    return {
      login: login,
      authenticate: authenticate,
      refresh: refresh,
      ensureAuthenticated: ensureAuthenticated,
      logout: logout,
      getUser: getUser,
      getId: getId,
      isAuthenticated: isAuthenticated,
      getAccessToken: getAccessToken,
      hasAccessToken: hasAccessToken,
      hasRefreshToken: hasRefreshToken
    };
  });
