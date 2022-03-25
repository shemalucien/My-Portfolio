$(window).on("hashchange", function () {
    if (location.hash.slice(1) == "signup") {
        $(".page").addClass("extend");
        $("#login").removeClass("active");
        $("#signup").addClass("active");
    } else {
        $(".page").removeClass("extend");
        $("#login").addClass("active");
        $("#signup").removeClass("active");
    }
});
$(window).trigger("hashchange");

function validateLoginForm() {
    var email = document.getElementById("logemail").value;
    var password = document.getElementById("logpassword").value;

    if (email == "" || password == "") {
        document.getElementById("errorMsg1").innerHTML = "Please fill the required fields"
        return false;
    }

    else if (password.length < 6) {
        document.getElementById("errorMsg1").innerHTML = "Your password must include atleast 6 characters"
        return false;
    }
    else {
        alert("Successfully logged in");
        return true;
    }
}
function validateSignupForm() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (firstname == "" || lastname == "" || email == "" || password == "" || confirm_password == "") {
        document.getElementById("errorMsg2").innerHTML = "Please fill the required fields"
        return false;
    }
    else if (password.length < 6) {
        document.getElementById("errorMsg2").innerHTML = "Your password must include atleast 6 characters"
        return false;
    }
    else if (password != confirm_password) {
        document.getElementById("errorMsg2").innerHTML = "password does not match"
    }
    else {
        alert("Successfully signed up");
        return true;
    }
}

function validateQueriesForm() {

    var qname = document.getElementById("qname").value;
    var qemail = document.getElementById("qemail").value;
    var message = document.getElementById("message").value;
    if (qname == '' || qemail == '' || message == '') {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    }
    else if (message.length < 0) {
        document.getElementById("errorMsg").innerHTML = "message can not be empty"
    }
    else {
        alert("Message Sent Successfully");
        return true;
    }
}

function validatesubForm() {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var subemail = document.getElementById("subemail").value;
    const validateEmail = (subemail) => {
        return String(subemail)
            .toLowerCase()
            .match(validRegex);
    };
    if (subemail == '') {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    }
    else if (!validateEmail) {
        document.getElementById("errorMsg").innerHTML = "enter valid email"
    }
    else if (message.length < 0) {
        document.getElementById("errorMsg").innerHTML = "message can not be empty"
    }
    else {
        alert("Subscription Sent Successfully");
        return true;
    }
}