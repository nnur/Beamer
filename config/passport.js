/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var GoogleStrategy = require('passport-google-oauth-jwt').GoogleOauthJWTStrategy;

var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSEdylandylanEAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER = "naila.com";
var AUDIENCE = "beamer.com";

/**
 * Configuration object for Google strategy
 */
var GOOGLE_CLIENT_ID = "989474824666-j05fo82kpqin3fjts5ari98107lrvu5k.apps.googleusercontent.com"
var GOOGLE_CLIENT_SECRET = "6ATRb5tj052DpzYAN-G97cG6"


/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
    secretOrKey: SECRET,
    issuer: ISSUER,
    audience: AUDIENCE,
    passReqToCallback: false
};




/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
    User.findOne({
        email: email
    })
        .exec(function(error, user) {
            if (error) return next(error, false, {});

            if (!user) return next(null, false, {
                code: 'E_USER_NOT_FOUND',
                message: email + ' is not found'
            });

            // TODO: replace with new cipher service type
            if (!CipherService.comparePassword(password, user))
                return next(null, false, {
                    code: 'E_WRONG_PASSWORD',
                    message: 'Password is wrong'
                });

            return next(null, user, {});
        });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
    var user = payload.user;
    return next(null, user, {});
}


function _onGoogleStrategyAuth(accessToken, loginInfo, refreshToken, done) {
    User.findOne({

        googleEmail: loginInfo.email

    }).exec(function(err, user) {
        if (error) {

            return next(error, false, {});

        } else if (user) {

            return next(null, user, {});

        } else {
            User
                .create(_.omit(req.allParams(), 'id'))
                .then(function(user) {
                    return {

                        token: accessToken,
                        user: user,

                    };
                })
                .then(res.created)
                .catch(res.serverError);
        }


    });
}

//local
passport.use(
    new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
//add jwt to local
passport.use(
    new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

//google with jwt
passport.use(new GoogleStrategy({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, function verify(token, info, refreshToken, done) {
    done(null, {
        email: info.email
    });
}));


module.exports.jwtSettings = {
    expiresInMinutes: EXPIRES_IN_MINUTES,
    secret: SECRET,
    algorithm: ALGORITHM,
    issuer: ISSUER,
    audience: AUDIENCE
};