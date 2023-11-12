let express = require('express');
let app = express();
require('dotenv').config();

app.use('/public', express.static(__dirname + '/public'));

// app.use('/*', function (req, res, next) {
// 	console.log(req.method + ' ' + req.path + ' - ' + req.ip);
// 	next();
// });

app.get(
	'/now',
	function (req, res, next) {
		req.time = new Date().toString();
		// next();
	},
	function (req, res) {
		res.json({ time: req.time });
	}
);

app.get('/:word/echo', function (req, res) {
	res.json({ echo: req.params.word });
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
	// Read the value of process.env.MESSAGE_STYLE inside the route handler
	const messageStyle = process.env.MESSAGE_STYLE;

	// Transform the response object's message to uppercase if the variable equals uppercase
	let message = 'Hello json';
	if (messageStyle === 'uppercase') {
		message = message.toUpperCase();
	}

	// Send the response
	res.json({ message });
});

module.exports = app;
