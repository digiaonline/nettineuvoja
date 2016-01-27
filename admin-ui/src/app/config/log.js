angular.module('nnAdminUi')
  .config(function($logProvider, DEBUG) {
    $logProvider.debugEnabled(DEBUG);
  });
