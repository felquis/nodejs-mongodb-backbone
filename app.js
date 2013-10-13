
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

app.configure(function () {
	app.set('view engine', 'jade');
	app.set('view options', { layout: true });
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/'));
});

app.get('/?', function (req, res) {
	res.render('index');
});

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);