angular.module('nnAdminUi')

  // Service that handles all logic related to styles.
  .service('StyleService', function() {
    var colorOptions = [
      {value: '#000', label: 'Black'},
      {value: '#5ec5ec', label: 'Blue'},
      {value: '#e6e6e6', label: 'Gray'},
      {value: '#79bc6e', label: 'Green'},
      {value: '#2d72bb', label: 'Dark blue'},
      {value: '#a1daf8', label: 'Light blue'},
      {value: '#dff2fd', label: 'Lighter blue'},
      {value: '#e3e4e4', label: 'Lightest blue'},
      {value: '#b0006c', label: 'Purple'},
      {value: '#58c5c7', label: 'Turquoise'},
      {value: '#fff', label: 'White'},
      {value: '#f7f285', label: 'Yellow'}
    ];

    var propertyOptions = [
      {
        name: 'background',
        label: 'Background',
        options: colorOptions
      },
      {
        name: 'color',
        label: 'Text color',
        options: colorOptions
      },
      {
        name: 'font-size',
        label: 'Text size',
        options: [
          {value: '12px', label: 'Small'},
          {value: '14px', label: 'Normal'},
          {value: '18px', label: 'Large'},
          {value: '24px', label: '2x-Large'},
          {value: '30px', label: '3x-Large'},
          {value: '36px', label: '4x-Large'},
          {value: '48px', label: '5x-Large'}
        ]
      },
      {
        name: 'text-align',
        label: 'Text align',
        options: [
          {value: 'left', label: 'Left'},
          {value: 'center', label: 'Center'},
          {value: 'right', label: 'Right'}
        ]
      },
      {
        name: 'text-transform',
        label: 'Text transform',
        options: [
          {value: 'none', label: 'None'},
          {value: 'capitalize', label: 'Capitalize'},
          {value: 'uppercase', label: 'Uppercase'},
          {value: 'lowercase', label: 'Lowercase'},
          {value: 'full-width', label: 'Full Width'}
        ]
      }
    ];

    /**
     *
     * @returns {Array}
     */
    function getPropertyOptions() {
      return propertyOptions;
    }

    /**
     *
     * @param {String} property
     * @returns {Array}
     */
    function getValueOptions(property) {
      var options = [];
      angular.forEach(propertyOptions, function(value, key) {
        if (value.name === property && value.options) {
          options = value.options;
        }
      });
      return options;
    }

    /**
     *
     * @param {Array} styles
     */
    function add(styles) {
      styles.push({});
    }

    /**
     *
     * @param {Array} styles
     * @param {Number} index
     */
    function remove(styles, index) {
      styles.splice(index, 1);
    }

    /**
     * @param {*} styles
     * @returns {Array}
     */
    function normalize(styles) {
      return angular.isDefined(styles) && angular.isArray(styles) ? styles : [];
    }

    this.getPropertyOptions = getPropertyOptions;
    this.getValueOptions = getValueOptions;
    this.add = add;
    this.remove = remove;
    this.normalize = normalize;

  })

  // Controller that connects the necessary services to the styles view.
  .controller('StyleCtrl', function($scope, StyleService) {
    $scope.service = StyleService;
  })

  // Directive that allows us to re-use the styles element.
  .directive('nnStyles', function() {
    return {
      controller: 'StyleCtrl',
      restrict: 'A',
      scope: {
        styles: '=nnStyles'
      },
      templateUrl: 'components/elements/styles.html'
    };
  });
