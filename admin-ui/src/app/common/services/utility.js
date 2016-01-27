angular.module('nnAdminUi')
  .service('utilityService', function() {
    /**
     * Ensures that a string contains a leading slash, and returns it.
     * @param {string} str
     * @returns {string}
     */
    this.ensureLeadingSlash = function(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

      if (str.charAt(0) !== '/') {
        str = '/' + str;
      }

      return str;
    };

    /**
     * Ensures that a string contains a trailing slash, and returns it.
     * @param {string} str
     * @returns {string}
     */
    this.ensureTrailingSlash = function(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

      var lastCharPos = str.length - 1;

      if (str.charAt(lastCharPos) !== '/') {
        str = str + '/';
      }

      return str;
    };

    /**
     * Strips a leading slash if present, and returns the string.
     * @param {string} str
     * @returns {string}
     */
    this.stripLeadingSlash = function(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

      if (str.charAt(0) === '/') {
        str = str.replace(/^\//, '');
      }

      return str;
    };

    /**
     * Strips a trailing slash if present, and returns the string.
     * @param {string} str
     * @returns {string}
     */
    this.stripTrailingSlash = function(str) {
      if (_.isNumber(str)) {
        str = str.toString();
      }

      var lastCharPos = str.length - 1;

      if (str.charAt(lastCharPos) === '/') {
        str = str.replace(/\/$/g, '');
      }

      return str;
    };

    /**
     * Checks if a value is an integer.
     * @param {string|number} n
     * @return {boolean}
     */
    this.isInt = function(n) {
      var remainder = n % 1;
      return !isNaN(remainder) && remainder === 0;
    };

    /**
     * Checks if a value is a float.
     * @param {string|number} n
     * @return {boolean}
     */
    this.isFloat = function(n) {
      var remainder = n % 1;
      return !isNaN(remainder) && remainder !== 0;
    };

    /**
     * Converts a string to a float or int if it is a valid number (fallback: original value).
     * @param {string} string
     * @return {number}
     */
    this.toNumber = function(string) {
      if (isInt(string)) {
        return parseInt(string, 10);
      } else if (isFloat(string)) {
        return parseFloat(string);
      } else {
        return string; // fallback
      }
    };

    /**
     * Splits a comma or white space separated string into an array.
     * @param {string} string
     * @return {Array}
     */
    this.splitByComma = function(string) {
      return string.split(/[ ,]+/);
    };

    /**
     *
     * @param array
     * @param to
     * @returns {boolean}
     */
    this.canMoveArrayItem = function(array, to) {
      return to >= 0 && to <= (array.length - 1);
    };

    /**
     *
     * @param array
     * @param from
     * @param to
     */
    this.moveArrayItem = function(array, from, to) {
      if (!this.canMove(array, to)) {
        return;
      }
      var removed = array.splice(from, 1);
      if (!removed.length) {
        return;
      }
      array.splice(to, 0, removed[0]);
    };

    /**
     *
     * @param array
     * @param index
     */
    this.removeArrayItem = function(array, index) {
      array.splice(index, 1);
    };
  });
