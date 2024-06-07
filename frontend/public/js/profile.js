import {fetchWithToken, fetchWithTokenAppJson, url_api} from "./global.js";

const title = document.getElementById('title');
const chooseImage = document.getElementById('chooseImage');
const chooseFilter = document.getElementById('chooseFilter');
const chooseValid = document.getElementById('chooseValid');
const previewButton = document.getElementById('previewButton');
const imageFilter = document.getElementById('imageFilter');
const previousButton = document.getElementById('previousFilter');
const nextButton = document.getElementById('nextFilter');
const validButton = document.getElementById('validButton');
const closeButton = document.getElementById('closeButton');
const imageContainer = document.getElementById('imageContainer');
let numero_filter = -1;
let webcamStarted = false;

// Choose File
const file = document.getElementById('formFile');
const videoWebcam = document.getElementById('videoWebcam');
file.addEventListener('change', (e) => {
	imageContainer.src = URL.createObjectURL(e.target.files[0]);
	videoWebcam.style.display = 'none';
	imageContainer.style.display = 'block';
	chooseFilterMode();
})

const chooseImageMode = () => {
	chooseImage.style.display = 'block';
	chooseValid.style.display = 'none';
	imageContainer.style.display = 'none';
	videoWebcam.style.display = 'block';
	chooseFilter.style.display = 'none';
	imageFilter.style.display = 'none';
	previewButton.style.display = 'none';
	title.innerHTML = 'Choose Image';
}

const chooseFilterMode = () => {
	chooseValid.style.display = 'none';
	chooseValid.style.display = 'none';
	chooseImage.style.display = 'none';
	chooseFilter.style.display = 'flex';
	previewButton.style.display = 'block'
	previewButton.classList.add('btn-secondary');
	previewButton.classList.remove('btn-primary');
	previewButton.setAttribute('disabled', 'disabled');
	title.innerHTML = 'Choose Filter';
}

const choosePublishMode = () => {
	chooseImage.style.display = 'none';
	chooseValid.style.display = 'flex';
	chooseFilter.style.display = 'none';
	title.innerHTML = 'Valid Image';
}


const initProfilePage = () => {
	chooseImageMode();
	imageFilter.src = '';
	imageContainer.src = '';
	selectVideoOptions.value = '';
	webcamStarted = false;
	numero_filter = -1;
	file.value = '';
	videoWebcam.srcObject = null;
}

// Webcam
const selectVideoOptions = document.getElementById('selectVideoOptions');
const video = document.querySelector('video');
const constraints = {
	video: {
		width: {
			// min: 1280,
			// ideal: 1920,
			// max: 2560,
		},
		height: {
			// min: 720,
			// ideal: 1080,
			// max: 1440
		},
	}
};


const setSelectVideoOptions = async () => {
	await navigator.mediaDevices.getUserMedia({audio: true, video: true});
	const devices = await navigator.mediaDevices.enumerateDevices();
	const videoDevices = devices.filter(device => device.kind === 'videoinput');
	const options = videoDevices.map(videoDevice => {
		return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
	});
	options.unshift(selectVideoOptions.innerHTML)
	selectVideoOptions.innerHTML = options.join('');
};

// Start webcam
selectVideoOptions.onchange = async () => {
	if (!selectVideoOptions.value)
		return ;
	const updatedConstraints = {
		...constraints,
		deviceId: {
			exact: selectVideoOptions.value
		}
	};
	await startStream(updatedConstraints);
};


const startStream = async (constraints) => {
	video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
	chooseFilterMode();
	webcamStarted = true;
};

(async () => {
	initProfilePage();
	await setSelectVideoOptions();
})();

// Filter previous, next, valid
previousButton.onclick = () => {
	if (numero_filter <= 0)
		return ;
	numero_filter -= 1;
	imageFilter.src = `/img/filter_${numero_filter}.jpg`;
	imageFilter.style.display = 'block';
}

