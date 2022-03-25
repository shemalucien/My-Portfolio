const token = localStorage.getItem('token');
const fetchQueries = async () => {
    let result = [];

    await fetch('https://shemalucien.herokuapp.com/api/v1/queries/', {
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


            console.log(result?._id);

            result?.length ?
                document.querySelector("#queries").innerHTML = result.map((res) =>
                    `
                    <div class="content-details" id="content-details">

                    <ul class="details">
                        <li class="topic">ID</li>
                        <li><a href="#">${res._id}</a></li>
                    </ul>
                    <ul class="details">
                        <li class="topic">Name</li>
                        <li><a href="#">${res.name}</a></li>
                    </ul>
                    <ul class="details">
                        <li class="topic">Email</li>
                        <li><a href="#">${res.email}</a></li>
                    </ul>
    
                    <ul class="details">
                        <li class="topic">Queries</li>
                        <li><a href="#">${res.message}</a></li>
                    </ul>
                    <ul class="details">
                        <li class="topic">Delete</li>
                        <li><a href="#" id="${res._id}" onclick=willdeleteQuery(this.id)>delete</a></li>
                    
                    </ul>
                </div>
                    `
                ).join(" ") :
                document.querySelector("#content-details").innerHTML = `< img style = "width:150%;"src = "https://loading.io/mod/spinner/dash-ring/sample.gif" alt = "loading" > `
        })
        .catch(err => console.log(err));
}
fetchQueries();

async function willdeleteQuery(queryId) {
    const token = localStorage.getItem('token');
    try {
        const willdeleteQuery = await fetch("https://shemalucien.herokuapp.com/v1/queries/" + queryId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'bearer ' + token
            },
        });
        response = await willdeleteQuery.json();
        console.log(response);
        console.log(queryId);
        if (response.success == "true") {
            alert("query deleted")
        } else {
            alert("error occured")
        }
    } catch (error) {

    }
}