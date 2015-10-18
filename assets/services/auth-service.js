angular.module('beamer.auth', ['beamer.session'])

.service('auth', ['$http', '$location', 'session', '$q',


    function($http, $location, session, $q) {

        this.createNewUser = function(user) {
            // // send user info to server
            $http.post('http://localhost:1337/user/signup', user)
                .success(SignupSuccess)
                .error(SignupError);
        };

        this.loginUser = function(user) {

            // send user info to server
            // $http.post('http://localhost:1337/user/login', user)
            //     .success(LoginSuccess)
            //     .error(LoginError);

            return $q(function(resolve, reject) {
                if (user === 'apples') {
                    resolve('sdf');
                } else {
                    reject('errp');
                }
            });

        };


        //====================== CALLBACK FUNCTIONS ======================//

        //============================ Signup ===========================//

        //signup error for invalid attributes
        function SignupError(data) {
            var errors = Object.keys(data.err.invalidAttributes);
            var length = errors.length;
            for (var i = 0; i < length; i++) {
                if (errors[i] == 'email') {
                    console.log(data.err.invalidAttributes);
                    alert(data.err.invalidAttributes.email[0].message);
                }
            }
        }

        function SignupSuccess(data) {
            console.log(data);
            $location.path("/profile");
        }


        //====================== Login ======================//

        //login error and success

        function LoginSuccess(data) {
            $location.path("/profile");
        }

        function LoginError(data) {
            // alert(data.err)
        }



    }
]);
