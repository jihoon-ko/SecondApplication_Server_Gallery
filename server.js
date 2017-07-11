var express = require('express');
var connect = require('connect');
var multer = require('multer');
var app = express();
var Book = require('./models/books');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var profile = require('./router/profile');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/profile', profile);

/*
app.use(connect.cookieParser());
app.use(connect.logger('dev'));
app.use(connect.bodyParser());
app.use(connect.json());
app.use(connect.urlencoded());
var router = require('./router/routes.js')(app);
*/
//var router = require('./router/profile');
var router = require('./router/main')(app, Book);

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

var server = app.listen(3001, function(){
	console.log("Express server has started on port 3001")
});
app.use(express.static('public'));
