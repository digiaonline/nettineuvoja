module.exports = function(grunt, options) {
  return {
    build: {
      files: [
        {
          expand: true,
          cwd: '<%= build %>',
          src: [
            '**/*.html',
            '**/*.css',
            '**/*.js',
            '**/*.{png,jpg,gif}',
            '**/*.{otf,eot,svg,ttf,woff,woff2}',
            '!js/config.js',
            '!js/templates.js',
            '!js/*.annotated.js'
          ],
          dest: '<%= web %>',
          filter: 'isFile'
        }
      ]
    },
    deploy: {
      files: [
        {
          expand: true,
          cwd: 'deploy',
          src: ['**'],
          dest: '<%= web %>/deploy',
          filter: 'isFile'
        }
      ]
    },
    fonts: {
      files: [
        {
          expand: true,
          cwd: '<%= src %>/fonts',
          src: ['**/*.{otf,eot,svg,ttf,woff,woff2}'],
          dest: '<%= build %>/fonts',
          filter: 'isFile'
        }
      ]
    },
    html: {
      files: [
        {
          expand: true,
          cwd: '<%= src %>/app',
          src: 'index.html',
          dest: '<%= build %>',
          filter: 'isFile'
        }
      ]
    },
    images: {
      files: [
        {
          expand: true,
          cwd: '<%= src %>/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= build %>/images',
          filter: 'isFile'
        }
      ]
    }
  };
};
