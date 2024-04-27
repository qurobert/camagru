function router(page) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			document.getElementById("content").innerHTML = xhr.responseText;
		} else {
			document.getElementById("content").innerHTML = "The requested page could not be found.";
		}
	};
	xhr.open("GET", `/templates/${page}.html`, true);
}

router("index");