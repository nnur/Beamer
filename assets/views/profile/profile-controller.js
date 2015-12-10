angular.module('beamer.views.profile', [])

.controller('ProfileController', ['$scope', 'user',
    function($scope, user) {
        console.log('IN PROFILE CONTROLLER', user);
    }
]);
