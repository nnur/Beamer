app.config(function($routeProvider) {
    $routeProvider

        .when('/edit', {
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .when('/profile', {
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController'
        })
        .when('/', {
            templateUrl: 'views/landingpg/landing-view.html'
        });
});
