import {isConnected} from "./global.js";

const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input')

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('commentForm', commentForm)
    if (!await isConnected()) {
        alert('You need to be connected to post a comment')
    } else {

        // const commentForm = e.target.comment.value
        // const postId = e.target.postId.value
        // const response = await fetch('/api/comments', {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ comment, postId })
        // })
        // if (response.ok) {
        // }

        window.location.reload()
        alert('Post it')
    }
    commentInput.value = ''
})

const heart = document.getElementById('heart')

heart.addEventListener('click', async () => {
    // if (!await isConnected()) {
    //     alert('You need to be connected to post a comment')
    //     return;
    // }
    heart.classList.toggle("iconoir-heart")
    heart.classList.toggle("iconoir-heart-solid")
    heart.classList.toggle("text-danger")
})