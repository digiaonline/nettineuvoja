angular.module('nnAdminUi')
  .factory('validateService', function() {
    var emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    /**
     * Checks if a field contains validation errors.
     * @param {Object} field model
     * @return {boolean}
     */
    function hasFieldErrors(field) {
      return angular.isDefined(field) && field.$touched && Object.keys(field.$error).length > 0;
    }

    /**
     * Checks if a form model is valid for submission.
     * @param {Object} form
     * @return {boolean}
     */
    function isFormValid(form) {
      return form.$dirty && form.$valid;
    }

    return {
      emailPattern: emailPattern,
      hasFieldErrors: hasFieldErrors,
      isFormValid: isFormValid
    };
  });
