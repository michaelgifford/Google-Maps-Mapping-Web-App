angular.module('gmapsservice', []) // gmapsservice factory. Interacts with Google Maps
.factory('gmapsservice', function($http){
        var gMapService = {}; // Service returned by factory
        var locationsArray = []; // Locations from calls to API
        var selectedLatitude = 40.236; // User's selected location
        var selectedLongitude = -99.996;
        gMapService.clickLat = 0; // Handles clicks and location select
        gMapService.clickLong = 0;

        gMapService.refreshMap = function(latitude, longitude){ // Refresh map data
            locationsArray = []; // Clear locations
            selectedLongitude = longitude; // Set longitude and latitude to provided values
            selectedLatitude = latitude;  

            $http.get('/users').success(function(response){ // AJAX GET for all user records
                locationsArray = toGoogleMapPoints(response); // Convert locations to points in Google Map format
                initializeMap(latitude, longitude); // Initialize map
            }).error(function(){});
        };

        var toGoogleMapPoints = function(response){ // Convert user longitude and latitudes to google map points
            var locationsArray = []; // Clear locations

            for(var i= 0; i < response.length; i++) { // Loop through response JSON data
                var user = response[i]; // Set user to entry

                var  dataStr = // Popup window on map for each entry
                '<p><b>Username</b>: ' + user.username +
                '<br><b>Age</b>: ' + user.age +
                '<br><b>Gender</b>: ' + user.gender +
                '<br><b>Favorite Animal</b>: ' + user.favanimal +
                '</p>';

                locationsArray.push({ // Conversion of longitude and latitude to Google Maps format
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: dataStr,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favanimal: user.favanimal
                });
            }
        return locationsArray; // return locationsArray in Google Maps format
    };

var initializeMap = function(latitude, longitude) { // Initializes map
    var selectedCoords = {lat: selectedLatitude, lng: selectedLongitude}; // Selected coords act as start point

    if (!map){ // Check that map is not created yet
        var map = new google.maps.Map(document.getElementById('map'), { // Create new map
            zoom: 3,
            center: selectedCoords
        });
    }

    locationsArray.forEach(function(n, i){ // Place marker at each location in array
        var userMarker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        google.maps.event.addListener(userMarker, 'click', function(e){ // Add click listener to each marker
            currentSelectedMarker = n;
            n.message.open(map, userMarker); // On click open message specific to marker
        });
    });

    var defaultLocation = new google.maps.LatLng(latitude, longitude); // Set default location to red marker
    var userMarker = new google.maps.Marker({
        position: defaultLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = userMarker;

    map.panTo(new google.maps.LatLng(latitude, longitude)); // Function that pans map to specified location

    google.maps.event.addListener(map, 'click', function(e){
        var userMarker = new google.maps.Marker({
            position: e.latLng,
            animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

    if(lastMarker){ // Delete old red marker when new one specified
        lastMarker.setMap(null);
        }

    lastMarker = userMarker; // Create new red marker
    map.panTo(userMarker.position); // Pan to new red marker
    });
};

google.maps.event.addDomListener(window, 'load', // Reload page with default latitude and longitude on window load
    gMapService.refreshMap(selectedLatitude, selectedLongitude));

return gMapService;
});