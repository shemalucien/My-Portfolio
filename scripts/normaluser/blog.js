const DataId = location.search.substring(1);
const token = localStorage.getItem('token');
const readMore = async () => {
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
      console.log(result);
      document.getElementById("title").innerHTML = result.title;
      document.getElementById("author").innerHTML = result.author;
      document.getElementById("blogpic").src = result.photo;
      document.getElementById("articles-data").innerHTML = result.desc;
      `

      `

    })
    .catch((err) => console.log(err));
};
readMore();

async function sendComment() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;
  var form = document.getElementById("comment-form");
  if (email == "" || name == "" || comment == "") {
    alert("Error", "Please fill the required fields", "error");
  } else {
    try {
      const sendComment = await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId + "/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": 'bearer ' + token
        },
        body: JSON.stringify({
          name: name,
          email: email,
          comment: comment,
        }),
      });
      response = await sendComment.json();
      if (response.status === "success") {
        form.reset();
        alert("Comment Sent Successfully");
      } else {
        alert("Error", response.message, "error");
      }
    } catch (error) {
      alert("Error", response.message, "error");
    }
  }
}
sendComment();

const getAllComments = async () => {
  const token = localStorage.getItem('token');
  const DataId = location.search.substring(1);
  console.log(DataId);
  let result = [];
  try {
    await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId + "/comments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": 'bearer ' + token
      },

    }).then((response) => response.json())
      .then((json) => {
        result = json.data;
        console.log(result)
        result?.length

          ? (document.querySelector(".comment").innerHTML = result
            .map(
              (res) => `
                        <h4>${res.name}</h4> <span>${res.email}</span> <br>
                        <p>${res.comment}
                        </p>
                        <div class="reactions">
                            <span class="iconify" data-icon="ant-design:like-outlined" style="color: cyan;" data-width="30"
                                data-height="30"></span>
                            <span class="iconify" data-icon="bx:comment" style="color: cyan;" data-width="30"
                                data-height="30"></span>	
        			`
            )
            .join(" "))
          : (document.querySelector(".comment").innerHTML = `<h2>Comments not found</h2>`);
      })
  }
  catch (err) {
    console.log(err);
  }
};
getAllComments();


