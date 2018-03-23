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
app.get('/public/css/login.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"login.css");
})
app.get('/public/css/query.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"query.css");
})
app.get('/public/css/upload.css',function(req,res){
	res.sendFile( __dirname +"/public/css/" +"upload.css");
})
app.get('/public/javascript/index.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"index.js");
})
app.get('/public/javascript/query.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"query.js");
})
app.get('/public/javascript/upload.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"upload.js");
})
app.get('/public/javascript/login.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"login.js");
})


app.get('/login',function(req,res){
	res.sendFile( __dirname +"/public/" +"login.html");
})
app.get('/query',function(req,res){
	res.sendFile( __dirname +"/public/" +"query.html");
})
app.get('/admin',function(req,res){
	res.sendFile( __dirname +"/public/" +"upload.html");
})

app.post('/upload', function(req, res){
	// create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = false;

  // store all uploads in the /uploads directory
  form.uploadDir = __dirname;

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, "movies.json"), function(){

		});
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });


  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
		//add data to mongodb
		var items = [];

			fs.readFile('movies.json', 'utf8', function (err, data) {
					if(err) throw err

					var lines = data.split('\n');

					lines.forEach(function(line, idx){
						if(idx < 5000){
							var line = line.replace( "{ \"_id\" : { \"$oid\" :" , "{ \"_id\" :" );
							var line = line.replace( " }," , "," );
							var line = line.replace( "\n" , "" );
							obj = JSON.parse(line);
							var item = new Film(obj);
							item.save(function(err, data) {
								if (err){
									res.end('error');
								}
								else{
									res.end('success');
								}
							});
						}
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
