// Quagga.init({
// inputStream: {
// name: "Live",
// type: "LiveStream",
// target: document.querySelector('#yourElement') // Or '#yourElement' (optional)
// },
// decoder: {
// readers: ["code_128_reader"]
// }
// }, function(err) {
// if (err) {
// console.log(err);
// return;
// }
// console.log("Initialization finished. Ready to start");
// Quagga.start();
// });

Quagga.decodeSingle({
	decoder: {
		readers: ["ean_reader"]// List of active readers
	},
	locate: true, // try to locate the barcode in the image
	src: '/home/zhagnxh/Web/ebookshelf/test/webwxgetmsgimg.jpg' // or 'data:image/jpg;base64,' + data
}, function(result) {
	if (result.codeResult) {
		console.log("result", result.codeResult.code);
	} else {
		console.log("not detected");
	}
});
