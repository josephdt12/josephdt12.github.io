/**
 * Retrieves the URL(s) of scripts passed in via arr.
 * Allows for dynamic script grabbing rather than loading them even when the page
 * is not being accessed yet.
 */
$.getMultipleScripts = function(arr) {
    // Create array of the scripts
    var _arr = $.map(arr, function(src) {
        return $.getScript("" + src);
    });

    _arr.push($.Deferred(function(deferred) {
        $(deferred.resolve);
    }));

    return $.when.apply($, _arr) ;
}

/**
 * When the page is ready, the Google Maps API script is grabbed, and once it's done
 * the JSON file is then grabbed, and once thats done, the map is initialized.
 */
var locations = []
$('document').ready(function() {
    var srcs = [
        'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCGVeG2mBFY_RVyNjrT9j3Hu0bgeIDnrlg'
    ];

    $.getMultipleScripts(srcs).done(function() {
        $.when($.getJSON("projects/reddit-wallpapers/geolocations.json", function(json) {
            locations = json['locations'];
        })).then(function() {
            initMap(locations);
        });
    })
});

/**
 * Places markers on the map based on the JSON data, setting the first pin
 * to the first location.
 */
var map, initialized = false, currentLocation = 0;
function initMap(locations) {
  document.getElementById("currentLocation").textContent = "Current location: " + locations[0]['addr'];
  var firstLocation = new google.maps.LatLng(locations[0]['lat'], locations[0]['lng']);

  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: firstLocation
  });

  for (var i = 0; i < locations.length; ++i) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i]['lat'], locations[i]['lng']),
        map: map,
        title: locations[i]['addr']
    });
  }

  initialized = true;
}

/**
 * Pans to the next map location
*/
function nextMarker() {
    // Map isn't initialize yet, don't have button do anything yet
    if (!initialized) return;
    // At end of the array, move back to the beginning
    if (currentLocation == locations.length - 1)
        currentLocation = 0;
    else
        currentLocation += 1;

    var newPosition = new google.maps.LatLng(locations[currentLocation]['lat'], locations[currentLocation]['lng']);
    map.panTo(newPosition);
}
$('#panButton').click(function(){
    nextMarker();
});
