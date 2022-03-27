

// viewProfile();

// const CLOUDINARY_CLOUD_NAME = "dhrfudotz";
// const CLOUDINARY_UPLOAD_PRESET = "my-brand";

// function popup(message) {
// 	var x = document.getElementById("popupmessage");
// 	x.textContent = message;

// 	x.className = "show";
// 	setTimeout(function () {
// 		x.className = x.className.replace("show", "");
// 	}, 3000);
// }

// var myWidget = cloudinary.createUploadWidget(
// 	{
// 		cloudName: CLOUDINARY_CLOUD_NAME,
// 		uploadPreset: CLOUDINARY_UPLOAD_PRESET,
// 	},
// 	(error, result) => {
// 		if (!error && result && result.event === "success") {
// 			console.log("Done! Here is the image info: ", result.info.url);
// 			document
// 				.getElementById("profile-image")
// 				.setAttribute("src", result.info.url);
// 			document
// 				.getElementById("sidebar-profile-image")
// 				.setAttribute("src", result.info.url);
// 		}
// 	}
// );

// document.getElementById("upload_widget").addEventListener(
// 	"click",
// 	function () {
// 		myWidget.open();
// 	},
// 	false
// );






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


// async function viewProfile() {
// 	let url = "https://johhny-brand-staging.herokuapp.com/api";
// 	await fetch(url + "/auth/profile", {
// 		method: "GET",
// 		headers: {
// 			"Content-type": "application/json; charset=UTF-8",
// 			token: localStorage.getItem("token"),
// 		},
// 	})
// 		.then((res) => res.json())
// 		.then((response) => {
// 			if (response.status !== 200) {
// 				error = response.error || response.message;
// 				document.getElementById("error").innerHTML = error;
// 			}
// 			if (response.status == 200) {
// 				let {
// 					name,
// 					email,
// 					skills,
// 					profession,
// 					physicalAddress,
// 					experience,
// 					profilePicture = "/images/user.png",
// 				} = response.data.users;
// 				document
// 					.getElementById("sidebar-profile-image")
// 					.setAttribute("src", profilePicture);
// 				document
// 					.getElementById("profile-image")
// 					.setAttribute("src", profilePicture);
// 				document.forms["user-desc"]["name"].value = name || "";
// 				document.forms["user-desc"]["email"].value = email || "";
// 				document.forms["user-desc"]["experience"].value = experience || "";
// 				document.forms["user-desc"]["skills"].value = skills || "";
// 				document.forms["user-desc"]["profession"].value = profession || "";
// 				document.forms["user-desc"]["physicalAddress"].value =
// 					physicalAddress || "";
// 			}
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// }