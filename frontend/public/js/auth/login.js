const form = document.getElementById('login-form');
import {redirectTo, sendMailVerification, setToken, setUserInfo, url_api} from "../global.js";

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
				setUserInfo(data.user);
				if (data.verify_email === 0) {
					sendMailVerification(email);
					redirectTo('/email-verification');
				}
				else
					redirectTo('/profile');
			}
		})
})