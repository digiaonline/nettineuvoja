'use strict';

angular.module('nnConsumerUi', [
  'lodash',
  'ngRoute',
  'ngAnimate',
  'nnConsumerUi.constants',
  'nnConsumerUi.templates',
  'nord.resource-service',
  'ui.bootstrap',
  'pascalprecht.translate',
  'duScroll',
  'LocalStorageModule',
  'ngFileUpload',
  'angulartics',
  'angulartics.google.analytics'
])
  .value('duScrollGreedy', true);
