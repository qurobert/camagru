import {isConnected, redirectProfileConnected, redirectTo, refreshNavLink} from "./global.js";

// Router
const router = {
	"/": {
		pathView: createPathView("home"),
	},
	"/home": {
		pathView: createPathView("home"),
	},
	"/login": {
		pathView: createPathView("auth/login"),
		pathScript: "./js/auth/login.js",
		onLoadScript: async function () {
			await redirectProfileConnected();
		},
		pathCss: "./css/auth.css",
	},
	"/signup": {
		pathView: createPathView("auth/signup"),
		pathScript: "./js/auth/signup.js",
		onLoadScript: async function () {
			await redirectProfileConnected();
		},
		pathCss: "./css/auth.css",
	},
	"/forgot-password": {
		pathView: createPathView("auth/forgot-password"),
		pathScript: "./js/auth/forgot-password.js",
	},
	"/profile": {
		pathView: createPathView("profile"),
		protected_route: true,
	},
	"/email-verification": {
		pathView: createPathView("auth/email-verification"),
		// pathScript: "./js/auth/email-verification.js",
	},
	"/404": {
		pathView: createPathView("error/404"),
	},
}

function createPathView(filename) {
	return "./pages/" + filename + ".html";
}

// Utils
function getFile(pathFile) {
	return fetch(pathFile)
		.then((response) => response.text())
		.then((content) => content);
}

// Load App

async function loadApp() {
	await loadPage(window.location.pathname);

	const isItConnected = await isConnected();
	refreshNavLink(isItConnected);
}

async function loadPage(path) {
	const route = router[path];

	unloadScript();
	unloadCss();
	if (route && route.protected_route && !(await isConnected())) {
		redirectTo("/login");
		return ;
	}

	const view = await getFile(route ? route.pathView : router["/404"].pathView);
	const app = document.getElementById("content");
	loadScript(route);
	loadCss(route);
	if (app)
		app.innerHTML = view;
}

function loadCss(route) {
	const css = document.createElement("link");
	css.rel = "stylesheet";
	css.href = route.pathCss;
	css.className = "css";
	document.head.appendChild(css);
}

function loadScript(route) {
	if (route && route.pathScript) {
		const script = document.createElement("script");
		script.src = route.pathScript;
		script.type = "module";
		if (route.onLoadScript)
			script.onload = route.onLoadScript;
		script.className = "script";
		document.body.appendChild(script);
	}
}

function unloadCss() {
	document.querySelector(".css")?.remove();
}

function unloadScript() {
	document.querySelector(".script")?.remove();
}


// Window Event
window.addEventListener("popstate", async () => {
	await loadPage(window.location.pathname);
})

window.addEventListener("DOMContentLoaded", async (e) => {
	await loadApp();
	document.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", async (e) => {
			e.preventDefault();
			const path = a.getAttribute("href");
			await loadPage(path);
			history.pushState({}, path, window.location.origin + path);
		})
	})
})