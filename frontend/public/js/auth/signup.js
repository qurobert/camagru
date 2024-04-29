const form = document.getElementById('signup-form');
import {redirectTo, setToken, url_api} from "../global.js";

form.addEventListener('submit', function (e) {
	console.log("submitting form");
	e.preventDefault();
	const data = new FormData(form);
	const email = data.get('email');
	const username = data.get('username');
	const password = data.get('password');
	if (!checkEmail(email) || !checkUsername(username) || !checkPassword(password)) {
		displayAlert();
		return;
	}
	fetch(url_api + "/users/register", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			// username: username,
			password: password
		})
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data.status !== 200) {
				displayAlert(data.message);
				return;
			}
			setToken(data);
			redirectTo('/profile');
		})
		.catch(error => {
			console.log("Error", data);
			displayAlert(error.message);
		})
	// Use fetch to send the form data to the backend
	// fetch('http://localhost:3000/auth/signup', {
	// 	method: 'POST',
	// 	body: data
	// })
	// .then(response => response.json())
	// .then(data => {
	// 	console.log("Data sent", data);
	// 	// Check if the email was sent successfully and redirect
	// 	// if (data.emailSent) {
	// 	// 	window.location.href = 'email-verification';
	// 	// } else {
	// 		// Handle errors, such as showing a message to the user
	// 	// }
	// })
	// .catch(error => {
	// 	console.error("Error", error);mjk
	// 	// Handle any network errors
	// });
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
	if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
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
	if (username.length < 3) {
		alert('Username must be at least 3 characters long.');
		return false;
	}
	return true;
}

// document.addEventListener('DOMContentLoaded', function () {
//     const signupForm = document.querySelector('.signup-form');
//     signupForm.addEventListener('submit', function (e) {
//         const password = document.getElementById('password').value;
//         if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
//             alert('Password does not meet the complexity requirements.');
//             e.preventDefault(); // Prevent form from submitting
//         } else {
//             // Simulate a successful signup process and redirect to the verification page
//             window.location.href = 'email-verification'; // The URL of your verification page
//             e.preventDefault(); // Remove this line when the backend is implemented
//         }
//     });
// });
//
// //when backend ok then :
// // document.addEventListener('DOMContentLoaded', function () {
// //     const signupForm = document.querySelector('.login-form');
// //     signupForm.addEventListener('submit', function (e) {
// //         e.preventDefault();
// //         const formData = new FormData(signupForm);
// //
// //         // Use fetch to send the form data to the backend
// //         fetch('/path-to-your-signup-handler', {
// //             method: 'POST',
// //             body: formData
// //         })
// //             .then(response => response.json())
// //             .then(data => {
// //                 // Check if the email was sent successfully and redirect
// //                 if (data.emailSent) {
// //                     window.location.href = 'verification-sent.html';
// //                 } else {
// //                     // Handle errors, such as showing a message to the user
// //                 }
// //             })
// //             .catch(error => {
// //                 // Handle any network errors
// //             });
// //     });
// // });
//
