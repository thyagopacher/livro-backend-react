const knex = require('knex');
const config = require('../knexfile.js');
const dbKnex = require(config.development);
module.exports = dbKnex;