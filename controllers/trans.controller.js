
var shortid = require('shortid');

var db = require('../db.js');

var transactions = db.get('transactions').value();
var books = db.get('books').value();
var users = db.get('users').value();


module.exports.index = (req, res) => {
  res.render("./transactions/trans.pug", {transactions: transactions});
};

module.exports.create = (req, res) => {
  res.render("./transactions/createTrans.pug", {books: books, users: users});
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions');
};
