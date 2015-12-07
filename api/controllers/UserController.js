/**
 * UserController
 *
 * @description::Server - side logic
 for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {

    actionForbidden: function(req, res) {
        res.forbidden();
    },

    signup: function(req, res) {
        User.create(req.body).exec(function(err, user) {
            if (err) {
                return res.json(err.status, {
                    err: err
                });
            }
            // If user created successfuly we return user and token as response
            if (user) {
                // NOTE: payload is { id: user.id}
                res.send(201, {
                    data: {
                        user: user,
                        token: jwToken.issue({
                            id: user.id
                        })
                    }
                });
            }
        });
    },

    login: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        if (_.isUndefined(email) || _.isUndefined(password)) {
            return res.badRequest('Undefined email or password'); //400
        }

        User.findOne({
            email: email
        }).then(function(user) {
            User.comparePassword(password, user, function(err) {
                if (err) {
                    return res.badCredentials(); // password doesnt match account
                } else {
                    res.send({
                        data: {
                            user: user,
                            token: jwToken.issue({
                                id: user.id
                            })
                        }
                    });
                }
            });
        }).catch(function(err) {
            return res.badCredentials(); // email not found
        });

    },

    updateEmail: function(req, res) {
        User.update({
            username: req.param('username')
        }, {
            email: req.body.email
        }).then(function(updatedUsers) {
            console.log('herrreee');
            res.send({
                data: updatedUsers[0]
            });
        }).catch(function(err) {
            res.badRequest(err.summary);
        });
    },

    deleteUser: function(req, res) {
        User.destroy({
            username: req.param('username')
        }).then(function(deleted) {
            delete deleted[0].encryptedPassword
            res.send({
                data: deleted[0]
            });
        }).catch(function(err) {
            res.send(err);
        });
    },

    getUser: function(req, res) {

        User.findOne({
            username: req.param('username')
        }).then(function(user) {
            res.send({
                data: user
            });
        }).catch(function(err) {
            res.send(err);
        });
    }
};
