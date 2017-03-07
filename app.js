const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes')

//nunjucks
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//direct route request to routes directory
app.use('/', routes)


app.listen(3000, function() {
	console.log("server listening");
});
