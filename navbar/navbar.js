$(document).ready(function() {
  $("#resume").addClass("active");
  $("#view").load("resume/resume.html");
});

$("#home").click(function() {
  setNavActive("#resume");
  $("#view").load("resume/resume.html");
});

$("#resume").click(function() {
  setNavActive("#resume");
  $("#view").load("resume/resume.html");
});

$("#projects").click(function() {
  setNavActive("#projects");
  $("#view").load("projects/projects.html");
});

// Set the id passed in as active, resetting all others
function setNavActive(id) {
  $("#home").removeClass("active");
  $("#resume").removeClass("active");
  $("#projects").removeClass("active");
  $(id).addClass("active");
}
