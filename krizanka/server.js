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
app.use(express.static(path.join(__dirname, '/website_v2')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/website_v2/login.html'));
});

app.get('/glava', function(request, response) {
	// Render login template
	if(request.session.loggedin){
		return response.render(path.join(__dirname+'/daily.html'));
	}else{
		response.send('<html> <head> <title>Login Error</title> </head> <body> <c:url var="url" value="/index.jsp"/> <h2>Invalid user name or password.</h2> <p>Please enter a user name or password that is authorized to access this application.</p> </body> </html>');
	}
});

let data = fs.readFileSync('auth.json');
let users = JSON.parse(data);

// http://localhost:3000/auth
app.post('/authorisation', function(request, response) {
	// Capture the input fields
	
	let username = request.body.username;
	let password = request.body.password;
	
	// Ensure the input fields exists and are not empty
	if(users.hasOwnProperty(username)){
		if(users[username] == password) {
			request.session.loggedin = true;
			request.session.username = username;
			return response.redirect("/glava");
		}
	}
	response.end("false");
});




app.post('/register', function(request, response) {
	// Capture the input fields
	let user = request.body;
	if(users.hasOwnProperty(user.username)){
		response.end("false");
	}else {
		users[user.username] = user.password;
		request.session.loggedin = true;
		request.session.username = username;
		//users[request.body.]
		fs.writeFile('auth.json', JSON.stringify(users), err => {
			// error checking
			if(err) throw err;
			console.log("New data added");
		});  
		response.end("true");
	}
	
});

app.listen(3000);