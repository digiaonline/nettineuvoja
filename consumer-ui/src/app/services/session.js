angular.module('nnConsumerUi')
  .factory('sessionService', function($log, $q, ENVIRONMENT, DEFAULT_LANGUAGE, kutiService, storageService) {

    var STORAGE_KEY = 'nnSession';
    var STORAGE_MODEL_KEY = 'nnSessionModel';

    /**
     * Returns the session ID from the Kuti API.
     * @returns {promise}
     */
    function _getId() {
      return kutiService.getSessionId()
        .then(function(sessionId) {
          return sessionId;
        }, function(response) {
          $log.error('Failed to get session id.', response);
        });
    }

    /**
     *
     * @param {string} id
     * @returns {Object}
     */
    function _create(id) {
      return {
        id: id,
        environment: ENVIRONMENT,
        language: DEFAULT_LANGUAGE,
        model: {},
        answers: {}
      };
    }

    /**
     *
     * @returns {Promise}
     */
    function init() {
      var dfd = $q.defer();

      _getId()
        .then(function(id) {
          var session = _create(id);
          dfd.resolve(session);
        }, function(err) {
          dfd.reject(err);
        });

      return dfd.promise;
    }

    /**
     * Loads the session from local storage if applicable.
     * @returns {object}
     */
    function load() {
      var session = storageService.get(STORAGE_KEY) || {};
      $log.debug('Loaded session', session);
      return session;
    }

    /**
     * Loads the session model from local storage if applicable.
     * @returns {object}
     */
    function loadSessionModel() {
      var sessionModel = storageService.get(STORAGE_MODEL_KEY) || {};
      $log.debug('Loaded session model', sessionModel);
      return sessionModel;
    }

    /**
     * Saves the session to local storage.
     * @param {object} session
     */
    function saveLocal(session) {
      $log.debug('Saving session locally', session);
      storageService.set(STORAGE_KEY, session);
    }

    /**
     * Saves the session model to local storage.
     * @param {object} session
     */
    function saveSessionModel(sessionModel) {
      $log.debug('Saving session model locally', sessionModel);
      storageService.set(STORAGE_MODEL_KEY, sessionModel);
    }

    /**
     * Saves the session to through the Kuti API.
     * @param {object} session
     * @returns {object}
     */
    function saveRemote(session) {
      $log.debug('Saving session remotely', session);
      return kutiService.saveSession(session);
    }

    /**
     * Clears the model (for development purposes only).
     */
    function clear() {
      storageService.remove(STORAGE_KEY);
    }

    return {
      init: init,
      load: load,
      loadSessionModel: loadSessionModel,
      saveLocal: saveLocal,
      saveSessionModel: saveSessionModel,
      saveRemote: saveRemote,
      clear: clear
    };

  });
