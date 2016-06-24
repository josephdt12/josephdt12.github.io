angular.module('websiteApp')
.controller('MapController', function() {
  var map;
  var initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.324907, lng: -121.956652},
      zoom: 20
    });
  }
  console.log(document.getElementById('map'));
  initMap();
})