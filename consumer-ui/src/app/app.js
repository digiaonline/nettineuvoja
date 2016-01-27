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
  'LocalStorageModule'
])
  .value('duScrollGreedy', true);
