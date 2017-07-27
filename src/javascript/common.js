window.onscroll = function() {
	if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
		document.getElementById("back-to-top").style.display = "block";
	} else {
		document.getElementById("back-to-top").style.display = "none";
	}
};
