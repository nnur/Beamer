var request = require('supertest');
var expect = require('chai').expect;

describe('User controller', function() {

    // Keep a global copy of our test user
    // for use in further test
    var testUser = {
        email: 'test@email.com',
        password: 'password',
        username: 'test_username',
        // Token attr to be added after login
    };

    // signs up a new user to get token for consecutive tests
    beforeEach(function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .post('/users/signup')
            .send(testUser)
            .end(function(err, res) {
                if (err) return done(err);
                testUser.token = res.body.data.token;
                done();
            });
    });

    afterEach(function(done) {

        // Since we create a User beforeEach test,
        // we have to dump the database afterEach
        // to avoid duplicates
        sails.once('hook:orm:reloaded', done);
        sails.emit('hook:orm:reload');
    });

    describe('/users/signup', function() {


        it('should create a user if email and username are unique', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/users/signup')
                .send({
                    email: 'unique@email.com',
                    password: 'password',
                    username: 'unique_username'
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    // check the composition of the response
                    var user = res.body.data.user;
                    expect(user.email).to.equal('unique@email.com');
                    expect(user.username).to.equal('unique_username');
                    expect(user.id).to.be.a('number');
                    expect(res.body.data.token).to.be.a('string');
                    done();
                });
        });

        it('should return an error code if email or username are not unique',
            function(done) {
                var app = sails.hooks.http.app;
                request(app)
                    .post('/users/signup')
                    .send(testUser)
                    .expect(400)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.err.summary).to.equal('2 attributes are invalid');
                        done();
                    });
            });
    });


    describe('/users/login', function() {
        it('should respond with user and token if email and password are valid',
            function(done) {

                var app = sails.hooks.http.app;
                request(app)
                    .post('/users/login')
                    .send({
                        email: testUser.email,
                        password: testUser.password
                    })
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        // check the composition of the response
                        var user = res.body.data.user;
                        expect(user.email).to.equal('test@email.com');
                        expect(user.username).to.equal('test_username');
                        expect(user.id).to.be.a('number');
                        expect(res.body.data.token).to.be.a('string');
                        done();
                    });
            });

        it('should return 422 if email is invalid', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/users/login')
                .send({
                    email: 'testWrong@email.com',
                    password: 'password'
                })
                .expect(422)
                .end(function(err, res) {
                    if (err) return done(err);
                    // check the composition of the response
                    expect(res.error.text).to.equal('Invalid login credentials');
                    done();
                });
        });

        it('should return 422 if password is invalid', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/users/login')
                .send({
                    email: 'test@email.com',
                    password: 'wrongPassword'
                })
                .expect(422)
                .end(function(err, res) {
                    if (err) return done(err);
                    // check the composition of the response
                    expect(res.error.text).to.equal('Invalid login credentials');
                    done();
                });
        });

        it('should return 400 if email or password is undefined', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/users/login')
                .send({})
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    // check the composition of the response
                    expect(res.error.text).to.equal('Undefined email or password');
                    done();
                });
        });
    });


    describe('/users/', function() {
        it('should not retrieve a list of all users, even with a token', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .get('/users')
                .set('Authorization', testUser.token)
                .expect(403)
                .expect('Forbidden', done);
        });
    });


    describe('/users/:username', function() {

        it('should GET a user by username', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .get('/users/' + testUser.username)
                .set('Authorization', 'Bearer ' + testUser.token)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var user = res.body.data;
                    expect(user.email).to.equal('test@email.com');
                    expect(user.username).to.equal('test_username');
                    expect(user.id).to.be.a('number');
                    done();
                });
        });

        it('should return a 401 if the token and username don\'t correspond', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .put('/users/' + testUser.username)
                .set('Authorization', 'Bearer ' + 'badToken')
                .send({
                    email: 'UPDATED@email.com'
                })
                .expect(401)
                .expect('Unauthorized', done);
        });

        it("should not update the user with invalid attributes", function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .put('/users/' + testUser.username)
                .set('Authorization', 'Bearer ' + testUser.token)
                .send({
                    email: '',
                    bananas: ['bigOnes', 'littleOnes']
                })
                .expect(400, done);
        });

        it("should return the deleted user data on DELETE", function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .delete('/users/' + testUser.username)
                .set('Authorization', 'Bearer ' + testUser.token)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var user = res.body.data;
                    expect(user.email).to.equal('test@email.com');
                    expect(user.username).to.equal('test_username');
                    expect(user.id).to.be.a('number');
                    done();
                });
        });

        it("should remove the user from the database on DELETE", function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .delete('/users/' + testUser.username)
                .set('Authorization', 'Bearer ' + testUser.token)
                .end(function(err, res) {
                    if (err) return done(err);
                    request(app)
                        .get('/users/' + testUser.username)
                        .set('Authorization', 'Bearer ' + testUser.token)
                        .expect(401);
                    done();
                });
        });

        it("should remove the user from the database on DELETE", function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .delete('/users/' + testUser.username)
                .set('Authorization', 'Bearer ' + testUser.token)
                .end(function(err, res) {
                    if (err) return done(err);
                    request(app)
                        .get('/users/' + testUser.username)
                        .set('Authorization', 'Bearer ' + testUser.token)
                        .expect(401);
                    done();
                });
        });
    });
});
