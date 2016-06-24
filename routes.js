angular.module('websiteApp')
.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/index.html'
  })
  
  .when('/resume', {
    templateUrl: 'resume/index.html'
  })
  
  .when('/projects', {
    templateUrl: 'projects/index.html'
  })
  
  .when('/personal', {
    templateUrl: 'personal/index.html'
  })
  
  .otherwise({ redirectTo: '/' });
  
});