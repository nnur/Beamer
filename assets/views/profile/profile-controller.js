/** profile */

angular.module('beamer.controllers.profile', [])

.controller('ProfileController', ["$scope", "$http", 'Upload',

    function($scope, $http, Upload) {

        $scope.blog = {
            title: "How to quit your job and blow your nips off"
        };

        // $scope.files = {};

        // $scope.$watch('files', function() {
        //     $scope.upload($scope.files);
        // });


        $scope.publish = function() {
            var blog = {
                title: $scope.blog.title,
                body: $scope.blog.body,
                userid: 'hinkypinky'
            };

            $http.post('http://localhost:1337/blog/create', blog).
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });

            $scope.blog = {};
        };


        //send img content
        $scope.upload = function(files) {

            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    Upload.upload({
                        url: 'http://localhost:1337/blog/img',
                        file: file

                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function(data, status, headers, config) {

                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    });
                }
            }

        };
    }
]);
