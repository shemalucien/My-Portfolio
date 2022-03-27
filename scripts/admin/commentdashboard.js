
async function willdeleteComment(commentId) {
    console.log(commentId);
    try {
        const willdeleteComment = await fetch("https://shemalucien.herokuapp.com/api/v1/blogs/" + DataId + "/comments/" + commentId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await willdeleteComment.json();
        console.log(response);
        console.log(commentId);
        if (response) {
            alert("Comment deleted")
        } else {
            alert("error occured")
        }
    } catch (error) {

    }
}