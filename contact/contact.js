/*
$("#sendMessage").click(function(){
  var message = $("#message").serialize();
  $.ajax({
    url: "http://formspree.io/joethomas@ucdavis.edu",
    method: "POST",
    data: {message: message},
    dataType: "json"
  });
  alert("Thanks for the email!");
  return false;
});
*/

$("#contact-form").submit(function(event){
  event.preventDefault();
  $.ajax({
    url: "http://formspree.io/joethomas@ucdavis.edu",
    method: "POST",
    data: $(this).serialize(),
    dataType: "json"
  });
  alert("Thanks for the email!");
});
