async function Subscribe() {
    const email = document.getElementById("subemail").value;
    if (email == "") {
        alert("Please fill in the email");
    } else {
        try {
            const Subscribe = await fetch("https://shemalucien.herokuapp.com/api/v1/subscribers/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });
            response = await Subscribe.json();
            if (response.success) {
                alert("successfully subscribed")
            } else {
                alert("Email Exists");
            }
        } catch (error) {
            alert("error");
        }
    }
}

