"use strict";

var handleClick = function handleClick(username, pwd, method) {
	console.log(username, pwd);
	var data = "{\"usrName\":\"" + username + "\",\"pswd\":\"" + pwd + "\"}";
	var url = '/api/db/' + method;
	fetch(url, {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function (resp) {
		return resp.json();
	}).then(function (res) {
		if (res.msg === 'success') {
			document.getElementById('avatar').style.display = "block";
			alert('login success');
		} else if (res.msg === 'wrong') {
			alert('wrong user name or password');
		} else if (res.msg === 'register') {
			alert('register success');
		} else if (res.msg === 'used') {
			alert('user name used');
		} else if (res.msg === 'dbfailed') {
			console.log('error in database');
		} else {
			console.log('known error');
		}
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