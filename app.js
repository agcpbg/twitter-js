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

//direct route request to routes directory
app.use('/', routes)








app.listen(3000, function() {
	console.log("server listening");
});