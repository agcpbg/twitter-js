const express = require('express')
const router = express.Router();
const tweetBank = require('../tweetBank')


module.exports = function(io) {

	router.get('/', function(req, res) {
		let tweets = tweetBank.list();
		console.log(tweets);
		res.render('index', {tweets: tweets})
	})

	router.get('/users/:name',function(req,res){
		let name = req.params.name;
		let person = tweetBank.find(function(tweet){
			console.log('tweet:',tweet)
			console.log('name:',name)
			if(tweet.name.toLowerCase() === name.toLowerCase()) return true
		})
		console.log(person)
		res.render('index', {tweets: person, showForm: true, name: name})
	})

	router.get('/tweets/:id', function(req,res){
		let id = req.params.id;
		let person = tweetBank.find(function(tweet) {
			if(tweet.id === parseInt(id)) { return true; }
		})
		res.render('index', {tweets: person})
	})

	router.get('/tweets/', function(req,res){
		res.render('index', {showForm: true})
	})

	router.post('/tweets/', function(req, res) {
		console.log('print req body', req.body)
		let name = req.body.name;
		let text = req.body.text;
		tweetBank.add(name, text)
		res.redirect('/')
	})

	return router;
};




