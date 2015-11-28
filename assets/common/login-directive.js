angular.module('beamer.directives.loginForm', [])

.directive('loginForm', function() {

    return {
        templateUrl: "common/login-directive.html",
        controller: 'SignupController'
    };

});
