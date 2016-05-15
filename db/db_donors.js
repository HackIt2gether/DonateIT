
require('dotenv').config();
var pg = require('pg');
// if(process.env.ENVIRONMENT === 'production'){     // in heroku: add environment = production in config variables
//   var connectionString = process.env.DATABASE_URL;
// } else {                                          // in local
//   var connectionString = " ";
// }

var bodyParser = require('body-parser');
var session = require('express-session');
