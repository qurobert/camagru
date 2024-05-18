const title = document.getElementById('title');
const chooseImage = document.getElementById('chooseImage');
const chooseFilter = document.getElementById('chooseFilter');
const validButton = document.getElementById('validButton');
const imageFilter = document.getElementById('imageFilter');
const previousButton = document.getElementById('previousFilter');
const nextButton = document.getElementById('nextFilter');
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
	imageContainer.style.display = 'none';
	videoWebcam.style.display = 'block';
	chooseFilter.style.display = 'none';
	imageFilter.style.display = 'none';
	validButton.style.display = 'none';
	title.innerHTML = 'Choose Image';
}

const chooseFilterMode = () => {
	chooseImage.style.display = 'none';
	chooseFilter.style.display = 'flex';
	validButton.style.display = 'block';
	title.innerHTML = 'Choose Filter';
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
	if (numero_filter === 0) {
		validButton.classList.remove('btn-secondary');
		validButton.classList.add('btn-primary');
		validButton.removeAttribute('disabled');

	}
	imageFilter.src = `/img/filter_${numero_filter}.jpg`;
	imageFilter.style.display = 'block';

}

validButton.onclick = () => {
	if (numero_filter === -1 || !imageFilter.src)
		return ;
	let imageWithoutFilter = imageContainer.src;
	if (webcamStarted) {
		const canvas = document.createElement('canvas');
		canvas.width = videoWebcam.videoWidth;
		canvas.height = videoWebcam.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		imageWithoutFilter = canvas.toDataURL('image/png');
	}
	alert("Image uploaded !");
	initProfilePage()
	// fetchWithToken('/image/create_image', {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		image: imageWithoutFilter,
	// 		filter: imageFilter.src
	// 	})
	// })
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		if (data.status === 200) {
	// 			const previewImage = document.getElementById('previewImage');
	// 			previewImage.src = data.image;
	// 		}
	// 	})
}

