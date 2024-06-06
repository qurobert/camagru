import {fetchWithToken, redirectTo} from "./global.js";

const settingsForm = document.getElementById('setting-form');

settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(settingsForm);
    const email = data.get('email');
    const password = data.get('password').trim();
    const username = data.get('username');
    const confirm_password = data.get('confirmPassword').trim();
    if (!checkEmail(email) || !checkUsername(username) || !checkPassword(password, confirm_password)) {
        displayAlert();
        return;
    }
    if (!email && !password && !username && !confirm_password) {
        alert('Nothing to update');
        return;
    }
    fetchWithToken('/users/update', {
        method: 'POST',
        body: JSON.stringify({
            email: email === '' ? undefined : email,
            password: password === '' ? undefined : password.trim(),
            username: username === '' ? undefined : username,
            confirm_password: confirm_password === '' ? undefined : confirm_password.trim()
        })
    }).then(response => response.json())
    .then(data => {
            if (data.status === 200) {

                alert('Settings saved');
                // if (email) {
                //     redirectTo('/email-verification')
                // } else
                redirectTo('/profile');
            } else {
                displayAlert(data.message);
            }

    }).catch(() => {
        displayAlert("An error occurred");
    })
})


function displayAlert(message) {
    const alert = document.getElementById('alertSignup');
        alert.innerHTML = message ? message : 'An error occurred';
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

function checkPassword(password, confirmPassword) {
    if (!password && !confirmPassword) {
        return true;
    }
    if (!password && confirmPassword) {
        alert('Please confirm your password.');
        return false;
    }
    if (password && !confirmPassword) {
        alert('Please enter your password correctly');
        return false;
    }
    if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/)) {
        alert('Password does not meet the complexity requirements.');
        return false;
    }
    // console.log(password, confirmPassword)
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }
    return true;
}

function checkEmail(email) {
    if (!email) {
        return true;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

function checkUsername(username) {
    if (!username) {
        return true;
    }
    if (username.length < 3) {
        alert('Username must be at least 3 characters long.');
        return false;
    }
    return true;
}