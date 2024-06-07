const form = document.getElementById('login-form');
import {redirectTo, setToken, setUserInfo, url_api} from "../global.js";

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const email = formData.get('email');
	const password = formData.get('password');

	 fetch(url_api + '/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			email,
			password
		}),
	})
		.then(response => response.json())
		.then(data => {
			if (data.status === 200) {
				setToken(data);
				setUserInfo({email});
				redirectTo('/profile');
			} else if (data.status === 401) {
				alert("You need to verify your email first before logging in");
			} else {
				alert("Invalid password or email");
			}
		})
		.catch(async (errorResponse) => {
			if (errorResponse.status === 500) {
				const errorData = await errorResponse.json();
				if (errorData.message === "Email not verified") {
					// redirectTo('/email-verification');
				} else {
					// console.error("Login failed:", errorData.message);
				}
			} else {
				// console.error("A network or server error occurred");
				alert("A network or server error occurred");
			}
		});
});