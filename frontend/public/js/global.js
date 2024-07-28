// Globals
export const url_api = 'http://localhost:3000';
export function redirectTo(path) {
	window.location.href = path;
}

// NAVIGATION LINKS
export function refreshNavLink(isItConnected) {
	const loginLink = document.getElementById('login-link');
	const signupLink = document.getElementById('signup-link');
	const profileLink = document.getElementById('profile-link');
	const settingsLink = document.getElementById('settings-link');
	const logoutLink = document.getElementById('logout-link');

	profileLink.style.display = isItConnected ? 'block' : 'none';
	settingsLink.style.display = isItConnected ? 'block' : 'none';
	logoutLink.style.display = isItConnected ? 'block' : 'none';
	loginLink.style.display = isItConnected ? 'none' : 'block';
	signupLink.style.display = isItConnected ? 'none' : 'block';
}

export function setUserInfo(user) {
	sessionStorage.setItem('user', JSON.stringify(user));
}
export function getUserInfo() {
	return JSON.parse(sessionStorage.getItem('user'));
}
export function setToken(data) {
	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('refreshToken', data.refreshToken);
}

export function removeToken() {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
}

export function getAccessToken() {
	return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
	return localStorage.getItem('refreshToken');
}

export function fetchWithToken(url, options) {
	const token = getAccessToken();
	if (token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
			// 'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	}
	return fetch(url_api + url, options);
}

export function fetchWithTokenAppJson(url, options) {
	const token = getAccessToken();
	if (token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	}
	return fetch(url_api + url, options);
}

// AUTHENTICATION
export function isConnected() {
	const token = getAccessToken();
	if (!token) {
		return false;
	}
	return fetchWithToken('/users/me', {
		method: 'GET'
	}).then(response => response.json())
	.then(data => {
		if (data.status === 200) {
			setUserInfo(data.user);
			return true;
		}
		return false
	})
	.catch((error) =>{
		// console.error(error);
		return false;
	});
}

export function isVerifyEmail() {
	return fetchWithToken('/users/me', {
		method: 'GET'
	}).then(response => response.json())
	.then(data => data.user.verify_email === 1)
	.catch(() => false);

}
export function sendMailVerification(email) {
	return fetchWithToken('/auth/send-email-verify', {
		method: 'POST',
		body: JSON.stringify({ email })
	}).then(response => response.json())
	.then(data => data.status === 200)
	.catch(() => false);
}

export function logout(path= "/") {
	removeToken();
	sessionStorage.removeItem('user');
	refreshNavLink(false);
	redirectTo(path);
}

export const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
	logoutButton.addEventListener('click', (e) => {
		e.preventDefault();
		logout();
	});
}

export async function redirectProfileConnected() {
	if (await isConnected()) {
		redirectTo('profile');
	}
}

document.getElementById('navbar-toggler').addEventListener('click', () => {
	document.getElementById('navbar').classList.toggle('show');
})