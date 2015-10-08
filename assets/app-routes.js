app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'views/main/main-view.html',
        controller: 'MainController'
    })

});