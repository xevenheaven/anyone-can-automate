var express = require('express');
var app = express();
var portNumber = 3000;

app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});

app.use(express.static('public'));

app.listen(portNumber, function () {
	console.log('Example app listening on port ' + portNumber + '!');
});
