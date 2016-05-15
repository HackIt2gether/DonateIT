'use strict'

require('dotenv').config();
const pgp = require('pg-promise')({
    // Initialization Options
});
<<<<<<< HEAD

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

function addDonation(req, res, next) {
  db.one(`INSERT INTO donors (name, email, pickup_address, category, item_description)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [req.body.name, req.body.email, req.body.pickup_address, req.body.category, req.body.item_description])
    .then(function(data) {
      res.rows = data;
      next();
    })
    .catch(function(error) {
      console.error(error);
    });
};

module.exports.addDonation;
