var express = require('express');
var app = express();
var portNumber = 3000;
var fs = require('fs');

app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});

app.get('/writeFile', function (req, res) {
	var fileName = 'output';
	var text_ready = "var asdf;"

	res.writeHead(200, {
		'Content-Type': 'application/force-download',
		'Content-disposition': 'attachment; filename=' + fileName + '.js'
	});

	res.end(text_ready);
});

app.use(express.static('public'));

app.listen(portNumber, function () {
	console.log('Example app listening on port ' + portNumber + '!');
});
