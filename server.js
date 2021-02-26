// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

var shortid = require('shortid');

var todos = db.get('todos').value();

app.set('view engine', 'pug');
app.set('views', './');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get('/todos', (req, res) => {
  var q = req.query.q;
  var matchedTodos;    
  if (q === undefined) {
    matchedTodos = todos;
  } else {
    matchedTodos = todos.filter((todo) => {
      return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  }  
  res.render("todos.pug", {todos: matchedTodos});
});

app.get('/todos/:id/delete', (req, res) => {   
    var id = req.params.id;
    var todos = db.get('todos').value();
    var todo = db.get('todos').find({id: id}).value();
    var i = todos.indexOf(todo);
    todos.splice(i, 1);
    res.redirect('back');
});


app.post('/todos/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('todos').push(req.body).write();
    res.redirect('back');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
