angular.module('nnConsumerUi')
  .config(function(resourceServiceConfigProvider, API_URL, API_VERSION) {
    resourceServiceConfigProvider.setBaseUrl(API_URL + '/' + API_VERSION);
  });
