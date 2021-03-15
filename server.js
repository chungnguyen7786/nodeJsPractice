var express = require("express");
var app = express();

var shortid = require('shortid');

var db = require('./db.js');

var books = db.get('books').value();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.get('/books', (req, res) => {
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

app.get('/books/:id/delete', (req, res) => {   
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect('/books');
});

app.get("/books/add", (req, res) => {
  res.render("addBook.pug");
});

app.post('/books/add', (req, res) => {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
