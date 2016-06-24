angular.module('websiteApp', ['ngRoute'])
.controller('NavController', ['$location', function($location) {
  this.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };
}]);