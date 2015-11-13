app.config(function($routeProvider) {
    $routeProvider

    .when('/profile', {
        templateUrl: 'views/profile/profile-view.html',
        controller: 'ProfileController'
    })
        .when('/signup', {
            templateUrl: 'views/signup/signup-view.html',
            controller: 'SignupController'
        })
        .when('/poop', {
            templateUrl: 'views/landingpg/landing-view.html'
        })
        .otherwise('/signup');
});