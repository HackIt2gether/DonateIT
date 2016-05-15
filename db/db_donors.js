'use strict'

require('dotenv').config();
const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

function addDonation(req, res, next) {
  db.ones(`INSERT INTO donors (name, email, pickup_address, category, item_description)
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
<<<<<<< HEAD
  db.any(`SELECT * from donors`)
    .then(function(data) {
      res.rows = data;
      next();
    })
    .catch(function(error) {
      console.error(error);
    });
=======
 db.any(`SELECT * from donors`)
   .then(function(data) {
     res.rows = data;
     next();
   })
   .catch(function(error) {
     console.error(error);
   });
>>>>>>> f43253dd0bbc6c39ecdf25161702f5210d952e6f
};

module.exports.allDonations = allDonations;
module.exports.addDonation = addDonation;
