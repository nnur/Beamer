angular.module('seed-main', [])


.controller('MainController', ["$scope", "$http", 'Upload',

    function($scope, $http, Upload) {

        $scope.blog = {
            title: 'titillate'
        };

        $scope.files = {};

        $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });

        $scope.publish = function() {



            // Send text content
            $http.post('http://localhost:8000/blog', $scope.blog).
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log('oops');
            });


            $scope.blog = {};

        }


        //send img content
        $scope.upload = function(files) {

            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    Upload.upload({

                        url: 'http://localhost:8000/img',
                        file: file

                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function(data, status, headers, config) {

                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    });
                }
            }

        }
    }
]);