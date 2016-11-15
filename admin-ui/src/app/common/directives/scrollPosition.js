angular.module('nnAdminUi')
        .directive("nnScrollPosition", function ($window) {
            return function(scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    if (this.pageYOffset >= 71) {
                        scope.fixed = true;
                    } else {
                        scope.fixed = false;
                    }
                    scope.$apply();
                });
            };
        });