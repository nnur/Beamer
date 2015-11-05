app = angular.module('beamer', ['beamer.controllers.profile', 'beamer.controllers.signup',
    'beamer.auth', 'beamer.session', 'ngFileUpload', 'ngRoute', 'angular-jwt'
]);

app.constant('UnProtected', ['/signup']);

app.run(function($rootScope, $location, auth, UnProtected) {
    var isRouteProtected = function(route) {
        return !(UnProtected.indexOf(route) > -1);
    };

    $rootScope.$on('$routeChangeStart', function() {
        if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
            $location.path('/signup');
        }
    });
});

app.config(function($httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = ['session', function(session) {
        return session.token;
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
});
