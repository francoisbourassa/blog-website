$(document).ready(function () {
  console.log("jQuery is working!");

  $("#contact").on("submit", function (e) {
    e.preventDefault();

    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var message = $("#message").val().trim();

    if (name && email && message) {
      $.ajax({
        url: "/contacts",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: name, email: email, message: message }),
        success: function (response) {
          alert("Message submitted successfully!");
          $("#contact")[0].reset();
        },
        error: function (xhr, status, error) {
          alert("An error occurred: " + error);
        },
      });
    } else {
      alert("Please fill out all fields.");
    }
  });
});
