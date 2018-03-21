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

//Connection to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MOVIES');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/projetNOSQL/accueil',function(req,res){
	res.sendFile( __dirname +"/public/" +"index.html");
})
app.get('/projetNOSQL/login',function(req,res){
	res.sendFile( __dirname +"/public/" +"login.html");
})
app.get('/projetNOSQL/user',function(req,res){
	res.sendFile( __dirname +"/public/" +"user.html");
})
app.get('/projetNOSQL/admin',function(req,res){
	res.sendFile( __dirname +"/public/" +"admin.html");
})
app.get('/projetNOSQL/upload',function(req,res){
	res.sendFile( __dirname +"/public/" +"upload.html");
})

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = false;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
		//add data to mongodb
		fs.readFile('movies.json', {encoding: 'utf8'}, function (err, data) {
        if(err) throw err;
        var item = data.toString().split('\n');
        items.push(item);
    });
		var collection = db.collection('test');
        for (var i = 0; i < items[0].length; i++) {
            collection.insert(JSON.parse(items[0][i]), {safe: true}, function(err, docs) {
                if(err) throw err;
            })
        }
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

//API part
var routes = require('./api/routes/filmRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('REST API server started on: ' + port);
