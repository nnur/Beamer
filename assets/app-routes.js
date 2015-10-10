app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'views/main/main-view.html',
        controller: 'MainController'
    })

    .when('/login', {
        templateUrl: 'views/login/login-view.html',
        controller: 'LoginController'
    })

});