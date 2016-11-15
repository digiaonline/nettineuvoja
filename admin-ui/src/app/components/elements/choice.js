angular.module('nnAdminUi')

  // Service that handles all logic related to choice elements.
  .service('choiceElementService', function() {
    var iconOptions = [
      {url: 'images/icon-cart.png', label: 'Shopping cart'},
      {url: 'images/icon-collection.png', label: 'Collection'},
      {url: 'images/icon-collection-2.png', label: 'Collection 2'},
      {url: 'images/icon-company.png', label: 'Company'},
      {url: 'images/icon-corporation.png', label: 'Corporation'},
      {url: 'images/icon-discount.png', label: 'Discount'},
      {url: 'images/icon-fault.png', label: 'Fault'},
      {url: 'images/icon-new-flat.png', label: 'New flat'},
      {url: 'images/icon-housing.png', label: 'Housing'},
      {url: 'images/icon-invoice-without-cause.png', label: 'Invoice without cause'},
      {url: 'images/icon-late.png', label: 'Late'},
      {url: 'images/icon-new-car.png', label: 'New car'},
      {url: 'images/icon-no.png', label: 'No'},
      {url: 'images/icon-no-reimbursement.png', label: 'No reimbursement'},
      {url: 'images/icon-package-tour.png', label: 'Package tour'},
      {url: 'images/icon-person.png', label: 'Person'},
      {url: 'images/icon-phone-internet.png', label: 'Phone & Internet'},
      {url: 'images/icon-phone-internet-2.png', label: 'Phone & Internet 2'},
      {url: 'images/icon-old-flat.png', label: 'Old flat'},
      {url: 'images/icon-real-estate.png', label: 'Real estate'},
      {url: 'images/icon-reimbursement.png', label: 'Reimbursement'},
      {url: 'images/icon-remodelling.png', label: 'Remodelling'},
      {url: 'images/icon-service-delay.png', label: 'Service delay'},
      {url: 'images/icon-service.png', label: 'Service'},
      {url: 'images/icon-tools.png', label: 'Tools'},
      {url: 'images/icon-travel.png', label: 'Travel'},
      {url: 'images/icon-travel-bus.png', label: 'Travel by bus'},
      {url: 'images/icon-travel-plane.png', label: 'Travel by plane'},
      {url: 'images/icon-travel-ship.png', label: 'Travel by ship'},
      {url: 'images/icon-travel-train.png', label: 'Travel by train'},
      {url: 'images/icon-truck.png', label: 'Truck'},
      {url: 'images/icon-used-car.png', label: 'Used car'},
      {url: 'images/icon-user.png', label: 'User'},
      {url: 'images/icon-yes.png', label: 'Yes'}
    ];

    function getLabel(model) {
      return 'Option';
    }

    function getName(model) {
      return model.name;
    }

    this.iconOptions = iconOptions;

    this.getLabel = getLabel;
    this.getName = getName;
  })

  // Controller that connects the necessary services to the choice element view.
  .controller('ChoiceElementCtrl', function($scope, COLLAPSED_DEFAULT, elementService, itemService) {
    $scope.collapsed = COLLAPSED_DEFAULT;
    $scope.elementService = elementService;
    $scope.itemService = itemService;
    $scope.model = $scope.data.elements[$scope.data.index];
    $scope.model.items = $scope.model.items || [];
    $scope.model.style = $scope.model.style || [];
  })

  // Directive that allows us to re-use the choice element.
  .directive('nnChoiceElement', function() {
    return {
      restrict: 'A',
      controller: 'ChoiceElementCtrl',
      scope: {
        data: '=nnChoiceElement'
      },
      templateUrl: 'components/elements/choice.html'
    };
  });
