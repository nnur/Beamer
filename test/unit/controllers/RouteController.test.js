var request = require('supertest');
var expect = require('chai').expect;

describe('Route controller', function() {

    // Keep a global copy of our test user
    // for use in further test
    var testUser = {
        email: 'test@email.com',
        password: 'password',
        username: 'test_username',
        // Token attr to be added after login
    };

    var testRoute = {
        routename: 'testRouteName'
    };

    // signs up a new user to get token for consecutive tests
    beforeEach(function(done) {
        var app = sails.hooks.http.app;

        // Create a user
        request(app)
            .post('/users/signup')
            .send(testUser)
            .end(function(err, res) {
                testUser.token = res.body.data.token;
                testUser.id = res.body.data.user.id;
                // give that user some routes
                request(app)
                    .post('/users/' + testUser.username + '/routes')
                    .set('Authorization', 'Bearer ' + testUser.token)
                    .send(testRoute)
                    .end(function(err, res) {
                        done();
                    });
            });
    });

    afterEach(function(done) {
        // Since we create a User beforeEach test,
        // we have to dump the database afterEach
        // to avoid duplicates
        sails.once('hook:orm:reloaded', done);
        sails.emit('hook:orm:reload');
    });

    describe('user/:username/routes', function() {
        it('should GET all of a user\'s routes', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .get('/users/' + testUser.username + '/routes/')
                .set('Authorization', 'Bearer ' + testUser.token)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.data.routes.length).to.equal(1);
                    var route = res.body.data.routes[0];
                    expect(route.routename).to.equal('testRouteName');
                    expect(route.owner).to.be.a('number');
                    expect(route.id).to.be.a('number');
                    done();
                });
        });

        it('should CREATE a route with a unique name', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/users/' + testUser.username + '/routes/')
                .set('Authorization', 'Bearer ' + testUser.token)
                .send({
                    routename: 'UniqueRoute',
                    owner: testUser.username
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var route = res.body.data;
                    expect(route.routename).to.equal('UniqueRoute');
                    expect(route.owner).to.equal(testUser.id);
                    expect(route.id).to.be.a('number');
                    done();
                });
        });

        it('should not CREATE a route with a duplicate name', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .post('/users/' + testUser.username + '/routes/')
                .set('Authorization', 'Bearer ' + testUser.token)
                .send({
                    routename: testRoute.routename,
                    owner: testUser.username
                })
                .expect(409)
                .expect('Conflict', done);
        });

        it('should UPDATE a route with a unique route name', function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .put('/users/' + testUser.username + '/routes/' + testRoute.routename)
                .set('Authorization', 'Bearer ' + testUser.token)
                .send({
                    routename: 'updatedRouteName'
                })
                .expect(200).end(function(err, res) {
                    if (err) return done(err);
                    var updatedRoute = res.body.data;
                    expect(updatedRoute.routename).to.equal('updatedRouteName');
                    expect(updatedRoute.owner).to.equal(testUser.id);
                    expect(updatedRoute.id).to.be.a('number');
                    done();
                });
        });

        it('should not UPDATE a route with a unique route name', function(done) {
            var app = sails.hooks.http.app;

            // Create a second route for the test user
            request(app)
                .post('/users/' + testUser.username + '/routes')
                .set('Authorization', 'Bearer ' + testUser.token)
                .send({
                    routename: 'secondRoute'
                })
                .end(function(err, res) {
                    // Try to rename secondRoute to be a duplicate of 'testRouteName'
                    request(app)
                        .put('/users/' + testUser.username + '/routes/' + 'secondRoute')
                        .set('Authorization', 'Bearer ' + testUser.token)
                        .send({
                            routename: 'testRouteName'
                        })
                        .expect(409, done);
                });
        });

        it('should return a DELETED route', function(done) {
            var app = sails.hooks.http.app;

            // Create a second route for the test user
            request(app)
                .delete('/users/' + testUser.username + '/routes/' + testRoute.routename)
                .set('Authorization', 'Bearer ' + testUser.token)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var deletedRoute = res.body.data;
                    expect(deletedRoute.routename).to.equal(testRoute.routename);
                    expect(deletedRoute.owner).to.equal(testUser.id);
                    expect(deletedRoute.id).to.be.a('number');
                    done();
                });
        });

        it("should remove the route from the database on DELETE", function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .delete('/users/' + testUser.username + '/routes/' + testRoute.routename)
                .set('Authorization', 'Bearer ' + testUser.token)
                .end(function(err, res) {
                    if (err) return done(err);
                    request(app)
                        .get('/users/' + testUser.username + '/routes/')
                        .set('Authorization', 'Bearer ' + testUser.token)
                        .end(function(err, res) {
                            if (err) return done(err);
                            expect(res.body.data.routes.length).to.equal(0);
                            done();
                        });
                });
        });

        it("should not DELETE a route that doesn't exist", function(done) {
            var app = sails.hooks.http.app;
            request(app)
                .delete('/users/' + testUser.username + '/routes/' + 'wrongRoute')
                .set('Authorization', 'Bearer ' + testUser.token)
                .expect(404, done);
        });
    });


});
