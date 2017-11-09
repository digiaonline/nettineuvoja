'use strict';

angular.module('nnConsumerUi')

  .service('summaryService', function() {

    function calculateDemandTotal(model) {
      if (!model) {
        return 0;
      }
      var total = 0;
      angular.forEach(['postikulut', 'matkakulut', 'puhelinkulut', 'muut_kulut'], function(value) {
        if (model[value]) {
          total += parseInt(model[value]);
        }
      });
      return total;
    }

    this.calculateDemandTotal = calculateDemandTotal;
  })

  .controller('SummaryCtrl', function($log, $scope, summaryService, slideService, storageService, languageService) {
    function buildSummaryData(model) {
      var slide,
        summaryData = [],
        element,
        items,
        text;

      angular.forEach(model, function(value, key) {
        slide = slideService.getByName(key);

        if (slide && !slide.exclude_from_summary) {
          items = [];

          angular.forEach(value, function(elementValue, elementKey) {
            element = slideService.getElement(key, elementKey);
            if (element) {
              switch (element.type) {
                case 'choice':
                  angular.forEach(element.items, function(item) {
                    if ((angular.isString(elementValue) && item.name == elementValue) || elementValue[item.name]) {
                      items.push(translate(item.label));
                    }
                  });
                  break;
                case 'form':
                  angular.forEach(element.items, function(item) {
                    if (elementValue.total && item.type === 'total') {
                      text = '';

                      if (item.label) {
                        text += translate(item.label) + ' ';
                      }

                      text += elementValue.total;

                      items.push(text);
                    }
                    if (elementValue[item.name]) {
                      switch (item.type) {
                        case 'checkbox':
                          items.push(translate(item.label));
                          break;
                        case 'dropdown':
                          angular.forEach(item.items, function(dropdownItem) {
                            if (dropdownItem.name === elementValue[item.name]) {
                              items.push(translate(item.label) + ': ' + translate(dropdownItem.label));
                            }
                          });
                          break;
                        case 'file':
                          break;
                        case 'multiselect':
                          text = '';

                          if (item.label) {
                            text += translate(item.label) + ': ';
                          }

                          text += elementValue[item.name].split('|').join(', ');

                          items.push(text);
                          break;
                        default:
                          text = '';

                          if (item.label) {
                            text += translate(item.label) + ': ';
                          }

                          text += elementValue[item.name];

                          items.push(text);
                      }
                    }
                  });
                  break;
              }
            }
          });

          summaryData.push({
            label: translate(slide.summary_label) || translate(slide.label),
            items: items
          });
        }
      });

      $log.debug('Summary data built', summaryData);
      $scope.summaryData = summaryData;
    }

    function translate(item) {
      return languageService.translate(item, $scope.activeLanguage);
    }

    buildSummaryData($scope.model);

    storageService.observeStorage()
      .then(null, null, function(key) {
        if (key === 'nnSession') {
          buildSummaryData(storageService.get('nnSession').model);
        }
      });

    $scope.service = summaryService;
    $scope.slideService = slideService;
    $scope.translate = translate;
  })

  .directive('nnSummary', function() {
    return {
      restrict: 'A',
      controller: 'SummaryCtrl',
      scope: {
        model: '=nnSummary',
        activeLanguage: '=nnSummaryLanguage'
      },
      templateUrl: 'components/summary/summary.html'
    };
  });
