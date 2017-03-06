const express = require('express');
const app = express();


app.get('/', function(req, res) {
	console.log("Welcome!");
	res.send("welcome sent");
});













app.listen(3000, function() {
	console.log("server listening");
});