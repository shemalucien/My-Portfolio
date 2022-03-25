const button = document.getElementById('tap');
button.addEventListener('click', (e) => {
    e.preventDefault();
});

async function addBlog() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const desc = document.getElementById("article").value;
    const photo = document.getElementById("banner-upload").files[0];
    console.log(photo);
    try {
        const token = localStorage.getItem('token');
        const addBlog = await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'bearer ' + token
            },
            body: JSON.stringify({
                title: title,
                author: author,
                desc: desc,
                photo: photo,
            }),
        });
        response = await addBlog.json();
        console.log(response);
        if (response?.success == "true") {
            alert('Good job!', 'blog saved successfully', 'success');
        }
        else {
            alert('Something went wrong!');
        }
        console.log(response);
    } catch (error) {

    }
}


