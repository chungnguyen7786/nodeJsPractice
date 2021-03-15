var express = require('express');

var route = express.Router();

var shortid = require('shortid');

var db = require('./db.js');

var books = db.get('books').value();

//code for books

route.get('/', (req, res) => {
  var q = req.query.q;
  var matchedBooks;    
  if (q === undefined) {
    matchedBooks = books;
  } else {
    matchedBooks = books.filter((book) => {
      return book.tit.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("books.pug", {books: matchedBooks});
});

route.get('/:id/delete', (req, res) => {   
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect('/books');
});

route.get("/add", (req, res) => {
  res.render("addBook.pug");
});

route.post('/add', (req, res) => {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/');
});


module.exports = route;  