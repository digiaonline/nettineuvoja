angular.module('nnConsumerUi')
  .config(function($logProvider, DEBUG) {
    $logProvider.debugEnabled(DEBUG);
  });
