module.exports = function(grunt, options) {
  return {
    build: {
      expand: true,
      cwd: '<%= build %>/css',
      src: ['*.css', '!*.min.css'],
      dest: '<%= build %>/css'
    }
  };
};
