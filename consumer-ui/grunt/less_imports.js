module.exports = function(grunt, options) {
  return {
    options: {
      inlineCSS: false
    },
    all: {
      src: [
        '<%= src %>/less/**/*.less',
        '!<%= src %>/less/imports.less'
      ],
      dest: '<%= src %>/less/imports.less'
    }
  };
};
