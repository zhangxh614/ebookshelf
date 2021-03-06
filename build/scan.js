'use strict';

var video;
var canvas = document.getElementById('photo');
var context = canvas.getContext('2d');
var imgData;

$(function () {
	var handler = {
		init: function init() {
			var self = this;
			Quagga.init(this.state, function (err) {
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

		addEventListeners: function addEventListeners() {
			var self = this;

			document.getElementById("picture").addEventListener("click", function (e) {
				canvas.width = video.offsetWidth;
				canvas.height = video.offsetHeight;
				context.drawImage(video, 0, 0);
				imgData = canvas.toDataURL('image/png');
				self.decode(imgData);
			});
		},

		decode: function decode(_src) {
			var self = this;
			var config = $.extend({}, self.orconfig, {
				src: _src
			});
			Quagga.decodeSingle(config, function (result) {
				if (result === undefined) {
					alert("Not code in the picture.");
				} else if (result.codeResult) {
					var json = '{\"ISBN\":\"' + result.codeResult.code + '\"}';
					self.dbDelete();
					self.handleData(json);
				} else {
					alert("Not detected");
				}
			});
		},

		state: {
			inputStream: {
				type: "LiveStream",
				constraints: {
					width: {
						max: 640
					},
					height: {
						max: 480
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
		},

		handleData: function handleData(json) {
			fetch("/crawl", {
				method: "POST",
				body: json,
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (resq) {
				var res = resq.json().then(function (res) {
					//alert(res);
					ReactDOM.render(React.createElement(
						'div',
						null,
						React.createElement(
							'article',
							{ className: 'post' },
							React.createElement(
								'h4',
								{ className: 'post-title' },
								res['name']
							),
							React.createElement('img', { className: 'post-photo', src: res['images'][0]['img'] }),
							React.createElement(
								'p',
								{ className: 'post-info' },
								res['info']
							),
							React.createElement(
								'p',
								{ className: 'post-intro' },
								res['intro']
							),
							React.createElement(
								'strong',
								{ className: 'post-number' },
								res['rating_num']
							)
						),
						React.createElement(
							'h3',
							{ className: 'subtitle' },
							'\u76F8\u5173\u4E66\u7C4D'
						),
						React.createElement(
							'ul',
							{ className: 'post-list' },
							' ',
							res['recommend'].map(function (item) {
								return React.createElement(
									'li',
									{ className: 'col-xs-6 col-md-4 col-lg-3' },
									React.createElement('img', { className: 'other', src: item['img'] }),
									React.createElement(
										'a',
										{ className: 'link', target: '_blank', href: item['link'] },
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
});