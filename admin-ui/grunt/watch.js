module.exports = function(grunt, options) {
  return {
    app: {
      files: [
        '<%= src %>/**/*.*',
        'bower_components/**/*.*',
        'grunt/**/*.js',
        'Gruntfile.js'
      ],
      tasks: ['dev'],
      options: {
        spawn: false,
        livereload: true
      }
    }
  };
};
