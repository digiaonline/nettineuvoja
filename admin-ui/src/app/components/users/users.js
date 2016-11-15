angular.module('nnAdminUi')
  .factory('userService', function(resourceServiceFactory) {
    return resourceServiceFactory('users', {
      afterResponse: function(data) {
        return data.data ? data.data : data;
      },
      actions: {
        'me': {
          method: 'GET',
          url: 'me'
        }
      }
    });
  });
