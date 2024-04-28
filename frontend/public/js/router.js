class ContentManager {

	constructor(url) {
		// load html
		this._getHtmlFromUrl(url).then(this._loadHtml).catch((err) => {
			console.error(err);
			this._loadHtml("Error 404");
		})

		// load js
		const urlJs = "/js" + url + ".js";
		// console.log(urlJs)
		// try {
		// 	this._fileExist(urlJs).then((exist) => {
		// 		if (exist) {
		// 			this._loadScript(urlJs);
		// 		}
		// 	}).catch();
		// } catch (e) {
		//
		// }
		// // unload js
		// document.querySelectorAll(".script_js").forEach((script) => script.remove())
	}

	_getHtmlFromUrl(url) {
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
			xhr.setRequestHeader("Expires","0");
			xhr.setRequestHeader("Pragma","no-cache");
			xhr.setRequestHeader("Cache-Control","no-cache, no-store, must-revalidate");
			xhr.send();
		});
	}

	_loadHtml(html) {
		const app = document.getElementById("content");
		if (app)
			app.innerHTML = html;
	}

	_fileExist(url) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200)
						resolve(true);
				}
			};
			xhr.open("HEAD", url, true);
			xhr.send();
		});
	}

	_loadScript(url) {
		return new Promise((resolve, reject) => {
			let script = document.createElement("script");
			script.src = url;
			script.onload = resolve;
			script.onerror = reject;
			script.class = "script_js";
			document.head.appendChild(script);
		});
	}

	_unloadScript(url) {
		let script = document.getElementById(url);
		if (script)
			script.remove();
	}
}

function changeContentWithUrl() {
	let url = window.location.hash.substring(1);
	if (url === "")
		url = "/home";
	new ContentManager(url);
}

window.addEventListener("hashchange", changeContentWithUrl)

changeContentWithUrl();