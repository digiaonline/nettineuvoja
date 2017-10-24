angular.module('nnAdminUi')

  .config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('/', '/slides');

    $stateProvider.state('slides', {
      url: '/slides',
      templateUrl: 'components/slides/edit/edit.html',
      controller: 'EditSlideCtrl',
      resolve: {
        ensureAuthenticated: function(authService) {
          return authService.ensureAuthenticated();
        },
        querySlides: function(slideService) {
          return function() {
            return slideService.query();
          }
        }
      }
    });
  })

  .controller('EditSlideCtrl', function($scope, $log, $timeout, _, DEBUG, FLOWCHART_URL, querySlides, languageService, slideService, slideSerializer, SlideState, elementService, previewService, flowchartService) {

    var ready = false;
    var updateTimeout;
    var saveDelay = 3000;

    $scope.currentIndex = 0;
    $scope.slides = [];
    $scope.slideService = slideService;
    $scope.elementService = elementService;
    $scope.previewService = previewService;
    $scope.loadingText = '';
    $scope.flowchartUrl = '';
    $scope.status = SlideState.CLEAN;
    $scope.debug = DEBUG;
    $scope.adding = false;
    $scope.languages = [];
    $scope.scroll = 0;

    $scope.getWeightOptions = function() {
      var allWeightOptions = _.range(201);
      var existingWeights = _.map($scope.slides, function(slide) {
        return slide.order_number;
      });
      var existingWeightsExceptSelected = _.omit(existingWeights, function(existingWeight) {
        return existingWeight === $scope.model.order_number;
      });

      return _.omit(allWeightOptions, function(weightOption) {
        return _.includes(existingWeightsExceptSelected, weightOption);
      });
    };

    $scope.showHeading = function(slide) {
      return _.isNumber(slide.order_number);
    };

    /**
     * @returns {Promise}
     */
    function loadSlides() {
      $scope.loading = true;

      return querySlides()
        .then(function(response) {
          $scope.slides = response.data;

          activateSlide($scope.currentIndex);
        })
        .finally(function() {
          $scope.loading = false;
        });
    }

    /**
     * @returns {Promise}
     */
    function loadLanguages() {
      return languageService.getLanguages()
        .then(function(languages) {
          $scope.languages = languages;
        });
    }

    /**
     * @param {Object} slide
     */
    function updateSlide(slide) {
      if (!ready) {
        return;
      }

      if ($scope.status !== SlideState.DIRTY) {
        return;
      }

      $scope.status = SlideState.SAVING;

      slideService.save(slide)
        .then(function(response) {
          $scope.status = SlideState.CLEAN;
        }, function() {
          $scope.status = SlideState.DIRTY;
        });
    }

    /**
     * Activates a specific slide.
     * @param {Number} index
     */
    function activateSlide(index) {
      $scope.model = $scope.slides[index];

      angular.forEach(['label', 'summary_label'], function(prop) {
        if (angular.isString($scope.model[prop]) && $scope.model[prop].length) {
          var value = $scope.model[prop];
          $scope.model[prop] = {fi: value};
        }
      });

      $scope.currentIndex = index;
    }

    /**
     * Updates the flowchart URL.
     */
    function updateFlowchart() {
      var flowchartPayload = "";
      var label, l;

      angular.forEach($scope.slides, function(value, key) {
        label = value.name + (value.save_after ? ';SAVE{bg:limegreen}' : '');
        angular.forEach($scope.slides, function(v, k) {
          l = v.name + (v.save_after ? ';SAVE{bg:limegreen}' : '');
          if (isNextSlide(value, v.name)) {
            flowchartPayload += '[' + label + ']->[' + l + '],';
          }
        });
        if (value.summary_after) {
          flowchartPayload += '[' + label + ']->[Yhteenveto],';
        }
      });

      flowchartService.getFlowchartUrl(flowchartPayload);
    }

    /**
     * @param {Object} slide
     * @param {String} name
     * @returns {Boolean}
     */
    function isNextSlide(slide, name) {
      var found = false;

      angular.forEach(slide.elements, function(element) {
        found = findSlideIdInElement(element, name) || found;
      });

      return found;
    }

    /**
     * @param {Object} element
     * @param {String} name
     * @returns {Boolean}
     */
    function findSlideIdInElement(element, name) {
      var found = false;

      if (angular.isDefined(element.next_slide) && element.next_slide === name) {
        found = true;
      }

      if (angular.isArray(element.items)) {
        angular.forEach(element.items, function(item) {
          if (angular.isObject(item)) {
            found = findSlideIdInElement(item, name) || found;
          }
        });
      }

      return found;
    }

    $scope.activateSlide = activateSlide;

    /**
     * Creates an element on the current slide.
     * @param {String} type
     */
    $scope.createElement = function(type) {
      elementService.create($scope.model.elements, type);
      $scope.adding = false;
    };

    /**
     * @param {Object} slide
     * @returns {Number}
     */
    $scope.getSlideIndex = function(slide) {
      return $scope.slides.indexOf(slide);
    };

    /**
     * Returns whether a given slide leads to the current slide.
     * @param {Object} slide
     * @returns {Boolean}
     */
    $scope.isSourceSlide = function(slide) {
      return isNextSlide(slide, $scope.model.name);
    };

    /**
     * Returns whether the current slide leads to a specific slide.
     * @param {String} name
     * @returns {Boolean}
     */
    $scope.isDestinationSlide = function(name) {
      return isNextSlide($scope.model, name);
    };

    $scope.$on('resource.slides.create', function() {
      $scope.currentIndex = $scope.slides.length;

      loadSlides();
    });

    $scope.$on('resource.slides.delete', loadSlides);

    $scope.$on('flowchart.url.received', function(event, url) {
      $scope.flowchartUrl = url;
    });

    function startWatcher() {
      $scope.$watch('model', function(value, old) {
        if (!value || (old && value.name !== old.name)) {
          return;
        }

        if (updateTimeout) {
          $timeout.cancel(updateTimeout);
        }

        if (ready) {
          $scope.status = SlideState.DIRTY;
        }

        updateTimeout = $timeout(function() {
          updateSlide(value);
          updateFlowchart();

          ready = true;
        }, saveDelay);
      }, true);
    }

    loadLanguages()
      .then(loadSlides)
      .then(startWatcher);
  });
