require('dotenv').load();

module.exports = function(grunt) {

  var path = require('path');

  require('jit-grunt')(grunt, {
    ngconstant: 'grunt-ng-constant',
    ngtemplates: 'grunt-angular-templates',
    useminPrepare: 'grunt-usemin'
  });

  require('time-grunt')(grunt);

  // Project configuration
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt'),
    jitGrunt: true,
    data: {
      src: 'src',
      build: 'build',
      web: 'public',
      apiUrl: 'http://nettineuvoja.dev/api/v1.0'
    }
  });

  // Default task
  grunt.registerTask('default', ['watch']);

  // Build task
  grunt.registerTask('build', [
    'bower_concat',
    'concat:app',
    'less_imports:all',
    'less:imports',
    'copy:fonts',
    'copy:html',
    'ngtemplates',
    'concat:build',
    'copy:images'
  ]);

  // Optimization task (must be ran after the 'build' task)
  grunt.registerTask('optimize', [
    'cssmin:build',
    'ngAnnotate:build',
    'uglify',
    'cssmin',
    'filerev',
    'usemin'
  ]);

  // Moves the build to the public folder
  grunt.registerTask('publish', [
    'clean:web',
    'copy:build',
    'clean:build'
  ]);

  // Development build task
  grunt.registerTask('dev', [
    'ngconstant:dev',
    'build',
    'publish'
  ]);

  // Production task
  grunt.registerTask('prod', [
    //'jshint',
    'ngconstant:prod',
    'build',
    'optimize',
    'publish',
    'copy:deploy',
    'compress:prod',
    'aws_s3:prod'
  ]);

};
