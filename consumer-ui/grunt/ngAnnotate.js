module.exports = function(grunt, options) {
  return {
    options: {
      singleQuotes: true
    },
    build: {
      files: [
        {
          expand: true,
          src: [
            '<%= build %>/js/app.js',
            '<%= build %>/js/config.js'
          ],
          ext: '.annotated.js',
          extDot: 'last'
        }
      ]
    }
  };
};
