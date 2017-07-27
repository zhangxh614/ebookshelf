var handleClick = function(username,pwd) {
	let data = "{\"userName\":\""+username+"\",\"pswd\":\""+pwd+"\"}";
	fetch('/db/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: data
		})
		.then(function(data) {
			alert(data);
		})
};

document.getElementById("login-submit").addEventListener('click', function(e) {
			var loginName = $("input[name='login-name']").val();
			var password = $("input[name='pwd']").val();	
			handleClick(loginName,password);
});
