module.exports = function(grunt, options) {
  return {
    all: {
      dest: '<%= build %>/js/vendor.js',
      dependencies: {
        'angular': 'jquery'
      }
    }
  };
};
