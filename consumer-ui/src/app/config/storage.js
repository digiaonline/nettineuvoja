angular.module('nnConsumerUi')
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('nnConsumer')
      .setStorageType('sessionStorage');
  });
