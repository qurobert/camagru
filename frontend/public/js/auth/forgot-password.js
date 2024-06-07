import {redirectTo, url_api} from "../global.js";

const form = document.getElementById('forgot-password-form');
const sendCodeButton = document.getElementById('send-code');

// Event listener for sending the code
sendCodeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = form.elements['email'].value;

    fetch(url_api + '/users/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            email
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        })
        .catch(async (errorResponse) => {
            if (errorResponse.status === 500) {
                const errorData = await errorResponse.json();
                // console.error("Login failed:", errorData.message);
            } else {
                // console.error("A network or server error occurred");
                alert("A network or server error occurred");
            }
        });
});

// Event listener for resetting the password
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const code = formData.get('code');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    fetch(url_api + '/users/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            email,
            code,
            password
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                alert(data.message);
                redirectTo('/login');
            } else {
                alert(data.message);
            }
        })
        .catch(async (errorResponse) => {
            if (errorResponse.status === 500) {
                const errorData = await errorResponse.json();
                // console.error("Login failed:", errorData.message);
            } else {
                // console.error("A network or server error occurred");
                alert("A network or server error occurred");
            }
        });
});