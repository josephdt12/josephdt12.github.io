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
$('document').ready(function() {
    var srcs = [
        'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCGVeG2mBFY_RVyNjrT9j3Hu0bgeIDnrlg'
    ];

    $.getMultipleScripts(srcs).done(function() {
        var locations = [];
        $.when($.getJSON("projects/reddit-wallpapers/geolocations.json", function(json) {
            locations = json['locations'];
        })).then(function() {
            initMap(locations);
        });
    })
});

/**
 * Sets up the map with the first location in the passed locations array.
 */
function initMap(locations) {
    var pos = new google.maps.LatLng(locations[0]['lat'], locations[0]['lng']);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: pos
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Hello World!'
    });
}
