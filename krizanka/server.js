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

let resitev = [
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  null,
	  'GLAVNO MESTO KORZIKE',
	  'ŠPANSKI TENORIST (DVE BESEDI)',
	  'ŠESTI JUDOVSKI MESEC',
	  'NUŠA LESAR',
	  'DOLGOPRSTNEŽ',
	  'ITALIJANSKI PESNIK IN PAMFLETIST (PIETRO)',
	  null,
	  'PAVLIHA, ŠALJIVEC',
	  'FRANCOSKI IGRALEC DELON',
	  'SLAVKO IVANČIČ',
	  'OČAK TURČIJE',
	  'POMOTA'
	],
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  'BUDISTIČNO JAMSKO SVETIŠČE V INDIJI',
	  'A$',
	  'J$',
	  'A$',
	  'N$',
	  'T$',
	  'A$',
	  'MOHAMEDOV VNUK',
	  'H$',
	  'A$',
	  'S$',
	  'A$',
	  'N$'
	],
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  'PEVEC, KI JODLA',
	  'J$',
	  'O$',
	  'D$',
	  'L$',
	  'A$',
	  'R$',
	  'SLOVENSKI ROKER MEGLIČ/VEDENJE (ZASTARELO)',
	  'A$',
	  'L$',
	  'I$',
	  'R$',
	  'A$'
	],
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  'STARO-JUDOVSKI KRALJ',
	  'A$',
	  'S$',
	  'A$',
	  'ALKALOID V OPIJU/TKANINA ZA PLENICE',
	  'T$',
	  'E$',
	  'T$',
	  'R$',
	  'A$',
	  'MADAGASKARSKA POLOPICA/ALEN PAJENK',
	  'A$',
	  'P$'
	],
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  'NA STOLU UMRLI GEOGRAF IN JAMAR (JOSIP)',
	  'C$',
	  'E$',
	  'R$',
	  'K$',
	  'VEJA ZA GRAH/LUKA NA MADAGASKARJU',
	  'T$',
	  'O$',
	  'L$',
	  'I$',
	  'A$',
	  'R$',
	  'A$',
	  ''
	],
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  'KRAJEVNO BOŽANSTVO MEMFISA/CLAUDIA CARDINALE',
	  'C$',
	  'C$',
	  'VZDEVEK BERTE BOJETU/IMENJAK',
	  'S$',
	  'O$',
	  'I$',
	  'M$',
	  'E$',
	  'N$',
	  'J$',
	  'A$',
	  'K$'
	],
	[
	  null,
	  null,
	  null,
	  null,
	  null,
	  'P$',
	  'I$',
	  'A$',
	  'B$',
	  'A$',
	  'B$',
	  'N$',
	  'I$',
	  'K$',
	  'ZEMELJSKO OLJE/SEDMA GRŠKA ČRKA',
	  'E$',
	  'T$',
	  'A$'
	],
	[
	  null,
	  'AMERIŠKI IGRALEC GOLFA (TIGER)',
	  'MODEL OPLOVEGA VOZILA',
	  'SLOVENSKI BIATLONEC FAK',
	  'ŽALOSTEN DOGODEK/KANADSKO VELEMESTO',
	  'T$',
	  'O$',
	  'R$',
	  'O$',
	  'N$',
	  'T$',
	  'O$',
	  'NEMŠKA PISATELJICA SEIDEL',
	  'I$',
	  'N$',
	  'A$',
	  'POTUJOČI PESNIK IN MUZIKANT V ZAHODNI AFRIKI',
	  'JAPONSKI FILMSKI REŽISER KUROSAVA'
	],
	[
	  'POLJSKI FILMSKI REŽISER (ANDRZEJ)',
	  'W$',
	  'A$',
	  'J$',
	  'D$',
	  'A$',
	  'SLOVENSKA PEVKA KEVC/ČEŠKI ŠAHIST (RICHARD)',
	  'R$',
	  'E$',
	  'T$',
	  'I$',
	  'EGIPČANSKI SVETI BIK',
	  'OSTANEK VINA V SODU (NAREČNO)',
	  'N$',
	  'A$',
	  'J$',
	  'G$',
	  'A$'
	],
	[
	  'PTICA UJEDA, SRŠENAR',
	  'O$',
	  'S$',
	  'A$',
	  'R$',
	  'LOPATA ZA METANJE PESKA',
	  'M$',
	  'E$',
	  'T$',
	  'A$',
	  'K$',
	  'A$',
	  'NAREČNI IZRAZ ZA KRAVICO',
	  'KOŽA KOZLIČEV/NAŠA SMUČARKA (MARUŠA)',
	  'F$',
	  'E$',
	  'R$',
	  'K$'
	],
	[
	  'PALICA ZA ČIŠČENJE PLUGA, RATKA',
	  'O$',
	  'T$',
	  'K$',
	  'A$',
	  'LOJZE LEBIČ/ARM. SKLADATELJ HAČATURJAN',
	  'A$',
	  'R$',
	  'A$',
	  'M$',
	  'NADJA AUERMANN/PREDNIK ŠKOTOV',
	  'P$',
	  'I$',
	  'K$',
	  'T$',
	  'TINE URNAUT/ION ILIESCU',
	  'I$',
	  'I$'
	],
	[
	  'USTNO LJUDSKO GLASBILO',
	  'D$',
	  'R$',
	  'O$',
	  'M$',
	  'L$',
	  'J$',
	  'A$',
	  'POBUDNIK, ZAČETNIK',
	  'I$',
	  'N$',
	  'I$',
	  'C$',
	  'I$',
	  'A$',
	  'T$',
	  'O$',
	  'R$'
	],
	[
	  'UMRLI AMERIŠKI FILMSKI IGRALEC (TELLY)',
	  'S$',
	  'A$',
	  'V$',
	  'A$',
	  'L$',
	  'A$',
	  'S$',
	  'PLANTAŽA',
	  'N$',
	  'A$',
	  'S$',
	  'A$',
	  'D$',
	  'VRTNA HIŠKA',
	  'U$',
	  'T$',
	  'A$'
	]
  ];



app.post('/solution', function(request, response) {
	// Render login template
	if(request.session.loggedin){
		let parola = (request.body);
		let equal = true;
		for (let i=0; i < resitev.length; i++){
			for (let j=0; j < resitev[0].length; j++){
				if (request.body[i][j] != resitev[i][j]){
					console.log(request.body[i][j], i, j);
					console.log(resitev[i][j], i, j);
					equal = false;
					break;
				}
			}
		}

		if(equal) {
			response.end("true");
		}
		else response.end("false");
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
		request.session.username = user.username;
		//users[request.body.]
		fs.writeFile('auth.json', JSON.stringify(users), err => {
			// error checking
			if(err) throw err;
			console.log("New data added");
		});
		return response.redirect("/glava");
	}
	
});


app.listen(3000);
