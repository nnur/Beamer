var request = require('supertest');
var expect = require('chai').expect;

var token;

// signs up a new user to get token for consecutive tests
beforeEach(function(done) {
    var app = sails.hooks.http.app;
    request(app)
        .post('/user/signup')
        .send({
            email: 'test@email.com',
            password: 'password',
            username: 'test_username'
        })
        .expect(200)
        .end(function(err, res) {
            if (err) {
                return done(err);
            }
            token = res.body.token;
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

//------- SIGNUP -------//
describe('User controller', function() {
    describe('/user/signup', function() {


        it('should create a user if email and username are unique', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/user/signup')
                .send({
                    email: 'unique@email.com',
                    password: 'password',
                    username: 'unique_username'
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    // check the composition of the response
                    var user = res.body.user;
                    expect(user.email).to.equal('unique@email.com');
                    expect(user.username).to.equal('unique_username');
                    expect(user.id).to.be.a('number');
                    expect(res.body.token).to.be.a('string');
                    done();
                });
        });

        it('should return an error code if email or username are not unique',
            function(done) {
                var app = sails.hooks.http.app;
                request(app)
                    .post('/user/signup')
                    .send({
                        email: 'test@email.com',
                        password: 'password',
                        username: 'test_username'
                    })
                    .expect(400)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.err.summary).to.equal('2 attributes are invalid');
                        done();
                    });
            });
    });
    //------- LOGIN -------//
    describe('/user/login', function() {

        it('should respond with user and token if email and password are valid',
            function(done) {

                var app = sails.hooks.http.app;
                request(app)
                    .post('/user/login')
                    .send({
                        email: 'test@email.com',
                        password: 'password'
                    })
                    .end(function(err, res) {
                        // check the composition of the response

                        var user = res.body.user;
                        expect(user.email).to.equal('test@email.com');
                        expect(user.username).to.equal('test_username');
                        expect(user.id).to.be.a('number');
                        expect(res.body.token).to.be.a('string');
                        done();
                    });
            });
    });

    describe('/user/login', function() {
        it('should return error if email/pwd are invalid', function(done) {
            var app = sails.hooks.http.app;
            request(app).post('/user/login').send({
                email: 'test@email.com',
                password: 'wrongPassword'
            }).expect(401).end(function(err, res) {
                // check the composition of the response
                expect(res.body.err).to.equal('invalid password');
                done()
            });
        });
    });

})
