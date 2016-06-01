(function() {
  var app = angular.module('webpage', ['ngRoute']);
  
  app.config(['$routeProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        controller: 'HomeController',
        templateUrl: 'home.html'
      })
      .when('/resume', {
        controller: 'ResumeController',
        templateUrl: 'resume.html'
      })
      .when("/projects", {
        controller: "ProjectsController",
        templateUrl: "projects.html"
      })
      .when("/personal", {
        controller: "PersonalController",
        templateUrl: "personal.html"
      })
      .otherwise({ redirectTo: '/home'});
    $locationProvider.html5mode(true);
  }]);

  // Controllers for each HTML page
  app.controller('HomeController', function($scope) {
  });
  
  app.controller('ResumeController', function($scope) {
  });

  app.controller('ProjectsController', function($scope) {
    $scope.canvasReady = function() {
      startGame();
    }
    
    // On controller exit, stop rendering game
    $scope.$on("$destroy", function() {
      endGame();
    });
  });

  app.controller('PersonalController', function($scope) {
  });
})();
