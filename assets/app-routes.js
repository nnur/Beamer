app.config(function($routeProvider) {
    $routeProvider

        .when('/edit', {
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .when('/profile/:id', {
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController',
            resolve: {
                lemmons: function($route) {
                    return $route;
                }
            }
        })
        .when('/', {
            templateUrl: 'views/landingpg/landing-view.html'
        });
});
