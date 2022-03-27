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
      document.getElementById("title").innerHTML = result.title;
      document.getElementById("author").innerHTML = result.author;
      document.getElementById("blogpic").src = result.photo;
      document.getElementById("articles-data").innerHTML = result.desc;
    })
    .catch((err) => console.log(err));
};
readMore();





