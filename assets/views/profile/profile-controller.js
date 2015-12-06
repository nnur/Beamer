angular.module('beamer.views.profile', ['beamer.common.models'])

.controller('ProfileController', ['$scope', '$http', '$resource', 'user',
    'route', 'blog', 'root', 'lemmons',

    function($scope, $http, $resource, user, route, blog, root, lemmons) {
        console.log(lemmons);

        // GET USER INFO
        user.get(function(res) {
            console.log(res);
        }, function(err) {
            console.log(err);
        });
        // var nRoute = new route({
        //     name: "poo"
        // });
        // nRoute.$save();

        // GET ALL ROUTES FOR USER
        route.query(function(res) {
            console.log(res);
        }, function(err) {
            console.log(err);
        });


        blog.query(function(res) {
            console.log(res);
        }, function(err) {
            console.log(err);
        })

    }
]);
