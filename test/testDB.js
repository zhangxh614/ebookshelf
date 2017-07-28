

(function testdb() {
    
    fetch('POST /db/add', {
        method: 'POST',
        body: JSON.stringify({usrName: "nzp", pswd: "123456", age: 20}),
        headers: {
            "Content-Type": "applications/json"
        }
    }).then(function(res){
        res.json().then(function(resStr){
            console.log(resStr);
        });
    });
})();
