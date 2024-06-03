import {fetchWithToken, getUserInfo, logout, redirectTo, removeToken, sendMailVerification} from "./global.js";

const resendMail = document.getElementById('resendMail');

resendMail.addEventListener('click', async (e) => {
	e.preventDefault();
	const user = getUserInfo();
	if (!await sendMailVerification(user.email)) {
		logout("/login");
		alert('Error send mail');
	}
	else {
		alert("Email sent");
	}
})

const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const data = new FormData(emailForm);
	const code = data.get('code');
	console.log("code");
	const back = await fetchWithToken('/auth/send-email-verify', {
		method: 'POST',
		body: JSON.stringify({
			code
		})
	})
	if (back.status === 200) {
		redirectTo('/profile')
		alert('Email verified');
	} else
		alert('Invalid code');
})