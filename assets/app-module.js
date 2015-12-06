app = angular.module('beamer', ['beamer.views.edit', 'beamer.views.profile',
    'beamer.common.login', 'beamer.common.auth', 'beamer.common.session',
    'beamer.common.sidebar', 'beamer.common.routeListItem', 'beamer.common.models',
    'ngFileUpload', 'ngResource', 'ngRoute', 'angular-jwt', 'smoothScroll'
]);

app.config(function($httpProvider, jwtInterceptorProvider) {
    // Send a jwt on all http requests
    jwtInterceptorProvider.tokenGetter = ['session',
        function(session) {
            // return session.token;
            return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2NjEzNTA5M2QyNDExYWZmNWMxMjNlOCIsImlhdCI6MTQ0OTI4MDgwNCwiZXhwIjoxNDQ5MzgwODAzfQ._8CfHpxTQO5FIw4K5-jCYtg7MSEHf4sTwaolirqi8Rg'
        }
    ];

    $httpProvider.interceptors.push('jwtInterceptor');
});

// Routes which don't require jwts to access
app.constant('unprotected', ['/signup', '/poop']);
app.constant('root', 'http://localhost:1337');

app.run(function($rootScope, $location, auth, unprotected) {

    // This establishes route protection when the app starts.
    var isRouteProtected = function(route) {
        return !_.contains(unprotected, route);
    };

    $rootScope.$on('$routeChangeStart', function() {
        // if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
        //     $location.path('/signup');
        // }
    });
});
