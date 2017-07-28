"use strict";

$(function () {

	var handler = {
		init: function init() {
			handler.addEventListeners();
		},

		addEventListeners: function addEventListeners() {
			var self = this;

			document.querySelector(".controls input[type=file]").addEventListener("change", function (e) {
				if (e.target.files && e.target.files.length) {
					handler.decode(URL.createObjectURL(e.target.files[0]));
				}
			});

			document.querySelector("#rerun").addEventListener("click", function (e) {
				var input = document.querySelector(".controls input[type=file]");
				if (input.files && input.files.length) {
					handler.decode(URL.createObjectURL(input.files[0]));
				}
			});
		},

		decode: function decode(_src) {
			var self = this;
			var config = $.extend({}, self.state, {
				src: _src
			});
			Quagga.decodeSingle(config, function (result) {
				if (result === undefined) {
					alert("Not code in the picture.");
				} else if (result.codeResult) {
					var json = '{"isbn": "' + result.codeResult.code + '"}';
					self.dbDelete();
					self.handleData(json);
				} else {
					alert("Not detected");
				}
			});
		},
		state: {
			inputStream: {
				size: 800,
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
		},

		handleData: function handleData(json) {
			fetch("/api/crawl", {
				method: "POST",
				body: json,
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (resq) {
				//alert(res);
				resq.json().then(function (res) {
					ReactDOM.render(React.createElement(
						"div",
						null,
						React.createElement(
							"article",
							{ className: "post" },
							React.createElement(
								"h4",
								{ className: "post-title" },
								res['name']
							),
							React.createElement("img", { className: "post-photo", src: res['images'][0]['img'] }),
							React.createElement(
								"p",
								{ className: "post-info" },
								res['info']
							),
							React.createElement(
								"p",
								{ className: "post-intro" },
								res['intro']
							),
							React.createElement(
								"strong",
								{ className: "post-number" },
								res['rating_num']
							)
						),
						React.createElement(
							"h3",
							{ className: "subtitle" },
							"\u76F8\u5173\u4E66\u7C4D"
						),
						React.createElement(
							"ul",
							{ className: "post-list" },
							res['recommend'].map(function (item) {
								return React.createElement(
									"li",
									{ className: "col-xs-6 col-md-4 col-lg-3" },
									React.createElement("img", { className: "other", src: item['img'] }),
									React.createElement(
										"a",
										{ className: "link", target: "_blank", href: item['link'] },
										item['name']
									)
								);
							})
						)
					), document.getElementById('result'));
				});
			});
		},

		dbDelete: function dbDelete() {
			var elem = document.getElementById('result');
			while (elem.hasChildNodes()) {
				elem.removeChild(elem.firstChild);
			}
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

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
		    drawingCanvas = Quagga.canvas.dom.overlay,
		    area;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
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