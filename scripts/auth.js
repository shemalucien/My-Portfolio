async function addUser() {
    const firstname = document.getElementById("first_name").value;
    const lastname = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const role = "normaluser";
    try {
        const SignUp = await fetch("https://shemalucien.herokuapp.com/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                role: role,
                email: email,
                password: password,
            }),
        });

        response = await SignUp.json();
        console.log(response.message);
        if (response?.success == "true") {
            alert('success');
        }
        else {
            alert('Error');
        }
    } catch (error) {
        alert(error)
    }
}
// addUser();
async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const SignIn = await fetch("https://shemalucien.herokuapp.com/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const response = await SignIn.json();
        if (SignIn.status == 200) {
            alert("Success");

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            if (response.data.role == "admin") {
                location.href = "../dashboardadmin.html";
            }
            else {
                location.href = "../dashboarduser.html";
            }

        }
        else {
            alert("Error");
        }
    } catch (error) {
        alert("Error");
    }
}

// loginUser();


