import {fetchWithToken, isConnected, url_api} from "./global.js";

let page = 1;
const templateCommentHome = document.getElementById('template-comment-home').cloneNode(true);
const templatePublicationsHome = document.getElementById('template-publication-home').cloneNode(true);
const loadPublications = document.getElementById('load-more-publications')
const publicationsContainer = document.getElementById('loop-container-home');

const createElementFromHiddenDivHome = async (src, username, likes, comments, id) => {
    const templateDeepCopy = templatePublicationsHome.cloneNode(true);
    templateDeepCopy.querySelector('img').src = url_api + '/' + src;
    templateDeepCopy.querySelector('.username').innerHTML = username;
    templateDeepCopy.querySelector('.info-likes').innerHTML = likes.length + ' like' + (likes.length > 1 ? "s" : "")
    templateDeepCopy.classList.remove('d-none');

    // comments
    const CommentsContainerDeepCopy = templateDeepCopy.querySelector('#loop-container-comment-home');
    CommentsContainerDeepCopy.innerHTML =  "";
    comments.forEach(comment => {
        const templateCommentsDeepCopy = templateCommentHome.cloneNode(true);
        templateCommentsDeepCopy.querySelector('span:first-of-type').innerHTML = comment.username;
        templateCommentsDeepCopy.querySelector('span:last-of-type').innerHTML = comment.comment_text;
        CommentsContainerDeepCopy.appendChild(templateCommentsDeepCopy);
    })
    if (comments.length === 0) {
        CommentsContainerDeepCopy.innerHTML = "No comments";
    }

    // submit comments
    const form = templateDeepCopy.querySelector('form');
    const button = form.querySelector('button');
    button.setAttribute('data-id', id)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!await isConnected()) {
            alert('You need to be connected to post this comment')
            return;
        }
        const comment = form.elements['comment'].value;
        const button = form.querySelector('button')
        const id = button.getAttribute('data-id');
        const formData = new URLSearchParams();
        formData.append('imageId', id);
        formData.append('commentText', comment);
        if (!comment.match(/^.{4,}$/)) {
            alert("Le commentaire doit faire au moins 4 caractères");
            return ;
        }
        const data = await fetchWithToken('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        refreshImage()
        alert('Posted');
    })

    // Likes
    const like = templateDeepCopy.querySelector('i');
    like.setAttribute('data-id', id)
    if ((await isConnected())) {
        const data = await (await fetchWithToken("/users/me", {
            method: 'GET'
        })).json();
        if (likes.find((like) => like.user_id === data.user.id)) {
            like.classList.add("iconoir-heart-solid")
            like.classList.remove("iconoir-heart")
        }
    }

    like.addEventListener('click', async (e) => {
        e.preventDefault();
            if (!await isConnected()) {
            alert('You need to be connected to like the comment')
            return;
        }
        const formData = new URLSearchParams();
        formData.append('imageId', id);

        if (like.classList.contains("iconoir-heart-solid")) {
            await fetchWithToken('/likes/' + id, {
                method: 'DELETE'
            })
        } else {
            await fetchWithToken('/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
        }
        refreshImage();
    })

    publicationsContainer.appendChild(templateDeepCopy);
}


async function refreshImage() {
    publicationsContainer.innerHTML = '';
    await addImage();
}

async function addImage() {
    await fetch(url_api + '/images/' + page).then(response => response.json()).then(async data => {
        for (const publication of data) {
            await createElementFromHiddenDivHome(publication.processed_path, publication.username, publication.likes, publication.comments, publication.id);
        }
        if (data.length === 5) {
            loadPublications.classList.remove('d-none')
            loadPublications.classList.add('d-block')
        } else {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = "No more images";
            paragraph.classList.add("text-center");
            paragraph.classList.add("mt-4");
            loadPublications.classList.remove("d-block");
            loadPublications.classList.add("d-none");
            publicationsContainer.appendChild(paragraph);
        }
    })
}

loadPublications.addEventListener("click", async(e) => {
    e.preventDefault();
    page += 1;
    await addImage();
})

async function initHomePage() {
    await refreshImage();
}

await initHomePage();
