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
	const logoutLink = document.getElementById('logout-link');

	profileLink.style.display = isItConnected ? 'block' : 'none';
	logoutLink.style.display = isItConnected ? 'block' : 'none';
	loginLink.style.display = isItConnected ? 'none' : 'block';
	signupLink.style.display = isItConnected ? 'none' : 'block';
}

export function setToken(data) {
	localStorage.setItem('access_token', data.access_token);
	localStorage.setItem('refresh_token', data.refresh_token);
}

export function removeToken() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
}

export function getAccessToken() {
	return localStorage.getItem('access_token');
}

export function getRefreshToken() {
	return localStorage.getItem('refresh_token');
}

export function fetchWithToken(url, options) {
	const token = getAccessToken();
	if (token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}
	return fetch(url_api + url, options);
}

// AUTHENTICATION
export function isConnected() {
	const token = getAccessToken();
	if (token) {
		return fetch(url_api + '/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': "application/json",
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(data => {
				sessionStorage.setItem('user', JSON.stringify(data.user));
				return data.status === 200;
			})
			.catch(() => false)
	}
	return false;
}

export function logout() {
	removeToken();
	sessionStorage.removeItem('user');
	refreshNavLink(false);
	redirectTo('/');
}

export const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
	logoutButton.addEventListener('click', logout);
}

export async function redirectProfileConnected() {
	if (await isConnected()) {
		redirectTo('profile');
	}
}