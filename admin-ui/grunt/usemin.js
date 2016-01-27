module.exports = function(grunt, options) {
  return {
    options: {
      assetsDirs: [
        '<%= build %>',
        '<%= build %>/css',
        '<%= build %>/fonts',
        '<%= build %>/js'
      ]
    },
    html: '<%= build %>/index.html',
    css: ['<%= build %>/css/**/*.css'],
    js: ['<%= build %>/js/**/*.js']
  };
};
