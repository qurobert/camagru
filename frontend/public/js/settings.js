import {redirectTo} from "./global.js";

const settingsForm = document.getElementById('setting-form');

settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(settingsForm);
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('username');
    const confirmPassword = data.get('confirmPassword');
    if (!checkEmail(email) || !checkUsername(username) || !checkPassword(password, confirmPassword)) {
        displayAlert();
        return;
    }
    if (!email && !password && !username && !confirmPassword) {
        alert('Nothing to update');
        return;
    }
    // const response = await fetch('/api/settings', {
    //     method: 'POST',
    //     body: data
    // });
    // if (response.ok) {
        alert('Settings saved');
    redirectTo('/profile');
    if (email) {
        redirectTo('/email-verification')
    }
    // }
    console.log(data);
})


function displayAlert(message) {
    const alert = document.getElementById('alertSignup');
    if (message)
        alert.innerHTML = message;
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
    if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
        alert('Password does not meet the complexity requirements.');
        return false;
    }
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