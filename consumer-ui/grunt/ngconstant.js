module.exports = function(grunt, options) {
  var pkg = grunt.file.readJSON('package.json');

  return {
    options: {
      name: 'nnConsumerUi.constants',
      dest: '<%= build %>/js/config.js',
      wrap: "'use strict';\n\n{%= __ngModule %}",
      constants: {
        APP_NAME: process.env.APP_NAME,
        API_VERSION: 'v1',
        API_URL: process.env.API_URL,
        DEBUG: false,
        VERSION: pkg.version,
        ENVIRONMENT: 'development',
        FROM_EMAIL: process.env.FROM_EMAIL
      }
    },
    dev: {
      constants: {
        DEBUG: true
      }
    },
    prod: {
      constants: {
        ENVIRONMENT: 'production'
      }
    }
  };
};
