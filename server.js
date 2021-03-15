var express = require("express");
var app = express();

var shortid = require('shortid');

var db = require('./db.js');

var books = db.get('books').value();

var users = db.get('users').value();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index.pug");
});




//code for books

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




// code for users
app.get('/users', (req, res) => {
  var q = req.query.q;
  var matchedUsers;    
  if (q === undefined) {
    matchedUsers = users;
  } else {
    matchedUsers = users.filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("users.pug", {users: matchedUsers});
});

app.get('/users/:id/delete', (req, res) => {   
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect('/users');
});

app.get("/users/add", (req, res) => {
  res.render("addUser.pug");
});

app.post('/users/add', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.get('/users/:id/view', (req, res) => {   
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    if (user) {
        res.render('./viewUser.pug', {user: user});
    }    
});

app.get("/users/:id/edit", (req, res) => {
  var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    if (user) {
        res.render('./editUser.pug', {user: user});
    }
});

app.post('/users/:id/edit', (req, res) => {
  var id = req.params.id;
  db.get('users')
    .find({id: id})
    .assign({name: req.body.name, phone: req.body.phone })
    .write();
    res.redirect('/users');
});



// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
