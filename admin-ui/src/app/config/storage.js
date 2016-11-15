angular.module('nnAdminUi')
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('nnAdminUi')
      .setStorageType('sessionStorage');
  });
