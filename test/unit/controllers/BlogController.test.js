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

    var testBlog = {
        text: 'testText',
        title: 'testTitle'
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
                        testRoute.id = res.body.data.id;

                        request(app)
                            .post('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/')
                            .set('Authorization', 'Bearer ' + testUser.token)
                            .send(testBlog)
                            .end(function(err, res) {
                                testBlog.id = res.body.data.id;
                                done();

                            });
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

    it('should get all blogs belonging to a route', function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .get('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/')
            .set('Authorization', 'Bearer ' + testUser.token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.data.blogs.length).to.equal(1);
                var blog = res.body.data.blogs[0];
                expect(blog.text).to.equal('testText');
                expect(blog.title).to.equal('testTitle');
                expect(blog.owner).to.equal(testRoute.id);
                expect(blog.id).to.be.a('number');
                done();
            });

    });

    it('should CREATE a route with a unique name', function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .post('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/')
            .set('Authorization', 'Bearer ' + testUser.token)
            .send({
                text: 'UniqueBlogText',
                title: 'UniqueBlogTitle'
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                var blog = res.body.data;
                expect(blog.title).to.equal('UniqueBlogTitle');
                expect(blog.text).to.equal('UniqueBlogText');
                expect(blog.owner).to.equal(testRoute.id);
                expect(blog.id).to.be.a('number');
                done();
            });
    });


    it('should not CREATE a blog with a duplicate name', function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .post('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/')
            .set('Authorization', 'Bearer ' + testUser.token)
            .send({
                title: testBlog.title,
                text: testBlog.text
            })
            .expect(409)
            .expect('Conflict', done);
    });

    it('should UPDATE a blog with a unique attributes', function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .put('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/' + testBlog.id)
            .set('Authorization', 'Bearer ' + testUser.token)
            .send({
                title: 'updatedBlogTitle',
                text: 'updatedBlogText'
            })
            .expect(200).end(function(err, res) {
                if (err) return done(err);

                var blog = res.body.data;
                expect(blog.title).to.equal('updatedBlogTitle');
                expect(blog.text).to.equal('updatedBlogText');
                expect(blog.owner).to.equal(testRoute.id);
                expect(blog.id).to.be.a('number');
                done();
            });
    });

    it('should not UPDATE a blog with a duplicate blog name', function(done) {
        var app = sails.hooks.http.app;

        // Create a second route for the test user
        request(app)
            .post('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/')
            .set('Authorization', 'Bearer ' + testUser.token)
            .send({
                title: 'AnotherBlogTitle',
                text: 'AnotherBlogText'
            })
            .end(function(err, res) {
                // Try to rename secondRoute to be a duplicate of 'testRouteName'
                request(app)
                    .put('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/' + res.body.id)
                    .set('Authorization', 'Bearer ' + testUser.token)
                    .send({
                        title: 'testTitle',
                        text: 'testText'
                    })
                    .expect(409, done);
            });
    });

    it('should return a DELETED blog', function(done) {
        var app = sails.hooks.http.app;

        // Create a second route for the test user
        request(app)
            .delete('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/' + testBlog.id)
            .set('Authorization', 'Bearer ' + testUser.token)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                var blog = res.body.data;
                expect(blog.text).to.equal('testText');
                expect(blog.title).to.equal('testTitle');
                expect(blog.owner).to.equal(testRoute.id);
                expect(blog.id).to.be.a('number');
                done();
            });
    });

    it("should remove the blog from the database on DELETE", function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .delete('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/' + testBlog.id)
            .set('Authorization', 'Bearer ' + testUser.token)
            .end(function(err, res) {
                if (err) return done(err);
                request(app)
                    .get('/users/' + testUser.username + '/routes/' + '/blogs/' + testBlog.id)
                    .set('Authorization', 'Bearer ' + testUser.token)
                    .expect(404)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body).to.be.empty;
                        done();
                    });
            });
    });

    it("should not DELETE a blog that doesn't exist", function(done) {
        var app = sails.hooks.http.app;
        request(app)
            .delete('/users/' + testUser.username + '/routes/' + testRoute.routename + '/blogs/' + 'wrongBlog')
            .set('Authorization', 'Bearer ' + testUser.token)
            .expect(404, done);
    });
});
