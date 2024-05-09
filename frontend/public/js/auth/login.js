const form = document.getElementById('login-form');
import {redirectTo, setToken, url_api} from "../global.js";

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const email = formData.get('email');
	const password = formData.get('password');
	fetch(url_api + '/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 200) {
				setToken(data);
				redirectTo('/profile');
			}
		})
})