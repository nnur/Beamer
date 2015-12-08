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

        var app = sails.hooks.http.app;
        // Create a user
        request(app)
            .post('/users/signup')
            .send(testUser)
            .end(function(err, res) {
                testUser.token = res.body.data.token;
                testUser.id = res.body.data.user.id;
                // give that user a route
                request(app)
                    .post('/users/' + testUser.username + '/routes/')
                    .set('Authorization', 'Bearer ' + testUser.token)
                    .send(testRoute)
                    .end(function(err, res) {
                        // find the user that was created
                        User.findOne(testUser.id).exec(function(err, user) {
                            // afterDestroy should delete route
                            User.afterDestroy([user], function() {
                                Route.findOne({
                                    owner: testUser.id
                                }).exec(function(err, routes) {
                                    expect(routes).to.be.empty;
                                    done();
                                });
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

        var app = sails.hooks.http.app;
        // Create a user
        request(app)
            .post('/users/signup')
            .send(testUser)
            .end(function(err, res) {
                User.getIdFromUsername(testUser.username)
                    .then(function(userid) {
                        expect(userid).to.equal(res.body.data.user.id);
                        done();
                    });
            });
    });

});
