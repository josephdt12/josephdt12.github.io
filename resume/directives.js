angular.module('websiteApp')
.directive("resumeHeader", function() {
  return {
    restrict: 'E',
    templateUrl: 'resume/header.html'
  };
})

.directive("resumeSkills", function() {
  return {
    restrict: 'E',
    templateUrl: 'resume/skills.html'
  };
})

.directive('workExperience', function() {
  return {
    restrict: 'E',
    templateUrl: 'resume/work-experience.html'
  };
})

.directive('education', function() {
  return {
    restrict: 'E',
    templateUrl: 'resume/education.html'
  };
})