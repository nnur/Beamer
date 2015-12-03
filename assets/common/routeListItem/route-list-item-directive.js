angular.module('beamer.common.routeListItem', [])
    .directive('routeListItem', function() {
        return {
            restrict: 'E',
            templateUrl: 'common/routeListItem/route-list-item-directive.html'
        };
    });
