const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

// res.render( 'index', {title: 'Hall of Fame', people: people} );


app.use(morgan('dev'));

app.get('/', function(req, res) {
	console.log("Welcome nodemon!");
	res.render( 'index', {title: 'Hall of Fame', people: people} );
});








app.listen(3000, function() {
	console.log("server listening");
});