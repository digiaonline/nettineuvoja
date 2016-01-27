module.exports = function(grunt, options) {
  return {
    prod: {
      options: {
        archive: 'releases/consumer-ui-latest.zip'
      },
      files: [
        {
          expand: true,
          cwd: '<%= web %>/',
          src: ['**']
        }
      ]
    }
  };
};
