angular.module('nnAdminUi')

  // Service that handles all logic related to form elements.
  .service('formElementService', function() {
    var itemTypeOptions = [
      {type: 'text', label: 'Text'},
      {type: 'autocomplete', label: 'Autocomplete'},
      {type: 'checkbox', label: 'Checkbox'},
      {type: 'dropdown', label: 'Drop-down'}
    ];

    var inputTypeOptions = [
      {type: 'text', label: 'Text'},
      {type: 'date', label: 'Date'},
      {type: 'email', label: 'E-mail'},
      {type: 'number', label: 'Number'},
      {type: 'url', label: 'URL'},
      {type: 'textarea', label: 'Textarea'}
    ];

    /**
     *
     * @param {object} model
     * @returns {string}
     */
    function getLabel(model) {
      var label = 'Unknown';
      angular.forEach(itemTypeOptions, function(value, key) {
        if (value.type === model.type) {
          label = value.label;
        }
      });
      return label;
    }

    /**
     *
     * @param {object} model
     * @returns {string}
     */
    function getName(model) {
      return model.name;
    }

    this.itemTypeOptions = itemTypeOptions;
    this.inputTypeOptions = inputTypeOptions;

    this.getLabel = getLabel;
    this.getName = getName;
  })

  // Controller that connects the necessary services to the form element view.
  .controller('FormElementCtrl', function($scope, COLLAPSED_DEFAULT, elementService, itemService, StyleService, formElementService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.adding = false;
    $scope.elementService = elementService;
    $scope.itemService = itemService;
    $scope.service = formElementService;
    $scope.model = $scope.data.elements[$scope.data.index];
    $scope.model.items = itemService.normalize($scope.model.items);
    $scope.model.style = StyleService.normalize($scope.model.style);

    function createItem(type) {
      itemService.create($scope.model.items, type);
      $scope.adding = false;
    }

    $scope.createItem = createItem;
  })

  // Directive that allows us to re-use the form element.
  .directive('nnFormElement', function() {
    return {
      restrict: 'A',
      controller: 'FormElementCtrl',
      scope: {
        data: '=nnFormElement'
      },
      templateUrl: 'components/elements/form.html'
    };
  });
