var addController = angular.module('addController', ['geolocation', 'gmapsservice']);
addController.controller('addController', function($scope, $http, $rootScope, geolocation, gmapsservice){ 
    var latitude = 0;
    var longitude = 0;
    $scope.formData = {};
    var coordinates = {};

    // Set default coordinates near center of North America
    $scope.formData.latitude = 40.236;
    $scope.formData.longitude = -99.996;

    $rootScope.$on("mapclick", function(){ // Get coords of mouse click event on click
        $scope.$apply(function(){ // Gather coords with gmapsservice functions
            $scope.formData.latitude = parseFloat(gmapsservice.latitudeClick).toFixed(4);
            $scope.formData.longitude = parseFloat(gmapsservice.longitudeClick).toFixed(4);
            $scope.formData.verified = "Not Verified";
        });
    });

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
            .success(function (data) {
                $scope.formData.username = ""; // Clear forms on submission
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favanimal = "";
                gmapsservice.refreshMap($scope.formData.latitude, $scope.formData.longitude); // Reload the map
            })
            .error(function (data) { // Log error if error occurs
                console.log('Error on Data Submission: ' + data);
            });
    };
});