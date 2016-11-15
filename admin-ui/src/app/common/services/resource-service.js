/**
 * Module that eases the pain of working with remote resources.
 */
angular.module('nord.resource-service', [])
/**
 * Constants for the default resource actions.
 */
  .constant('ResourceAction', {
    'CREATE': 'create',
    'UPDATE': 'update',
    'GET': 'get',
    'QUERY': 'query',
    'DELETE': 'delete'
  })
/**
 * Provider that allows for centralized configuration for all resource services.
 */
  .provider('resourceServiceConfig', function() {
    this.config = {
      baseUrl: '/',
      actions: {
        'create': {
          method: 'POST',
          url: '{route}'
        },
        'update': {
          method: 'PUT',
          url: '{route}/{id}'
        },
        'get': {
          method: 'GET',
          url: '{route}/{id}'
        },
        'query': {
          method: 'GET',
          url: '{route}'
        },
        'delete': {
          method: 'DELETE',
          url: '{route}/{id}'
        }
      }
    };

    this.setBaseUrl = function(baseUrl) {
      this.config.baseUrl = baseUrl;
    };

    this.$get = function() {
      return this.config;
    };
  })
/**
 * Resource service class that contains all the logic for working with resources.
 */
  .factory('ResourceService', function($log, $q, $http, $rootScope, apiService, resourceServiceConfig, ResourceAction) {
    /**
     * Replaces the found parameters in the given URL.
     * @param {string} url
     * @param {object} params
     * @returns {string}
     */
    function replaceUrlParams(url, params) {
      angular.forEach(params, function(value, key) {
        var placeholder = '{' + key + '}';

        if (url.indexOf(placeholder) !== -1) {
          url = url.replace(placeholder, value);
          delete params[key];
        }
      });

      return url;
    }

    /**
     * Sends an HTTP request using the given configuration.
     * @param {object} config
     * @returns {Promise}
     */
    function sendRequest(config) {
      var dfd = $q.defer();

      config.method = (config.method || 'GET').toUpperCase();

      $http(config)
        .then(function(response) {
          $log.debug(config.method + ' ' + config.url + ' ' + response.status, response.data);

          dfd.resolve(response);
        }, function(error) {
          dfd.reject(error);
        });

      return dfd.promise;
    }

    /**
     * Processes the request configuration for the given service.
     * @param {object} config
     * @param {function} beforeRequest
     * @returns {object}
     */
    function processRequest(config, beforeRequest) {
      var copy = angular.copy(config);

      if (copy.data && beforeRequest) {
        copy.data = beforeRequest(copy.data);
      }

      return copy;
    }

    /**
     * Processes the given response.
     * @param {object} response
     * @param {function} afterResponse
     * @returns {object}
     */
    function processResponse(response, afterResponse) {
      var copy = angular.copy(response);

      if (copy.data && afterResponse) {
        copy.data = afterResponse(copy.data);
      }

      return copy;
    }

    /**
     * Resource service class.
     * @param {string} route
     * @param {object} config
     * @constructor
     */
    var ResourceService = function(route, config) {
      if (!route) {
        throw new Error('Cannot create resource service without "route".');
      }

      this.route = route;
      this.config = angular.merge({}, resourceServiceConfig, config);
    };

    /**
     * Creates a new resource from the given data.
     * @param {object} data
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.create = function(data, config) {
      config = config || {};
      config.data = data;

      return this.runAction(ResourceAction.CREATE, config);
    };

    /**
     * Updates an existing resource with the given data.
     * @param {object} data
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.update = function(data, config) {
      if (!data.id) {
        throw new Error('Cannot update resource without "id".');
      }

      config = config || {};
      config.data = data;
      config.params = config.params || {};
      config.params['id'] = data.id;

      return this.runAction(ResourceAction.UPDATE, config);
    };

    /**
     * Convenience method for saving any resource.
     * @param {object} data
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.save = function(data, config) {
      return !data.id ? this.create(data, config) : this.update(data, config);
    };

    /**
     * Returns a single resource.
     * @param {string} id
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.get = function(id, config) {
      config = config || {};
      config.params = config.params || {};
      config.params['id'] = id;

      return this.runAction(ResourceAction.GET, config);
    };

    /**
     * Returns multiple resources.
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.query = function(config) {
      config = config || {};

      return this.runAction(ResourceAction.QUERY, config)
    };

    /**
     * Deletes a resource.
     * @param {string} id
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.delete = function(id, config) {
      config = config || {};
      config.params = config.params || {};
      config.params['id'] = id;

      return this.runAction(ResourceAction.DELETE, config);
    };

    /**
     * Runs an action.
     * @param {string} action
     * @param {object} config
     * @returns {Promise}
     */
    ResourceService.prototype.runAction = function(action, config) {
      var self = this;

      if (!action) {
        throw new Error('Argument "action" is required.');
      }

      if (!self.config.actions[action]) {
        throw new Error('Unknown action "' + action + '".');
      }

      var dfd = $q.defer();

      config = angular.extend({}, self.config.actions[action], config);

      config.params = config.params || {};
      config.params['route'] = self.route;
      config.url = [config.baseUrl || self.config.baseUrl, replaceUrlParams(config.url, config.params)].join('/');

      config = processRequest(config, config.beforeRequest || self.config.beforeRequest);

      sendRequest(config)
        .then(function(response) {
          response = processResponse(response, config.afterResponse || self.config.afterResponse);

          $rootScope.$broadcast(['resource', self.route, action].join('.'));

          dfd.resolve(response);
        });

      return dfd.promise;
    };

    return ResourceService;
  })
/**
 * Resource factory method that creates resource factories in a convenient way.
 *
 * Usage:
 *
 * var service = resourceFactory('products', {
   *   baseUrl: 'http://api.domain.com/v1',
   *   actions: {
   *     'custom': {
   *       method: 'POST',
   *       url: '{route}/custom' // becomes 'product/custom'
   *     }
   *   }
   * }, {
   *   generateId: function() {
   *     return (rand() * 100) / 100;
   *   }
   * });
 */
  .factory('resourceServiceFactory', function(ResourceService) {
    /**
     * Creates a new resource service instance and returns it.
     * @return {ResourceService}
     */
    return function(url, config, props) {
      // Temporary constructor for the service to be created.
      function __() {
        ResourceService.apply(this, arguments);
      }

      // Copy over the parent prototype to the service prototype.
      __.prototype = Object.create(ResourceService.prototype);

      // Call the temporary constructor to instantiate the service.
      var service = new __(url, config);

      // Set the given properties into the newly created instance.
      for (var p in props) {
        if (props.hasOwnProperty(p)) {
          service[p] = props[p];
        }
      }

      return service;
    }
  });
