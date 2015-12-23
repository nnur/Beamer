module.exports = function(req, res, next) {
    var encryptedToken;

    if (_.has(req, 'headers') && _.has(req.headers, 'authorization')) {
        var parts = req.headers.authorization.split(' ');
        var scheme = parts[0];
        encryptedToken = parts[1];

        if (scheme !== 'Bearer') {
            return res.badRequest('Format is Authorization: Bearer <token>');
        }

    } else {
        return res.badRequest('No Authorization header was found');
    }

    jwToken.verify(encryptedToken, function(err, token) {
        if (err) return res.badCredentials('Invalid Token');
        req.token = token; // This is the decrypted token or the payload you provided

        User.getIdFromUsername(req.param('username')).then(function(userid) {
            if (req.token.id != userid) {
                return res.unauthorized('Token does not belong to the user!');
            }
            next();
        }).catch(function(err) {
            res.badCredentials('Invalid username');
            next();
        });

    });
};
