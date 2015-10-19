angular.module('beamer.auth', ['beamer.session'])
    .service('auth', ['$http', '$location', 'session', '$q',
        function($http, $location, session, $q) {


            var root = 'http://localhost:1337';

            this.isAuthenticated = function() {
                return session.isValid();
            }

            this.createNewUser = function(user) {
                var promise = $http({
                    method: 'POST',
                    url: root + '/user/signup'
                });

                return promise;
            };


            this.loginUser = function(user) {
                var promise = $http({
                    method: 'POST',
                    url: root + '/user/login'
                });

                return promise;
            }
        }


        this.logout = function() {
            session.destroy();
        }


    ]);



//     //====================== CALLBACK FUNCTIONS ======================//

//     //============================ Signup ===========================//

//     //signup error for invalid attributes
//     function SignupError(data) {
//         var errors = Object.keys(data.err.invalidAttributes);
//         var length = errors.length;
//         for (var i = 0; i < length; i++) {
//             if (errors[i] == 'email') {
//                 console.log(data.err.invalidAttributes);
//                 alert(data.err.invalidAttributes.email[0].message);
//             }
//         }
//     }

//     function SignupSuccess(data) {
//         console.log(data);
//         $location.path("/profile");
//     }


//     //====================== Login ======================//

//     //login error and success

//     function LoginSuccess(data) {
//         $location.path("/profile");
//     }

//     function LoginError(data) {
//         // alert(data.err)
//     }



// }