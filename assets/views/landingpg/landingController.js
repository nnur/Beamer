angular.module('beamer.controllers.landing', [])
    .controller('landingController', ['$scope', '$location', '$anchorScroll',
        function($scope, $location, $anchorScroll) {
            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            };
        }
    ]);