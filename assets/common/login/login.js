angular.module('beamer.common.login', [])
    .controller('LoginController', ['$scope', 'auth', '$location',
        LoginController
    ])
    .directive('loginForm', loginDirective);
