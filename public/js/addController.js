var addController = angular.module('addController', ['geolocation']);
addController.controller('addController', function($scope, $http, geolocation){ // Dependent on geolocation module
    var latitude = 0;
    var longitude = 0;
    $scope.formData = {};
    var coordinates = {};

    // Set default coordinates (center of North America)
    $scope.formData.latitude = 49.885;
    $scope.formData.longitude = -97.243;

    $scope.createNewUser = function() { // Creates new user with submitted info
        var submittedData = { // Holds submitted data
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favanimal: $scope.formData.favanimal,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            verified: $scope.formData.verified
        };
        $http.post('/users', submittedData) // POST submitted data to database
            .success(function (data) { // Clear forms on submission
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favanimal = "";
            })
            .error(function (data) { // Log error if error occurs
                console.log('Error on Data Submission: ' + data);
            });
    };
});