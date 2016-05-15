'use strict'

require('dotenv').config();

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/db_donors');

// routes
const apiRoutes = require(path.join(__dirname, '/routes/donations'));

const app = express();

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set public path
app.use( express.static( path.join( __dirname, 'public' )));


// home page
app.get('/', (req, res) => {
  res.render('index')
});

// routes go here
// to get all the donors
app.get('/donationlist', (req, res) => {
  res.render('all_donors');
});

// add a donation but keep on the same page
app.post('/donations', (req, res) => {
  res.redirect('/');
});


// listen for the port
app.listen(app.get('port'), function() {
  console.log(`Listening on port ${app.get('port')}`);
});
