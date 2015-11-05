angular.module('beamer.session', ['angular-jwt'])
    .service('session', ['jwtHelper', function(jwtHelper) {

        /** Extracts token information and saves it in the session*/
        this.create = function(token) {
            this.expDate = jwtHelper.getTokenExpirationDate(token);
            this.userid = jwtHelper.decodeToken(token).id;
            this.token = token;
        };
        /** Sets session attributes to null*/
        this.destroy = function() {
            this.expDate = null;
            this.userid = null;
            this.token = null;
        };
        /** Checks if token is expired and returns the result*/
        this.isValid = function() {
            return jwtHelper.isTokenExpired(this.token);
        };

    }]);
