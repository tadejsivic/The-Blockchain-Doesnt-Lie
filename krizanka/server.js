const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const fs = require("fs");

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/login')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	console.log("dela");
	response.sendFile(path.join(__dirname + '/login/login.html'));
});

// http://localhost:3000/auth
app.post('/authorisation', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if(users.hasOwnProperty(username)){
		if(users[username] == password) response.end("true");
	}
	response.end("false");
});


let data = fs.readFileSync('auth.json');
let users = JSON.parse(data);

app.post('/register', function(request, response) {
	// Capture the input fields
	let user = request.body;
	if(users.hasOwnProperty(user.username)){
		response.end("false");
	}else {
		users[user.username] = user.password;
		//users[request.body.]
		fs.writeFile('auth.json', JSON.stringify(users), err => {
			// error checking
			if(err) throw err;
			console.log("New data added");
		});  
		response.end("true");
	}
	
});

app.get('/test', function(request, response){
	response.json({"test":"jani"});
});

app.get('/demo', function(request, response){
	response.json({"test":"ales"});
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	request.session.loggedin = true;
	request.session.username = username;
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);