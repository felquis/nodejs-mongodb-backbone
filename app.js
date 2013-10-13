
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function () {
	app.set('view engine', 'jade');
	app.set('view options', { layout: true });
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/'));
});

app.get('/chat', function (req, res, next) {
	res.render('chat');
});

var sendChat = function (title, text) {
	io.sockets.emit('message', {
		title: title,
		contents: text
	});
};

io.sockets.on('connection', function (socket) {

	sendChat('Welcome to Stooge chat', 'The Stooges  are on the line');

	socket.on('chat', function (data) {
		sendChat('You', data.text);
	});
});

app.get('/stooges/*?', function (req, res) {
	res.render('stooges', { stooge: null });
});

app.get('/?', function (req, res) {
	res.render('index');
});

var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);