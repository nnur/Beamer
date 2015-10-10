angular.module('seed-main', [])


.controller('LoginController', ["$scope", "$http",
    function($scope, $http) {

        $scope.user = {
            pwd: 'password',
            email: 'email',
            confirmPwd: 'confirm password'
        };



        $scope.signup = function() {

            if ($scope.user.pwd == $scope.user.confirmPwd) {

                var user = {
                    email: $scope.user.email,
                    password: $scope.user.pwd
                }

                // send user info to server
                $http.post('http://localhost:1337/user/signup', user)
                    .success(function(data, status, headers, config) {

                        console.log(data);

                    }).error(function(data, status, headers, config) {

                        console.log('oops');

                    });


            } else {

                alert("passwords don't match");
            }
        }

    }
]);