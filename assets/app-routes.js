app.config(function($routeProvider) {
    $routeProvider

        .when('/edit', {
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .when('/profile/:username', {
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController',
            resolve: {
                user: function($route, DS) {
                    var username = $route.current.params.username;
                    return DS.find('users', username);
                }
            }
        })
        .when('/', {
            templateUrl: 'views/landingpg/landing-view.html'
        });
});
