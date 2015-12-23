var bcrypt = require('bcrypt-nodejs');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var request = require('supertest');
var expect = chai.expect;
chai.use(sinonChai);

describe('User Model', function() {
    afterEach(function(done) {
        // Since we create a User beforeEach test,
        // we have to dump the database afterEach
        // to avoid duplicates
        sails.once('hook:orm:reloaded', done);
        sails.emit('hook:orm:reload');
    });

    it('should encrypt the user\'s password', function() {
        var bcrptySpy = sinon.stub(bcrypt, 'hashSync', function(password) {
            return 'encryptedPassword';
        });
        var nextSpy = sinon.spy();
        var testUser = {
            password: 'testPassword'
        };
        User.beforeCreate(testUser, nextSpy);
        expect(testUser.encryptedPassword).to.equal('encryptedPassword');
        expect(bcrptySpy.calledWith('testPassword')).to.be.true;
        expect(nextSpy.called).to.be.true;
    });

    it('should destroy the user\'s routes after deleting the user', function(done) {
        var testUser = {
            email: 'test@email.com',
            password: 'password',
            username: 'test_username',
        };
        var testRoute = {
            routename: 'testRouteName'
        };
        User.create(testUser).then(function(user) {
            Route.create(_.extend(testRoute, {
                    owner: user.id
                }))
                .then(function(route) {
                    User.afterDestroy([user], function() {
                        Route.findOne({
                            owner: user.id
                        }).then(function(route) {
                            expect(route).to.be.empty;
                            done();
                        });
                    });
                });
        });
    });

    it('should take a password and check if it\'s correct', function() {
        var bcryptSpy = sinon.stub(bcrypt, 'compareSync', function(password, encryptedPassword) {
            return true;
        });
        var user = {
            encryptedPassword: 'anothertestpwd'
        };
        User.comparePassword('testPassword', user);
        expect(bcryptSpy.calledWith('testPassword', user.encryptedPassword)).to.be.true;
    });

    it('should get a user\'s id from it\'s username', function(done) {
        var testUser = {
            email: 'test@email.com',
            password: 'password',
            username: 'test_username',
        };
        User.create(testUser).then(function(user) {
            User.getIdFromUsername(user.username)
                .then(function(userid) {
                    expect(userid).to.equal(user.id);
                    done();
                });
        });
    });

});
