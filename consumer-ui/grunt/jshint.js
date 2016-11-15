module.exports = function(grunt, options) {
  return {
    files: [
      "<%= src %>/app/**/*.js"
    ],
    options: {
      jshintrc: ".jshintrc"
    }
  };
};
