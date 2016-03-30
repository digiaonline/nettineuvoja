angular.module('nnConsumerUi')
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('nnConsumerUi')
      .setStorageType('sessionStorage');
  });
