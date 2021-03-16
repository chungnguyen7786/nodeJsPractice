var express = require("express");
var app = express();

var shortid = require('shortid');

var db = require('./db.js');

var userRoute = require('./routes/user.route.js');
var bookRoute = require('./routes/book.route.js');
var transRoute = require('./routes/trans.route.js');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transRoute);

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
