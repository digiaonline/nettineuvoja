'use strict';

angular.module('nnConsumerUi')

  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'components/main/main.html',
      controller: 'MainCtrl'
    });
  })

  // Service that handles all logic related to the main view.
  .service('mainService', function($templateRequest, $compile, $window, $timeout, $filter, $rootScope, $log, storageService, DEBUG, APP_NAME, FROM_EMAIL, apiService, kutiService) {

    this.autocomplete = autocomplete;
    this.findSlide = findSlide;
    this.findElements = findElements;
    this.validateForms = validateForms;
    this.sendSummaryMail = sendSummaryMail;
    this.print = print;

    /**
     * Loads autocomplete data via the server.
     * @param {string} keyword
     * @param {object} item
     * @param {object} notices
     */
    function autocomplete(keyword, item, notices) {
      if (angular.isDefined(item.notices)) {
        var found = false;
        angular.forEach(item.notices, function(value) {
          if (keyword.toLowerCase().indexOf(value.keyword.toLowerCase()) !== -1) {
            notices[item.id] = value;
            found = true;
          }
        });
        if (!found && angular.isDefined(notices[item.id])) {
          delete notices[item.id];
        }
      }

      return apiService.autocomplete(item.source ? item.source.replace('$keyword', encodeURIComponent(keyword)) : '')
        .then(function(response) {
          $log.info('Received autocomplete data.', response.data);
          return response.data;
        }, function(response) {
          $log.error('Failed to get autocomplete data.', response);
          return [];
        });
    }

    /**
     * Finds a slide by its name.
     * @param {array} slides
     * @param {string} name
     * @returns {object}
     */
    function findSlide(slides, name) {
      var slide = null;
      angular.forEach(slides, function(value) {
        if (value.name === name) {
          slide = value;
        }
      });
      return slide;
    }

    /**
     * Finds all elements of a specific type in the given slide.
     * @param {object} slide
     * @param {string} type
     * @returns {array}
     */
    function findElements(slide, type) {
      var elements = [];
      if (angular.isDefined(slide.elements)) {
        angular.forEach(slide.elements, function(value, key) {
          if (value.type === type) {
            elements.push(value);
          }
        });
      }
      return elements;
    }

    /**
     * Validates the given forms as a group and returns the result.
     * @param {object} forms
     * @param {object} slide
     * @param {object} model
     * @returns {boolean}
     */
    function validateForms(forms, slide, model) {
      var valid = true;
      angular.forEach(forms, function(value) {
        valid = value.$valid && valid;
      });
      return valid;
    }

    /**
     * Sends the summary email.
     * @param {object} scope
     */
    function sendSummaryMail(scope) {
      $templateRequest('components/summary/summary.html')
        .then(function(template) {
          var body = $compile('<div nn-summary="session.model">' + template + '</div>')(scope);

          $timeout(function() {
            var email = '';

            angular.forEach(scope.session.model, function(slideData, slideName) {
              if (true || slideName.indexOf('yhteystiedot') !== -1) {
                angular.forEach(slideData, function(elementData, elementName) {
                  angular.forEach(elementData, function(itemData, itemName) {
                    if (itemName === 'sahkoposti') {
                      email = itemData;
                    }
                  });
                });
              }
            });

            if (angular.isUndefined(email)) {
              $log.warn('Mail not sent (no contact information)');
              return;
            }

            var config = {
              subject: APP_NAME + ': ' + $filter('translate')('SUMMARY_HEADING'),
              from_email: FROM_EMAIL,
              from_name: APP_NAME,
              to: [{ email: email, type: 'to' }],
              html: body.html(),
              text: body.text()
            };
            apiService.sendMail(config)
              .then(function(response) {
                $log.debug('Mail sent', config, scope.session.model);
              });
          });
        }, function(error) {
          $log.error('Failed to get the summary template', error);
        });
    }

    function print() {
      $window.print();
    }
  })

  // Controller that connects the necessary services to the main view.
  .controller('MainCtrl', function($scope, $q, $timeout, $document, $window, $interval, $log, $modal, $translate, DEBUG, ENVIRONMENT, sessionService, slideService, InfoService, mainService, apiService, languageService) {

    var firstSlide = 'etusivu';
    var loadDelay = 350;
    var scrollDelay = 150;
    var pagerElement = angular.element('.slide-pager');

    $scope.loading = false;
    $scope.showSummary = false;
    $scope.session = sessionService.load();
    $scope.slides = [];
    $scope.forms = {};
    $scope.service = mainService;
    $scope.infoService = InfoService;
    $scope.debug = DEBUG;
    $scope.notices = {};
    $scope.activeLanguage = $scope.session.language || 'fi';
    $scope.languages = [];
    $scope.showSentMessage = false;

    /**
     * Scrolls to a specific slide.
     * @param {string} name
     */
    function scrollToElement(name) {
      $timeout(function() {
        var element = angular.element('#' + name);
        if (element.length) {
          $document.scrollToElementAnimated(element);
        }
      }, scrollDelay);
    }

    /**
     * Adjusts the pager's position so that it's always vertically centered.
     */
    function centerPager() {
      pagerElement.css({ marginTop: -(pagerElement.height() / 2) });
    }

    /**
     * Loads a slide from the slide service.
     * @param {string} name
     * @param {number} index
     */
    function loadSlide(name, index) {
      if (angular.isUndefined(index)) {
        index = -1;
      }
      if ($scope.loading) {
        return;
      }
      var current = $scope.slides[index];
      if (current) {
        // TODO: Refactor this
        var choices = mainService.findElements(current, 'choice');
        if (choices.length && angular.isDefined($scope.session.model) && angular.isDefined($scope.session.model[current.name])) {
          var choiceNextSlide = getNextSlideFromChoices(choices, $scope.session.model[current.name]);
          if (choiceNextSlide) {
            $log.debug('Changed next slide to', choiceNextSlide);
            name = choiceNextSlide;
          }
        }
      }
      var slide = mainService.findSlide($scope.slides, name);
      if (slide !== null) {
        $log.debug('Slide exists, scrolling to element', name);
        scrollToElement(slide.name);
        return;
      }
      $scope.slides.splice(index + 1);
      var next = slideService.getByName(name);
      if (!next) {
        $log.error('Failed to find slide', name);
        return;
      }
      if (angular.isDefined($scope.session.answers[next.name])) {
        $scope.session.model[next.name] = angular.copy($scope.session.answers[next.name]);
      } else {
        $scope.session.model[next.name] = {}
      }
      $scope.session.model[next.name].index = index + 1;
      if (current) {
        if (current.save_after) {
          sessionService.saveRemote($scope.session);
        }
      }
      $scope.loading = true;
      $timeout(function() {
        $scope.loading = false;
        $log.debug('Loaded slide', next);
        var elements = mainService.findElements(next, 'next');
        if (elements.length) {
          // Ensure that the current slides next element points to the next slide.
          if (current) {
            current.next_slide = next.name;
          }
          // Point the next slide to the 'summary' slide if the 'summary_after' flag is set.
          if (next.summary_after) {
            elements[0].next_slide = 'summary';
          }
        }
        $scope.session.answers[name] = angular.copy($scope.session.model[name]);
        $scope.slides.push(next);
        centerPager();
        scrollToElement(next.name);
      }, loadDelay);
    }

    /**
     * Returns the name of the next slide from the given set of choices.
     *
     * @param {array} choices
     * @param {object} model
     * @returns {string|null}
     */
    function getNextSlideFromChoices(choices, model) {
      var nextSlide = null;
      angular.forEach(choices, function(choice) {
        if (choice.multiple) {
          angular.forEach(choice.items, function(item) {
            if (item.next_slide && angular.isDefined(model[choice.name][item.name]) && model[choice.name][item.name]) {
              nextSlide = item.next_slide;
            }
          });
        }
      });
      return nextSlide;
    }

    /**
     * Initializes the main view by loading the first slide.
     */
    function init() {
      $scope.loading = true;

      // Create the session if not created already.
      if (angular.isUndefined($scope.session.id)) {
        createSession();
      }

      // Load the slides
      slideService.load()
        .then(function() {
          $scope.loading = false;
          loadSlide(firstSlide);
        });

      // Get languages.
      apiService.getLanguages()
        .then(function(response) {
          $scope.languages = response.data;
        });

      // Setup a watcher for session.
      $scope.$watch('session', function(value) {
        if (!value) {
          return;
        }
        sessionService.saveLocal(value);
      }, true/* objectEquality */);

      changeLanguage($scope.session.language);
    }

    /**
     * Creates the user session.
     */
    function createSession() {
      sessionService.init()
        .then(function(session) {
          $scope.session = session;
        }, function() {
          $log.error('Failed to create session.');
        });
    }

    /**
     * Changes the active language.
     *
     * @param {string} language
     */
    function changeLanguage(language) {
      $scope.activeLanguage = $scope.session.language = language;
      $translate.use(language);
    }

    /**
     * Changes the next slide for the given slide.
     *
     * @param {string} name
     * @param {object} slide
     */
    $scope.changeNextSlide = function(name, slide) {
      var elements = mainService.findElements(slide, 'next');
      if (elements.length) {
        elements[0].next_slide = name;
      }
    };

    /**
     * Clears the model for debugging purposes.
     */
    $scope.clear = function() {
      delete $scope.session;
      sessionService.clear();
      createSession();
    };

    /**
     * Saves the session to remote location and then sends summary mail.
     */
    $scope.sendMail = function() {
      $scope.showSentMessage = true;

      sessionService.saveRemote($scope.session)
        .then(function() {
          mainService.sendSummaryMail($scope);

          $timeout(function() {
            $scope.showSentMessage = false;
          }, 5000);
        });
    };

    /**
     * Translates the given item to the active language.
     *
     * @param {object} item
     * @returns {string}
     */
    $scope.translate = function(item) {
      return languageService.translate(item, $scope.activeLanguage);
    };

    /**
     * Calculates the characters remaining for a text area.
     *
     * @param {string} string
     * @param {number} maxLength
     * @returns {number}
     */
    $scope.calculateCharactersRemaining = function(string, maxLength) {
      if (angular.isUndefined(string)) {
        return maxLength;
      }

      return string.length < maxLength ? maxLength - string.length : 0;
    };

    /**
     * Called when a file is uploaded.
     *
     * @param {object} file
     * @param {object} session
     * @param {object} slide
     * @param {object} element
     * @param {object} item
     */
    $scope.uploadFile = function(file, session, slide, element, item) {
      apiService.uploadFile(file)
        .then(function(response) {
          session.model[slide.name][element.name][item.name] = response.data;
        });
    };

    /**
     * Called when a multiple choice is toggled.
     *
     * @param {object} slide
     * @param {object} element
     * @param {object} item
     */
    $scope.multipleChoiceToggled = function(slide, element, item) {
      if (angular.isDefined($scope.session.model[slide.name][element.name][item.name])) {
        if ($scope.session.model[slide.name][element.name][item.name]) {
          delete $scope.session.model[item.next_slide];
        }
      }
      var slideIndex = null;
      angular.forEach($scope.slides, function(value, index) {
        if (value.name === item.next_slide) {
          slideIndex = index;
        }
      });
      if (slideIndex) {
        $scope.slides.splice(slideIndex, 1);
      }
      return true;
    };

    $scope.scrollToElement = scrollToElement;
    $scope.loadSlide = loadSlide;
    $scope.changeLanguage = changeLanguage;

    init();

  });
