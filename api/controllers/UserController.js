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
        User.create(req.body).then(function(user) {
            res.send(201, {
                data: {
                    user: user,
                    token: jwToken.issue({
                        id: user.id
                    })
                }
            });
        }).catch(function(err) {
            return res.send(err.status, {
                err: err
            });
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
            return User.comparePassword(password, user)
                .then(function() {
                    res.send({
                        data: {
                            user: user,
                            token: jwToken.issue({
                                id: user.id
                            })
                        }
                    });
                });
        }).catch(function(err) {
            return res.badCredentials({
                errors: ['Invalid login credentials']
            }); // email not found
        });

    },

    updateEmail: function(req, res) {
        User.update({
            username: req.param('username')
        }, {
            email: req.body.email
        }).then(function(updatedUsers) {
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
            delete deleted[0].encryptedPassword;
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
            })
            .populate('routes')
            .exec(function(err, data) {
                console.log(data);
                res.send({
                    data: {
                        user: data
                    }
                });
            });
        //         User.findOne({
        //     username: req.param('username')
        // }).then(function(user) {
        //     res.send({
        //         data: user
        //     });
        // }).catch(function(err) {
        //     res.send(err);
        // });
    }
};
