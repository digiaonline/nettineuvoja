'use strict';

angular.module('nnConsumerUi')

  .directive('nnNotice', function() {
    return {
      restrict: 'A',
      scope: {
        model: '=nnNotice'
      },
      templateUrl: 'components/notice/notice.html'
    };
  });
