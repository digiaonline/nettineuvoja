module.exports = function(grunt, options) {
  return {
    app: {
      src: [
        '<%= src %>/app/app.js',
        '<%= src %>/app/**/*.js'
      ],
      dest: '<%= build %>/js/app.js'
    },
    build: {
      src: [
        '<%= build %>/js/app.js',
        '<%= build %>/js/config.js',
        '<%= build %>/js/templates.js'
      ],
      dest: '<%= build %>/js/app.js'
    }
  };
};
