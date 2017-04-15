// Navbar on click listener to toggle menu after clicking a link or 'Home'
$("#home").click(function() {
  $("#navbarContent").collapse('hide');
})
$("#navbarContent").click(function() {
  $("#navbarContent").collapse('hide');
});


// Set on click listeners for each navbar link to change views and active
// classes
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

$("#contact").click(function() {
    setNavActive("#contact");
    $("#view").load("contact/contact.html");
})

// Set the id passed in as active, resetting all others
function setNavActive(id) {
  $("#home").removeClass("active");
  $("#resume").removeClass("active");
  $("#projects").removeClass("active");
  $("#contact").removeClass("active");
  $(id).addClass("active");
}
