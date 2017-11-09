'use strict';

angular.module('nnConsumerUi')

  .service('VideoService', function($modal) {
    function open(model) {
      $modal.open({
        templateUrl: 'components/video/video.html',
        controller: 'VideoCtrl',
        resolve: {
          model: function() {
            return model;
          }
        }
      }).result.catch(function(){
        angular.element(document.querySelector('body')).removeClass('video');
      });
      angular.element(document.querySelector('body')).addClass('video');
    }

    this.open = open;
  })

  .controller('VideoCtrl', function($log, $scope, $modalInstance, model ,$sce) {
    var videoId = model.video_id;
    var service = model.service;
    $scope.url = '';

    switch (service) {
      case 'youtube':
        $scope.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoId);
        break;
      case 'dreambroker':
        $scope.url = $sce.trustAsResourceUrl('https://dreambroker.com/channel/' + videoId);
        break;
    }
  });
