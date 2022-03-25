const DataId = location.search.substring(1);
// const DataId="6231a9df6283ca0c49866462";
const getblog = async () => {
    let result = [];
    fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId, {
        method: "GET",

    })
        .then((response) => response.json())
        .then((json) => {
            result = json.data;
            console.log(result)
            document.getElementById("title").value = result.title;
            document.getElementById("banner-upload").src = result.photo;
            document.getElementById("author").value = result.author;
            document.getElementById("article").value = result.desc;
        })
        .catch((err) => console.log(err));
};
getblog();


async function updateBlog() {
    const title = document.getElementById("title").value;
    const photo = document.getElementById("banner-upload").value;
    const desc = document.getElementById("article").value;
    const author = document.getElementById("author").value;
    if (title == "") {
        alert('title must be filled');
    } else if (desc == "") {
        alert('descrption must be filled');

    } else {
        try {
            const token = localStorage.getItem('token');
            const updateblog = await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": 'bearer ' + token
                },
                body: JSON.stringify({
                    title: title,
                    desc: desc,
                    photo: photo,
                    author: author,
                })
            })
            response = await updateblog.json();
         console.log(response.message);
            if (response) {
                alert("blog successfully updated");
            }
            else {
                alert("Something went wrong!");
            }
        } catch (error) {
            alert("Something went wrong!");

        }
    }
}