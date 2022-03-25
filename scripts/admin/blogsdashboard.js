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
                    <a href="/normaluser/blogpage.html?${res?._id}" class="btn dark" id="${res?._id} onclick="showBlog(this.id)">read</a>
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
        const deleteBlog = await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + blogId ,{
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

async function showBlog(blogId) {
    let res = [];
    const token = localStorage.getItem('token');
    console.log(token);
    fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + blogId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": 'bearer ' + token
        },

    })
        .then((response) => response.json())
        .then((json) => {
            res = json.data;
            console.log(res.title)

            document.getElementById("title").value = res.title;
            document.getElementById("author").value = res.author;
            document.getElementById("article").value = res.desc;
            // document.getElementById("photo").src = res.photo;
            `
            <div class="banner">
        <input type="file" accept="image/*" id="banner-upload" hidden>
        <label for="banner-upload" class="banner-upload-btn"><img src="assets/images/upload.png"
                alt="upload banner"></label>
    </div>
    <div class="blog">
        <textarea type="text" class="title" id="title" placeholder="Blog title...">${res.title}</textarea>
        <textarea type="text" class="author" id="author" placeholder="Author..."></textarea>
        <textarea type="text" class="article" id="article" placeholder="Start writing here..."></textarea>
    </div>

    <div class="blog-options">
        <button type="submit" class="btn dark publish-btn" id="tap" onclick="addBlog()">publish</button>
        <input type="file" accept="image/*" id="image-upload" hidden>
        <label for="image-upload" class="btn grey upload-btn">Upload Image</label>
    </div>
            `

        })
        .catch((err) => console.log(err));
};




