var express = require('express');
var app = express();
var portNumber = 3000;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var viewTest = require('./viewTest.js');

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});

app.post('/generateViewTest', jsonParser, function (req, res) {	
	console.log('generateViewTest');
	
	var fileName = 'viewTest';
	
	res.writeHead(200, {
		'Content-Type': 'application/force-download',
		'Content-disposition': 'attachment; filename=' + fileName + '.js'
	});

	res.end(viewTest(req.body));
});

app.post('/echoJson', jsonParser, function (request, response) {
	console.log(request.body); // your JSON

	response.send(request.body); // echo the result back
});

app.get('/writeFile', function (req, res) {
	var fileName = 'output';
	var text_ready = "var asdf;\n asdfasdf\n"

	res.writeHead(200, {
		'Content-Type': 'application/force-download',
		'Content-disposition': 'attachment; filename=' + fileName + '.js'
	});

	res.end(text_ready);
});

app.listen(portNumber, function () {
	console.log('Example app listening on port ' + portNumber + '!');
});
