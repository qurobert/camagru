const router = {
	"/": {
		pathView: createPathView("home"),
	},
	"/home": {
		pathView: createPathView("home"),
	},
	"/login": {
		pathView: createPathView("auth/login"),
	},
	"/signup": {
		pathView: createPathView("auth/signup"),
	},
	"/profile": {
		pathView: createPathView("profile"),
	},
	"/email-verification": {
		pathView: createPathView("auth/email-verification"),
	},
	"logout": {
		pathView: createPathView("auth/logout"),
	},
	"/404": {
		pathView: createPathView("error/404"),
	},
}

function createPathView(filename) {
	return "./pages/" + filename + ".html";
}

function getView(pathView) {
	return fetch(pathView)
		.then((response) => response.text())
		.then((html) => html);

}

async function loadView(path) {
	const route = router[path];
	const view = await getView(route ? route.pathView : router["/404"].pathView);
	const app = document.getElementById("content");
	if (app)
		app.innerHTML = view;
}

async function navigateTo(path) {
	await loadView(path);
	history.pushState({}, path, window.location.origin + path);
}
window.addEventListener("popstate", async () => {
	await loadView(window.location.pathname);
})

window.addEventListener("DOMContentLoaded", async (e) => {
	await loadView(window.location.pathname);
	document.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", async (e) => {
			e.preventDefault();
			await navigateTo(a.getAttribute("href"));
		})
	})
})