app.config(function($routeProvider) {
    $routeProvider

    .when('/profile', {
        templateUrl: 'views/main/main-view.html',
        controller: 'MainController'
    })

    .when('/signup', {
        templateUrl: 'views/signup/signup-view.html',
        controller: 'SignupController'
    })

});