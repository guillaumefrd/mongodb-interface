$(document).ready(function(){
  $("#login_form").submit(function (event) {
        event.preventDefault();
        var password = $("#pwd").val();
        var username = $("#username").val();
        var pageToRedirect = "projetNOSQL/admin";
        $.post("http://localhost:3000/login",
            {
                username: username,
                password: password
            }, function (result) {
                if (result === "true") {
                    $("#result_form").html("" +
                        '<div class="alert alert-success alert-dismissible">\n' +
                        '  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
                        '  <strong>Success!</strong> You will be redirected...\n' +
                        '</div>' +
                        "");
                        setTimeout(function () {
                        window.location.replace("http://localhost:3000/" + pageToRedirect);
                    }, 2000);
                } else if (result === "false") {
                    $("#result_form").html("" +
                        '<div class="alert alert-warning alert-dismissible">\n' +
                        '  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
                        '  <strong>Sorry!</strong> Wrong password or username\n' +
                        '</div>' +
                        "");
                } else {
                    $("#result_form").html("" +
                        '<div class="alert alert-danger alert-dismissible">\n' +
                        '  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
                        '  <strong>Error!</strong> The server might not be runing :s\n' +
                        '</div>' +
                        "");
                }
            });
    });
});
