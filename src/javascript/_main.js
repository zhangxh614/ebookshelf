var handleClick = function(username, pwd, method) {
	let data = "{\"userName\":\"" + username + "\",\"pswd\":\"" + pwd + "\"}";
	let url='/db/'+method;
	fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: data
		})
		.then(function(data) {
			alert(data);
		});
};

document.getElementById("login-submit").addEventListener('click', function(e) {
	var loginName = $("input[name='login-name']").val();
	var password = $("input[name='login-pwd']").val();
	handleClick(loginName, password,'login');
});

document.getElementById('add-submit').addEventListener('click', function(e) {
	var loginName = $("input[name='add-name']").val();
	var password = $("input[name='add-pwd']").val();
	handleClick(loginName, password,'add');
});
