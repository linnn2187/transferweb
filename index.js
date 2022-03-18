//load module
const express = require('express');
const engine = require('ejs-locals');
const http = require('http');
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
var session = require('express-session');

//load routes folder
const routes = require('./routes');

//use express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//read static files
app.use(express.static(__dirname + '/public'));

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', routes);

//監聽PORT
const port = process.env.PORT || '3000'; // heroku端用
// const port = 3000; // local端用
app.listen(port, function () {
    console.log('Server is running on port 3000.');
});