$("#resume").click(function() {
  $("#projects").removeClass("active");
  $("#resume").addClass("active");
  $("#view").load("resume/resume.html");
});

$("#projects").click(function() {
  $("#resume").removeClass("active");
  $("#projects").addClass("active");
  $("#view").load("projects/projects.html");
});
