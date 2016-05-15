'use strict'

require('dotenv').config();
const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);
const bodyParser = require('body-parser');
