//Modules
var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Film = require('./api/models/filmModel'),
bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
Film = mongoose.model('Film');

//Connection to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MOVIES');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

//Routes for css and js files
app.get('/projetNOSQL/public/css/index.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"index.css");
})
app.get('/projetNOSQL/public/css/login.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"login.css");
})
app.get('/projetNOSQL/public/css/query.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"query.css");
})
app.get('/projetNOSQL/public/css/upload.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"upload.css");
})
app.get('/projetNOSQL/public/javascript/index.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"index.js");
})
app.get('/projetNOSQL/public/javascript/query.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"query.js");
})
app.get('/projetNOSQL/public/javascript/upload.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"upload.js");
})
app.get('/projetNOSQL/public/javascript/login.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"login.js");
})


app.get('/projetNOSQL/accueil',function(req,res){
	res.sendFile( __dirname +"/public/" +"index.html");
})
app.get('/projetNOSQL/login',function(req,res){
	res.sendFile( __dirname +"/public/" +"login.html");
})
app.get('/projetNOSQL/query',function(req,res){
	res.sendFile( __dirname +"/public/" +"query.html");
})
app.get('/projetNOSQL/admin',function(req,res){
	res.sendFile( __dirname +"/public/" +"admin.html");
})
app.get('/projetNOSQL/upload',function(req,res){
	res.sendFile( __dirname +"/public/" +"upload.html");
})
app.get('/projetNOSQL/public/css/upload.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"upload.css");
})
app.get('/projetNOSQL/public/javascript/upload.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"upload.js");
})

app.post('/upload', function(req, res){
	// create an incoming form object
  var form = new formidable.IncomingForm();
  // every time a file has been uploaded successfully,
  // rename it to movies.json
  form.on('file', function(field, file) {
	  fs.rename(file.path, "movies.json");
  });
  // log any errors that occur
  form.on('error', function(err) {
    res.end('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
		//add data to mongodb
		var items = [];
		fs.readFile('movies.json', 'utf8', function (err, data) {
        if(err) throw err

        var lines = data.split('\n');

				lines.forEach(function(line){
					var film = new Film(line);
				  film.save(function(err, data) {
				    if (err){
				      res.end('An error has occured during the importation !');
				    }
				    else{
				      res.end('File successfully uploaded in the database !');
				    }
				  });
				})
    });
	});

  // parse the incoming request containing the form data
  form.parse(req);
});

app.post('/login', function(req, res){
	var true_username = "prof";
	var true_password = "prof";

	var username = req.body.username;
	var password = req.body.password;

	if(username == true_username && password == true_password){
		res.end('true');
	}
	else{
		res.end('false');
	}
});

//Routes for the mongoDB API
var routes = require('./api/routes/filmRoutes'); //importing route
routes(app); //register the route

//Start the server
app.listen(port);

console.log('Server started on port ' + port);