nextButton.onclick = () => {
	if (numero_filter >= 6)
		return ;
	numero_filter += 1;
	if (numero_filter >= 0) {
		previewButton.classList.remove('btn-secondary');
		previewButton.classList.add('btn-primary');
		previewButton.removeAttribute('disabled');
	}
	imageFilter.src = `/img/filter_${numero_filter}.jpg`;
	imageFilter.style.display = 'block';

}

previewButton.onclick = async () => {
	if (numero_filter === -1 || !imageFilter.src)
		return;

	let background = undefined;
	let filter = await fetch(imageFilter.src).then(response => response.blob());
	if (webcamStarted) {
		const canvas = document.createElement('canvas');
		canvas.width = videoWebcam.videoWidth;
		canvas.height = videoWebcam.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		background = await canvasToBlob(canvas, 'image/jpeg');
	} else {
		background = await fetch(imageContainer.src).then(response => response.blob());
	}

	const formData = new FormData();
	formData.append('image', background, 'background.jpg');
	formData.append('filter', filter, 'filter.jpg');

	fetchWithToken('/images/preview', {
		method: 'POST',
		body: formData
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to preview image');
			}
			return response.json();
		})
		.then(data => {
			videoWebcam.style.display = 'none';
			imageFilter.style.display = 'none';

			// Show the processed image in the imageContainer
			imageContainer.src = url_api + '/' + data.processed_path;
			imageContainer.style.display = 'block';
			// imageContainer.src = url_api + '/' + data.processed_path;
			imageContainer.setAttribute('data-processed-path', data.processed_path); // Save the path for publishing
			choosePublishMode();
		})
		.catch(error => {
			// console.error("Failed to preview image", error);
			alert("Failed to preview image: " + error.message);
		});
};

validButton.onclick = async () => {
	const processedPath = imageContainer.getAttribute('data-processed-path');
	if (!processedPath) {
		alert("No processed image to publish.");
		return;
	}

	await fetchWithTokenAppJson('/images/publish', {
		method: 'POST',
		body: JSON.stringify({
			processed_path: processedPath
		})
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to publish image');
			}
			return response.text();
		})
		.then(_ => {
			alert('Image published successfully.');
			refresh_image_publication();
			initProfilePage(); // Reset the page state after publishing
		})
		.catch(error => {
			// console.error("Failed to publish image", error);
			alert("Failed to publish image: " + error.message);
		});
};

closeButton.onclick = () => {
	chooseImageMode();
	chooseFilterMode();
}

async function canvasToBlob(canvas, mimeType) {
	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			resolve(blob);
		}, mimeType);
	});
}


// Display image

const publication_template = document.getElementById('publication').cloneNode(true);
const container = document.getElementById('loop-publications');
const createElementFromHiddenDiv = (src, id) => {
	const template = publication_template.cloneNode(true);
	template.querySelector('img').src = src;
	const button = template.querySelector('button');
	button.setAttribute('data-id', id);
	button.addEventListener('click', async (e) => {
		const id = e.target.getAttribute('data-id');
		await fetchWithToken(`/images/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		})
		await refresh_image_publication();
		e.preventDefault();
	})
	template.classList.add('d-flex');
	template.classList.remove('d-none');
	container.appendChild(template);
}
// Display image
const refresh_image_publication = async () => {
	await fetchWithToken('/images/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	}).then(response => response.json())
	.then(data => {
		container.innerHTML = '';
		if (data.length === 0) {
			const no_image_texte = document.createElement('p');
			no_image_texte.innerHTML = 'No image';
			no_image_texte.classList.add('text-center');
			no_image_texte.classList.add('mt-4');
			container.appendChild(no_image_texte);
		}
		data.forEach((image) => {
			createElementFromHiddenDiv(url_api + '/' + image.processed_path, image.id);
		});
	})
	.catch(() => {
		// console.error("error")
	});
}

await refresh_image_publication();

// Delete image

