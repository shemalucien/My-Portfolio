const token = localStorage.getItem('token');
const fetchUsers = async () => {
    let result = [];

    await fetch('https://shemalucien.herokuapp.com/api/v1/auth/allUsers', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": 'bearer ' + token
        }
    })
        .then(response => response.json())
        .then(json => {
            result = json.data
            console.log(result)


            result?.length ?
                document.querySelector("#users").innerHTML = result.map((res) =>
                    `
                    <div class="content-details" id="content-details">

                    <ul class="details">
                        <li class="topic">ID</li>
                        <li><a href="#">${res._id.substring(0, 5)}</a></li>
                    </ul>
                    <ul class="details">
                        <li class="topic">firstName</li>
                        <li><a href="#">${res.firstName}</a></li>
                    </ul>
                    <ul class="details">
                    <li class="topic">lastName</li>
                    <li><a href="#">${res.lastName}</a></li>
                </ul>
                    <ul class="details">
                        <li class="topic">Email</li>
                        <li><a href="#">${res.email}</a></li>
                    </ul>
    
                    <ul class="details">
                        <li class="topic">Role</li>
                        <li><a href="#">${res.role}</a></li>
                    </ul>
                    <ul class="details">
                    <li class="topic">Password</li>
                    <li><a href="#">${res.password.substring(0, 5)}</a></li>
                </ul>
                <ul class="details">
                <li class="topic">Edit</li>
                <li><a href="#">edit</a></li>
            </ul>
                    <ul class="details">
                        <li class="topic">Delete</li>
                        <li><a href="#" id="${res._id}" onclick=willdeleteUser(this.id)>delete</a></li>
                    </ul>
                </div>
                    `
                ).join(" ") :
                document.querySelector("#users").innerHTML = `< img style = "width:150%;"src = "https://loading.io/mod/spinner/dash-ring/sample.gif" alt = "loading" > `
        })
        .catch(err => console.log(err));
}
fetchUsers();

async function willdeleteUser(userId) {
    const token = localStorage.getItem('token');
    try {
        const willdeleteQuery = await fetch("https://shemalucien.herokuapp.com/api/v1/auth/deleteUser/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'bearer ' + token
            },
        });
        response = await willdeleteUser.json();
        console.log(response);
        console.log(queryId);
        if (response.success == "true") {
            alert("User deleted")
        } else {
            alert("error occured")
        }
    } catch (error) {

    }
}