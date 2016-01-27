module.exports = function(grunt, options) {
  var pkg = grunt.file.readJSON('package.json');

  return {
    options: {
      name: 'nnAdminUi.constants',
      dest: '<%= build %>/js/config.js',
      wrap: "'use strict';\n\n{%= __ngModule %}",
      constants: {
        API_URL: process.env.API_URL,
        API_VERSION: 'v1',
        OAUTH2_CLIENT_ID: process.env.OAUTH2_CLIENT_ID,
        OAUTH2_CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET,
        FLOWCHART_URL: 'http://yuml.me/diagram/plain/class/',
        DEBUG: false,
        ENVIRONMENT: 'development',
        VERSION: pkg.version
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
