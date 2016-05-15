'use strict';

const express = require('express');
const donations = express.Router();
const bodyParser = require('body-parser');

const db = require('../db/db_donors');

// add a donation but keep on the same page
donations.post('/', db.addDonation, (req, res) => {

});

donations.get('/', db.allDonations, (req, res) => {
  res.send(res.rows);
});

module.exports = donations;
