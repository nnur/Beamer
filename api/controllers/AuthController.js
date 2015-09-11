/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');




function _onPassportAuth(req, res, error, user, info) {
    if (error) return res.serverError(error);
    if (!user) return res.unauthorized(null, info && info.code, info && info.message);

    return res.ok({
        // TODO: replace with new type of cipher service
        token: CipherService.createToken(user),
        user: user
    });
}

module.exports = {



    signup: function(req, res) {
        User
            .create(_.omit(req.allParams(), 'id'))
            .then(function(user) {
                return {

                    token: CipherService.createToken(user),
                    user: user,

                };
            })
            .then(res.created)
            .catch(res.serverError);
    },


    signin: function(req, res) {
        passport.authenticate('local',
            _onPassportAuth.bind(this, req, res))(req, res);
    },

    googleSignin: function(req, res) {

        passport.authenticate('google-oauth-jwt', _onPassportAuth.bind(this, req, res))(req, res);

    }

}