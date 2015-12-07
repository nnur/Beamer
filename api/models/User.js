/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

    schema: true,

    attributes: {
        email: {
            type: 'email',
            required: 'true',
            unique: true
        },
        username: {
            type: 'string',
            required: 'true',
            unique: true
        },
        encryptedPassword: {
            type: 'string'
        },
        routes: {
            collection: 'route',
            via: 'owner'
        },
        // We don't wan't to send back encrypted password either
        toJSON: function() {
            var obj = this.toObject();

            delete obj.encryptedPassword;
            return obj;
        }
    },

    // Here we encrypt password before creating a User
    beforeCreate: function(values, next) {
        values.encryptedPassword = bcrypt.hashSync(values.password);
        next();
    },

    afterDestroy: function(deletedUsers, next) {
        if (_.has(deletedUsers[0], 'username')) {
            Route.destroy({
                owner: deletedUsers[0].username
            }).exec(function(err, deleted) {
                if (err) {
                    // console.log(err, 'err');
                } else if (deleted) {
                    // console.log(deleted, 'deleted');
                }
            });
        }
        next();
    },

    comparePassword: function(password, user, cb) {
        if (bcrypt.compareSync(password, user.encryptedPassword)) {
            cb(false);
        } else { //err
            cb(true);
        }
    },

    getIdFromUsername: function(username) {
        return User.findOne({
            username: username
        }).then(function(user) {
            return user.id;
        });
    }
};
