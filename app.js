const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('dev'));

app.get('/', function(req, res) {
	console.log("Welcome nodemon!");
	res.send("welcome sent");
});








app.listen(3000, function() {
	console.log("server listening");
});