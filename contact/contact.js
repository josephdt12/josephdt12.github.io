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

  var email = $("#email").val();
  var subject = $("#subject").val();
  var msg = $("#message").val();

  $.ajax({
    url: "http://formspree.io/joethomas@ucdavis.edu",
    method: "POST",
    data: {
      _replyto: email,
      email: email,
      message: msg,
      _subject: subject
    },
    dataType: "json",
    success: function() {
      alert("Thanks for the email!");
      $('#contact-form')[0].reset();
    }
  });
});
