'use strict';

angular.module('nnConsumerUi', [
  'lodash',
  'ngRoute',
  'ngAnimate',
  'nnConsumerUi.constants',
  'nnConsumerUi.templates',
  'nord.resource-service',
  'ui.bootstrap',
  'ui.router',
  'pascalprecht.translate',
  'duScroll',
  'LocalStorageModule',
  'ngFileUpload',
  'angulartics',
  'angulartics.google.analytics',
  'ngTagsInput'
])
  .value('duScrollGreedy', true)
  .value('duScrollOffset', 80);
