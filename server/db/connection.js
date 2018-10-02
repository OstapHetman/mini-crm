const monk = require('monk');
const db = monk('localhost/crm');

module.exports = db;