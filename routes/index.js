'use strict';
var express = require('express');
var router = express.Router();
// var tweetBank = require('../tweetBank');
const client = require('../db/index');

module.exports = function makeRouterWithSockets (io) {

  // a reusable function

  function respondWithAllTweets(req, res, next) { client.query('SELECT tweets.content, users.name, tweets.id, tweets.user_id, users.picture_url FROM tweets JOIN users ON tweets.user_id = users.id', function (err, result) {
    if (err) return next(err);
    var allTheTweets = result.rows;
    res.render('index', {
      title: 'Twitter.js',
      tweets: allTheTweets,
      showForm: true
    });
  });}

  router.get('/', respondWithAllTweets);

  // here we basically treet the root view and tweets view as identical
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    client.query('SELECT tweets.content, users.name, tweets.id, tweets.user_id, users.picture_url FROM tweets JOIN users ON tweets.user_id = users.id WHERE users.name = $1', [req.params.username], function (err, result) {
    if (err) return next(err);
    var tweetsForName = result.rows;
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
      username: req.params.username
    });
  });})

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    client.query('SELECT tweets.content, users.name, tweets.id, tweets.user_id, users.picture_url FROM tweets JOIN users ON tweets.user_id = users.id WHERE tweets.id = $1', [req.params.id], function (err, result) {
    if (err) return next(err);
    var tweetsForName = result.rows;
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
    });
  });})

// 'INSERT INTO tweets (content, user_id) VALUES($1, SELECT id FROM users WHERE name = $2)'

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    client.query('SELECT * FROM users WHERE name = $1', [req.body.name], function (err, result) {
      var query1 = result.rows;
      console.log("query1 outside: ", query1);
      if (query1.length === 0) {
        client.query('INSERT INTO users (name) VALUES ($1)', [req.body.name], function (err, result) {
          query1 = result.rows;
          console.log("inside", result.rows);
        })
      }
      client.query('INSERT INTO tweets (content, user_id) VALUES ($1, $2)', [req.body.text, query1[0].id], function (err, result) {
      if (err) return next(err);
      var newTweet = result.rows;
      io.sockets.emit('new_tweet', newTweet);
      res.redirect('/');
  });});});

  

  return router;
}