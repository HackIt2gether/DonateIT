'use strict'

require('dotenv').config();
const pgp = require('pg-promise')({
    // Initialization Options
});


if(process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL
} else {
  var cn =
  {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  };
}

const db = pgp(cn);

function addDonation(req, res, next) {
  db.one(`INSERT INTO donors (name, email, pickup_address, category, item_description)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [req.body.name, req.body.email, req.body.pickup_address, req.body.category, req.body.item_description])
    .then(function(data) {
      console.log(data);
      res.rows = data;
      next();
    })
    .catch(function(error) {
      console.error(error);
    });
};

function allDonations(req, res, next) {
  db.any(`SELECT * from donors`)
    .then(function(data) {
      res.rows = data;
      next();
    })
    .catch(function(error) {
      console.error(error);
    });
};

module.exports.allDonations = allDonations;
module.exports.addDonation = addDonation;
