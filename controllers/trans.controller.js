
var shortid = require('shortid');

var db = require('../db.js');

var transactions = db.get('transactions').value();
var books = db.get('books').value();
var users = db.get('users').value();
var isComplete = [true, false];


module.exports.index = (req, res) => {
  res.render("./transactions/trans.pug", {transactions: transactions});
};

module.exports.create = (req, res) => {
  res.render("./transactions/createTrans.pug", {books: books, users: users});
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions');
};

module.exports.complete = (req, res) => {
  var id = req.params.id;
  var transaction = db.get('transactions').find({id: id}).value();
    if (transaction) {
      res.render('./transactions/completeTrans.pug', {transaction: transaction, isComplete: isComplete});
    };
};

module.exports.postComplete = (req, res) => {
  var id = req.params.id;
  db.get('transactions')
    .find({id: id})
    .assign({isComplete: req.body.isComplete })
    .write();
    res.redirect('back');
}
