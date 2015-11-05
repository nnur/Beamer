app = angular.module('beamer', ['beamer.controllers.profile', 'beamer.controllers.signup',
    'beamer.auth', 'beamer.session', 'ngFileUpload', 'ngRoute', 'angular-jwt'
]);

app.config(function($httpProvider, jwtInterceptorProvider) {
    // Send a jwt on all http requests
    jwtInterceptorProvider.tokenGetter = ['session', function(session) {
        return session.token;
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
});

// Routes which don't require jwts to access
app.constant('unprotected', ['/signup']);

app.run(function($rootScope, $location, auth, unprotected) {

    // This establishes route protection when the app starts.
    var isRouteProtected = function(route) {
        return !_.contains(unprotected, route);
    };

    $rootScope.$on('$routeChangeStart', function() {
        if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
            $location.path('/signup');
        }
    });
});
