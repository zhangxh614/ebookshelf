
var handleClick = function(username, pwd, method) {
	console.log(username, pwd);
	let data = "{\"usrName\":\"" + username + "\",\"pswd\":\"" + pwd + "\"}";
	let url = '/api/db/' + method;
	fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(resp) {
		return resp.json();
	}).then(function(res){
		if(res.msg === 'success') {
			document.getElementById('avatar').style.display = "block";
			alert(res.meg);
		}
	});
};

document.getElementById("login-submit").addEventListener('click', function(e) {
	var loginName = $("input[name='login-name']").val();
	var password = $("input[name='login-pwd']").val();
	handleClick(loginName, password, 'login');
});

document.getElementById('add-submit').addEventListener('click', function(e) {
	var loginName = $("input[name='add-name']").val();
	var password = $("input[name='add-pwd']").val();
	handleClick(loginName, password, 'add');
});
