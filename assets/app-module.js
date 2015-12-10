app = angular.module('beamer', ['beamer.views.edit', 'beamer.views.profile',
    'beamer.common.login', 'beamer.common.auth', 'beamer.common.session',
    'beamer.common.sidebar', 'beamer.common.routeListItem', 'ngFileUpload',
    'ngResource', 'ngRoute', 'angular-jwt', 'smoothScroll', 'js-data'
]);


app.config(function($httpProvider, $locationProvider, jwtInterceptorProvider) {
    // Send a jwt on all http requests
    jwtInterceptorProvider.tokenGetter = ['session',
        function(session) {
            return session.token;
        }
    ];
    $httpProvider.interceptors.push('jwtInterceptor');
    $locationProvider.html5Mode(true);
});

// Routes which don't require jwts to access
app.constant('unprotected', ['/']);
app.constant('root', 'http://localhost:1337');

app.run(function($rootScope, $location, auth, unprotected, DS) {

    // This establishes route protection when the app starts.
    var isRouteProtected = function(route) {
        return !_.contains(unprotected, route);
    };

    $rootScope.$on('$routeChangeStart', function() {
        if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
            $location.path('/signup');
        }
    });



    DS.defineResource({
        name: 'users',
        idAttribute: 'username',
        // set just for this resource
        afterFind: function(resource, data, cb) {
            // do something more specific to "users"
            console.log(data);
            cb(null, data.data);
        }
    });
});
