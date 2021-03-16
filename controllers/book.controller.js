var shortid = require('shortid');

var db = require('../db.js');

var books = db.get('books').value();

module.exports.index = (req, res) => {
  var q = req.query.q;
  var matchedBooks;    
  if (q === undefined) {
    matchedBooks = books;
  } else {
    matchedBooks = books.filter((book) => {
      return book.tit.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("./books/books.pug", {books: matchedBooks});
};

module.exports.delete = (req, res) => {   
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect('/books');
};

module.exports.create = (req, res) => {
  res.render("./books/addBook.pug");
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
};
