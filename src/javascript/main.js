'use strict';

var video;
var canvas = document.getElementById('stream');
var context = canvas.getContext('2d');
var imgData;
var tmp;

$(function() {
	var handler = {
		init: function() {
			var self = this;
			Quagga.init(this.state, function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log("Initialization finished. Ready to start");
				Quagga.start();
				handler.addEventListeners();

				video = document.querySelector('#video > video');
				canvas.width = video.offsetWidth;
				canvas.height = video.offsetHeight;
			});
		},

		addEventListeners: function() {
			var self = this;

			document.getElementById("picture").addEventListener("click", function(e) {
				context.drawImage(video, 0, 0);
				imgData = canvas.toDataURL('image/png');
				console.log(tmp === imgData);

				tmp = imgData;
				handler.decode(imgData);
				//handler.decode(imgData);
			});	
		},

		decode: function(_src) {
			var self = this;
			let config = $.extend({}, self.orconfig, {
				src: _src
			});
			Quagga.decodeSingle(config, function(result) {
				if (result === undefined) {
					alert("not code");
				} else if (result.codeResult) {
					alert("result" + String(result.codeResult.code));
					alert(result.codeResult.code);
				} else {
					alert("not detected");
				}
			});
		},

		state: {
			inputStream: {
				type: "LiveStream",
				constraints: {
					width: {
						min: 640
					},
					height: {
						min: 480
					},
					facingMode: "environment",
					aspectRatio: {
						min: 1,
						max: 2
					}
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
		},

		orconfig: {
			inputStream: {
				size: 640,
				singleChannel: false
			},
			locator: {
				patchSize: "medium",
				halfSample: true
			},
			decoder: {
				readers: [{
					format: "ean_reader",
					config: {}
				}]
			},
			locate: true,
			src: null
		}

	};

	handler.init();

	function calculateRectFromArea(canvas, area) {
		var canvasWidth = canvas.width,
			canvasHeight = canvas.height,
			top = parseInt(area.top) / 100,
			right = parseInt(area.right) / 100,
			bottom = parseInt(area.bottom) / 100,
			left = parseInt(area.left) / 100;

		top *= canvasHeight;
		right = canvasWidth - canvasWidth * right;
		bottom = canvasHeight - canvasHeight * bottom;
		left *= canvasWidth;

		return {
			x: left,
			y: top,
			width: right - left,
			height: bottom - top
		};
	}

	Quagga.onProcessed(function(result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay,
			area;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function(box) {
					return box !== result.box;
				}).forEach(function(box) {
					Quagga.ImageDebug.drawPath(box, {
						x: 0,
						y: 1
					}, drawingCtx, {
						color: "green",
						lineWidth: 2
					});
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, {
					x: 0,
					y: 1
				}, drawingCtx, {
					color: "#00F",
					lineWidth: 2
				});
			}

			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, {
					x: 'x',
					y: 'y'
				}, drawingCtx, {
					color: 'red',
					lineWidth: 3
				});
			}

			if (handler.state.inputStream.area) {
				area = calculateRectFromArea(drawingCanvas, handler.state.inputStream.area);
				drawingCtx.strokeStyle = "#0F0";
				drawingCtx.strokeRect(area.x, area.y, area.width, area.height);
			}
		}
	});

});
