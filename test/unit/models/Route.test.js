var bcrypt = require('bcrypt-nodejs');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var request = require('supertest');
var expect = chai.expect;
chai.use(sinonChai);

describe('Route Model', function() {

    afterEach(function(done) {
        // Since we create a User beforeEach test,
        // we have to dump the database afterEach
        // to avoid duplicates
        sails.once('hook:orm:reloaded', done);
        sails.emit('hook:orm:reload');
    });


    it('should destroy the route\'s blogs after deleting the route', function(done) {
        var testUser = {
            email: 'test@email.com',
            password: 'password',
            username: 'test_username',
        };
        var testRoute = {
            routename: 'testRouteName'
        };
        var testBlog = {
            text: 'testText',
            title: 'testTitle'
        };

        Route.create(testRoute).then(function(route) {
            Blog.create(_.extend(testBlog, {
                    owner: route.id
                }))
                .then(function(blog) {

                    Route.afterDestroy([route], function() {
                        Blog.findOne({
                            owner: route.id
                        }).then(function(blog) {
                            expect(blog).to.be.empty;
                            done();
                        });
                    });
                });
        });
    });


    it('should get a route\'s id from it\'s routename', function(done) {
        var testUser = {
            email: 'test@email.com',
            password: 'password',
            username: 'test_username',
        };
        var testRoute = {
            routename: 'testRouteName'
        };

        Route.create(testRoute).then(function(route) {
            Route.getIdFromRoutename(route.routename)
                .then(function(routeid) {
                    expect(routeid).to.equal(route.id);
                    done();
                });
        });
    });

});
