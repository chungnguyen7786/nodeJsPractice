var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({ books: [], users: [], transactions: [], cookieCount: 0}).write();

module.exports = db;