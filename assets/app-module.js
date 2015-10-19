app = angular.module('beamer', ['beamer.controllers.profile', 'beamer.controllers.signup',
    'beamer.auth', 'beamer.session', 'ngFileUpload', 'ngRoute', 'angular-jwt'
]);

app.run(function($rootScope) {
    $rootScope.$on('logout', function() {
        alert('aay')
    });
});