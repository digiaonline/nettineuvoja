module.exports = function(grunt, options) {
  return {
    app: {
      files: {
        '<%= build %>/js/app.js': '<%= build %>/js/app.annotated.js'
      }
    },
    config: {
      files: {
        '<%= build %>/js/config.js': '<%= build %>/js/config.annotated.js'
      }
    },
    vendor: {
      files: {
        '<%= build %>/js/vendor.js': '<%= build %>/js/vendor.js'
      }
    }
  };
};
