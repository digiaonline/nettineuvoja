'use strict';

angular.module('nnConsumerUi')
  .filter('html', function($sce) {
    return function(input) {
      return $sce.trustAsHtml(input);
    };
  });
