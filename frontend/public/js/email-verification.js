import {fetchWithToken, getUserInfo, redirectTo, sendMailVerification} from "./global.js";

const resendMail = document.getElementById('resendMail');

resendMail.addEventListener('click', async (e) => {
	e.preventDefault();
	const user = getUserInfo();
	await sendMailVerification(user.email);
	alert('Email sent');
})

const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const data = new FormData(emailForm);
	const code = data.get('code');
	fetchWithToken('/users/verify', {
		method: 'POST',
		body: JSON.stringify({
			code
		})
	}).then(response => response.json())
	.then(data => async () => {
		if (data.status === 200) {
			await redirectTo('/profile')
			alert('Email verified');
		} else
			alert('Invalid code');
	})
	.catch()
})