'use strict';

angular.module('nnConsumerUi')

  .controller('NoticeController', function($scope, languageService) {
    /**
     * @param {object} item
     * @returns {string}
     */
    $scope.translate = function(item) {
      return languageService.translate(item, $scope.activeLanguage);
    };
  })

  .directive('nnNotice', function() {
    return {
      restrict: 'A',
      scope: {
        model: '=nnNotice'
      },
      controller: 'NoticeController',
      templateUrl: 'components/notice/notice.html'
    };
  });
