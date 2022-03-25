
async function Sendquery() {
    const name = document.getElementById("qname").value;
    const email = document.getElementById("qemail").value;
    const message = document.getElementById("message").value;
    var form = document.getElementById("sendquery");

    if (email == "") {
        alert("Error", "Please fill in the email", "error");
    } else {
        try {
            const Sendquery = await fetch("https://shemalucien.herokuapp.com/api/v1/queries/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                }),
            });
            response = await Sendquery.json();
            console.log(response);
            if (response.success && response.data) {
                form.reset();
                alert("Query Sent Successfully");
            } else {
                alert("Error", response.message, "error");
            }
        } catch (error) {
            alert("Error", response.message, "error");
        }
    }
}
