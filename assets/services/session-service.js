angular.module('beamer.session', ['angular-jwt'])

.service('sessionService', ['jwtHelper',

    function(jwtHelper, $httpProvider, jwtInterceptorProvider)

    {

        var session;

        function createSession(data) {

            var sessionObj = {};

            sessionObj.expDate = jwtHelper.getTokenExpirationDate(data.token);
            sessionObj.userid = jwtHelper.decodeToken(data.token).id;
            session.token = data.token;

            return sessionObj;
        };

        this.getSession = function(data) {

            if (!session) {

                session = createSession(data);
            }

            return session;

        };

        this.endSession = function() {
            if (jwtHelper.isTokenExpired(session.token)) {
                session = null;
            }
        };
    }
]);