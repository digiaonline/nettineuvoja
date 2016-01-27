module.exports = function(grunt, options) {
  return {
    options: {
      algorithm: 'md5',
      length: 8
    },
    dist: {
      src: [
        '<%= build %>/js/**/*.js',
        '<%= build %>/css/**/*.css',
        '!<%= build %>/index.html',
        '!<%= build %>/js/*.annotated.js'
      ]
    }
  }
};
