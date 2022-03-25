const token = localStorage.getItem('token');
const fetchSubscribers = async () => {
    let result = [];

    await fetch('https://shemalucien.herokuapp.com/api/v1/subscribers/', {
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
                document.querySelector("#subscribers").innerHTML = result.map((res) =>
                    `
                    <div class="content-details" id="content-details">

                    <ul class="details">
                        <li class="topic">ID</li>
                        <li><a href="#">${res._id}</a></li>
                    </ul>
                    <ul class="details">
                        <li class="topic">Email</li>
                        <li><a href="#">${res.email}</a></li>
                    </ul>
                    <ul class="details">
                        <li class="topic">Unsubscribe</li>
                        <li><a href="#" id="${res._id}" onclick=Unsubscribe(this.id)>Unsubscribe</a></li>
                    </ul>
                </div>
                    `
                ).join(" ") :
                document.querySelector("#content-details").innerHTML = `< img style = "width:150%;"src = "https://loading.io/mod/spinner/dash-ring/sample.gif" alt = "loading" > `
        })
        .catch(err => console.log(err));
}
fetchSubscribers();

async function Unsubscribe(subId) {
    const token = localStorage.getItem('token');
    try {
        const Unsubscribe = await fetch("https://shemalucien.herokuapp.com/api/v1/subscribers/unsubscribe/" + subId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'bearer ' + token
            },
        });
        response = await Unsubscribe.json();
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
