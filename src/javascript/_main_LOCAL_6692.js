var handleClick = function(username, pwd, _method) {
	let data = "{\"usrName\":\"" + username + "\",\"pswd\":\"" + pwd + "\"}";
	let url='/api/db/'+_method;
	fetch(url, {
			method: "POST",
			body: data,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
	.then(function(resp) {
		resp.json().then(function(msg){
			console.log(msg);
			alert(msg);
		});
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
