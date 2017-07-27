'use strict';

var video;
var canvas = document.getElementById('photo');
var context = canvas.getContext('2d');
var imgData;

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
				canvas.width = video.offsetWidth;
				canvas.height = video.offsetHeight;
				context.drawImage(video, 0, 0);
				imgData = canvas.toDataURL('image/png');
				self.decode(imgData);
			});
		},

		decode: function(_src) {
			var self = this;
			let config = $.extend({}, self.orconfig, {
				src: _src
			});
			Quagga.decodeSingle(config, function(result) {
				if (result === undefined) {
					alert("Not code in the picture.");
				} else if (result.codeResult) {
					let json = '{\"ISBN\":\"' + result.codeResult.code + '\"}';
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

		handleData: function(json) {
			fetch("/crawl", {
					method: "POST",
					body: json,
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(function(resq) {
					var res=resq.json().then(function(res) {
						//alert(res);
						ReactDOM.render(
							<div>
								<article className="post">
									<h4 className="post-title">{res['name']}</h4>
									<img className="post-photo" src={res['images'][0]['img']}/>
									<p className="post-info">{res['info']}</p>
									<p className="post-intro">{res['intro']}</p>
									<strong className="post-number">{res['rating_num']}</strong>
								</article>
									<h3 className="subtitle">相关书籍</h3>
								<ul className="post-list"> {
									res['recommend'].map(function(item) {
										return <li className="col-sm-6 col-md-4 col-lg-3">
													<img className="other" src={item['img']}/>
													<a className="link" href={item['link']}>{item['name']}</a>
												</li>
									})
								}
								</ul>
						</div>,
							document.getElementById('result')
						)
					});
				})
		},

		dbDelete: function() {
			let elem = getElementById('result');
			while (elem.hasChildNodes()) {
				elem.removeChild(elem.firstChild);
			}
		}
	};

	handler.init();

});
