const form = document.getElementById('signup-form');
import {redirectTo, sendMailVerification, setToken, setUserInfo, url_api} from "../global.js";

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const data = new FormData(form);
	const email = data.get('email');
	const username = data.get('username');
	const password = data.get('password');
	if (!checkEmail(email) || !checkUsername(username) || !checkPassword(password)) {
		displayAlert();
		return;
	}
	fetch(url_api + "/auth/register", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			username,
			password
		})
	})
		.then(response => response.json())
		.then(data => {
			if (data.status !== 200) {
				displayAlert("An error occured");
				return;
			}
			setToken(data);
			setUserInfo(data.user);
			sendMailVerification(email);
			redirectTo('/email-verification');
		})
		.catch(_ => {
			displayAlert("An error occured");
		})
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

function checkPassword(password) {
	if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/)) {
		alert('Password does not meet the complexity requirements.');
		return false;
	}
	return true;
}

function checkEmail(email) {
	if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		alert('Please enter a valid email address.');
		return false;
	}
	return true;
}

function checkUsername(username) {
	if (username.length < 6) {
		alert('Username must be at least 6 characters long.');
		return false;
	}
	return true;
}