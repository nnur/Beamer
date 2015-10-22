app = angular.module('beamer', ['beamer.controllers.profile', 'beamer.controllers.signup',
    'beamer.auth', 'beamer.session', 'ngFileUpload', 'ngRoute'
]);

app.run(function($rootScope, $location, auth) {

    var Protected = ['/profile'];
    var isRouteProtected = function(route) {
        var index = Protected.indexOf(route);

        if (index == -1) { // the route wasn't found to be protected/
            return false;
        } else {
            return true; //the route is protected
        }
    };

    $rootScope.$on('$routeChangeStart', function() {

        if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
            $location.path('/signup');
        }

    });


});
