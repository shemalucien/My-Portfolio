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
                document.querySelector("#blog_section").innerHTML = result.map((res) =>
                    `
                    <div class="card">
                    <img src="${res?.photo}" class="blog-image" alt="">
                    <span class="tag"><i class="fa fa-calendar"></i> ${res?.createdAt.substring(0, 10)}</span>
                    <h1 class="title">${res?.title.substring(0, 30)}</h1>
                    <p class="desc">${res?.desc.substring(0, 100)}</p>
                 
                    <div class="reactions">

                    <span class="iconify" data-icon="ant-design:like-outlined" style="color: cyan;" data-width="30"
                        data-height="30"></span>

                    <span class="iconify" data-icon="bx:comment" style="color: cyan;" data-width="30"
                        data-height="30"></span>
                </div>
                <a href="blogpage.html" class="btn dark">read</a>
                <a href="editblog.html" class="btn grey">edit</a>
                <a href="/" class="btn danger">delete</a>

                     </div>
                     
                
                        `


                ).join(" ") :
                document.querySelector("#blog_section").innerHTML = `< img style = "width:150%;"src = "https://loading.io/mod/spinner/dash-ring/sample.gif" alt = "loading" > `
        })
        .catch(err => console.log(err));
}
fetchBlogs();
