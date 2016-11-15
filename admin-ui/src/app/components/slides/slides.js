angular.module('nnAdminUi')
  .constant('SlideState', {
    DIRTY: 'dirty',
    SAVING: 'saving',
    CLEAN: 'clean'
  })
  .factory('slideSerializer', function() {
    /**
     * @param {Model} slide
     * @returns {Model}
     */
    function serialize(slide) {
      var data = angular.copy(slide);

      data.elements = angular.isDefined(slide.elements) ? serializeElements(slide.elements) : [];
      data.style = angular.isDefined(slide.style) ? styleCollectionToObject(slide.style) : {};
      data.save_after = slide.save_after ? '1' : '0';
      data.summary_after = slide.summary_after ? '1' : '0';
      data.exclude_from_summary = slide.exclude_from_summary ? '1' : '0';

      return data;
    }

    /**
     * @param {Array} elements
     * @returns {object}
     */
    function serializeElements(elements) {
      var data = [];
      var item;

      angular.forEach(elements, function(element) {
        item = angular.copy(element);

        item.items = angular.isDefined(element.items) ? serializeElements(element.items) : undefined;
        item.style = angular.isDefined(element.style) ? styleCollectionToObject(element.style) : {};

        data.push(item);
      });

      return data;
    }

    /**
     * @param {Model} slide
     * @returns {Model}
     */
    function deserialize(slide) {
      var data = angular.copy(slide);

      data.elements = angular.isDefined(slide.elements) ? deserializeElements(slide.elements) : [];
      data.style = angular.isDefined(slide.style) ? styleObjectToCollection(slide.style) : [];
      data.save_after = slide.save_after === 1;
      data.summary_after = slide.summary_after === 1;
      data.exclude_from_summary = slide.exclude_from_summary === 1;

      return data;
    }

    /**
     * @param {Array} elements
     */
    function deserializeElements(elements) {
      var data = [];
      var item;

      angular.forEach(elements, function(element) {
        item = angular.copy(element);

        item.id = item.id || chance.guid();
        item.items = angular.isDefined(element.items) ? deserializeElements(element.items) : undefined;
        item.style = angular.isDefined(element.style) ? styleObjectToCollection(element.style) : [];

        data.push(item);
      });

      return data;
    }

    /**
     * @param {Object} style
     * @returns {Array}
     */
    function styleObjectToCollection(style) {
      var collection = [];

      angular.forEach(style, function(value, key) {
        collection.push({property: key, value: value});
      });

      return collection;
    }

    /**
     * @param {Array} style
     * @returns {Object}
     */
    function styleCollectionToObject(style) {
      var object = {};

      angular.forEach(style, function(value) {
        object[value.property] = value.value;
      });

      return object;
    }

    return {
      serialize: serialize,
      deserialize: deserialize
    };
  })
  .factory('slideService', function($log, $rootScope, $q, $modal, resourceServiceFactory, slideSerializer) {
    return resourceServiceFactory('slides', {
      beforeRequest: function(data) {
        return data ? slideSerializer.serialize(data) : undefined;
      },
      afterResponse: function(data) {
        if (!data.data) {
          return data;
        }

        if (angular.isArray(data.data)) {
          var transform = [];

          angular.forEach(data.data, function(item) {
            transform.push(slideSerializer.deserialize(item));
          });

          return transform;
        } else {
          return slideSerializer.deserialize(data.data);
        }
      }
    }, {
      openAddModal: function() {
        $modal.open({
          templateUrl: 'components/slides/add/add.html',
          controller: 'AddSlideModalCtrl'
        });
      },

      /**
       * @returns {Array}
       */
      getOptionsArray: function() {
        var dfd = $q.defer();

        this.query()
          .then(function(response) {
            var options = [];

            angular.forEach(response.data, function(slide) {
              options.push({name: slide.name, label: slide.label});
            });

            dfd.resolve(options);
          });

        return dfd.promise;
      }
    });
  });
