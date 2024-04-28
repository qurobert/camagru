function loadContent(url) {
	ContentManager.getContent(url).then(ContentManager.setContent).catch((err) => {
		console.error(err);
		ContentManager.setContent("Error 404");
	})
}

class ContentManager {
	static getContent(url) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						resolve(xhr.responseText);
					} else {
						reject(new Error("Erreur de chargement du fichier HTML"));
					}
				}
			};
			xhr.open("GET", url, true);
			xhr.send();
		});
	}

	static setContent(content) {
		const app = document.getElementById("content");
		if (app)
			app.innerHTML = content;
	}
}

window.addEventListener("hashchange", () => {
	let url = window.location.hash.substring(1);
	if (url) {
		console.log("change url", url);
		loadContent(url);
	}
})
loadContent("/home");