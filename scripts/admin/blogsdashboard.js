const token = localStorage.getItem('token');
const fetchBlogs = async () => {
    let result = [];
    await fetch('https://shemalucien.herokuapp.com/api/v1/blogs/', {
        method: "GET",
    })
        .then(response => response.json())
        .then(json => {
            result = json.data
            console.log(result)

            result?.length ?
                document.querySelector("#blog-section").innerHTML = result.map((res) =>
                    `
                    <div class="blog-card">
                    <img src="${res?.photo}" class="blog-photo" alt="">
                    <span class="tag"><i class="fa fa-calendar"></i> ${res?.createdAt.substring(0, 10)}</span>
                    <div class="content">
                    <h1 class="title">${res?.title.substring(0, 30)}</h1>
                    <p class="desc">${res?.desc.substring(0, 100)}</p>
                    </div>
                    <div class="reactions">
                    <span class="iconify" data-icon="ant-design:like-outlined" style="color: cyan;" data-width="30"
                        data-height="30"></span>
                    <span class="iconify" data-icon="bx:comment" style="color: cyan;" data-width="30"
                        data-height="30"></span>
                    </div>
                   <a href="../admindashboard/commentsdashboard.html?${res?._id}">comments</a>
                    <a href="/normaluser/blogpage.html?${res?._id}" class="btn dark" id="${res?._id} onclick="readMore(this.id)">read</a>
                    <a href="updateblog.html?${res?._id}" class="btn grey">edit</a>
                    <button class="btn danger" id="${res?._id}" onclick="deleteBlog(this.id)">delete</button>
                     </div>
                        `


                ).join(" ") :
                document.querySelector("#blog_section").innerHTML = `< img style = "width:150%;"src = "https://loading.io/mod/spinner/dash-ring/sample.gif" alt = "loading" > `
        })
        .catch(err => console.log(err));
}
fetchBlogs();

async function deleteBlog(blogId) {
    console.log(blogId);
    const token = localStorage.getItem('token');
    try {
        const deleteBlog = await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + blogId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'bearer ' + token
            },
        });
        response = await deleteBlog.json();

        if (response.success) {
            console.log(response);
            console.log(blogId);
            alert(" Blog deleted")
        }

        else {
            alert("error occured")
        }
    } catch (error) {

    }
}



const DataId = location.search.substring(1);

const readMore = async () => {
    const token = localStorage.getItem('token');
    let result = [];
    fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": 'bearer ' + token
        },
    })
        .then((response) => response.json())
        .then((json) => {
            result = json.data;
            document.getElementById("title").innerHTML = result.title;
            document.getElementById("author").innerHTML = result.author;
            document.getElementById("blogpic").src = result.photo;
            document.getElementById("articles-data").innerHTML = result.desc;
        })
        .catch((err) => console.log(err));
};
readMore();


const getAllComments = async () => {
    // const token = localStorage.getItem('token');
    const DataId = location.search.substring(1);
    console.log(DataId);
    let result = [];
    try {
        await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId + "/comments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "authorization": 'bearer ' + token
            },

        }).then((response) => response.json())
            .then((json) => {
                result = json.data;
                console.log(result)
                result?.length

                    ? (document.querySelector(".content-details").innerHTML = result
                        .map(
                            (res) => `
                
                <div class="content-details" id="content-details">

                <ul class="details">
                    <li class="topic">Blog Title</li>
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
                    <li><a href="#">${res.comment}</a></li>
                </ul>
                <ul class="details">
                    <li class="topic">Delete</li>
                    <button href="#" id="${res._id}" onclick="willdeleteComment(this.id)">delete<button>
                
                </ul>
            </div>
                         
                      `
                        )
                        .join(" "))
                    : (document.querySelector(".content-details").innerHTML = `<h2>Comments not found</h2>`);
            })
    }
    catch (err) {
        console.log(err);
    }
};
getAllComments();