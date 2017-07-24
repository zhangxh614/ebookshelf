var canvas = document.getElementById('stream');
var context = canvas.getContext('2d');

var state = {
	inputStream: {
		type: "LiveStream",
		constraints: {
			width: {
				min: 640
			},
			height: {
				min: 480
			},
			aspectRatio: {
				min: 1,
				max: 100
			},
			facingMode: "environment" // or user
		},
		target: document.querySelector('#video')
	},
	locator: {
		patchSize: "medium",
		halfSample: true
	},
	numOfWorkers: 2,
	frequency: 10,
	decoder: {
		readers: [{
			format: "ean_reader",
			config: {}
		}]
	},
	locate: true
};

Quagga.init(state, function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Initialization finished. Ready to start");
	Quagga.start();
});

var video = document.querySelector('#video > video');
var width = video.offsetWidth;
var height = video.offsetHeight;
console.log(width, height);

document.getElementById("picture").addEventListener("click", function() {
	canvas.width = width;
	canvas.height = width;
	context.drawImage(video, 0, 0, width, height);
	var imgData = canvas.toDataURL('image/png');

	Quagga.decodeSingle({
		decoder: {
			readers: ["ean_reader"] // List of active readers
		},
		locate: true, // try to locate the barcode in the image
		src: imgData // or 'data:image/jpg;base64,' + data
	}, function(result) {
		if (result.codeResult) {
			alert("result", result.codeResult.code);
		} else {
			alert("not detected");
		}
	});
});
