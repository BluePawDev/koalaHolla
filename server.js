var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: true
});
var pg = require('pg');

var port = process.env.PORT || 8080;
var config = {
	database: 'koalaHolla',
	host: 'localhost',
	port: 5432,
	max: 12
};
var pool = new pg.Pool(config);

// static folder
app.use(express.static('public'));

// spin up server
app.listen(port, function() {
	console.log('server up on', port);
});

// base url
app.get('/', function(req, res) {
	console.log('base url hit');
	res.sendFile('index.html');
});

// get koalas
app.get('/koalas', function(req, res) {
	console.log('GET koalas route hit');
	pool.connect(function(err, connection, done) {
		if (err) {
			console.log('error connecting to db');
			done();
			res.send('totally sucked')
		} else {
			var allkoalas = [];
			console.log('connected to db');
			var resultSet = connection.query('SELECT * FROM koala');
			resultSet.on('row', function(row) {
				allkoalas.push(row);
			});
			resultSet.on('end', function() {
				done();
				console.log(allkoalas);
				res.send(allkoalas);
			});
		} // end of else
	}); // end of pool.connect
	//assemble object to send
	// var objectToSend = {
	// 	response: 'from GET koalas route'
	// }; //end objectToSend
	//send info back to client
	// res.send(objectToSend);
});

// add koala
app.post('/koalas', urlencodedParser, function(req, res) {
	console.log('POST koalas route hit');
	//assemble object to send
	var objectToSend = {
		response: 'from POST koalas route'
	}; //end objectToSend
	//send info back to client
	res.send(objectToSend);
});

// add koala
app.put('/koalas', urlencodedParser, function(req, res) {
	console.log('PUT koalas route hit');
	//assemble object to send
	var objectToSend = {
		response: 'from PUT koalas route'
	}; //end objectToSend
	//send info back to client
	res.send(objectToSend);
});
