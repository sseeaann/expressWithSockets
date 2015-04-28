// DECLARE it
var express = require('express');
var app = express(); // calling instance of express
var bodyParser = require('body-parser');
var qs = require('querystring');

// USE it
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(__dirname + "/static")); // if connecting static folder

//SET your view paths
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//GET your root routes
app.get('/', function (request, response){
	response.render('index');
});

//POST it
// app.post('/swift', function (request, response){
// 	response.render('index', request.body);
// });

//LISTEN to it
var server = app.listen(6789, function(){
	console.log("listening on port 6789");
});

//SOCKET TO ME BABY
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	
	socket.on('submit', function(data){
		var unSerialize = qs.parse(data.input);
		var luckyNumber = ('Your lucky number is: ' + (Math.floor(Math.random() * 1001)));
		var newData = {form: unSerialize, random_number: luckyNumber};
		socket.emit('updated_message', {newData: newData});
	});
});

