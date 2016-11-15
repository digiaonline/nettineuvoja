module.exports = function(grunt, options) {
  return {
    build: {
      options: {
        module: 'nnConsumerUi.templates',
        standalone: true
      },
      cwd: '<%= src %>/app',
      src: ['**/*.html', '!index.html'],
      dest: '<%= build %>/js/templates.js'
    }
  };
};
