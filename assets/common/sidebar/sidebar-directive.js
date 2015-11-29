angular.module('beamer.common.sidebar', [])

.directive('sideBar', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'common/sidebar/sidebar-directive.html'
    };

});
