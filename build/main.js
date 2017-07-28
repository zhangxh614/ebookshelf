"use strict";

var handleClick = function handleClick(username, pwd, method) {
	var data = "{\"userName\":\"" + username + "\",\"pswd\":\"" + pwd + "\"}";
	var url = '/db/' + method;
	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: data
	}).then(function (data) {
		if (data['msg'] === 'success') {
			document.getElementById('avatar').style.display = 'block';
		}
		alert(data);
	});
};

document.getElementById("login-submit").addEventListener('click', function (e) {
	var loginName = $("input[name='login-name']").val();
	var password = $("input[name='login-pwd']").val();
	handleClick(loginName, password, 'login');
});

document.getElementById('add-submit').addEventListener('click', function (e) {
	var loginName = $("input[name='add-name']").val();
	var password = $("input[name='add-pwd']").val();
	handleClick(loginName, password, 'add');
});