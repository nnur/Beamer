app = angular.module('beamer', ['beamer.controllers.profile', 'beamer.controllers.signup',
    'beamer.auth', 'beamer.session', 'ngFileUpload', 'ngRoute'
]);

app.run(function($rootScope, $location) {
    $rootScope.$on('routeChanged', function() {
        alert($location.url());
    });


});
