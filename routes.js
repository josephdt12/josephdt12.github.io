angular.module('websiteApp')
.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'resume/index.html'
  })

  .when('/resume', {
    templateUrl: 'resume/index.html'
  })

  .when('/projects', {
    templateUrl: 'projects/index.html'
  })

  .otherwise({ redirectTo: '/' });

});
