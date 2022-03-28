async function updateProfile() {
    const profilePicture = document
        .getElementById("profile")
        .getAttribute("src");
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const token = localStorage.getItem('token');
        const updateProfile = await fetch("https://shemalucien.herokuapp.com/api/v1/auth/updateUserProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'bearer ' + token
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }),
        });
        response = await updateProfile.json();
        console.log(response);
        if (response.status == 200) {
            alert('Good job!');
        }
        else {
            alert('Something went wrong!');
        }
        console.log(response);
    } catch (error) {

    }
}