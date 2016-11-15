angular.module('nnAdminUi')
  .service('notificationService', function(Notification) {
    this.error = function() {
      Notification.error.apply(Notification, arguments);
    };

    this.info = function() {
      Notification.info.apply(Notification, arguments);
    };

    this.success = function() {
      Notification.success.apply(Notification, arguments);
    };

    this.warning = function() {
      Notification.warning.apply(Notification, arguments);
    };
  });
