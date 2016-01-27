module.exports = function(grunt, options) {
  return {
    imports: {
      files: {
        '<%= build %>/css/styles.css': '<%= src %>/less/imports.less'
      }
    }
  };
};
